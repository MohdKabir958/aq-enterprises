/**
 * Client-side analytics helpers.
 * GA4 loads only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * Never send PII (names, phones, emails, free-text messages).
 */

import type { AnalyticsEventName, AnalyticsEventParams } from './events';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(getGaMeasurementId());
}

export function trackEvent(
  name: AnalyticsEventName,
  params?: AnalyticsEventParams,
): void {
  if (typeof window === 'undefined') return;
  if (!isAnalyticsEnabled()) return;
  if (typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', name, {
      ...params,
      send_to: getGaMeasurementId(),
    });
  } catch {
    // Analytics must never break UX
  }
}
