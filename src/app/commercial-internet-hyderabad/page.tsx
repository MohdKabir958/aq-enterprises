import { getPlans } from '@/lib/cms/catalogue';
import { getPublicBusiness } from '@/lib/cms/settings';
/**
 * @file page.tsx (Commercial Internet, LAN Cabling & Server Room Solutions)
 * @description Enterprise page showcasing AQ Enterprises' commercial fiber internet,
 * structured cabling, server room deployment, and scheduled support across Hyderabad.
 */

import type { Metadata } from 'next';
import Image from '@/components/ManagedImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd, generateLocalBusinessSchema } from '@/lib/json-ld';
import { siteConfig } from '@/lib/config';



export const metadata: Metadata = {
  title: 'Commercial Internet & Leased Line Hyderabad | LAN Cabling & Server Rooms — AQ Enterprises',
  description:
    'Commercial internet planning, Cat6/Cat6A structured LAN cabling, server room setup and scheduled network support in Hyderabad. Request a site survey and quotation.',
  alternates: {
    canonical: '/commercial-internet-hyderabad',
  },
  keywords: [
    'commercial internet Hyderabad',
    'commercial internet services Hyderabad',
    'enterprise leased line Hyderabad',
    'commercial LAN cabling Hyderabad',
    'server room setup Hyderabad',
    'retail commercial broadband Hyderabad',
    'structured cabling IT corridor Hyderabad',
    'dedicated internet leased line Hyderabad',
    'commercial network support Hyderabad',
  ],
};



const networkCapabilities = [
  {
    value: 'Internet',
    label: 'Connection Planning',
    detail: 'Availability, bandwidth and carrier terms confirmed after a survey',
  },
  {
    value: 'Diagnostics',
    label: 'Network Checks',
    detail: 'Review latency, link health and hardware during service visits',
  },
  {
    value: 'Cabling',
    label: 'Structured LAN',
    detail: 'Plan cable routes, terminations and labelled network ports',
  },
  {
    value: 'Coverage',
    label: 'Office Connectivity',
    detail: 'Size wired and wireless coverage for your devices and floor plan',
  },
  {
    value: 'Maintenance',
    label: 'Scheduled Support',
    detail: 'Agree inspection frequency and support scope in your quotation',
  },
  {
    value: 'Mallapur',
    label: 'Hyderabad Service Base',
    detail: 'Arrange surveys and service visits from our Mallapur location',
  },
];

const solutions = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="#3fa9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Commercial & Retail Fiber Internet',
    desc: 'Commercial internet planning for retail stores, showrooms and office floors. We assess POS billing, cloud applications and CCTV needs before recommending an available connection.',
    features: [
      'Bandwidth options confirmed with the available provider',
      'Static IP requirements discussed for servers and remote access',
      'Backup connection and failover planning where appropriate',
      'Connection sizing for cloud applications and business devices',
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" stroke="#3fa9f5" strokeWidth="1.8"/>
        <rect x="2" y="14" width="20" height="8" rx="2" stroke="#3fa9f5" strokeWidth="1.8"/>
        <line x1="6" y1="6" x2="6.01" y2="6" stroke="#3fa9f5" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="18" x2="6.01" y2="18" stroke="#3fa9f5" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Commercial LAN & Structured Cabling',
    desc: 'Copper and fiber cabling infrastructure for office floors, industrial sheds and multi-story buildings, with planned pathways, patch panels and clear channel labels.',
    features: [
      'Cat6 / Cat6A Gigabit structured cabling & terminations',
      'Single-Mode & Multi-Mode fiber backbone links between blocks',
      'Cable tray routing, raceways, and ceiling conduit drops',
      'Link checks and labelled port documentation; testing scope agreed in advance',
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="#3fa9f5" strokeWidth="1.8"/>
        <line x1="8" y1="6" x2="16" y2="6" stroke="#3fa9f5" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="10" x2="16" y2="10" stroke="#3fa9f5" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="14" x2="16" y2="14" stroke="#3fa9f5" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="18" x2="12" y2="18" stroke="#3fa9f5" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Server Room & Data Rack Setup',
    desc: 'Turnkey deployment of server rooms, IDF/MDF telecom closets, and secure equipment racks. Designed for maximum airflow, organized cable dressing, and reliable power distribution for switches, firewalls, and servers.',
    features: [
      '24U / 42U floor-standing and wall-mount server rack installation',
      'Managed PoE+ switches & core router deployments',
      'Clean network segmentation: CCTV VLANs, VoIP, Staff & Guest Wi-Fi',
      'Rack-mount Online UPS integration & intelligent PDU power strips',
    ],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#3fa9f5" strokeWidth="1.8"/>
        <polyline points="12 6 12 12 16 14" stroke="#3fa9f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Proactive Maintenance & Scheduled Network Support',
    desc: 'Preventive monitoring and rapid troubleshooting for your commercial links and infrastructure. Our network team verifies packet transmission, latency, and hardware health during scheduled AMC checks and service visits.',
    features: [
      'Active link health & port status diagnostics',
      'Dedicated technician dispatch from our Mallapur base',
      'Direct escalation helpline & WhatsApp support',
      'Scheduled preventive maintenance & quarterly port auditing',
    ],
  },
];

export default async function CommercialInternetPage() {
  const tiers = await getPlans();
  const { PHONE, PHONE_DISPLAY, WHATSAPP_URL, EMAIL, ADDRESS, mapsLocationUrl } = await getPublicBusiness();
  const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Internet, Leased Lines, LAN Cabling & Server Room Setup Hyderabad',
  url: `${siteConfig.url}/commercial-internet-hyderabad`,
  provider: {
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: PHONE,
    email: EMAIL,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.line1} ${ADDRESS.line2}`,
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: ADDRESS.pincode,
      addressCountry: 'IN',
    },
  },
  areaServed: {
    '@type': 'City',
    name: 'Hyderabad',
  },
  serviceType: 'Commercial Internet, Structured LAN Cabling & Enterprise IT Infrastructure',
  description:
    'Commercial internet planning, Cat6/Cat6A structured cabling, server room deployment and scheduled network support in Hyderabad. Provider availability and service terms are confirmed after a survey.',
};
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={(await generateLocalBusinessSchema())} />
      <Header active="internet" />
      <div style={{ height: 'calc(76px + env(safe-area-inset-top))' }} aria-hidden="true" />

      <main>
        {/* ── Hero Section ──────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '56px var(--page-gutter) 40px',
            position: 'relative',
          }}
        >
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: 'Commercial Internet & Networking', url: '/commercial-internet-hyderabad' },
            ]}
          />

          <div style={{ marginTop: 32, maxWidth: 860 }}>
            <span
              style={{
                display: 'inline-block',
                color: '#3fa9f5',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Commercial Internet · LAN Cabling · Server Rooms
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(32px,4.5vw,56px)',
                lineHeight: 1.1,
                color: '#F2F4F7',
                margin: '0 0 20px',
                letterSpacing: '-0.01em',
              }}
            >
              High-Speed Commercial Fiber, Structured LAN &amp; Server Room Infrastructure
            </h1>
            <p
              style={{
                color: '#9BA5B4',
                fontSize: 18,
                lineHeight: 1.65,
                margin: '0 0 32px',
                maxWidth: 720,
              }}
            >
              AQ Enterprises engineers enterprise-grade digital infrastructure across Hyderabad:
              commercial internet planning, Cat6/Cat6A cabling, server room setup,
              and scheduled on-site network support from our Mallapur base.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
              <a
                href="#commercial-survey"
                style={{
                  background: '#FF5A1F',
                  color: '#0A0C10',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '15px 28px',
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                Request Commercial Survey →
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#12151B',
                  border: '1px solid #232833',
                  color: '#F2F4F7',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '15px 26px',
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                WhatsApp Business Team
              </a>
              <a
                href={`tel:${PHONE}`}
                style={{
                  color: '#9BA5B4',
                  fontSize: 15,
                  fontWeight: 600,
                  padding: '15px 20px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                📞 {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Hero Banner Showcase Image */}
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #1B1F27',
              background: '#12151B',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              maxHeight: 460,
              position: 'relative',
            }}
          >
            <Image
              src="/images/services/commercial-lan-cabling-networking.webp"
              alt="AQ Enterprises commercial server room and high-speed enterprise network rack setup in Hyderabad"
              width={1280}
              height={460}
              priority
              style={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </section>

        {/* ── Network planning and support ────────────────────────────── */}
        <section
          aria-label="Business network planning and support"
          style={{
            background: '#0d0f13',
            borderTop: '1px solid #1B1F27',
            borderBottom: '1px solid #1B1F27',
            padding: '56px var(--page-gutter)',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                textAlign: 'center',
                color: '#6B7484',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 32,
              }}
            >
              Business Network Planning &amp; Support
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                gap: 24,
              }}
            >
              {networkCapabilities.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: '#12151B',
                    border: '1px solid #1B1F27',
                    borderRadius: 12,
                    padding: '24px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-space), sans-serif',
                      fontSize: 'clamp(26px,3vw,34px)',
                      fontWeight: 700,
                      color: '#3fa9f5',
                      lineHeight: 1.1,
                      marginBottom: 6,
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      color: '#F2F4F7',
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </div>
                  <div style={{ color: '#6B7484', fontSize: 12, lineHeight: 1.4 }}>
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Solutions Grid ──────────────────────────────────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '88px var(--page-gutter)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span
              style={{
                color: '#3fa9f5',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              What We Deliver
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(26px,3.2vw,40px)',
                color: '#F2F4F7',
                margin: '10px 0 12px',
              }}
            >
              Complete Commercial Networking &amp; Connectivity
            </h2>
            <p style={{ color: '#9BA5B4', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
              From external high-speed fiber drops to the patch cords on your workstations, we handle
              the full technical lifecycle.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 28,
            }}
          >
            {solutions.map((sol) => (
              <div
                key={sol.title}
                style={{
                  background: '#12151B',
                  border: '1px solid #1B1F27',
                  borderRadius: 14,
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    background: 'rgba(63,169,245,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  aria-hidden="true"
                >
                  {sol.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#F2F4F7',
                    margin: '0 0 10px',
                  }}
                >
                  {sol.title}
                </h3>
                <p style={{ color: '#9BA5B4', fontSize: 14, lineHeight: 1.65, margin: '0 0 20px', flex: 1 }}>
                  {sol.desc}
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    borderTop: '1px solid #1B1F27',
                    paddingTop: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {sol.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        color: '#C5CCD8',
                        fontSize: 13,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ color: '#3fa9f5', fontSize: 14 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bandwidth & Solution Packages ─────────────────────────────── */}
        <section
          style={{
            background: '#0d0f13',
            borderTop: '1px solid #1B1F27',
            borderBottom: '1px solid #1B1F27',
            padding: '88px var(--page-gutter)',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span
                style={{
                  color: '#3fa9f5',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Commercial Packages
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 'clamp(26px,3.2vw,40px)',
                  color: '#F2F4F7',
                  margin: '10px 0 12px',
                }}
              >
                Tailored for Retail, Offices &amp; Tech Parks
              </h2>
              <p style={{ color: '#9BA5B4', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
                Scalable bandwidth and networking designed around your team size and operational demands.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 28,
                alignItems: 'stretch',
              }}
            >
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: '#12151B',
                    border: `1px solid ${tier.featured ? '#3fa9f5' : '#1B1F27'}`,
                    borderRadius: 16,
                    padding: '36px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: tier.featured ? '0 8px 32px rgba(63,169,245,0.15)' : 'none',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 20,
                      background: tier.featured ? '#3fa9f5' : 'rgba(255,255,255,0.06)',
                      color: tier.featured ? '#0A0C10' : '#9BA5B4',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: 999,
                    }}
                  >
                    {tier.tag}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-space), sans-serif',
                      fontSize: 22,
                      fontWeight: 600,
                      color: '#F2F4F7',
                      margin: '0 0 4px',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                    {tier.subtitle}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-space), sans-serif',
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#F2F4F7',
                      marginBottom: 10,
                    }}
                  >
                    {tier.speed}
                  </div>

                  <p style={{ color: '#9BA5B4', fontSize: 14, lineHeight: 1.5, margin: '0 0 24px' }}>
                    {tier.desc}
                  </p>

                  <p>{tier.price === null ? 'Request a quotation' : `₹${tier.price.toLocaleString('en-IN')}`} · {tier.billing}</p>
                  <ul
                    style={{
                      margin: '0 0 28px',
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      flex: 1,
                      borderTop: '1px solid #1B1F27',
                      paddingTop: 20,
                    }}
                  >
                    {tier.highlights.map((h) => (
                      <li
                        key={h}
                        style={{
                          color: '#C5CCD8',
                          fontSize: 13,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <span style={{ color: '#3fa9f5', fontSize: 14 }}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#commercial-survey"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: tier.featured ? '#FF5A1F' : '#1B1F27',
                      color: tier.featured ? '#0A0C10' : '#F2F4F7',
                      fontWeight: 600,
                      fontSize: 14,
                      padding: '13px 20px',
                      borderRadius: 8,
                      textDecoration: 'none',
                    }}
                  >
                    Get Custom Quotation →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Visual Gallery / Deployment Showcase ────────────────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '88px var(--page-gutter)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                color: '#3fa9f5',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Enterprise Deployments
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(26px,3vw,38px)',
                color: '#F2F4F7',
                margin: '10px 0 0',
              }}
            >
              Real Server Racks &amp; Structured Networks
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                src: '/images/company/cctv-control-room.webp',
                title: 'Data Rack & Server Room Deployment',
                desc: '24U/42U equipment enclosures with clean cable dressing & ventilation.',
              },
              {
                src: '/images/projects/office-hitech/nvr-rack.webp',
                title: 'PoE Managed Switches & Core Routing',
                desc: 'High-density Gigabit switches configured with dedicated security VLANs.',
              },
              {
                src: '/images/services/commercial-lan-cabling-networking.webp',
                title: 'Cat6A Structured LAN Drops',
                desc: 'Organized patch panel terminations with end-to-end port numbering.',
              },
              {
                src: '/images/company/cctv-field-team.webp',
                title: 'On-Site Technical Handover & Fluke Testing',
                desc: 'Certified testing of all data nodes before go-live handover.',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#12151B',
                  border: '1px solid #1B1F27',
                  borderRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '18px 20px', flex: 1 }}>
                  <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#8892A0', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Interactive Contact / Commercial Survey Section ─────────── */}
        <section
          id="commercial-survey"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 var(--page-gutter) 96px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 32,
              background: '#12151B',
              border: '1px solid #1B1F27',
              borderRadius: 16,
              overflow: 'hidden',
            }}
            className="grid-split grid-split-form"
          >
            {/* Form side */}
            <div style={{ padding: 'clamp(28px,4vw,48px)' }}>
              <span
                style={{
                  color: '#3fa9f5',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Commercial Site Feasibility
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 'clamp(22px,2.4vw,32px)',
                  color: '#F2F4F7',
                  margin: '10px 0 10px',
                }}
              >
                Schedule an On-Site Network Survey
              </h2>
              <p style={{ color: '#9AA3B2', fontSize: 14, lineHeight: 1.6, margin: '0 0 28px' }}>
                Tell us your commercial property location and networking requirements. Our enterprise
                network engineers will visit your site, assess duct paths and server room locations, and provide a full technical quote.
              </p>
              <ContactForm />
            </div>

            {/* Direct Contact Info */}
            <div
              style={{
                background: '#0d0f13',
                padding: 'clamp(28px,4vw,48px)',
                borderLeft: '1px solid #1B1F27',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <div>
                <h3
                  style={{
                    color: '#F2F4F7',
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 16px',
                  }}
                >
                  Commercial Enquiries &amp; Support
                </h3>
                <p style={{ color: '#8892A0', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
                  Prefer to speak with our network engineers right away? Reach us via phone, WhatsApp, or email.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <a
                    href={`tel:${PHONE}`}
                    style={{
                      color: '#F2F4F7',
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{ color: '#3fa9f5', fontSize: 18 }}>📞</span>
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#F2F4F7',
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{ color: '#25D366', fontSize: 18 }}>💬</span>
                    Chat with Enterprise Team on WhatsApp
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    style={{
                      color: '#F2F4F7',
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{ color: '#3fa9f5', fontSize: 18 }}>✉️</span>
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid #1B1F27',
                  paddingTop: 20,
                  color: '#6B7484',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                <div style={{ color: '#9AA3B2', fontWeight: 600, marginBottom: 4 }}>
                  Central Engineering Operations:
                </div>
                {ADDRESS.full}
                <div style={{ marginTop: 6 }}>
                  <a
                    href={mapsLocationUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#3fa9f5', textDecoration: 'none', fontWeight: 600 }}
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ──────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 var(--page-gutter) 96px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                color: '#3fa9f5',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Enterprise FAQ
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(24px,2.8vw,36px)',
                color: '#F2F4F7',
                margin: '10px 0 0',
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                q: 'What is 1:1 symmetrical bandwidth and why does my business need it?',
                a: 'Traditional consumer broadband provides fast download speeds but severely restricted upload speeds (often sharing bandwidth with dozens of neighbors). Symmetrical 1:1 bandwidth gives your business equal upload and download speeds with dedicated unshared capacity — essential for cloud backups, video conferences, CCTV remote streams, and multi-user ERP systems.',
              },
              {
                q: 'How does AQ Enterprises handle server room & rack setup?',
                a: 'We design and install the full physical and logical server room setup: 24U/42U equipment racks, structured cable pathways, patch panel termination, managed PoE switches, core routers, firewall placement, online UPS integration, and network segmentation (separating CCTV VLANs, VoIP, and staff data).',
              },
              {
                q: 'What is included with network maintenance & support?',
                a: 'We monitor link latency, packet transmission, and switch port health during setup and AMC checkups. If a disruption occurs, our engineering team assists with remote diagnostics, carrier coordination, and prompt on-site dispatch from our Mallapur base.',
              },
              {
                q: 'Can you install structured LAN cabling across multiple floors or buildings?',
                a: 'Yes. We deploy horizontal Cat6/Cat6A cabling within floors and single-mode or multi-mode fiber optic backbone backhauls between floors, sheds, or distinct buildings across your commercial campus.',
              },
              {
                q: 'Which areas in Hyderabad do you cover for commercial networking?',
                a: 'We cover all major commercial, IT, and industrial corridors across Hyderabad including HITEC City, Gachibowli, Madhapur, Financial District, Kondapur, Begumpet, Ameerpet, Secunderabad, Nacharam, Uppal, and Cherlapally.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                style={{
                  background: '#12151B',
                  border: '1px solid #1B1F27',
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: 2,
                }}
              >
                <summary
                  style={{
                    padding: '18px 24px',
                    cursor: 'pointer',
                    color: '#F2F4F7',
                    fontWeight: 600,
                    fontSize: 15,
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M6 9l6 6 6-6" stroke="#6B7484" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div style={{ padding: '0 24px 20px', color: '#9AA3B2', fontSize: 14, lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
