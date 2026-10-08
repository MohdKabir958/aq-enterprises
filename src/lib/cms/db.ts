import { Pool } from 'pg';

const globalDb = globalThis as typeof globalThis & { aqPool?: Pool };
export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
export function db(): Pool {
  if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL is not configured.');
  if (!globalDb.aqPool) {
    globalDb.aqPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
      query_timeout: 10000,
    });
    globalDb.aqPool.on('error', () => {
      console.error('[Database] An idle connection closed; details omitted.');
    });
  }
  return globalDb.aqPool;
}
