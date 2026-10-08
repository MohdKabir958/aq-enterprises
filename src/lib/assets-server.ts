/**
 * Server-only asset helpers. Do not import from Client Components.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Return the public path only when the file exists on disk.
 * Never pass a planned path to next/image until the client uploads the file.
 */
export function resolvePublicSrc(publicPath?: string): string | undefined {
  if (!publicPath) return undefined;
  if (/^\/api\/media\/[a-f0-9-]{36}$/.test(publicPath)) return publicPath;
  if (publicPath.startsWith('https://')) return publicPath;
  const relative = publicPath.replace(/^\/+/, '');
  try {
    if (existsSync(join(process.cwd(), 'public', relative))) {
      return `/${relative}`;
    }
  } catch {
    return undefined;
  }
  return undefined;
}
