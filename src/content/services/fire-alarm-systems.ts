import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const fireAlarmSystems: Service = {
  id: 'fire-alarm-systems',
  slug: 'fire-alarm-systems',
  name: 'Fire Alarm Systems',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',

  summary:
    'Fire alarm system installation support for Hyderabad commercial sites — detection and alerting basics that complement CCTV, with clear limits where licensed fire consultants are required.',

  h1: 'Fire Alarm Systems in Hyderabad',

  hero: {
    eyebrow: 'AQ Enterprises · CCTV & Security',
    headline: 'Fire Alarm Detection and Alerting for Commercial Sites',
    subheadline:
      'Practical fire detection and alarm alerting for offices, hotels, schools, and care facilities in Hyderabad — designed as a safety layer alongside, not instead of, licensed fire consultancy where required.',
    image: {
      id: 'fire-hero',
      alt: 'Fire alarm control panel and detector installation in a commercial building',
      label: 'Fire alarm panel and smoke detector layout',
    },
  },

  introduction: `Fire safety is a life-safety discipline. CCTV can show smoke after it appears; it cannot replace detection, evacuation alerting, or the statutory processes that many commercial buildings in Hyderabad must follow. AQ Enterprises supports fire alarm system installation work focused on detection devices, notification appliances, and control equipment appropriate to the site discussion — while being explicit that we are not a substitute for licensed fire consultants, architects, or authorities who approve occupancy and compliance packages.

When a business asks us for fire alarm help alongside CCTV, access control, or networking, we frame the job correctly: early detection and occupant alerting are complementary to cameras and door control. Unlock strategies during alarms, detector placement relative to kitchens or dusty workshops, and documentation for your facilities file all matter. Where formal approvals are needed, treat those as a parallel track with licensed fire consultants and competent authorities as applicable to your occupancy — we do not invent NOCs or compliance certificates.`,

  whatIs: {
    heading: 'What is a fire alarm system?',
    body: `A fire alarm system detects signs of fire — commonly smoke, heat, or manual call-point activation — and alerts people through sounders, strobes, or voice notification depending on the design. A control panel monitors device circuits or addressable loops, shows zone or device location information, and may interface with other building systems according to the approved design.

Commercial sites often need more structure than a single domestic smoke alarm: multiple zones, manual call points on escape routes, and maintenance records. Hotels, hospitals, schools, and multi-floor offices typically involve higher expectations for coverage and documentation. Exact device counts, cable types, and cause-and-effect logic should follow a design appropriate to the occupancy — not a generic catalogue bundle.

AQ Enterprises can supply and install detection and alerting hardware in coordination with your facilities plan and, where engaged, your fire consultant’s drawings. We do not invent compliance certifications or claim automatic statutory clearance. Brands used on commercial projects may include established lines such as Honeywell, Bosch, and other products suited to the specified design.`,
  },

  whoNeeds: {
    heading: 'Who needs a commercial fire alarm approach?',
    intro: 'Any workplace that must wake occupants quickly and guide facilities response benefits from a planned detection and alerting layer.',
    items: [
      'Offices and commercial floors needing smoke/heat detection and common sounders',
      'Hotels and hospitality sites with guest floors and back-of-house risk areas',
      'Schools and colleges protecting dorms, labs, and assembly-adjacent spaces as per their safety plan',
      'Hospitals and clinics where alerting must respect clinical zoning defined by facilities leadership',
      'Sites integrating alarm events with security desks that also watch CCTV',
      'Businesses refreshing ageing panels and detectors as part of a wider security upgrade',
    ],
  },

  commonProblems: {
    heading: 'Common fire alarm pitfalls',
    intro: 'Problems often come from treating fire alarms like ordinary IT gadgets.',
    items: [
      'Buying detectors without a zone plan or escape-route thinking',
      'Mounting smoke detectors where kitchen steam or workshop dust causes endless false alarms',
      'Silencing sounders without fixing root causes, training people to ignore alerts',
      'Assuming CCTV recording equals fire detection',
      'Claiming “certified compliance” without the actual authority process for that building',
      'No maintenance schedule, so batteries, contaminated detectors, and faults linger unnoticed',
    ],
  },

  ourSolution: {
    heading: 'How AQ Enterprises approaches fire alarm work',
    body: `We begin with an honest scope conversation. If your building requires a licensed fire consultant, occupancy approvals, or formal drawings, we position our installation role inside that framework rather than bypassing it. For sites seeking practical detection and alerting upgrades — offices, smaller commercial floors, and coordinated security projects — we propose device types, panel location, cabling routes, and testing steps that facilities teams can understand.

Integration with security is handled carefully. Access-controlled doors must not compromise egress; any interface between alarm events and locks or CCTV monitoring desks should follow your safety policy and consultant guidance. We document device locations and teach your team how to recognise fault versus alarm states at the panel.

Final statutory approvals, NOCs, and third-party certifications — where required for your occupancy — must be obtained through licensed fire consultants and competent authorities. We do not invent those documents in marketing copy.`,
  },

  systemOptions: {
    heading: 'System options (design-dependent)',
    intro: 'Final architecture should match occupancy and any consultant drawings. These are common commercial patterns, not a promise of a single universal kit.',
    options: [
      {
        name: 'Conventional zone panels',
        description:
          'Zones group detectors and call points for smaller commercial floors. Straightforward for facilities teams when zone maps are kept accurate.',
        suitableFor: 'Smaller offices and compact commercial sites',
      },
      {
        name: 'Addressable detection',
        description:
          'Device-level identity on the panel helps locate events faster in larger buildings. Typically selected when the design calls for finer granularity.',
        suitableFor: 'Larger multi-floor sites',
      },
      {
        name: 'Detection + notification refresh',
        description:
          'Replace ageing detectors and sounders, verify circuits, and update panel labelling without pretending the building’s legal status changes by hardware alone.',
        suitableFor: 'Retrofits and maintenance-driven upgrades',
      },
      {
        name: 'Security desk complementary setup',
        description:
          'Alarm indication visible to a reception or security desk that also monitors CCTV — still subordinate to evacuation and life-safety procedures.',
        suitableFor: 'Offices and hotels with manned desks',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features we emphasise',
    items: [
      'Smoke/heat detectors and manual call points placed per agreed layout',
      'Sounders / notification devices audible in occupied zones as designed',
      'Control panel location accessible for facilities response',
      'Zone or device labelling that matches floor maps',
      'Cable routing planned with other low-voltage work (CCTV, access) to reduce rework',
      'Functional testing at handover with your facilities representative present',
      'Clear documentation packet for maintenance logs',
      'Explicit coordination notes where alarm interfaces touch access control or monitoring desks',
    ],
  },

  benefits: {
    heading: 'Benefits of a planned fire alarm layer',
    items: [
      'Earlier alerting than relying on people to notice smoke visually on cameras',
      'A defined panel for faults and alarms instead of ad-hoc consumer alarms',
      'Better coordination with CCTV desks for situational awareness after an alert',
      'Maintenance visibility when devices and zones are documented',
      'Reduced false-alarm risk when placement respects kitchens, dust, and airflow',
      'A clearer facilities narrative for management when upgrades are budgeted',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended starting discussions',
    intro: 'These are conversation starters for survey — not certified design templates.',
    configs: [
      {
        name: 'Office floor',
        description:
          'Panel in a secured facilities area, detectors in occupied zones per layout, call points on escape routes, sounders covering open offices, and a desk procedure for alarm response.',
        suitableFor: 'Commercial offices',
      },
      {
        name: 'Hotel / hospitality',
        description:
          'Guest and back-of-house zoning as defined with your facilities/consultant inputs; notification strategy that matches how staff evacuate guests.',
        suitableFor: 'Hotels and serviced stays',
      },
      {
        name: 'School / hospital coordination',
        description:
          'Device plans aligned to institutional safety leadership; installation sequencing that minimises disruption; documentation handed to the campus facilities owner.',
        suitableFor: 'Campuses and care facilities',
      },
    ],
  },

  installationProcess: {
    heading: 'Installation process',
    intro: 'Life-safety work uses the same discipline as our other services, with extra emphasis on testing and documentation.',
    steps: standardProcessSteps({
      survey:
        'We review floor use, existing devices if any, panel location options, cable routes, and whether a licensed fire consultant or approval track is already engaged for the building.',
      installation:
        'Detectors, call points, sounders, and panel equipment are installed to the agreed layout with neat circuit routing, labelled cores, and care around ceiling finishes and occupied spaces.',
      configuration:
        'Zones or addresses are programmed and labelled to match maps; any interfaces to monitoring desks or other systems follow the written cause-and-effect you approve with your safety stakeholders.',
      testing:
        'We perform functional tests of detection and notification paths with your representative, record results, and note outstanding items that require consultant or authority input.',
      handover:
        'Facilities staff learn panel basics (alarm vs fault), silence/reset discipline appropriate to your procedures, and how to log maintenance. Compliance close-out remains with the designated licensed parties where required.',
    }),
  },

  maintenance: {
    heading: 'Maintenance and upkeep',
    body: `Fire alarm devices drift into uselessness when ignored. Contaminated smoke detectors, flat backup batteries, and disabled sounders are common failure modes. Schedule inspections and cleaning according to your facilities policy and any consultant maintenance plan.

Do not permanently silence circuits to “stop nuisance.” Fix placement, environment, or device type instead. Keep zone maps updated after interior renovations — a detector above a new pantry is not the same risk context as an open office.

CCTV AMC and fire device checks can be coordinated for visit efficiency, but fire maintenance records should remain distinct in your safety file.`,
  },

  brands: {
    heading: 'Brands we work with',
    body: brandsBody,
  },

  warranty: {
    heading: 'Warranty',
    body: warrantyBody,
  },

  whyChoose: {
    heading: 'Why discuss fire alarms with AQ Enterprises',
    items: [
      'Clear messaging: complementary to CCTV, not a substitute for licensed fire consultancy where required',
      'Practical detection and alerting installation coordinated with other low-voltage systems',
      'No invented compliance certificates in our marketing or handover',
      'Documentation and labelling aimed at facilities teams',
      'Hyderabad commercial experience across offices, hospitality, and institutional sites',
      'Honest placeholders for statutory approvals that only authorities and licensed consultants can complete',
    ],
  },

  hyderabadCoverage: {
    heading: 'Hyderabad coverage',
    body: `We support fire alarm installation discussions and execution across Hyderabad commercial properties — offices, hotels, schools, and healthcare facilities — alongside related CCTV and access projects when useful.

If your building already has a fire consultant, share drawings early so installation follows the intended design rather than conflicting field choices.`,
  },

  cta: {
    heading: 'Talk through detection and alerting for your site',
    body: 'Tell us your occupancy type and whether a fire consultant is already engaged. We will propose a practical installation scope and keep statutory approval paths correctly separated.',
    primaryLabel: 'Request a consultation',
    primaryHref: '/#contact',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'fire-faq-1',
      question: 'Does CCTV replace a fire alarm system?',
      answer:
        'No. Cameras may show smoke after it appears, but they do not provide designed detection and occupant alerting. Fire alarms and CCTV solve different problems and work best as complementary layers.',
    },
    {
      id: 'fire-faq-2',
      question: 'Do you provide fire NOC or compliance certification?',
      answer:
        'No. Statutory approvals and certifications must be obtained through the appropriate licensed fire consultants and competent authorities for your occupancy. We can install systems within an agreed technical scope and document what was installed.',
    },
    {
      id: 'fire-faq-3',
      question: 'Can fire alarms interface with access control?',
      answer:
        'Sometimes, under a defined cause-and-effect plan that preserves egress. We do not improvise lock releases in ways that conflict with life-safety guidance from your consultant or facilities policy.',
    },
    {
      id: 'fire-faq-4',
      question: 'What buildings do you typically support?',
      answer:
        'Commercial conversations commonly include offices, hotels, schools/colleges, and hospital/clinic facilities — always scoped to the building’s safety stakeholders and any consultant drawings provided.',
    },
    {
      id: 'fire-faq-5',
      question: 'How do you reduce false alarms?',
      answer:
        'By placing the right detector types away from steam, dust, and unsuitable airflow, and by training staff not to disable devices. Environment matters as much as brand.',
    },
    {
      id: 'fire-faq-6',
      question: 'Can maintenance be combined with CCTV AMC visits?',
      answer:
        'Visit timing can be coordinated for convenience, but fire device inspection records should remain part of your safety maintenance file, separate from general CCTV notes.',
    },
  ],

  imagePlaceholders: [
    {
      id: 'fire-panel',
      alt: 'Commercial fire alarm control panel with zone indicators',
      label: 'Fire alarm control panel',
    },
    {
      id: 'fire-detector',
      alt: 'Ceiling-mounted smoke detector in an office corridor',
      label: 'Smoke detector in a commercial corridor',
    },
  ],

  relatedLocations: [
    'hitech-city',
    'jubilee-hills',
    'begumpet',
  ],
  relatedProjects: [
    'office-hitech',
    'hospital-jubilee',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'office-cctv-installation',
    'hospital-cctv-installation',
    'hotel-cctv-installation',
    'school-college-cctv-installation',
    'access-control-systems',
    'cctv-amc-maintenance',
  ],

  seo: {
    title: 'Fire Alarm Systems in Hyderabad | AQ Enterprises',
    description:
      'Fire alarm detection and alerting for Hyderabad commercial sites. Complementary to CCTV; statutory approvals via licensed consultants where required. AQ Enterprises.',
    canonical: '/services/fire-alarm-systems',
    keywords: [
      'fire alarm systems Hyderabad',
      'commercial fire alarm installation',
      'smoke detector system office',
      'hotel fire alarm',
      'fire alarm and CCTV',
      'AQ Enterprises',
    ],
    ogTitle: 'Fire Alarm Systems in Hyderabad',
    ogDescription:
      'Detection and alerting for commercial sites — complementary to CCTV, with clear limits on statutory compliance claims.',
  },
};
