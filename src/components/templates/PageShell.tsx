/**
 * Shared chrome for content templates — matches existing page shell conventions.
 */

import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { BreadcrumbItem } from '@/types';
import type { NavKey } from '@/lib/constants';

interface PageShellProps {
  active?: NavKey;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export default function PageShell({ active = 'home', breadcrumbs, children }: PageShellProps) {
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#F2F4F7' }}>
      <Header active={active} />
      <div style={{ height: 74 }} aria-hidden="true" />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 80px' }}>
        <Breadcrumbs items={breadcrumbs} />
        {children}
      </main>
      <Footer />
    </div>
  );
}
