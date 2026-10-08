import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { db, databaseConfigured } from './db';

export const SESSION_COOKIE = 'aq_admin_session';
const digest = (text: string) =>
  createHash('sha256').update(text).digest('hex');
export function adminConfigured() {
  return (
    databaseConfigured() &&
    Boolean(process.env.ADMIN_EMAIL) &&
    /^[a-f0-9]{32}:[a-f0-9]{128}$/.test(process.env.ADMIN_PASSWORD_HASH || '')
  );
}
export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  const result = await db().query(
    'SELECT 1 FROM aq_sessions WHERE token_hash=$1 AND credential_hash=$2 AND expires_at>now()',
    [digest(token), digest(process.env.ADMIN_PASSWORD_HASH!)],
  );
  return Boolean(result.rowCount);
}
export async function createSession(email: string, password: string) {
  if (!adminConfigured()) return null;
  const [salt, expected] = process.env.ADMIN_PASSWORD_HASH!.split(':');
  const actual = (await promisify(scrypt)(password, salt, 64)) as Buffer;
  const validPassword = timingSafeEqual(Buffer.from(expected, 'hex'), actual);
  if (
    !validPassword ||
    email.toLowerCase() !== process.env.ADMIN_EMAIL!.toLowerCase()
  )
    return null;
  const token = randomBytes(32).toString('hex');
  await db().query('DELETE FROM aq_sessions WHERE expires_at<=now()');
  await db().query(
    "INSERT INTO aq_sessions(token_hash,credential_hash,expires_at) VALUES($1,$2,now()+interval '8 hours')",
    [digest(token), digest(process.env.ADMIN_PASSWORD_HASH!)],
  );
  return token;
}
export async function removeSession(token?: string) {
  if (token && databaseConfigured())
    await db().query('DELETE FROM aq_sessions WHERE token_hash=$1', [
      digest(token),
    ]);
}
export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) throw new Error('ORIGIN');
  const source = new URL(origin);
  // Next.js may use an internal hostname in request.url. The browser Host
  // header identifies the public host and cannot be changed by cross-site JS.
  const host = request.headers.get('host');
  const protocol = process.env.VERCEL
    ? 'https:'
    : new URL(request.url).protocol;
  if (source.host !== host || source.protocol !== protocol)
    throw new Error('ORIGIN');
}
export async function consumeRateLimit(
  key: string,
  limit: number,
  seconds: number,
) {
  // Database atomic counters also work across Vercel instances.
  await db().query('DELETE FROM aq_rate_limits WHERE expires_at<now()');
  const result = await db().query<{ attempts: number }>(
    `INSERT INTO aq_rate_limits(key,attempts,expires_at) VALUES($1,1,now()+make_interval(secs=>$2))
    ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN aq_rate_limits.expires_at<=now() THEN 1 ELSE aq_rate_limits.attempts+1 END,
    expires_at=CASE WHEN aq_rate_limits.expires_at<=now() THEN now()+make_interval(secs=>$2) ELSE aq_rate_limits.expires_at END RETURNING attempts`,
    [digest(key), seconds],
  );
  return result.rows[0].attempts <= limit;
}
export function clientIp(request: Request) {
  // Vercel overwrites this header; do not trust client forwarding headers on other hosts.
  return process.env.VERCEL
    ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
        'unknown'
    : 'local';
}
export async function readJson(
  request: Request,
  maxBytes = 250000,
): Promise<unknown> {
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    throw new Error('JSON');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('JSON');
  let size = 0;
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error('SIZE');
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
