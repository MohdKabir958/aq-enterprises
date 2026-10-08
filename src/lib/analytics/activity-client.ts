import { activitySchema, sourceChannel, type ActivityEvent } from './activity';
import { getAttribution } from './attribution';
export function recordActivity(event: ActivityEvent) {
  if (typeof window === 'undefined' || navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  const a = getAttribution();
  const input = activitySchema.safeParse({ event, path: window.location.pathname,
    channel: sourceChannel(a.utmSource || a.firstTouchSource) });
  if (!input.success) return;
  void fetch('/api/activity', { method: 'POST', keepalive: true,
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input.data),
  }).catch(() => { /* Activity reporting must not affect customer actions. */ });
}
