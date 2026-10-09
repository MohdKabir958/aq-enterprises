import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';
import { Pool } from 'pg';

const testUrl = process.env.TEST_DATABASE_URL;
let database;
before(() => {
  assert.ok(
    testUrl && new URL(testUrl).pathname.endsWith('_test'),
    'TEST_DATABASE_URL must point to a disposable database ending in _test.',
  );
  database = new Pool({ connectionString: testUrl, max: 1 });
});
after(async () => {
  await database?.end();
});

function runSetup(overrides = {}, optional = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['scripts/setup-admin.mjs', ...(optional ? ['--if-configured'] : [])],
      {
        cwd: new URL('..', import.meta.url),
        env: {
          ...process.env,
          DATABASE_URL: '',
          DATABASE_URL_UNPOOLED: '',
          ...overrides,
        },
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );
    let output = '';
    child.stdout.on('data', (data) => { output += data; });
    child.stderr.on('data', (data) => { output += data; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, output }));
  });
}

async function isolatedSchema(t) {
  const schema = `aq_setup_${randomBytes(8).toString('hex')}`;
  await database.query(`CREATE SCHEMA ${schema}`);
  const url = new URL(testUrl);
  url.searchParams.set('options', `-c search_path=${schema}`);
  const pool = new Pool({ connectionString: url.toString(), max: 1 });
  t.after(async () => {
    await pool.end();
    await database.query(`DROP SCHEMA ${schema} CASCADE`);
  });
  return { schema, url: url.toString(), pool };
}

test('unconfigured builds skip setup, but manual setup fails', async () => {
  const optional = await runSetup({}, true);
  assert.equal(optional.code, 0);
  assert.match(optional.output, /setup skipped/);
  const required = await runSetup();
  assert.equal(required.code, 1);
  assert.match(required.output, /Set DATABASE_URL/);
});

test('fresh setup and concurrent reruns preserve saved content and enquiries', async (t) => {
  const { schema, url, pool } = await isolatedSchema(t);
  const setup = await runSetup({ DATABASE_URL: url }, true);
  assert.equal(setup.code, 0, setup.output);
  const tables = await pool.query(
    'SELECT table_name FROM information_schema.tables WHERE table_schema=$1',
    [schema],
  );
  assert.equal(tables.rows.length, 7);
  await pool.query(
    "INSERT INTO aq_content(collection,key,value) VALUES ('faqs','preserve',$1)",
    [JSON.stringify({ question: 'Test fixture', answer: 'Keep this content' })],
  );
  await pool.query(
    'INSERT INTO aq_enquiries(id,payload,notes,lead_status) VALUES ($1,$2,$3,$4)',
    ['00000000-0000-4000-8000-000000000001', JSON.stringify({ source: 'test' }), 'Keep this note', 'contacted'],
  );
  const results = await Promise.all([
    runSetup({ DATABASE_URL: url }),
    runSetup({ DATABASE_URL: url }),
  ]);
  for (const result of results) assert.equal(result.code, 0, result.output);
  const content = await pool.query('SELECT value FROM aq_content');
  assert.equal(content.rows[0].value.answer, 'Keep this content');
  const enquiries = await pool.query('SELECT notes,lead_status FROM aq_enquiries');
  assert.deepEqual(enquiries.rows, [{ notes: 'Keep this note', lead_status: 'contacted' }]);
});

test('legacy enquiry tables receive workflow fields without losing payloads', async (t) => {
  const { url, pool } = await isolatedSchema(t);
  await pool.query(
    "CREATE TABLE aq_enquiries (id uuid PRIMARY KEY, payload jsonb NOT NULL, email_status text NOT NULL DEFAULT 'pending', created_at timestamptz NOT NULL DEFAULT now())",
  );
  await pool.query('INSERT INTO aq_enquiries(id,payload) VALUES ($1,$2)', [
    '00000000-0000-4000-8000-000000000002',
    JSON.stringify({ source: 'legacy-test', message: 'Preserve existing request' }),
  ]);
  const setup = await runSetup({ DATABASE_URL: url });
  assert.equal(setup.code, 0, setup.output);
  const result = await pool.query(
    'SELECT payload,lead_status,notes,follow_up_at,appointment_at,revision,email_attempts,last_email_attempt_at FROM aq_enquiries',
  );
  assert.deepEqual(result.rows[0], {
    payload: { source: 'legacy-test', message: 'Preserve existing request' },
    lead_status: 'new', notes: '', follow_up_at: null, appointment_at: null,
    revision: 1, email_attempts: 0, last_email_attempt_at: null,
  });
});

test('business email migration updates the old default once and preserves later owner edits', async (t) => {
  const { url, pool } = await isolatedSchema(t);
  await pool.query("CREATE TABLE aq_content (collection text NOT NULL, key text NOT NULL, value jsonb NOT NULL, deleted boolean NOT NULL DEFAULT false, revision integer NOT NULL DEFAULT 1, updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(collection,key))");
  const contact = { email: 'mohammedtalha204@gmail.com', phone: '+919876543210', line1: 'Test fixture address' };
  await pool.query("INSERT INTO aq_content(collection,key,value,revision) VALUES ('contact','settings',$1,4)", [JSON.stringify(contact)]);
  const first = await runSetup({ DATABASE_URL: url });
  assert.equal(first.code, 0, first.output);
  const migrated = (await pool.query("SELECT value,revision FROM aq_content WHERE collection='contact' AND key='settings'")).rows[0];
  assert.deepEqual(migrated, { value: { ...contact, email: 'aqenterprises204@gmail.com' }, revision: 5 });
  await pool.query("UPDATE aq_content SET value=jsonb_set(value,'{email}','\"later-owner-email@example.test\"'::jsonb),revision=revision+1 WHERE collection='contact' AND key='settings'");
  const again = await runSetup({ DATABASE_URL: url });
  assert.equal(again.code, 0, again.output);
  const preserved = (await pool.query("SELECT value,revision FROM aq_content WHERE collection='contact' AND key='settings'")).rows[0];
  assert.deepEqual(preserved, { value: { ...contact, email: 'later-owner-email@example.test' }, revision: 6 });
});

test('hero refresh migrates only old default copy, preserving media and later edits', async (t) => {
  const oldCopy = {
    eyebrow: 'CCTV Installation · Hyderabad',
    title: 'CCTV Installation in Hyderabad — Homes, Offices & Factories',
    subtitle: 'See everything on your property. Miss nothing that matters.',
    description: 'We design, install and maintain CCTV and access-control systems for homes, offices and industrial sites across Hyderabad — done right the first time.',
    mediaType: 'image', mediaUrl: '/api/media/test-fixture',
    mediaAlt: 'Owner equipment image', poster: '',
  };
  for (const custom of [false, true]) {
    const { url, pool } = await isolatedSchema(t);
    await pool.query("CREATE TABLE aq_content (collection text NOT NULL, key text NOT NULL, value jsonb NOT NULL, deleted boolean NOT NULL DEFAULT false, revision integer NOT NULL DEFAULT 1, updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(collection,key))");
    const initial = { ...oldCopy, ...(custom ? { title: 'Custom owner headline' } : {}) };
    await pool.query("INSERT INTO aq_content(collection,key,value,revision) VALUES ('hero','settings',$1,4)", [JSON.stringify(initial)]);
    const first = await runSetup({ DATABASE_URL: url });
    assert.equal(first.code, 0, first.output);
    const result = (await pool.query("SELECT value,revision FROM aq_content WHERE collection='hero' AND key='settings'")).rows[0];
    if (custom) {
      assert.deepEqual(result, { value: initial, revision: 4 });
    } else {
      assert.equal(result.revision, 5);
      assert.equal(result.value.title, 'CCTV & Internet Services in Hyderabad.');
      for (const key of ['mediaType', 'mediaUrl', 'mediaAlt', 'poster']) {
        assert.equal(result.value[key], initial[key]);
      }
    }
    const later = { ...result.value, title: 'Later owner headline' };
    await pool.query("UPDATE aq_content SET value=$1,revision=revision+1 WHERE collection='hero' AND key='settings'", [JSON.stringify(later)]);
    const again = await runSetup({ DATABASE_URL: url });
    assert.equal(again.code, 0, again.output);
    assert.deepEqual((await pool.query("SELECT value,revision FROM aq_content WHERE collection='hero' AND key='settings'")).rows[0], { value: later, revision: result.revision + 1 });
  }
});

test('failed schema setup rolls back new tables and preserves existing tables', async (t) => {
  const { url, pool } = await isolatedSchema(t);
  await pool.query('CREATE TABLE aq_sessions (fixture integer)');
  await pool.query('INSERT INTO aq_sessions VALUES (42)');
  const setup = await runSetup({ DATABASE_URL: url });
  assert.equal(setup.code, 1);
  assert.match(setup.output, /Database setup failed \(42703\)/);
  const content = await pool.query("SELECT to_regclass('aq_content') AS table_name");
  assert.equal(content.rows[0].table_name, null);
  const existing = await pool.query('SELECT fixture FROM aq_sessions');
  assert.deepEqual(existing.rows, [{ fixture: 42 }]);
});

test('direct connection override is used without exposing failed URL credentials', async (t) => {
  const { url, pool } = await isolatedSchema(t);
  const fixtureSecret = 'test-only-secret-must-not-be-logged';
  const invalid = `invalid://${fixtureSecret}`;
  const failure = await runSetup({ DATABASE_URL: invalid });
  assert.equal(failure.code, 1);
  assert.ok(!failure.output.includes(fixtureSecret));
  const setup = await runSetup({ DATABASE_URL: invalid, DATABASE_URL_UNPOOLED: url });
  assert.equal(setup.code, 0, setup.output);
  assert.ok(!setup.output.includes(fixtureSecret));
  const result = await pool.query("SELECT to_regclass('aq_content') AS table_name");
  assert.equal(result.rows[0].table_name, 'aq_content');
});
