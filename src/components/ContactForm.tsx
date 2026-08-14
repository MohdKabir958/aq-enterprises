'use client';

import { useState, useTransition, useId } from 'react';
import { PROPERTY_TYPES } from '@/lib/constants';
import { submitLead } from '@/actions/submit-lead';
import { getAttribution } from '@/lib/analytics/attribution';
import { ANALYTICS_EVENTS } from '@/lib/analytics/events';
import { trackEvent } from '@/lib/analytics/track';

interface ContactFormState {
  name: string;
  phone: string;
  propertyType: string;
  website: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  global?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    phone: '',
    propertyType: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const nameId = useId();
  const phoneId = useId();
  const propertyId = useId();
  const honeypotId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s\-+()]/g, ''))) {
      newErrors.phone = 'Valid 10-digit number required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const propertyType = form.propertyType || 'Not specified';
    trackEvent(ANALYTICS_EVENTS.quote_form_submit, {
      form_source: 'bottom_form',
      property_type: propertyType,
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });

    startTransition(async () => {
      const result = await submitLead({
        name: form.name,
        phone: form.phone,
        propertyType,
        formSource: 'bottom_form',
        website: form.website,
        attribution: getAttribution(),
      });

      if (result.success) {
        trackEvent(ANALYTICS_EVENTS.quote_form_success, {
          form_source: 'bottom_form',
          property_type: propertyType,
        });
        trackEvent(ANALYTICS_EVENTS.site_survey_request, {
          form_source: 'bottom_form',
          property_type: propertyType,
        });
        setSubmitted(true);
      } else {
        trackEvent(ANALYTICS_EVENTS.quote_form_error, {
          form_source: 'bottom_form',
          error_code: 'submit_failed',
        });
        setErrors({ global: result.error || 'Failed to submit.' });
      }
    });
  };

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

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(52,211,153,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ color: '#F2F4F7', fontSize: 18, margin: '0 0 8px' }}>Request Received</h3>
        <p style={{ color: '#9BA5B4', fontSize: 14, margin: 0 }}>
          Thank you. Your request has been received. Our team will contact you to discuss a site
          survey or quotation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {errors.global && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 6, padding: '10px 14px', color: '#ef4444', fontSize: 13 }} role="alert">
          {errors.global}
        </div>
      )}

      {/* Honeypot — hidden from users */}
      <div aria-hidden="true" style={srOnly}>
        <label htmlFor={honeypotId}>Website</label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor={nameId} style={srOnly}>Full name</label>
        <input
          id={nameId}
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm((f) => ({ ...f, name: e.target.value }));
            setErrors((err) => ({ ...err, name: undefined }));
          }}
          disabled={isPending}
          placeholder="Full name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          style={{
            background: '#0A0C10',
            border: `1px solid ${errors.name ? '#ef4444' : '#232833'}`,
            borderRadius: 6,
            padding: '13px 14px',
            color: '#F2F4F7',
            fontSize: 14,
            width: '100%',
            opacity: isPending ? 0.6 : 1,
          }}
        />
        {errors.name && <span id={`${nameId}-error`} style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor={phoneId} style={srOnly}>Phone number</label>
        <input
          id={phoneId}
          type="tel"
          value={form.phone}
          onChange={(e) => {
            setForm((f) => ({ ...f, phone: e.target.value }));
            setErrors((err) => ({ ...err, phone: undefined }));
          }}
          disabled={isPending}
          placeholder="Phone number"
          autoComplete="tel"
          inputMode="numeric"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
          style={{
            background: '#0A0C10',
            border: `1px solid ${errors.phone ? '#ef4444' : '#232833'}`,
            borderRadius: 6,
            padding: '13px 14px',
            color: '#F2F4F7',
            fontSize: 14,
            width: '100%',
            opacity: isPending ? 0.6 : 1,
          }}
        />
        {errors.phone && <span id={`${phoneId}-error`} style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.phone}</span>}
      </div>

      <div>
        <label htmlFor={propertyId} style={srOnly}>Property type</label>
        <select
          id={propertyId}
          value={form.propertyType}
          onChange={(e) => setForm((f) => ({ ...f, propertyType: e.target.value }))}
          disabled={isPending}
          style={{
            background: '#0A0C10',
            border: '1px solid #232833',
            borderRadius: 6,
            padding: '13px 14px',
            color: form.propertyType === '' ? '#6B7484' : '#F2F4F7',
            fontSize: 14,
            width: '100%',
            cursor: isPending ? 'not-allowed' : 'pointer',
            opacity: isPending ? 0.6 : 1,
          }}
        >
          <option value="" disabled hidden>Select property type</option>
          {PROPERTY_TYPES.map(pt => <option key={pt} value={pt}>{pt}</option>)}
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
          padding: 14,
          fontSize: 15,
          fontWeight: 600,
          cursor: isPending ? 'not-allowed' : 'pointer',
          marginTop: 4,
          opacity: isPending ? 0.7 : 1,
        }}
      >
        {isPending ? 'Sending request...' : 'Get Callback'}
      </button>
    </form>
  );
}
