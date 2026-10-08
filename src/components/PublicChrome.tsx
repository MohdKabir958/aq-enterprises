'use client';
import { usePathname } from 'next/navigation';
import FloatingCTA from './FloatingCTA';
import Analytics from './Analytics';
export default function PublicChrome() {
  const pathname = usePathname();
  return pathname.startsWith('/admin') ? null : (
    <>
      <FloatingCTA />
      <Analytics />
    </>
  );
}
