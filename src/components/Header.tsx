'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from '@/components/ManagedImage';
import Icon from '@/components/Icon';
import { usePublicBusiness } from '@/components/SiteSettings';
import { NAV_ITEMS, type NavKey } from '@/lib/constants';
import { BUSINESS_NAME } from '@/lib/business';
import { LOGO_SRC } from '@/lib/assets';

export default function Header({ active }: { active?: NavKey }) {
  const { PHONE, PHONE_DISPLAY } = usePublicBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="header-brand"
          href="/"
          aria-label={`${BUSINESS_NAME} — Home`}
        >
          <span className="header-logo">
            <Image
              src={LOGO_SRC}
              alt={`${BUSINESS_NAME} logo`}
              width={42}
              height={42}
              preload
            />
          </span>
          <span className="header-brand-copy">
            <span className="header-brand-name">{BUSINESS_NAME}</span>
            <span className="header-brand-subtitle">
              Security systems & networking
            </span>
          </span>
        </Link>

        <nav className="header-desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((page) => (
            <Link
              key={page.key}
              href={page.href}
              aria-current={page.key === active ? 'page' : undefined}
            >
              {page.label}
            </Link>
          ))}
        </nav>

        <div className="header-desktop-actions">
          <a
            className="header-phone"
            href={`tel:${PHONE}`}
            aria-label={`Call us at ${PHONE_DISPLAY}`}
          >
            <Icon name="phone" size={17} />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <Link className="header-quote-button" href="/#quote">
            Get Free Quote <Icon name="arrow-up-right" size={16} />
          </Link>
        </div>

        <button
          ref={menuButton}
          className="header-mobile-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={21} />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="header-mobile-drawer"
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
        >
          <div className="header-mobile-links">
            {NAV_ITEMS.map((page) => (
              <Link
                key={page.key}
                href={page.href}
                aria-current={page.key === active ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {page.label}
                <Icon name="arrow-up-right" size={16} />
              </Link>
            ))}
          </div>
          <div className="header-mobile-contact">
            <a
              className="header-call-button"
              href={`tel:${PHONE}`}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
            >
              <Icon name="phone" size={17} /> Call Now
            </a>
            <Link
              className="header-quote-button"
              href="/#quote"
              onClick={() => setMenuOpen(false)}
            >
              Get Quote <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
