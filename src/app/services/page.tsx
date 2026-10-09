import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from '@/components/ManagedImage';
import Icon from '@/components/Icon';
import ServiceCard from '@/components/ServiceCard';
import { getAllServices } from '@/lib/content/getters';
import { getPublicBusiness } from '@/lib/cms/settings';
import { SECURITY_PHOTO, NETWORK_PHOTO } from '@/lib/service-visuals';
import { JsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'CCTV, Security & Internet Services in Hyderabad',
  description:
    'CCTV installation, access control, biometric attendance, commercial internet, LAN cabling and network support in Hyderabad. Based in Mallapur.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Security & Internet Services — AQ Enterprises',
    description:
      'Practical security and connectivity for Hyderabad homes and businesses.',
    images: [SECURITY_PHOTO],
  },
};

const connectivity = [
  {
    title: 'Commercial Fiber Internet',
    label: 'Connectivity',
    description:
      'Connection planning for shops and workplaces, with carrier availability and bandwidth options checked for your site.',
    image: '/images/illustrations/internet-connectivity.webp',
    alt: 'Router and optical network terminal in a modern office',
    href: '/commercial-internet-hyderabad',
    link: 'Explore internet options',
  },
  {
    title: 'LAN Cabling & Office Networks',
    label: 'Infrastructure',
    description:
      'Neat cable routes, labelled patch panels and wired or wireless coverage planned around your floor layout.',
    image: NETWORK_PHOTO,
    alt: 'Ethernet patch panel and neatly connected network cables',
    href: '/services/commercial-lan-cabling-networking',
    link: 'Explore network installation',
  },
  {
    title: 'Server Rooms & Network Racks',
    label: 'Business networks',
    description:
      'Rack layout, switches and network segmentation for CCTV, staff devices, voice and guest connectivity.',
    image: '/images/projects/office-hitech/nvr-rack.webp',
    alt: 'Network equipment racks and server infrastructure',
    href: '/commercial-internet-hyderabad',
    link: 'Discuss your infrastructure',
  },
];

export default async function ServicesPage() {
  const [services, business] = await Promise.all([
    getAllServices(),
    getPublicBusiness(),
  ]);
  const networkPublished = services.some(
    (service) => service.slug === 'commercial-lan-cabling-networking',
  );
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <Header active="services" />
      <div
        style={{ height: 'calc(76px + env(safe-area-inset-top))' }}
        aria-hidden="true"
      />
      <main>
        <JsonLd
          schema={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Security and internet services in Hyderabad',
            url: `${siteConfig.url}/services`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                ...services.map((service) => ({
                  name: service.name,
                  url: `${siteConfig.url}/services/${service.slug}`,
                })),
                {
                  name: 'Commercial internet in Hyderabad',
                  url: `${siteConfig.url}/commercial-internet-hyderabad`,
                },
              ].map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                ...item,
              })),
            },
          }}
        />
        <div className="visual-breadcrumb">
          <Breadcrumbs items={[{ name: 'Services', url: '/services' }]} />
        </div>
        <section className="services-editorial-hero visual-section">
          <div className="services-hero-copy">
            <span className="visual-eyebrow">
              Security. Access. Connectivity.
            </span>
            <h1>
              Safer spaces.
              <br />
              <span>Better connected.</span>
            </h1>
            <p>
              From a clear camera view to a dependable workplace network, we
              plan and install systems around the way you use your space.
            </p>
            <div className="services-hero-actions">
              <Link href="/site-survey" className="visual-button">
                Request a site survey <Icon name="arrow-right" size={18} />
              </Link>
              <a href="#internet-services" className="visual-text-link">
                Internet & networking <Icon name="arrow-right" size={16} />
              </a>
            </div>
            <div className="services-hero-tags">
              <span>
                <Icon name="shield" size={16} /> CCTV & security
              </span>
              <span>
                <Icon name="wifi" size={16} /> Internet & LAN
              </span>
            </div>
          </div>
          <div
            className="services-hero-photo"
            data-provenance="provisional_illustration"
          >
            <Image
              src={SECURITY_PHOTO}
              alt="Outdoor security camera overlooking a contemporary house entrance"
              fill
              sizes="(max-width: 767px) 100vw, 620px"
              preload
            />
            <span className="services-hero-location">
              <Icon name="pin" size={15} /> {business.ADDRESS.city}
            </span>
            <div className="services-hero-photo-caption">
              <span>Start with a site survey</span>
              <strong>A clear plan. A cleaner install.</strong>
            </div>
          </div>
        </section>
        <section
          className="visual-section"
          aria-labelledby="security-services-heading"
        >
          <div className="visual-section-heading">
            <div>
              <span className="visual-eyebrow">Designed for your property</span>
              <h2 id="security-services-heading">
                Find the right service for your space.
              </h2>
              <p>
                Explore installations, upgrades and support for homes,
                workplaces and institutions.
              </p>
            </div>
          </div>
          <div className="service-photo-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>
        <section
          className="visual-section"
          id="internet-services"
          aria-labelledby="internet-services-heading"
        >
          <div className="visual-section-heading">
            <div>
              <span className="visual-eyebrow">
                Keep your business connected
              </span>
              <h2 id="internet-services-heading">
                Internet & networking services
              </h2>
              <p>
                Plan the connection, the cabling and the equipment together.
              </p>
            </div>
            <Link
              href="/commercial-internet-hyderabad"
              className="visual-text-link"
            >
              View internet plans <Icon name="arrow-up-right" size={18} />
            </Link>
          </div>
          <div className="connectivity-grid">
            {connectivity
              .filter(
                (item) =>
                  networkPublished ||
                  item.href !== '/services/commercial-lan-cabling-networking',
              )
              .map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="service-photo-card"
                >
                  <div
                    className="service-photo-card-image"
                    data-provenance="provisional_illustration"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 400px"
                    />
                    <span className="service-photo-category">{item.label}</span>
                  </div>
                  <div className="service-photo-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="service-photo-card-link">
                      {item.link}
                      <Icon name="arrow-up-right" size={18} />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
          <p className="visual-image-note">
            Images illustrate service applications. Connection availability,
            bandwidth and provider terms are confirmed after a survey.
          </p>
        </section>
        <section className="visual-section">
          <div className="services-survey-banner">
            <div>
              <span className="visual-eyebrow">Let’s start with your site</span>
              <h2>Not sure where to begin?</h2>
              <p>
                Tell us about your property. We’ll help you plan the next step.
              </p>
            </div>
            <Link href="/site-survey" className="visual-button">
              Request a site survey <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
