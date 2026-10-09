import Link from 'next/link';
import Image from '@/components/ManagedImage';
import Icon from '@/components/Icon';
import type { Service } from '@/types';
import { getServiceVisual } from '@/lib/service-visuals';

export default function ServiceCard({ service }: { service: Service }) {
  const visual = getServiceVisual(service);
  return (
    <Link className="service-photo-card" href={`/services/${service.slug}`}>
      <div
        className="service-photo-card-image"
        data-provenance="provisional_illustration"
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1199px) 33vw, 290px"
        />
        <span className="service-photo-category">{visual.category}</span>
      </div>
      <div className="service-photo-card-body">
        <h3>{service.name}</h3>
        <p>{service.summary}</p>
        <span className="service-photo-card-link">
          Explore service <Icon name="arrow-up-right" size={18} />
        </span>
      </div>
    </Link>
  );
}
