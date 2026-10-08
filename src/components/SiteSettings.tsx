'use client';
import { createContext, useContext } from 'react';
import type { ContactSettings, MediaReplacement } from '@/lib/cms/models';
interface Settings {
  contact: ContactSettings;
  images: MediaReplacement[];
}
const Context = createContext<Settings | null>(null);
export default function SiteSettings({
  contact,
  images,
  children,
}: Settings & { children: React.ReactNode }) {
  return (
    <Context.Provider value={{ contact, images }}>{children}</Context.Provider>
  );
}
export function useSiteSettings() {
  const value = useContext(Context);
  if (!value) throw new Error('Site settings provider is missing.');
  return value;
}
export function usePublicBusiness() {
  const { contact: c } = useSiteSettings();
  return {
    PHONE: c.phone,
    PHONE_DISPLAY: c.phoneDisplay,
    EMAIL: c.email,
    HOURS: c.hours,
    WHATSAPP_URL: `https://wa.me/${c.phone.replace('+', '')}`,
  };
}
