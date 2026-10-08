'use client';

import { usePublicBusiness } from '@/components/SiteSettings';

/**
 * @file FloatingCTA.tsx
 * @description Persistent floating call-to-action component rendered at layout level.
 *
 * Contains three sub-components:
 *   1. Floating button stack (desktop + mobile) — WhatsApp pulse button + "Get Free Quote"
 *   2. Mobile bottom action bar — full-width Call Now / WhatsApp row for easy thumb reach
 *   3. Quote modal — a lightweight form overlay with controlled input state
 *
 * FORM BEHAVIOR:
 * The quote modal form captures name, phone, and service type.
 * It strictly validates inputs on the client before dispatching to the Server Action.
 * Uses React 18 useTransition for smooth pending states during API call.
 *
 * ACCESSIBILITY:
 *   - Modal uses role="dialog", aria-modal, aria-labelledby
 *   - Form inputs have associated <label> elements (visually hidden via sr-only pattern)
 *   - Uses semantic <form> with proper onSubmit bindings for keyboard accessibility
 */

import { useState, useEffect, useId, useTransition, useRef } from 'react';
import { SERVICE_OPTIONS } from '@/lib/constants';
import { CTA_COPY } from '@/lib/business';
import { submitLead } from '@/actions/submit-lead';
import { getAttribution } from '@/lib/analytics/attribution';
import { ANALYTICS_EVENTS } from '@/lib/analytics/events';
import { trackEvent } from '@/lib/analytics/track';
import { validateName, validatePhone } from '@/lib/validation/lead';

/** Form state shape for the quote modal. */
interface QuoteForm {
  name: string;
  phone: string;
  service: string;
  website: string;
}

/** Validation errors keyed by field name. */
interface FormErrors {
  name?: string;
  phone?: string;
  global?: string;
}

/** Validates the quote form fields using centralized validation logic. */
function validateForm(form: QuoteForm): FormErrors {
  const errors: FormErrors = {};
  const nameCheck = validateName(form.name);
  if (!nameCheck.valid) {
    errors.name = nameCheck.error;
  }
  const phoneCheck = validatePhone(form.phone);
  if (!phoneCheck.valid) {
    errors.phone = phoneCheck.error;
  }
  return errors;
}

export default function FloatingCTA() {
  const { PHONE, PHONE_DISPLAY, WHATSAPP_URL } = usePublicBusiness();
  const submissionId = useRef('');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<QuoteForm>({
    name: '',
    phone: '',
    service: SERVICE_OPTIONS[0],
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /** Unique IDs for aria associations (avoids collisions when component is mounted once). */
  const modalTitleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const serviceId = useId();
  const honeypotId = useId();

  /** Accessible dialog management: focus trapping, initial focus, focus restoration, escape key, body scroll. */
  useEffect(() => {
    if (!quoteOpen) return;

    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // 1. Initial focus: move focus inside the dialog
    const focusTimer = setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 50);

    // 2. Keyboard handler: Escape to close, Tab to trap focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setQuoteOpen(false);
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent background page from scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Focus restoration: return focus to the trigger button that launched the modal
      trigger?.focus();
    };
  }, [quoteOpen]);

  /** Opens the quote modal and resets the form to a clean state. */
  const openQuote = () => {
    submissionId.current = '';
    setForm({ name: '', phone: '', service: SERVICE_OPTIONS[0], website: '' });
    setErrors({});
    setSubmitted(false);
    setQuoteOpen(true);
    trackEvent(ANALYTICS_EVENTS.quote_form_open, {
      form_source: 'quote_modal',
      page_path:
        typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  };

  /** Validates the form and dispatches to the Server Action. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous global errors
    setErrors({});

    trackEvent(ANALYTICS_EVENTS.quote_form_submit, {
      form_source: 'quote_modal',
      property_type: form.service,
      page_path:
        typeof window !== 'undefined' ? window.location.pathname : undefined,
    });

    submissionId.current ||= crypto.randomUUID();
    startTransition(async () => {
      try {
        const result = await submitLead({
          name: form.name,
          phone: form.phone,
          propertyType: form.service,
          formSource: 'quote_modal',
          submissionId: submissionId.current,
          website: form.website,
          attribution: getAttribution(),
        });

        if (result.success) {
          trackEvent(ANALYTICS_EVENTS.quote_form_success, {
            form_source: 'quote_modal',
            property_type: form.service,
          });
          trackEvent(ANALYTICS_EVENTS.site_survey_request, {
            form_source: 'quote_modal',
            property_type: form.service,
          });
          setSubmitted(true);
        } else {
          trackEvent(ANALYTICS_EVENTS.quote_form_error, {
            form_source: 'quote_modal',
            error_code: 'submit_failed',
          });
          setErrors({
            global: result.error || 'Failed to submit form. Please try again.',
          });
        }
      } catch {
        setErrors({
          global: 'Unable to send your request. Please try again or call us.',
        });
      }
    });
  };

  /** Shared label style — visually hidden but accessible to screen readers. */
  const srOnly: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  };

  return (
    <>
      {/* ── Floating Button Stack ─────────────────────────────────────── */}
      <div
        className="floating-contact-stack"
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 12,
          position: 'fixed',
          right: 22,
          bottom: 26,
          zIndex: 298,
        }}
      >
        <button
          type="button"
          onClick={openQuote}
          aria-haspopup="dialog"
          style={{
            background: '#12151B',
            border: '1px solid #FF5A1F',
            color: '#FF5A1F',
            fontSize: 13,
            fontWeight: 600,
            padding: '11px 18px',
            borderRadius: 999,
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
            whiteSpace: 'nowrap',
          }}
        >
          Get Free Quote
        </button>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'ctaPulse 2.4s ease-out infinite',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M22.4 18.5c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.3 0-.5 0-.7-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.3 2.4 3.7 5.9 5.1.8.3 1.5.5 2 .7.8.3 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.7.3-.9.3-1.6.2-1.7-.1-.2-.3-.3-.7-.5zM16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.8c1.9 1 4 1.6 6 1.6 7 0 12.7-5.6 12.7-12.5C28.7 8.6 23 3 16 3zm0 22.8c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4 1 1-3.9-.2-.4a10.3 10.3 0 0 1-1.6-5.4C5.5 9.9 10.2 5.2 16 5.2S26.5 9.9 26.5 15.6 21.8 25.8 16 25.8z"
              fill="#0A0C10"
            />
          </svg>
        </a>
      </div>

      {/* ── Mobile Bottom Action Bar ──────────────────────────────────── */}
      <div
        className="mobile-contact-bar"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 299,
          background: '#12151B',
          borderTop: '1px solid #232833',
          gap: 1,
          minHeight: 56,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        role="navigation"
        aria-label="Quick contact"
      >
        <a
          href={`tel:${PHONE}`}
          aria-label={`Call us at ${PHONE_DISPLAY}`}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '15px 0',
            color: '#F2F4F7',
            fontSize: 14,
            fontWeight: 600,
            background: '#181C24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.9 2.2z"
              stroke="#F2F4F7"
              strokeWidth="1.4"
            />
          </svg>
          Call Now
        </a>
        <button
          type="button"
          onClick={openQuote}
          aria-haspopup="dialog"
          style={{
            flex: 1,
            border: 0,
            background: '#FF5A1F',
            color: '#0A0C10',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '15px 8px',
          }}
        >
          Get Quote
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '15px 0',
            color: '#0A0C10',
            fontSize: 14,
            fontWeight: 600,
            background: '#25D366',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          WhatsApp
        </a>
      </div>

      {/* ── Quote Modal ───────────────────────────────────────────────── */}
      {quoteOpen && (
        <div
          className="quote-modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isPending) setQuoteOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            background: 'rgba(6,7,9,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            animation: 'ctaFadeIn 0.2s ease',
          }}
        >
          <div
            className="quote-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              borderRadius: 12,
              maxWidth: 440,
              width: '100%',
              padding: 'clamp(20px, 4vw, 32px)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                if (!isPending) setQuoteOpen(false);
              }}
              aria-label="Close quote form"
              disabled={isPending}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'none',
                border: 'none',
                color: '#6B7484',
                fontSize: 20,
                cursor: isPending ? 'not-allowed' : 'pointer',
                lineHeight: 1,
                width: 44,
                height: 44,
                opacity: isPending ? 0.4 : 1,
              }}
            >
              ×
            </button>

            {!submitted ? (
              /* ── Form State ─────────────────────────────────────── */
              <>
                <h2
                  id={modalTitleId}
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 22,
                    fontWeight: 600,
                    color: '#F2F4F7',
                    marginBottom: 6,
                    marginTop: 0,
                  }}
                >
                  Get a Free Site Visit
                </h2>
                <p
                  style={{ color: '#9BA5B4', fontSize: 14, margin: '0 0 22px' }}
                >
                  Share your details to request a site survey or quotation. We
                  will follow up using the phone number you provide.
                </p>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {/* Global Error Banner */}
                  {errors.global && (
                    <div
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: 6,
                        padding: '10px 14px',
                        color: '#ef4444',
                        fontSize: 13,
                        marginBottom: 8,
                      }}
                      role="alert"
                    >
                      {errors.global}
                    </div>
                  )}

                  <div aria-hidden="true" style={srOnly}>
                    <label htmlFor={honeypotId}>Website</label>
                    <input
                      id={honeypotId}
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, website: e.target.value }))
                      }
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label htmlFor={nameId} style={srOnly}>
                      Your name
                    </label>
                    <input
                      ref={nameInputRef}
                      id={nameId}
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, name: e.target.value }));
                        setErrors((err) => ({ ...err, name: undefined }));
                      }}
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={isPending}
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? `${nameId}-error` : undefined
                      }
                      style={{
                        background: '#0A0C10',
                        border: `1px solid ${errors.name ? '#ef4444' : '#232833'}`,
                        borderRadius: 6,
                        padding: '12px 14px',
                        color: '#F2F4F7',
                        fontSize: 14,
                        opacity: isPending ? 0.6 : 1,
                      }}
                    />
                    {errors.name && (
                      <span
                        id={`${nameId}-error`}
                        role="alert"
                        style={{
                          color: '#ef4444',
                          fontSize: 12,
                          marginTop: 4,
                          display: 'block',
                        }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor={phoneId} style={srOnly}>
                      Phone number
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, phone: e.target.value }));
                        setErrors((err) => ({ ...err, phone: undefined }));
                      }}
                      placeholder="Phone number (e.g. 98765 43210)"
                      autoComplete="tel"
                      inputMode="numeric"
                      disabled={isPending}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? `${phoneId}-error` : undefined
                      }
                      style={{
                        background: '#0A0C10',
                        border: `1px solid ${errors.phone ? '#ef4444' : '#232833'}`,
                        borderRadius: 6,
                        padding: '12px 14px',
                        color: '#F2F4F7',
                        fontSize: 14,
                        opacity: isPending ? 0.6 : 1,
                      }}
                    />
                    {errors.phone && (
                      <span
                        id={`${phoneId}-error`}
                        role="alert"
                        style={{
                          color: '#ef4444',
                          fontSize: 12,
                          marginTop: 4,
                          display: 'block',
                        }}
                      >
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Service Select */}
                  <div>
                    <label htmlFor={serviceId} style={srOnly}>
                      Service required
                    </label>
                    <select
                      id={serviceId}
                      value={form.service}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, service: e.target.value }))
                      }
                      disabled={isPending}
                      style={{
                        background: '#0A0C10',
                        border: '1px solid #232833',
                        borderRadius: 6,
                        padding: '12px 14px',
                        color: '#F2F4F7',
                        fontSize: 14,
                        cursor: isPending ? 'not-allowed' : 'pointer',
                        opacity: isPending ? 0.6 : 1,
                      }}
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    style={{
                      background: '#FF5A1F',
                      color: '#0A0C10',
                      border: 'none',
                      borderRadius: 6,
                      padding: 13,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: isPending ? 'not-allowed' : 'pointer',
                      marginTop: 6,
                      opacity: isPending ? 0.7 : 1,
                    }}
                  >
                    {isPending ? 'Sending request...' : 'Request Callback'}
                  </button>
                </form>
              </>
            ) : (
              /* ── Success State ──────────────────────────────────── */
              <div
                style={{ textAlign: 'center', padding: '20px 0' }}
                role="status"
                aria-live="polite"
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'rgba(52,211,153,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#34D399"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 19,
                    fontWeight: 600,
                    color: '#F2F4F7',
                    marginBottom: 6,
                    marginTop: 0,
                  }}
                >
                  Request received
                </h2>
                <p style={{ color: '#9BA5B4', fontSize: 14, margin: 0 }}>
                  {CTA_COPY.formSuccess}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
