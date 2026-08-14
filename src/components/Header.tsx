'use client';

/**
 * @file Header.tsx
 * @description Fixed global navigation header with responsive mobile drawer.
 *
 * Features:
 *   - Glassmorphism background (semi-transparent blur) that stays fixed at top
 *   - Desktop: horizontal nav links with active-page underline indicator
 *   - Mobile (≤900px): hamburger button opening a full-width slide-down drawer
 *   - Phone number link and "Get Free Quote" CTA always visible on desktop
 *   - Mobile drawer includes Call Now and Get Quote buttons for high conversion
 *
 * @param {NavKey} active - The key of the currently active page (for nav highlighting).
 *
 * ACCESSIBILITY:
 *   - <header> landmark role (implicit via element)
 *   - <nav> landmark with aria-label
 *   - Mobile menu button has aria-label and aria-expanded state
 *   - Active link has aria-current="page"
 *   - All interactive elements are keyboard-focusable
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_ITEMS, PHONE, PHONE_DISPLAY, type NavKey } from '@/lib/constants';
import { BUSINESS_NAME } from '@/lib/business';

interface HeaderProps {
  /** The nav key of the currently active page. Defaults to 'home'. */
  active?: NavKey;
}

export default function Header({ active = 'home' }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Listen to viewport width changes to toggle between desktop and mobile nav.
   * The breakpoint matches the CSS grid collapse points used across pages (900px).
   * Closing the menu on resize to desktop prevents a hidden open state.
   */
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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(9,11,15,0.86)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid #232833',
      }}
    >
      {/* ── Inner container: logo + nav ──────────────────────────────── */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
        }}
      >
        {/* ── Logo + Brand Name ─────────────────────────────────────── */}
        <Link href="/" aria-label={`${BUSINESS_NAME} — Home`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: '#F2F4F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <Image
              src="/assets/aq-logo.png"
                alt={`${BUSINESS_NAME} logo`}
              width={42}
              height={42}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              priority
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: "var(--font-space), sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F4F7' }}>
              {BUSINESS_NAME}
            </span>
            <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7484' }}>
              Security Systems &amp; Networking
            </span>
          </div>
        </Link>

        {/* ── Mobile: Hamburger Button ──────────────────────────────── */}
        {isMobile ? (
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              border: '1px solid #232833',
              background: '#12151B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 5H18M2 10H18M2 15H18" stroke="#F2F4F7" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          /* ── Desktop: Nav Links + Phone + CTA ───────────────────── */
          <>
            <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
              {NAV_ITEMS.map((page) => (
                <Link
                  key={page.key}
                  href={page.href}
                  aria-current={page.key === active ? 'page' : undefined}
                  style={{
                    fontSize: 13,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: page.key === active ? '#F2F4F7' : '#9BA5B4',
                    fontWeight: 500,
                    paddingBottom: 4,
                    borderBottom: `2px solid ${page.key === active ? '#FF5A1F' : 'transparent'}`,
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {page.label}
                </Link>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <a
                href={`tel:${PHONE}`}
                aria-label={`Call us at ${PHONE_DISPLAY}`}
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9BA5B4', fontSize: 14, whiteSpace: 'nowrap', textDecoration: 'none' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.9 2.2z"
                    stroke="#9BA5B4"
                    strokeWidth="1.4"
                  />
                </svg>
                {PHONE_DISPLAY}
              </a>
              <Link
                href="/#quote"
                style={{
                  background: '#FF5A1F',
                  color: '#0A0C10',
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '11px 22px',
                  borderRadius: 6,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
              >
                Get Free Quote
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ── Mobile: Slide-down Drawer ─────────────────────────────────── */}
      {isMobile && menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          style={{
            background: '#0A0C10',
            borderTop: '1px solid #232833',
            padding: '20px 32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_ITEMS.map((page) => (
            <Link
              key={page.key}
              href={page.href}
              aria-current={page.key === active ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 16,
                color: page.key === active ? '#F2F4F7' : '#9BA5B4',
                padding: '14px 0',
                borderBottom: '1px solid #1B1F27',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              {page.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <a
              href={`tel:${PHONE}`}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
              style={{
                flex: 1,
                textAlign: 'center',
                background: '#12151B',
                border: '1px solid #232833',
                color: '#F2F4F7',
                padding: 13,
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Call Now
            </a>
            <Link
              href="/#quote"
              onClick={() => setMenuOpen(false)}
              style={{
                flex: 1,
                textAlign: 'center',
                background: '#FF5A1F',
                color: '#0A0C10',
                padding: 13,
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Get Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
