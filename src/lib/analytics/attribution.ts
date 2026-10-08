/**
 * Lead attribution helpers (client).
 * Stores first-touch + session landing context without collecting extra PII.
 */

export type LeadAttribution = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  firstTouchSource: string;
  pagePath: string;
};

const FIRST_TOUCH_KEY = 'aq_first_touch_v1';
const SESSION_LANDING_KEY = 'aq_session_landing_v1';

function readSearchParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

function deriveSource(params: URLSearchParams, referrer: string): string {
  const utm = params.get('utm_source')?.trim();
  if (utm) return utm;
  if (referrer) {
    try {
      return new URL(referrer).hostname || 'referral';
    } catch {
      return 'referral';
    }
  }
  return 'direct';
}

/** Call once on app load to capture UTMs / first touch. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const params = readSearchParams();
  const referrer = document.referrer || '';
  const path = `${window.location.pathname}${window.location.search}`;

  try {
  if (!sessionStorage.getItem(SESSION_LANDING_KEY)) {
    sessionStorage.setItem(
      SESSION_LANDING_KEY,
      JSON.stringify({
        landingPage: path,
        referrer,
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        utmContent: params.get('utm_content') || '',
        utmTerm: params.get('utm_term') || '',
      }),
    );
  }

  if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
    localStorage.setItem(
      FIRST_TOUCH_KEY,
      JSON.stringify({
        firstTouchSource: deriveSource(params, referrer),
        landingPage: path,
        capturedAt: new Date().toISOString(),
      }),
    );
  }
  } catch { /* Attribution is optional when browser storage is unavailable. */ }
}

export function getAttribution(): LeadAttribution {
  const empty: LeadAttribution = {
    landingPage: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmContent: '',
    utmTerm: '',
    firstTouchSource: 'direct',
    pagePath: '',
  };

  if (typeof window === 'undefined') return empty;

  let session: Partial<LeadAttribution> = {};
  let first: { firstTouchSource?: string } = {};

  try {
    session = JSON.parse(sessionStorage.getItem(SESSION_LANDING_KEY) || '{}') || {};
  } catch {
    session = {};
  }
  try {
    first = JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) || '{}') || {};
  } catch {
    first = {};
  }

  return {
    landingPage: session.landingPage || window.location.pathname || '',
    referrer: session.referrer || document.referrer || '',
    utmSource: session.utmSource || '',
    utmMedium: session.utmMedium || '',
    utmCampaign: session.utmCampaign || '',
    utmContent: session.utmContent || '',
    utmTerm: session.utmTerm || '',
    firstTouchSource: first.firstTouchSource || 'direct',
    pagePath: window.location.pathname || '',
  };
}
