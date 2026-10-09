import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';

async function setupDatabase() {
  const connection = new URL(
    process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL,
  );
  if (!['postgres:', 'postgresql:'].includes(connection.protocol))
    throw new Error('Invalid database connection protocol.');
  // Schema changes use Neon's direct endpoint; runtime queries retain pooling.
  if (connection.hostname.endsWith('.neon.tech'))
    connection.hostname = connection.hostname.replace(/-pooler\./, '.');

  const schema = await readFile(
    new URL('./admin-schema.sql', import.meta.url),
    'utf8',
  );
  const pool = new Pool({
    connectionString: connection.toString(),
    max: 1,
    connectionTimeoutMillis: 10000,
    query_timeout: 60000,
  });
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    await client.query("SET LOCAL lock_timeout = '15s'");
    await client.query("SET LOCAL statement_timeout = '30s'");
    // Concurrent preview/production builds must not race CREATE TABLE checks.
    await client.query('SELECT pg_advisory_xact_lock(74790312)');
    await client.query(schema);
    await client.query('COMMIT');
    console.log('Admin database tables are ready.');
  } catch (error) {
    if (client) await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client?.release();
    await pool.end();
  }
}

if (!process.env.DATABASE_URL) {
  if (process.argv.includes('--if-configured')) {
    console.log('Database setup skipped: DATABASE_URL is not configured.');
  } else {
    console.error('Set DATABASE_URL before running database setup.');
    process.exitCode = 1;
  }
} else {
  try {
    await setupDatabase();
  } catch (error) {
    const code =
      typeof error?.code === 'string' && /^[A-Z0-9_]{1,40}$/.test(error.code)
        ? ` (${error.code})`
        : '';
    // Connection errors can contain credentials; never dump their details.
    console.error(
      `Database setup failed${code}. Check the database connection, availability and schema permissions.`,
    );
    process.exitCode = 1;
  }
}
