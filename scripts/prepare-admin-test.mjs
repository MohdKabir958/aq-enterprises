import { Pool } from 'pg';
import { readFile } from 'node:fs/promises';
const url = process.env.TEST_DATABASE_URL;
if (!url || !new URL(url).pathname.endsWith('_test'))
  throw new Error(
    'TEST_DATABASE_URL must refer to a disposable database ending in _test.',
  );
const db = new Pool({ connectionString: url, max: 1 });
try {
  await db.query(
    await readFile(new URL('./admin-schema.sql', import.meta.url), 'utf8'),
  );
  await db.query(
    'TRUNCATE aq_content,aq_sessions,aq_rate_limits,aq_media,aq_enquiries,aq_activity',
  );
  console.log('Disposable admin test database prepared.');
} finally {
  await db.end();
}
