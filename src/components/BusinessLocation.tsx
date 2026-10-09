import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import LocationMap from '@/components/LocationMap';
import { getContact, getPublicBusiness } from '@/lib/cms/settings';

export default async function BusinessLocation() {
  const [contact, business] = await Promise.all([
    getContact(),
    getPublicBusiness(),
  ]);
  const area = contact.line1.split(',')[0].trim();
  const rows: {
    icon: IconName;
    label: string;
    value: string;
    href?: string;
  }[] = [
    { icon: 'pin', label: 'Visit our base', value: business.ADDRESS.full },
    { icon: 'clock', label: 'Opening hours', value: contact.hours },
    {
      icon: 'phone',
      label: 'Call our team',
      value: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
    },
    {
      icon: 'mail',
      label: 'Email us',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];
  return (
    <section className="visual-section" aria-labelledby="nap-heading">
      <div className="visual-section-heading">
        <div>
          <span className="visual-eyebrow">Local team. Easy to reach.</span>
          <h2 id="nap-heading">How to reach us</h2>
          <p>
            Based in {area}. Installing and supporting systems across{' '}
            {contact.city}.
          </p>
        </div>
      </div>
      <div className="location-panel">
        <div className="location-details">
          <span className="location-label">
            <span /> Our physical base
          </span>
          <h3>Let’s plan your next installation.</h3>
          <p>
            Call or message us with your requirements. Speak to our team before
            visiting.
          </p>
          <address>
            {rows.map((row) => (
              <div className="location-contact-row" key={row.label}>
                <span className="location-contact-icon">
                  <Icon name={row.icon} size={19} />
                </span>
                <div>
                  <span>{row.label}</span>
                  {row.href ? (
                    <a href={row.href}>{row.value}</a>
                  ) : (
                    <p>{row.value}</p>
                  )}
                </div>
              </div>
            ))}
          </address>
          <div className="location-actions">
            <a
              className="visual-button"
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions <Icon name="arrow-up-right" size={17} />
            </a>
            <a
              className="visual-button visual-button-secondary"
              href={business.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp our team <Icon name="arrow-right" size={17} />
            </a>
          </div>
        </div>
        <LocationMap
          area={area}
          city={contact.city}
          address={business.ADDRESS.full}
          directions={contact.mapsUrl}
        />
      </div>
      <div className="location-footnote">
        <span>One physical base. Service coverage across the city.</span>
        <Link href="/locations">
          Explore service areas <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </section>
  );
}
