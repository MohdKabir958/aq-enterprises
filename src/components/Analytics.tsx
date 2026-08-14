'use client';

/**
 * Loads GA4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set,
 * captures attribution, and tracks meaningful outbound contact clicks.
 */

import { useEffect } from 'react';
import Script from 'next/script';
import { captureAttribution } from '@/lib/analytics/attribution';
import { ANALYTICS_EVENTS } from '@/lib/analytics/events';
import { getGaMeasurementId, trackEvent } from '@/lib/analytics/track';

function classifyContactHref(href: string): keyof typeof ANALYTICS_EVENTS | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith('tel:')) return 'phone_click';
  if (h.startsWith('mailto:')) return 'email_click';
  if (h.includes('wa.me/') || h.includes('api.whatsapp.com') || h.includes('whatsapp.com')) {
    return 'whatsapp_click';
  }
  return null;
}

export default function Analytics() {
  const measurementId = getGaMeasurementId();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    if (!measurementId) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const eventName = classifyContactHref(href);
      if (!eventName) return;

      trackEvent(ANALYTICS_EVENTS[eventName], {
        page_path: window.location.pathname,
        link_location: anchor.getAttribute('data-track-location') || undefined,
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [measurementId]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
