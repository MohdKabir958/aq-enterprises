import type { Location } from '@/types';
import { locationProcessSteps, maintenanceBody } from './_shared';

export const kompallyLocation: Location = {
  id: 'kompally',
  slug: 'kompally',
  name: 'Kompally',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'CCTV for Kompally’s northern growth corridor — schools, gated communities, villas, and apartments with campus-aware and residential security planning.',
  h1: 'CCTV Installation in Kompally for Homes & Schools',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  hero: {
    eyebrow: 'Kompally service area',
    headline: 'School campus and gated-community cameras for growing Kompally',
    subheadline:
      'AQ Enterprises designs CCTV for schools, villas, apartments, and gated layouts in Kompally — northern Hyderabad coverage with campus privacy rules and residential compound plans.',
    image: {
      id: 'kompally-hero',
      alt: 'Developing residential and institutional corridor suggesting Kompally school and gated community security',
      label: 'Kompally growth corridor (placeholder)',
    },
  },
  introduction: `Kompally has become one of Hyderabad’s clearer northern growth corridors: schools and colleges with larger campuses, gated communities still filling out, independent villas, and apartment towers rising beside older plots. Distances between gate and building are longer than in central mixed-use belts. Security planning stretches across perimeter roads, bus bays, playground edges, society clubhouses, and villa compounds — each with different privacy expectations.

AQ Enterprises serves Kompally from Mallapur as a Hyderabad service area. We do not claim a Kompally branch. One verified school campus project in our list sits in Kompally; that documented case informs how we talk about campus workflows, but every new site still gets its own survey. Residential work here is equally important: families moving north want gate clarity, parking oversight, and intercom habits that match larger plot depths.

Growth corridors also mean incomplete street lighting on newer internal roads and construction traffic that changes week to week. Camera plans should stay useful after the scaffolding leaves — not only during the first month of occupancy.`,

  propertyTypes: {
    heading: 'Property types we plan for in Kompally',
    intro: 'Typical northern-corridor patterns — general descriptions, not a customer roster.',
    items: [
      'Schools and colleges with gates, corridors, and outdoor assembly edges',
      'Gated communities with multiple internal roads and clubhouse zones',
      'Independent villas and large plots with deeper approach drives',
      'Apartment towers and mid-rise societies',
      'Institutional hostels and admin blocks adjacent to campuses',
      'Neighbourhood shops serving new residential catchments',
    ],
  },

  securityRequirements: {
    heading: 'Security needs on a northern growth corridor',
    items: [
      'School gates and bus bays that need accountability during arrival and dispersal peaks',
      'Campus privacy — no cameras in toilets, changing areas, or other prohibited student spaces',
      'Long villa drives and compound corners that short-kit cameras routinely miss',
      'Gated-community perimeters with uneven lighting on newer internal roads',
      'Apartment stilts and visitor parking that mix residents with delivery traffic',
      'Intercom and access habits that match large plot depths and multi-gate societies',
      'Outdoor housings facing dust, heat, and monsoon on open northern approaches',
    ],
  },

  recommendedSolutions: {
    heading: 'Recommended solutions for Kompally sites',
    body: `School and college CCTV should follow a campus map: main gate, secondary gates, bus bay, corridor junctions, and selected outdoor edges that management actually reviews after an incident. Student dignity rules are non-negotiable. Our verified School Campus work in Kompally reflects campus-scale camera counts and phased installation; new institutions still receive a fresh design based on their buildings and policies.

Villas benefit from entrance, compound, and parking coverage with IP cameras sized for longer runs. Apartments and gated communities need clarity on society-owned common cameras versus unit-level kits. Access control on staff or service gates, plus intercom systems for multi-gate layouts, keep visitor flow manageable without posting a guard at every corner.

IP camera installation with disciplined PoE and recording retention matters when campuses and large societies generate more motion events than a small flat. AMC is especially useful outdoors — northern open roads and terrace mounts collect dust that slowly kills night detail if nobody cleans or checks storage health.`,
  },

  servicesIntro:
    'Kompally requests often map to school/college, home, apartment, villa, access control, IP, AMC, and intercom services linked below.',

  installationProcess: {
    heading: 'Installation process in Kompally',
    intro:
      'Campus calendars and society permissions drive sequencing as much as cable routes do.',
    steps: locationProcessSteps('Kompally', {
      survey:
        'We walk Kompally campuses, gated layouts, villas, or apartment gates to note perimeter depth, lighting, power, and privacy zones before proposing camera points and recorder placement.',
      installation:
        'Installs respect school hours and occupied residences — outdoor mounts suited to open northern approaches, neat villa and society cabling, and phased campus work where buildings stay in use.',
      configuration:
        'Accounts are set for principals or admin roles on campuses, and for family or society roles on residential sites, with remote viewing checked against how the site will actually be monitored.',
    }),
  },

  maintenance: {
    heading: 'Maintenance & AMC',
    body: maintenanceBody,
  },

  whyLocal: {
    heading: 'Why Kompally plans differ from central Hyderabad',
    items: [
      'Longer perimeters and bus-bay workflows matter more than tight street-shop counter angles',
      'School privacy rules shape camera maps in ways retail corridors do not',
      'Gated communities need multi-gate thinking, not a single door kit',
      'Newer internal roads often need night-performance checks before final angles',
      'We serve from Mallapur — Kompally is coverage, not a claimed local office',
    ],
  },

  cta: {
    heading: 'Plan CCTV for your Kompally campus or home',
    body: 'Share whether you need school campus coverage, a villa compound, an apartment society, or a gated-community gate. We survey on site and quote systems that match northern-corridor distances and privacy rules.',
    primaryLabel: 'Request a site survey',
    primaryHref: '/#contact',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'kompally-faq-1',
      question: 'Do you install CCTV for schools in Kompally?',
      answer:
        'Yes. School and college work focuses on gates, bus bays, corridors, and selected outdoor edges with clear privacy boundaries. We have a verified campus project in Kompally listed in our projects data; new schools still start with a dedicated survey and policy-aligned camera map.',
      relatedServices: ['school-college-cctv-installation'],
      relatedLocations: ['kompally'],
      status: 'published',
    },
    {
      id: 'kompally-faq-2',
      question: 'Can you cover villas with long driveways?',
      answer:
        'Yes. Villa plans usually emphasise the gate, approach drive, parking, and key compound corners. Longer runs may need careful cable or PoE design so cameras at the far end stay reliable. See our villa CCTV service page for residential plot detail.',
      relatedServices: ['villa-cctv-installation'],
      relatedLocations: ['kompally'],
      status: 'published',
    },
    {
      id: 'kompally-faq-3',
      question: 'Are intercoms useful in gated communities here?',
      answer:
        'Often yes when a community has more than one gate or deep internal roads. Intercoms help visitors reach the right block or unit; CCTV records the approach. Access control can sit on service gates where staff movement needs tighter logs.',
      relatedServices: ['intercom-systems', 'access-control-systems'],
      relatedLocations: ['kompally'],
      status: 'published',
    },
    {
      id: 'kompally-faq-4',
      question: 'Do you have an office in Kompally?',
      answer:
        'No. AQ Enterprises is based in Mallapur, Hyderabad, and travels to Kompally for surveys, installation, and maintenance. Service-area pages describe coverage, not branch addresses.',
      relatedLocations: ['kompally'],
      status: 'published',
    },
    {
      id: 'kompally-faq-5',
      question: 'Is AMC recommended for outdoor cameras on open plots?',
      answer:
        'Yes. Open northern approaches collect dust and take monsoon weather hard. Planned AMC covers cleaning, storage checks, and configuration updates so night vision and retention stay usable. Ask for AMC when we quote, or open the CCTV AMC page.',
      relatedServices: ['cctv-amc-maintenance'],
      relatedLocations: ['kompally'],
      status: 'published',
    },
  ],

  verifiedProjectIds: ['school-kompally'],
  imagePlaceholders: [
    {
      id: 'kompally-school-gate',
      alt: 'School campus gate and bus bay CCTV planning concept for northern Hyderabad',
      label: 'School gate coverage (placeholder)',
    },
    {
      id: 'kompally-villa-compound',
      alt: 'Villa compound and driveway camera planning concept for Kompally residential plots',
      label: 'Villa compound coverage (placeholder)',
    },
  ],
  relatedServices: [
    'school-college-cctv-installation',
    'home-cctv-installation',
    'apartment-cctv-installation',
    'villa-cctv-installation',
    'access-control-systems',
    'ip-camera-installation',
    'cctv-amc-maintenance',
    'intercom-systems',
  ],
  relatedLocations: ['secunderabad', 'nacharam', 'hyderabad', 'lb-nagar'],
  relatedProjects: [
    'school-kompally',
  ],
  relatedBlogs: [],
  seo: {
    title: 'CCTV Installation in Kompally | Schools & Homes',
    description:
      'Kompally CCTV for schools, gated communities, villas, and apartments. Campus-aware IP systems, access control, intercoms, and AMC — Hyderabad northern corridor.',
    canonical: '/locations/kompally',
    keywords: [
      'CCTV installation Kompally',
      'school CCTV Kompally',
      'villa CCTV Kompally Hyderabad',
      'apartment CCTV Kompally',
    ],
  },
};
