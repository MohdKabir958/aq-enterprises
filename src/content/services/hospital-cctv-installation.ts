import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const hospitalCctvInstallation: Service = {
  id: 'hospital-cctv-installation',
  slug: 'hospital-cctv-installation',
  name: 'Hospital CCTV Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Hospital and clinic CCTV in Hyderabad — entries, corridors, pharmacy, and operational zones with patient privacy zoning. No invented clinical or PHI claims.',
  h1: 'Hospital CCTV Installation in Hyderabad',
  hero: {
    eyebrow: 'Healthcare facility security',
    headline: 'Surveillance for clinical campuses — with privacy zoning',
    subheadline:
      'CCTV for hospitals, nursing homes, and multi-speciality clinics in Hyderabad. We prioritise entries, corridors, pharmacy, and service areas while keeping patient privacy zones out of casual camera view.',
    image: {
      id: 'hospital-cctv-hero',
      alt: 'Hospital corridor CCTV camera placed for operational oversight',
      label: 'Hospital corridor and entry CCTV (placeholder)',
    },
  },
  introduction: `Healthcare facilities mix public lobbies, clinical corridors, pharmacies, stores, and staff-only paths. Security teams need visibility into who enters, how people move through shared spaces, and what happens around high-value medicine storage — without treating every patient interaction as content for a camera. AQ Enterprises installs hospital and clinic CCTV in Hyderabad with explicit privacy zoning discussed before any mount is fixed.

This page does not claim that cameras protect electronic health records, replace clinical protocols, or meet any specific healthcare privacy certification. Those topics belong to your compliance, IT, and clinical leadership. Our role is physical-space surveillance: doors, corridors, pharmacy counters, ambulance or casualty approaches, parking edges, and service corridors — designed so recording supports operations and incident review.

Hospitals also run continuously. Installation windows, infection-control awareness around work areas, and coordination with facilities teams matter as much as camera models. We plan surveys and installs with your engineering or admin contact so clinical work is disrupted as little as practical.`,

  whatIs: {
    heading: 'What hospital CCTV installation means here',
    body: `Hospital CCTV installation is the design and deployment of cameras and recording for healthcare premises, with zoning that separates appropriate public and operational views from privacy-sensitive clinical spaces. Typical coverage includes main entrances, casualty or OPD approaches as directed by the facility, lift lobbies, long corridors, pharmacy dispensing areas, medical stores (from appropriate angles), generator or service yards, and parking or ambulance bays.

What we deliberately avoid inventing: claims about capturing protected health information, monitoring inside every consultation room, or guaranteeing regulatory outcomes. Camera placement inside clinical rooms is a facility policy decision. Many hospitals restrict cameras to corridors and service areas; some allow limited coverage in specific operational rooms under their own rules. We follow the written direction of hospital administration.

Technically, projects often use IP cameras, PoE networking, NVRs in secure equipment rooms, and role-based viewing for security or facilities staff. Structured cabling quality matters in buildings with heavy electrical and HVAC infrastructure. Related systems — access control on restricted doors, biometric staff attendance, fire alarm interfaces, and commercial LAN work — are coordinated when the hospital’s project scope includes them.`,
  },

  whoNeeds: {
    heading: 'Facilities this service supports',
    items: [
      'Multi-speciality hospitals and nursing homes',
      'Day-care surgical centres with controlled entries',
      'Large clinics and diagnostic centres with pharmacy counters',
      'Campus-style healthcare facilities with multiple blocks',
      'Facilities upgrading fragmented legacy DVR systems',
      'Administrations pairing CCTV with door access on stores and staff areas',
    ],
  },

  commonProblems: {
    heading: 'Problems healthcare facilities report',
    items: [
      'Entrance footage that cannot distinguish peak OPD crowd flow',
      'Pharmacy angles that miss the counter or store door',
      'Corridor cameras leaving stair and lift lobby gaps',
      'Unclear rules about cameras near clinical consultation spaces',
      'Too many shared logins on the security viewing PC',
      'Cabling conflicts with medical gas, HVAC, or cable trays',
      'No after-hours attention on service yards and perimeter doors',
    ],
  },

  ourSolution: {
    heading: 'How we deliver hospital CCTV projects',
    body: `Discovery starts with a facilities walk: public entries, casualty approach if applicable, corridor spines, pharmacy, stores, and staff routes. We document proposed camera points and explicitly list exclusion zones based on your policy. If a clinical area is under debate, we pause for admin confirmation rather than installing first and apologising later.

Equipment rooms, UPS availability, and network paths are checked early. Hospitals often already have dense ceiling services; neat routing and labeled terminations reduce future fault-finding pain. For pharmacy and stores, angles focus on doors, counters, and circulation — not on inventing “medicine inventory analytics.”

Configuration emphasises authorised accounts, practical retention as stated by the facility, and desk viewing for security. Remote access, if approved by the hospital, is limited to named roles. We test day and night at entries, corridor junctions, and pharmacy approaches.

We do not invent PHI handling workflows or claim EMR integration. If your IT team needs cameras on a segmented network, we work with their instructions. Quotations reflect building complexity, camera count, and cabling reality after survey — not a one-line website price.`,
  },

  systemOptions: {
    heading: 'System options for healthcare sites',
    intro: 'Scope varies from a compact clinic to a multi-block hospital campus.',
    options: [
      {
        name: 'Entry and corridor operations',
        description:
          'Core cameras on main doors, lift lobbies, and primary corridors with a central recorder for security review.',
        suitableFor: 'Clinics and compact nursing homes',
      },
      {
        name: 'Pharmacy and stores emphasis',
        description:
          'Operational coverage of dispensing counters, store doors, and service corridors alongside general entries.',
        suitableFor: 'Facilities prioritising medicine and store accountability',
      },
      {
        name: 'Multi-block hospital layout',
        description:
          'Zoned cameras across blocks with recorder and network planning suited to campus spread and continuous operations.',
        suitableFor: 'Larger hospitals and healthcare campuses',
      },
      {
        name: 'Security control-room viewing',
        description:
          'Live wall or desk viewing arranged for on-site security, with restricted accounts and clear camera naming by wing or floor.',
        suitableFor: 'Facilities with a dedicated security desk',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features of our healthcare installs',
    items: [
      'Privacy zoning agreed with administration before install',
      'Focus on entries, corridors, pharmacy, and service edges',
      'Secure recorder placement and role-based access',
      'Cabling awareness around dense ceiling services',
      'Day/night verification at critical doors',
      'Optional coordination with access control and attendance',
      'Handover suited to facilities and security teams',
    ],
  },

  benefits: {
    heading: 'Operational benefits',
    items: [
      'Clearer accountability at public and service entrances',
      'Better review of corridor and lobby incidents',
      'Stronger visibility around pharmacy and store doors',
      'Documented camera map for expansions and audits internal to the facility',
      'Reduced reliance on a single outdated DVR in a random cupboard',
      'A path to integrate door access where restricted rooms need it',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended planning configurations',
    intro: 'Final designs follow hospital policy, floor plates, and the survey — these are starting frames only.',
    configs: [
      {
        name: 'Clinic / day-care centre',
        description:
          'Entrance, waiting approaches, corridor, pharmacy or billing interface, and rear service door as applicable.',
        suitableFor: 'Smaller clinical facilities',
      },
      {
        name: 'Nursing home / mid-size hospital',
        description:
          'Multi-floor corridor coverage, main entries, pharmacy, stores approach, and parking or ambulance edge as directed.',
        suitableFor: 'Continuous-care facilities with moderate footprint',
      },
      {
        name: 'Multi-block campus',
        description:
          'Per-block zoning, networked recording strategy, and security desk viewing with strict account control.',
        suitableFor: 'Large hospital campuses',
      },
    ],
  },

  installationProcess: {
    heading: 'Installation process in clinical environments',
    intro: 'We coordinate timing and routes with your facilities team to respect clinical operations.',
    steps: standardProcessSteps({
      survey:
        'We walk entries, corridors, pharmacy, stores, and equipment rooms with your facilities or security contact, capture cover/no-cover zones, and note power, UPS, and network constraints before proposing a bill of materials.',
      installation:
        'Cameras and cabling are installed in agreed phases, with neat routing away from sensitive clinical workflows where possible and weather-aware mounts on external approaches.',
      configuration:
        'Recording, accounts, retention as specified by the facility, and desk or approved remote viewing are configured with clear wing and door naming.',
      testing:
        'We verify entry day/night clarity, corridor junctions, pharmacy approaches, storage health, and that authorised staff can locate sample playback quickly.',
      handover:
        'Security and facilities contacts receive live view, playback, export basics, and account hygiene guidance — plus a camera role map for internal reference.',
    }),
  },

  maintenance: {
    heading: 'Maintenance for always-on facilities',
    body: `Hospitals cannot wait for a weekend if a gate camera fails. Prioritised repair response, periodic lens and housing checks, and verification that recorders are still writing are essential. Dust, renovation dust, and monsoon wear on external cameras are common.

When departments move or a ward is renovated, angles change. Schedule a re-aim pass rather than assuming the old map still matches reality. If access control or fire systems are upgraded nearby, protect CCTV cable paths and update documentation.

AMC arrangements help facilities teams budget attention instead of only reacting to failures. We stay clear of inventing clinical uptime SLAs on this page; service commitments belong in your quotation and maintenance agreement.`,
  },

  brands: {
    heading: 'Brands we commonly install',
    body: brandsBody,
  },

  warranty: {
    heading: 'Warranty and workmanship',
    body: warrantyBody,
  },

  whyChoose: {
    heading: 'Why healthcare admins choose AQ Enterprises',
    items: [
      'Privacy zoning discussed before hardware goes up',
      'No overclaiming about PHI, EMR, or clinical certifications',
      'Facilities-aware installation planning for live hospitals',
      'Clear security-desk handover and account discipline',
      'Coordination with access, attendance, networking, and fire projects when scoped',
      'Local Hyderabad support for follow-up work',
    ],
  },

  hyderabadCoverage: {
    heading: 'Healthcare CCTV across Hyderabad',
    body: `We work with healthcare premises across Hyderabad — established hospital belts, neighbourhood nursing homes, and clinics in commercial districts. Access control for installers, biomedical or engineering escorts, and after-hours windows are planned with your team.

Share the facility type, approximate floors or blocks, and whether pharmacy and stores are in scope. We schedule a survey and propose a zoned camera plan. Peripheral locations are considered when project scope supports a proper site visit.`,
  },

  cta: {
    heading: 'Plan zoned CCTV for your facility',
    body: 'Describe your entries, pharmacy needs, and privacy rules. We will arrange a facilities walk and recommend a practical surveillance layout — without overstepping clinical policy.',
    primaryLabel: 'Request a hospital site survey',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'hospital-cctv-faq-1',
      question: 'Do you install cameras inside patient rooms?',
      answer:
        'Only if hospital administration explicitly directs it under their policy. Many facilities keep cameras in corridors, entries, and operational areas instead. We document exclusion zones and do not assume clinical rooms are in scope.',
      relatedServices: ['hospital-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hospital-cctv-faq-2',
      question: 'Can CCTV monitor patient medical records or PHI?',
      answer:
        'Physical cameras watch spaces, not databases. We do not claim PHI monitoring, EMR integration, or healthcare data certifications. Information privacy for clinical systems remains with your IT and compliance teams.',
      relatedServices: ['hospital-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hospital-cctv-faq-3',
      question: 'How do you cover the pharmacy?',
      answer:
        'Typical focus includes the dispensing counter approach, store door, and relevant service corridor — per your layout. Angles are chosen for operational accountability, not for inventing inventory analytics features.',
      relatedServices: ['hospital-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hospital-cctv-faq-4',
      question: 'Can hospital CCTV work with access control?',
      answer:
        'Yes. Restricted stores, staff passages, and equipment rooms often benefit from door control alongside cameras. We can plan both in one project or stage access control after CCTV cabling is ready.',
      relatedServices: ['hospital-cctv-installation', 'access-control-systems'],
      status: 'published',
    },
    {
      id: 'hospital-cctv-faq-5',
      question: 'Will installation interrupt clinical services?',
      answer:
        'We phase work with facilities guidance — often evenings, weekends, or wing-by-wing — to reduce impact. Some noisy tasks are scheduled away from sensitive clinical hours whenever possible.',
      relatedServices: ['hospital-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hospital-cctv-faq-6',
      question: 'Who should have login access to the recorder?',
      answer:
        'Usually a small set of security or facilities roles defined by the hospital. Shared passwords are discouraged. We configure accounts as directed and explain basic hygiene during handover.',
      relatedServices: ['hospital-cctv-installation', 'cctv-amc-maintenance'],
      status: 'published',
    },
  ],

  imagePlaceholders: [
    {
      id: 'hospital-cctv-entry',
      alt: 'Hospital entrance CCTV coverage concept for visitor and patient flow',
      label: 'Hospital entry camera coverage (placeholder)',
    },
    {
      id: 'hospital-cctv-pharmacy',
      alt: 'Pharmacy counter and store door CCTV zoning concept',
      label: 'Pharmacy operational coverage (placeholder)',
    },
  ],

  relatedLocations: [
    'jubilee-hills',
    'lb-nagar',
    'begumpet',
  ],
  relatedProjects: [
    'hospital-jubilee',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'access-control-systems',
    'ip-camera-installation',
    'fire-alarm-systems',
    'cctv-amc-maintenance',
    'biometric-attendance-systems',
    'commercial-lan-cabling-networking',
  ],

  seo: {
    title: 'Hospital CCTV Installation in Hyderabad',
    description:
      'Hospital and clinic CCTV in Hyderabad with privacy zoning for corridors, pharmacy, and entries — installed by AQ Enterprises.',
    canonical: '/services/hospital-cctv-installation',
    keywords: [
      'hospital CCTV installation Hyderabad',
      'clinic surveillance cameras',
      'pharmacy CCTV',
      'healthcare facility CCTV',
      'nursing home cameras',
    ],
  },
};
