import { getAllServices } from '@/lib/content/getters';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import Icon from '@/components/Icon';

export default async function ServicesSummarySection() {
  const services = await getAllServices();
  return (
    <section id="services" className="visual-section">
      <div className="visual-section-heading">
        <div>
          <span className="visual-eyebrow">What we do</span>
          <h2>Security systems for every property type</h2>
          <p>Thoughtful coverage. Clean installation. A system that fits your space.</p>
        </div>
        <Link href="/services" className="visual-text-link">View all services <Icon name="arrow-up-right" size={18} /></Link>
      </div>
      <div className="service-photo-grid">
        {services.map(service => <ServiceCard key={service.slug} service={service} />)}
      </div>
      <p className="visual-image-note">Images illustrate service applications.</p>
    </section>
  );
}
