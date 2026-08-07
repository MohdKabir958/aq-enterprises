'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  active?: 'home' | 'about' | 'services' | 'projects' | 'contact';
}

const pages = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'services', label: 'Services', href: '/services' },
  { key: 'projects', label: 'Projects', href: '/projects' },
  { key: 'contact', label: 'Contact', href: '/#contact' },
];

export default function Header({ active = 'home' }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(9,11,15,0.86)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #232833', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, background: '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            <Image src="/assets/aq-logo.png" alt="AQ Enterprises" width={42} height={42} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F4F7' }}>AQ Enterprises</span>
            <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7484' }}>Security Systems &amp; Networking</span>
          </div>
        </Link>

        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{ width: 42, height: 42, borderRadius: 8, border: '1px solid #232833', background: '#12151B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5H18M2 10H18M2 15H18" stroke="#F2F4F7" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        ) : (
          <>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
              {pages.map(p => (
                <Link
                  key={p.key}
                  href={p.href}
                  style={{ fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: p.key === active ? '#F2F4F7' : '#9BA5B4', fontWeight: 500, paddingBottom: 4, borderBottom: `2px solid ${p.key === active ? '#FF5A1F' : 'transparent'}`, textDecoration: 'none' }}
                >
                  {p.label}
                </Link>
              ))}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <a href="tel:+917815915792" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9BA5B4', fontSize: 14, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.9 2.2z" stroke="#9BA5B4" strokeWidth="1.4" /></svg>
                +91 78159 15792
              </a>
              <Link href="/#quote" style={{ background: '#FF5A1F', color: '#0A0C10', fontWeight: 600, fontSize: 13, padding: '11px 22px', borderRadius: 6, letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none' }}>Get Free Quote</Link>
            </div>
          </>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ background: '#0A0C10', borderTop: '1px solid #232833', padding: '20px 32px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {pages.map(p => (
            <Link key={p.key} href={p.href} style={{ fontSize: 16, color: p.key === active ? '#F2F4F7' : '#9BA5B4', padding: '14px 0', borderBottom: '1px solid #1B1F27', textDecoration: 'none' }}>
              {p.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <a href="tel:+917815915792" style={{ flex: 1, textAlign: 'center', background: '#12151B', border: '1px solid #232833', color: '#F2F4F7', padding: 13, borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Call Now</a>
            <Link href="/#quote" style={{ flex: 1, textAlign: 'center', background: '#FF5A1F', color: '#0A0C10', padding: 13, borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Get Quote</Link>
          </div>
        </div>
      )}
    </header>
  );
}
