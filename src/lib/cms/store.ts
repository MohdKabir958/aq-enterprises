import { cache } from 'react';
import { databaseConfigured, db } from './db';
import type { Collection, SavedRecord } from './models';

export const readRecords = cache(
  async (collection: Collection): Promise<SavedRecord[]> => {
    if (!databaseConfigured()) return [];
    const result = await db().query<SavedRecord>(
      'SELECT key, value, revision, deleted FROM aq_content WHERE collection=$1 ORDER BY updated_at DESC',
      [collection],
    );
    return result.rows;
  },
);
export async function mergedCollection<T extends { slug: string }>(
  collection: Collection,
  defaults: T[],
): Promise<T[]> {
  const entries = new Map(defaults.map((item) => [item.slug, item]));
  for (const row of await readRecords(collection)) {
    if (row.deleted) entries.delete(row.key);
    else entries.set(row.key, row.value as unknown as T);
  }
  return [...entries.values()];
}
export async function setting<T>(
  collection: 'contact' | 'hero',
  defaults: T,
): Promise<T> {
  const row = (await readRecords(collection)).find(
    (item) => item.key === 'settings' && !item.deleted,
  );
  return row ? (row.value as unknown as T) : defaults;
}
export async function saveRecord(
  collection: Collection,
  key: string,
  value: unknown,
  revision: number,
  deleted = false,
) {
  // A stale editor cannot overwrite a newer save from another browser.
  if (revision === 0) {
    const result = await db().query<{ revision: number }>(
      `INSERT INTO aq_content(collection,key,value,deleted) VALUES($1,$2,$3,$4)
       ON CONFLICT(collection,key) DO UPDATE SET value=EXCLUDED.value,
       deleted=EXCLUDED.deleted, revision=aq_content.revision+1, updated_at=now()
       WHERE aq_content.deleted RETURNING revision`,
      [collection, key, JSON.stringify(value), deleted],
    );
    if (!result.rowCount) throw new Error('CONFLICT');
    return result.rows[0].revision;
  }
  const result = await db().query<{ revision: number }>(
    'UPDATE aq_content SET value=CASE WHEN $4 THEN value ELSE $3::jsonb END, deleted=$4, revision=revision+1, updated_at=now() WHERE collection=$1 AND key=$2 AND revision=$5 RETURNING revision',
    [collection, key, JSON.stringify(value), deleted, revision],
  );
  if (!result.rowCount) throw new Error('CONFLICT');
  return result.rows[0].revision;
}
