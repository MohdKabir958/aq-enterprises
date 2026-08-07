'use client';

import { useState } from 'react';

const FAQS = [
  { q: 'How much does CCTV installation cost?', a: 'Costs depend on camera count, resolution and site complexity. Most homes start around ₹12,000 for a 4-camera setup — we confirm an exact, fixed quote after a free site visit.' },
  { q: 'Which camera brand is best for me?', a: "It depends on your budget and use case. We're authorized dealers for Hikvision, CP Plus, Dahua, Uniview and more, and recommend the right fit during your free assessment." },
  { q: 'Do cameras work without internet?', a: 'Yes. Recording to a local DVR/NVR works fully offline — internet is only needed if you want to view footage remotely on your phone.' },
  { q: 'How many days does installation take?', a: 'Most homes and small offices: 1-2 days. Factories and multi-site rollouts typically take 5-10 days depending on scale.' },
  { q: 'Is warranty included?', a: 'Yes — all hardware carries manufacturer warranty (1-3 years) plus our own installation workmanship guarantee.' },
  { q: 'How many cameras do I actually need?', a: 'A good rule of thumb is every entry point plus key open areas. We calculate exact coverage for free during the site visit.' },
  { q: 'Do you offer AMC (maintenance) plans?', a: 'Yes — quarterly and annual AMC plans cover lens cleaning, firmware updates, and priority repair visits.' },
  { q: 'Can I view cameras remotely on my phone?', a: 'Yes, every installation includes mobile app setup for live viewing and playback from anywhere.' },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number>(-1);

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 88px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FAQ</span>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,38px)', color: '#F2F4F7', margin: '10px 0 0' }}>Common questions</h2>
      </div>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid #1B1F27' }}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 500 }}>{faq.q}</span>
            <span style={{ color: '#6B7484', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>{openIdx === i ? '−' : '+'}</span>
          </button>
          {openIdx === i && (
            <p style={{ color: '#9BA5B4', fontSize: 14, lineHeight: 1.7, margin: '0 0 22px', padding: '0 4px' }}>{faq.a}</p>
          )}
        </div>
      ))}
    </section>
  );
}
