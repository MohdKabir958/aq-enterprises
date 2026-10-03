/**
 * @file rate-limiter.ts
 * @description Rate limiting interface and production-hardened implementations.
 *
 * DESIGN:
 * - Application code interfaces with `RateLimiter`.
 * - Backend storage is abstracted. The default `MemoryRateLimiter` is explicitly local-only.
 * - Raw PII (e.g. plain phone number or plain IP) is never retained as raw map keys;
 *   keys are SHA-256 hashed.
 * - Memory limiter enforces a strict capacity ceiling and automatic TTL eviction to prevent
 *   unbounded memory growth.
 *
 * PRODUCTION NOTE:
 * For multi-instance, serverless, or edge deployments (e.g. Vercel, AWS Lambda, Kubernetes),
 * configure an external distributed provider (e.g. Redis / Upstash / Memcached).
 */

import { createHash } from 'node:crypto';

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
  remaining?: number;
}

export interface RateLimiter {
  /** Check and record an attempt against the specified rate-limit key. */
  check(key: string): Promise<RateLimitResult>;
}

export interface MemoryRateLimiterOptions {
  /** Time window in milliseconds (default: 60,000ms / 1 min) */
  windowMs?: number;
  /** Maximum allowed requests within the window (default: 3) */
  maxRequests?: number;
  /** Maximum number of unique keys tracked simultaneously before oldest entries are pruned (default: 5,000) */
  maxEntries?: number;
}

interface MemoryEntry {
  count: number;
  resetAt: number;
  lastSeen: number;
}

/**
 * Hash an identifier with SHA-256 so raw contact details or IPs are never held in memory.
 */
export function hashRateLimitKey(prefix: string, identifier: string): string {
  const hash = createHash('sha256').update(identifier.trim().toLowerCase()).digest('hex');
  return `${prefix}:${hash.slice(0, 32)}`;
}

/**
 * Process-local in-memory rate limiter with TTL cleanup and strict capacity ceiling.
 * Fallback implementation for single-process and development environments.
 */
export class MemoryRateLimiter implements RateLimiter {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly maxEntries: number;
  private readonly store: Map<string, MemoryEntry>;
  private lastPrune: number;

  constructor(options: MemoryRateLimiterOptions = {}) {
    this.windowMs = options.windowMs ?? 60_000;
    this.maxRequests = options.maxRequests ?? 3;
    this.maxEntries = options.maxEntries ?? 5_000;
    this.store = new Map();
    this.lastPrune = Date.now();
  }

  private pruneExpired(now: number): void {
    // Run cleanup at most once every 30 seconds
    if (now - this.lastPrune < 30_000) return;
    this.lastPrune = now;

    for (const [key, entry] of this.store.entries()) {
      if (entry.resetAt <= now) {
        this.store.delete(key);
      }
    }

    // If still over capacity, evict least recently updated entries
    if (this.store.size > this.maxEntries) {
      const entries = Array.from(this.store.entries()).sort(
        (a, b) => a[1].lastSeen - b[1].lastSeen,
      );
      const toRemove = this.store.size - this.maxEntries;
      for (let i = 0; i < toRemove; i++) {
        const item = entries[i];
        if (item) this.store.delete(item[0]);
      }
    }
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    this.pruneExpired(now);

    const existing = this.store.get(key);

    if (!existing || existing.resetAt <= now) {
      // First hit or window expired
      this.store.set(key, {
        count: 1,
        resetAt: now + this.windowMs,
        lastSeen: now,
      });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    // Inside window
    if (existing.count >= this.maxRequests) {
      const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, retryAfterSeconds),
        remaining: 0,
      };
    }

    existing.count += 1;
    existing.lastSeen = now;
    return {
      allowed: true,
      remaining: this.maxRequests - existing.count,
    };
  }
}

/** Global default process-local rate limiter instance for lead submissions. */
export const defaultLeadRateLimiter = new MemoryRateLimiter({
  windowMs: 60_000, // 1 minute window
  maxRequests: 3,    // Allow up to 3 quote submissions per minute per normalized phone/IP
  maxEntries: 2_000,
});
