import type { Location } from '@/types';
import { locationProcessSteps, maintenanceBody } from './_shared';

export const hitechCityLocation: Location = {
  id: 'hitech-city',
  slug: 'hitech-city',
  name: 'Hitech City',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Office and campus CCTV, IP cameras, access control, and networking for Hitech City workplaces — multi-floor corporate security planned from Mallapur.',
  h1: 'CCTV & Corporate Security in Hitech City',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  hero: {
    eyebrow: 'Hitech City service area',
    headline: 'Multi-floor office CCTV and access for IT park workplaces',
    subheadline:
      'AQ Enterprises designs IP surveillance, access control, and related systems for Hitech City office towers and tech-park floors — survey-led, with local support from Mallapur.',
    image: {
      id: 'hitech-city-location-hero',
      alt: 'Modern IT park office towers and glass façades representing corporate CCTV and access-control planning in Hitech City',
      label: 'Hitech City workplaces',
    },
  },
  introduction: `Hitech City is a workplace corridor first. Security conversations here centre on office towers, tech-park floors, shared lobbies, server rooms, and visitor flows — not residential gates as the primary brief. Facility managers care about who entered a floor, whether cameras cover lift lobbies and emergency exits, and whether recording survives a long weekday without filling disks with irrelevant corridor traffic.

AQ Enterprises plans corporate CCTV and related systems for Hitech City sites as a service area out of Mallapur. We do not operate a branded branch inside the parks; we visit for surveys, installs, and AMC. Typical scopes include IP camera layouts across multiple floors, access control at staff and restricted doors, biometric attendance for workforce timekeeping, and commercial LAN paths that keep cameras and controllers on a stable network rather than consumer Wi-Fi.

Nearby Madhapur, Gachibowli, Kondapur, Financial District, and DLF Cyber City pages cover adjacent campus and residential-edge contexts. This page stays office-first: tower floors, shared building rules, and IT-park operational rhythms.`,
  propertyTypes: {
    heading: 'Workplace types in Hitech City',
    intro: 'Corporate and campus patterns that shape camera and access design here.',
    items: [
      'Multi-floor leased office plates in IT park towers with shared building risers.',
      'Single-floor or multi-bay tech offices needing lobby, open office, and meeting-zone visibility.',
      'Server rooms, UPS rooms, and restricted labs that require tighter camera and access layers.',
      'Reception and visitor waiting areas with logging and after-hours monitoring needs.',
      'Parking and basement approaches managed with building facilities teams.',
      'Fit-outs where cabling must respect landlord guidelines and existing structured cabling.',
    ],
  },
  securityRequirements: {
    heading: 'Corporate security requirements in Hitech City',
    intro: 'Office parks reward documentation, role-based access, and network hygiene.',
    items: [
      'Multi-stakeholder approval — tenant IT/facilities plus building management for mounts and risers.',
      'Lift lobby, stair, and emergency-exit coverage without creating privacy issues in open desks.',
      'Stable IP networking for cameras, NVRs, and access controllers across floors.',
      'User roles for security, facilities, and leadership viewing — not a single shared password.',
      'Retention policies aligned to company policy and available storage.',
      'Integration planning when biometric attendance and door access must work with the same visitor story.',
    ],
  },
  recommendedSolutions: {
    heading: 'Recommended corporate solutions',
    body: `Lead with IP CCTV on a planned NVR or server path, sized for floor count and retention. Pair cameras with access control on main staff doors and restricted rooms; add biometric attendance when workforce timekeeping is part of the brief. Commercial LAN cabling keeps camera VLANs or dedicated runs clean in tower environments. PTZ cameras help large atriums or perimeter building views when a fixed lens cannot cover movement economically. Fire alarm coordination matters where life-safety systems already exist — we plan CCTV mounts and cable paths so they do not fight those constraints.

AMC is especially useful in Hitech City: dusty outdoor approaches, busy lobbies, and 24×5 or 24×7 operations mean lenses and disks need scheduled attention. Residential-first packages are the wrong starting point here; if your site is an apartment near Madhapur, use that locality or apartment service page instead.`,
  },
  servicesIntro:
    'Office-oriented services we most often recommend for Hitech City workplaces. Each links to full scope and process detail.',
  installationProcess: {
    heading: 'Installation process for Hitech City offices',
    intro:
      'Corporate installs follow survey, landlord-aware mounting, network configuration, and structured handover to facilities or security leads.',
    steps: locationProcessSteps('Hitech City', {
      survey:
        'We survey the Hitech City floor or tower areas with facilities stakeholders, note risers, power, network rooms, and landlord constraints, then map lobby, corridor, and restricted-zone cameras before procurement.',
      installation:
        'IP cameras, recorders, access hardware, and cabling are installed with neat routing suited to office towers and tech-park fit-outs, coordinating with building rules on penetrations and shared spaces.',
      configuration:
        'Recording schedules, motion zones for lobbies and corridors, role-based user accounts, and remote viewing for approved staff are configured to match weekday and after-hours use.',
      handover:
        'Facilities or security leads receive a walkthrough of live view, playback, access events, and basic checks, plus documentation for future camera or door additions.',
    }),
  },
  maintenance: {
    heading: 'Maintenance & AMC',
    body: maintenanceBody,
  },
  whyLocal: {
    heading: 'Why plan Hitech City security with AQ Enterprises',
    items: [
      'Office-first framing — IP CCTV, access, biometrics, and LAN — not a residential kit relabelled for a tower.',
      'Published project reference available for a tech-park office tower install in Hitech City.',
      'Coordination mindset for multi-floor and landlord-constrained sites.',
      'Adjacent locality links for Madhapur, Gachibowli, Kondapur, Financial District, and DLF Cyber City.',
      'Mallapur-based AMC and repair support after go-live.',
    ],
  },
  cta: {
    heading: 'Plan CCTV for your Hitech City office',
    body: 'Share your tower or park location, floor plate size, and whether you need cameras, access control, biometrics, or cabling. We will arrange a facilities-aware survey.',
    primaryLabel: 'Request an office survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'hitech-city-faq-1',
      question: 'Do you install CCTV inside Hitech City IT park towers?',
      answer:
        'Yes. We plan and install office CCTV for leased floors and related workplace areas, coordinating mounts and cable routes with building or facilities rules where required. A site survey confirms scope before work begins.',
      status: 'published',
    },
    {
      id: 'hitech-city-faq-2',
      question: 'Is residential CCTV the focus for Hitech City?',
      answer:
        'No. This locality page is corporate-first — offices, access control, IP cameras, and networking. For apartments or homes near Madhapur or Kondapur, use those location pages and the matching residential service pages.',
      status: 'published',
    },
    {
      id: 'hitech-city-faq-3',
      question: 'Can you add biometric attendance with office cameras?',
      answer:
        'Yes. Biometric attendance and access control are commonly planned alongside IP CCTV so staff doors, timekeeping, and camera coverage tell a coherent story. We confirm device placement and network needs during the survey.',
      status: 'published',
    },
    {
      id: 'hitech-city-faq-4',
      question: 'Do you have a branch office inside Hitech City?',
      answer:
        'No. AQ Enterprises is based in Mallapur, Hyderabad. Hitech City is a service area we visit for surveys, installation, and maintenance — we do not claim a park campus branch.',
      status: 'published',
    },
    {
      id: 'hitech-city-faq-5',
      question: 'What verified project do you list for Hitech City?',
      answer:
        'Our published project data includes a tech park office tower CCTV installation in Hitech City (project id office-hitech). Ask us during enquiry if you want to discuss scope patterns similar to that workplace type.',
      status: 'published',
    },
  ],
  verifiedProjectIds: ['office-hitech'],
  imagePlaceholders: [
    {
      id: 'hitech-city-lobby',
      alt: 'Corporate office lobby and lift area illustrating typical multi-floor CCTV coverage points in an IT park',
      label: 'Office lobby coverage',
    },
    {
      id: 'hitech-city-access',
      alt: 'Office corridor door with access-control reader representing staff entry security planning',
      label: 'Access control points',
    },
  ],
  relatedServices: [
    'office-cctv-installation',
    'ip-camera-installation',
    'access-control-systems',
    'biometric-attendance-systems',
    'commercial-lan-cabling-networking',
    'cctv-amc-maintenance',
    'fire-alarm-systems',
    'ptz-camera-installation',
  ],
  relatedLocations: [
    'madhapur',
    'gachibowli',
    'kondapur',
    'financial-district',
    'dlf-cyber-city',
  ],
  relatedProjects: [
    'office-hitech',
  ],
  relatedBlogs: [],
  relatedIndustries: [],
  seo: {
    title: 'CCTV Installation in Hitech City Hyderabad | AQ Enterprises',
    description:
      'Office CCTV, IP cameras, access control, and networking for Hitech City workplaces. Corporate security installs by AQ Enterprises from Mallapur.',
    canonical: '/locations/hitech-city',
    keywords: [
      'CCTV installation Hitech City',
      'office CCTV Hitech City',
      'IP camera installation Hitech City',
      'access control Hitech City',
      'biometric attendance Hitech City',
      'tech park CCTV Hyderabad',
      'CCTV AMC Hitech City',
    ],
  },
};
