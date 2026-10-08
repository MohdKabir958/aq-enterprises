import type { InternetPlan, Product } from './models';
import { mergedCollection } from './store';
export const getProducts = async (includeDrafts = false) =>
  (await mergedCollection<Product>('products', [])).filter(
    (p) => includeDrafts || p.status === 'published',
  );
export const getPlans = async (includeDrafts = false) =>
  (await mergedCollection<InternetPlan>('plans', defaultPlans)).filter(
    (p) => includeDrafts || p.status === 'published',
  );
// No carrier SLA or invented prices; commercial terms are confirmed in a quotation.
export const defaultPlans: InternetPlan[] = [
  {
    id: 'retail-network',
    slug: 'retail-network',
    name: 'Retail & Showroom',
    status: 'published',
    tag: 'Retail',
    speed: 'Site-specific bandwidth',
    subtitle: 'Internet and LAN planning',
    desc: 'Connectivity planning for shops, clinics and showrooms.',
    highlights: [
      'LAN cabling and equipment assessment',
      'Discuss POS and CCTV connectivity',
      'Carrier availability checked during survey',
    ],
    featured: false,
    price: null,
    billing: 'Quotation after survey',
  },
  {
    id: 'office-network',
    slug: 'office-network',
    name: 'Corporate Office',
    status: 'published',
    tag: 'Office',
    speed: 'Sized for your workplace',
    subtitle: 'Office connectivity',
    desc: 'Internet and internal network planning for office teams.',
    highlights: [
      'Network cabling and rack assessment',
      'Discuss CCTV and voice network requirements',
      'Provider terms confirmed in the quotation',
    ],
    featured: true,
    price: null,
    billing: 'Quotation after survey',
  },
  {
    id: 'enterprise-network',
    slug: 'enterprise-network',
    name: 'Enterprise Connectivity',
    status: 'published',
    tag: 'Enterprise',
    speed: 'Custom requirements',
    subtitle: 'Commercial network assessment',
    desc: 'Discuss connectivity and infrastructure needs for larger sites.',
    highlights: [
      'Site survey for network infrastructure',
      'Carrier and redundancy options assessed',
      'Written scope and commercial terms',
    ],
    featured: false,
    price: null,
    billing: 'Quotation after survey',
  },
];
