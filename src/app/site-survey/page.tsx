import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ShopShell from '@/components/shop/ShopShell';
export const metadata: Metadata = {
  title: 'Request a Site Survey in Hyderabad',
  description: 'Request a CCTV, networking or access-control site survey in Hyderabad. Share your locality and preferred visit time; AQ Enterprises will confirm your appointment.',
  alternates: { canonical: '/site-survey' },
  openGraph: { title: 'Request a Site Survey in Hyderabad', url: '/site-survey', description: 'Plan your CCTV, networking or access-control installation with AQ Enterprises.' },
};
export default function SiteSurveyPage() {
  return <ShopShell title="Request a site survey" description="Tell us about your Hyderabad property and choose a preferred visit time. Our team will call to confirm the appointment.">
    <div className="shop-card survey-form"><ContactForm survey /></div>
  </ShopShell>;
}
