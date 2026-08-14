/**
 * Conversion event names for GA4 (and any future analytics sink).
 * Only meaningful lead-intent actions — not every UI click.
 */
export const ANALYTICS_EVENTS = {
  quote_form_open: 'quote_form_open',
  quote_form_submit: 'quote_form_submit',
  quote_form_success: 'quote_form_success',
  quote_form_error: 'quote_form_error',
  phone_click: 'phone_click',
  whatsapp_click: 'whatsapp_click',
  email_click: 'email_click',
  site_survey_request: 'site_survey_request',
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Safe event params — never include name, phone, email, or free-text PII. */
export type AnalyticsEventParams = {
  form_source?: 'bottom_form' | 'quote_modal';
  property_type?: string;
  link_location?: string;
  page_path?: string;
  error_code?: string;
};
