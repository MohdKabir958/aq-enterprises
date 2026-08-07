'use client';

import { useState } from 'react';

const PROJECTS = [
  { imgId: 'p-villa', placeholder: 'Residential villa install', category: 'Home', name: 'Residential Villa, Whitefield', location: 'Bengaluru', cameras: 8, brand: 'Hikvision', duration: '2 Days' },
  { imgId: 'p-factory', placeholder: 'Factory surveillance install', category: 'Industrial', name: 'Textile Factory, Peenya', location: 'Bengaluru', cameras: 32, brand: 'Dahua', duration: '6 Days' },
  { imgId: 'p-retail', placeholder: 'Retail chain install', category: 'Office', name: 'Retail Chain, 6 Outlets', location: 'Multi-city', cameras: 48, brand: 'CP Plus', duration: '9 Days' },
  { imgId: 'p-apartment', placeholder: 'Apartment complex install', category: 'Home', name: 'Lakeview Apartments', location: 'Bengaluru', cameras: 22, brand: 'Uniview', duration: '4 Days' },
  { imgId: 'p-school', placeholder: 'School campus install', category: 'Industrial', name: 'Greenfield Public School', location: 'Mysuru', cameras: 40, brand: 'Hikvision', duration: '7 Days' },
  { imgId: 'p-office', placeholder: 'Corporate office install', category: 'Office', name: 'Tech Park Office Tower', location: 'Bengaluru', cameras: 60, brand: 'Bosch', duration: '10 Days' },
  { imgId: 'p-warehouse', placeholder: 'Warehouse install', category: 'Industrial', name: 'Cold Storage Warehouse', location: 'Hosur', cameras: 28, brand: 'Dahua', duration: '5 Days' },
  { imgId: 'p-hospital', placeholder: 'Hospital install', category: 'Office', name: 'City Care Hospital', location: 'Bengaluru', cameras: 35, brand: 'Honeywell', duration: '6 Days' },
];

const CATS = ['All', 'Home', 'Office', 'Industrial'];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 16px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{ background: filter === c ? '#FF5A1F' : '#12151B', color: filter === c ? '#0A0C10' : '#9BA5B4', border: `1px solid ${filter === c ? '#FF5A1F' : '#232833'}`, fontSize: 13, fontWeight: 600, padding: '10px 18px', borderRadius: 999, cursor: 'pointer', fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            {c}
          </button>
        ))}
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 96px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {visible.map(p => (
          <div key={p.imgId} style={{ background: '#12151B', border: '1px solid #1B1F27', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg,#1B1F27,#12151B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#4B5261', fontSize: 13 }}>{p.placeholder}</span>
            </div>
            <div style={{ padding: 22 }}>
              <span style={{ color: '#3fa9f5', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.category}</span>
              <div style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '8px 0 4px' }}>{p.name}</div>
              <div style={{ color: '#6B7484', fontSize: 13, marginBottom: 14 }}>{p.location}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1B1F27', paddingTop: 14, color: '#9BA5B4', fontSize: 12 }}>
                <span>{p.cameras} Cameras</span>
                <span>{p.brand}</span>
                <span>{p.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
