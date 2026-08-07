'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SERVICE_OPTIONS = [
  'Home CCTV Installation',
  'Office / Factory Security',
  'IP / Wireless Cameras',
  'AMC & Maintenance',
];

export default function FloatingCTA() {
  const [isMobile, setIsMobile] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: 'Home CCTV Installation' });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const bottomBase = isMobile ? 78 : 26;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, position: 'fixed', right: 22, bottom: bottomBase, zIndex: 298 }}>
        <button
          onClick={() => { setQuoteOpen(true); setSubmitted(false); }}
          style={{ background: '#12151B', border: '1px solid #FF5A1F', color: '#FF5A1F', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: '11px 18px', borderRadius: 999, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.35)', whiteSpace: 'nowrap' }}
        >
          Get Free Quote
        </button>
        <a
          href="https://wa.me/917815915792"
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'ctaPulse 2.4s ease-out infinite', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M22.4 18.5c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.3 0-.5 0-.7-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.3 2.4 3.7 5.9 5.1.8.3 1.5.5 2 .7.8.3 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.7.3-.9.3-1.6.2-1.7-.1-.2-.3-.3-.7-.5zM16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.8c1.9 1 4 1.6 6 1.6 7 0 12.7-5.6 12.7-12.5C28.7 8.6 23 3 16 3zm0 22.8c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4 1 1-3.9-.2-.4a10.3 10.3 0 0 1-1.6-5.4C5.5 9.9 10.2 5.2 16 5.2S26.5 9.9 26.5 15.6 21.8 25.8 16 25.8z" fill="#0A0C10" />
          </svg>
        </a>
      </div>

      {isMobile && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 299, background: '#12151B', borderTop: '1px solid #232833', display: 'flex', gap: 1 }}>
          <a href="tel:+917815915792" style={{ flex: 1, textAlign: 'center', padding: '15px 0', color: '#F2F4F7', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, fontWeight: 600, background: '#181C24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.9 2.2z" stroke="#F2F4F7" strokeWidth="1.4" /></svg>
            Call Now
          </a>
          <a href="https://wa.me/917815915792" style={{ flex: 1, textAlign: 'center', padding: '15px 0', color: '#0A0C10', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, fontWeight: 600, background: '#25D366', textDecoration: 'none' }}>WhatsApp</a>
        </div>
      )}

      {quoteOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setQuoteOpen(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(6,7,9,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'ctaFadeIn 0.2s ease' }}
        >
          <div style={{ background: '#12151B', border: '1px solid #232833', borderRadius: 12, maxWidth: 440, width: '100%', padding: 32, fontFamily: "'IBM Plex Sans', sans-serif", position: 'relative' }}>
            <button onClick={() => setQuoteOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#6B7484', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
            {!submitted ? (
              <>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, color: '#F2F4F7', marginBottom: 6 }}>Get a Free Site Visit</div>
                <p style={{ color: '#9BA5B4', fontSize: 14, margin: '0 0 22px' }}>Share your details — we&apos;ll call you back within the hour.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '12px 14px', color: '#F2F4F7', fontSize: 14, fontFamily: 'inherit' }}
                  />
                  <input
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="Phone number"
                    style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '12px 14px', color: '#F2F4F7', fontSize: 14, fontFamily: 'inherit' }}
                  />
                  <select
                    value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '12px 14px', color: '#F2F4F7', fontSize: 14, fontFamily: 'inherit' }}
                  >
                    {SERVICE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <button
                    onClick={() => setSubmitted(true)}
                    style={{ background: '#FF5A1F', color: '#0A0C10', border: 'none', borderRadius: 6, padding: 13, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}
                  >
                    Request Callback
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 600, color: '#F2F4F7', marginBottom: 6 }}>Request received</div>
                <p style={{ color: '#9BA5B4', fontSize: 14, margin: 0 }}>Our team will call you shortly to confirm your free site visit.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
