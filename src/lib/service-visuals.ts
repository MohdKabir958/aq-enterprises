import type { Service } from '@/types';
import { resolvePublicSrc } from '@/lib/assets-server';

export const SECURITY_PHOTO = '/images/illustrations/home-security.webp';
export const NETWORK_PHOTO =
  '/images/services/commercial-lan-cabling-networking.webp';
const devices: Record<string, [string, string]> = {
  'home-cctv-installation': [
    SECURITY_PHOTO,
    'Outdoor CCTV camera overlooking a house entrance and driveway',
  ],
  'ip-camera-installation': [
    SECURITY_PHOTO,
    'Weatherproof camera mounted outdoors',
  ],
  'wireless-cctv-installation': [
    SECURITY_PHOTO,
    'Security camera overlooking a residential entrance',
  ],
  'ptz-camera-installation': [
    SECURITY_PHOTO,
    'Outdoor security camera coverage example',
  ],
  'solar-cctv-systems': [
    SECURITY_PHOTO,
    'Outdoor security camera coverage example',
  ],
  'biometric-attendance-systems': [
    '/images/illustrations/access-control.webp',
    'Fingerprint attendance terminal beside an office entrance',
  ],
  'access-control-systems': [
    '/images/illustrations/access-control.webp',
    'Biometric access-control reader beside a glass office door',
  ],
  'video-door-phone-installation': [
    '/images/illustrations/video-intercom.webp',
    'Video intercom camera and indoor door-phone monitor',
  ],
  'intercom-systems': [
    '/images/illustrations/video-intercom.webp',
    'Door intercom installed at a residential entrance',
  ],
  'fire-alarm-systems': [
    '/images/illustrations/fire-alarm.webp',
    'Fire alarm call point, sounder and ceiling smoke detector',
  ],
  'commercial-lan-cabling-networking': [
    NETWORK_PHOTO,
    'Labelled Ethernet patch panel with network connections',
  ],
  'cctv-amc-maintenance': [
    '/images/illustrations/cctv-maintenance.webp',
    'Camera components, multimeter and servicing tools',
  ],
  'cctv-repair-troubleshooting': [
    '/images/illustrations/cctv-maintenance.webp',
    'Camera electronics being checked on a service workbench',
  ],
};
const properties: Record<string, string> = {
  'office-cctv-installation': 'Modern office corridor and reception',
  'apartment-cctv-installation':
    'Apartment building and shared residential spaces',
  'villa-cctv-installation': 'Contemporary villa exterior and entrance',
  'factory-cctv-surveillance': 'Industrial equipment and working areas',
  'warehouse-cctv-installation': 'Warehouse storage aisles',
  'retail-shop-cctv-installation': 'Retail shop merchandise displays',
  'school-college-cctv-installation': 'School building and campus spaces',
  'hospital-cctv-installation': 'Healthcare facility interior',
  'hotel-cctv-installation': 'Hotel interior and reception spaces',
};
export function getServiceVisual(service: Service) {
  const custom = resolvePublicSrc(service.hero.image?.src);
  const device = devices[service.slug];
  const property = properties[service.slug];
  const category = /home|villa|apartment/.test(service.slug)
    ? 'Residential'
    : /factory|warehouse/.test(service.slug)
      ? 'Industrial'
      : /attendance|access/.test(service.slug)
        ? 'Access & attendance'
        : /network/.test(service.slug)
          ? 'Networking'
          : /amc|repair/.test(service.slug)
            ? 'Maintenance'
            : 'Security systems';
  return {
    src:
      custom ||
      device?.[0] ||
      (property ? `/images/services/${service.slug}.webp` : SECURITY_PHOTO),
    alt: custom
      ? service.hero.image?.alt || service.name
      : device?.[1] ||
        property ||
        'CCTV camera overlooking a property entrance',
    category,
  };
}
