import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';
if (!process.env.DATABASE_URL)
  throw new Error('Set DATABASE_URL before running database setup.');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
try {
  await pool.query(
    await readFile(new URL('./admin-schema.sql', import.meta.url), 'utf8'),
  );
  console.log('Admin database tables are ready.');
} finally {
  await pool.end();
}
