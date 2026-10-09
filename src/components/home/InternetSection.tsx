import Link from 'next/link';
import Image from '@/components/ManagedImage';
import Icon from '@/components/Icon';
import { getPlans } from '@/lib/cms/catalogue';
import { getPublicBusiness } from '@/lib/cms/settings';

const capabilities = [
  {
    icon: 'globe' as const,
    name: 'Business internet',
    detail: 'Choose a connection around your daily needs.',
  },
  {
    icon: 'wifi' as const,
    name: 'Wi-Fi & LAN cabling',
    detail: 'Plan coverage for your people and devices.',
  },
  {
    icon: 'grid' as const,
    name: 'Racks & network setup',
    detail: 'Keep equipment and cable routes organised.',
  },
];

export default async function InternetSection() {
  const [plans, business] = await Promise.all([
    getPlans(),
    getPublicBusiness(),
  ]);
  return (
    <section
      id="internet"
      className="visual-section home-internet-section"
      aria-labelledby="home-internet-heading"
    >
      <div className="home-internet-panel">
        <div
          className="home-internet-photo"
          data-provenance="provisional_illustration"
        >
          <Image
            src="/images/illustrations/internet-connectivity.webp"
            alt="Wi-Fi router and optical network terminal in a workplace"
            fill
            sizes="(max-width: 767px) 100vw, 560px"
          />
          <span className="home-internet-location">
            <Icon name="pin" size={15} /> {business.ADDRESS.city}
          </span>
          <div className="home-internet-photo-caption">
            <span>
              <Icon name="wifi" size={18} /> More than cameras
            </span>
            <strong>Connect your whole workspace.</strong>
          </div>
        </div>
        <div className="home-internet-copy">
          <span className="visual-eyebrow">Internet & networking</span>
          <h2 id="home-internet-heading">
            Your security.
            <br />
            <span>Your connectivity.</span>
            <br />
            One local team.
          </h2>
          <p>
            From business internet to Wi-Fi coverage and neat LAN cabling, we
            help connect your team, devices and CCTV across{' '}
            {business.ADDRESS.city}.
          </p>
          <div className="home-internet-capabilities">
            {capabilities.map((item) => (
              <div key={item.name}>
                <span>
                  <Icon name={item.icon} size={19} />
                </span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="home-internet-actions">
            <Link
              className="visual-button home-internet-primary"
              href="/commercial-internet-hyderabad"
            >
              {plans.length
                ? 'Explore internet plans'
                : 'Explore internet services'}
              <Icon name="arrow-right" size={18} />
            </Link>
            <Link
              className="visual-text-link"
              href="/commercial-internet-hyderabad#commercial-survey"
            >
              Request a network survey <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>
          <p className="home-internet-note">
            Provider availability, bandwidth and pricing are confirmed for your
            site.
          </p>
        </div>
      </div>
      {plans.length > 0 && (
        <div
          className="home-internet-plans"
          aria-label="Published internet packages"
        >
          {plans.slice(0, 3).map((plan) => (
            <Link
              key={plan.id}
              href="/commercial-internet-hyderabad"
              className="home-internet-plan"
            >
              <div>
                <span>{plan.tag || 'Internet package'}</span>
                <h3>{plan.name}</h3>
                <p>{plan.subtitle || plan.desc}</p>
              </div>
              <Icon name="arrow-up-right" size={19} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
