import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const accessControlSystems: Service = {
  id: 'access-control-systems',
  slug: 'access-control-systems',
  name: 'Access Control Systems',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',

  summary:
    'Access control systems in Hyderabad — door controllers, RFID/card readers, restricted zones, and visitor-friendly entry workflows for offices, apartments, and care facilities.',

  h1: 'Access Control Systems in Hyderabad',

  hero: {
    eyebrow: 'AQ Enterprises · CCTV & Security',
    headline: 'Access Control for Doors and Restricted Zones',
    subheadline:
      'Door controllers, RFID/card readers, and practical visitor workflows for Hyderabad offices, apartments, and facilities that need clearer control over who enters where.',
    image: {
      id: 'access-hero',
      alt: 'RFID card reader and door controller installation at a commercial office entrance',
      label: 'Card reader and controlled door at an office entry',
    },
  },

  introduction: `Keys multiply, get copied, and rarely tell you who opened a door last Tuesday. An access control system replaces or supplements mechanical keys with credentials — RFID cards, fobs, PINs, or biometric readers — managed through door controllers that decide which doors open for which people at which times. For Hyderabad offices, apartment common areas, hospital admin blocks, and hotel staff corridors, the value is structured permission rather than a single lock for everyone.

AQ Enterprises designs access control around real movement: staff entries, server rooms, pharmacy stores, terrace doors, and basement parking gates. We pair readers with appropriate locks and exit devices, document zone maps, and align visitor processes so guests are not stuck outside while employees walk through freely. CCTV at the same doors remains complementary evidence; access control is about authorisation, not a substitute for cameras or manned security where those are needed.`,

  whatIs: {
    heading: 'What is an access control system?',
    body: `An access control system typically includes door controllers, readers at the entry side, electric locks or electromagnetic locks, exit buttons or free-egress hardware as required by safety practice, and management software or panels to enrol credentials and assign door rights. When a valid card or code is presented, the controller releases the lock for a short pulse; invalid attempts can be logged and, where integrated, correlated with camera views.

Restricted zones are simply doors with tighter schedules and smaller authorised groups — finance rooms, data closets, drug stores, exam cell rooms, or rooftop plant areas. Visitor workflows may use temporary cards, escort rules, or reception release, depending on how formal the site wants to be. Apartments often control lobby lifts or common facility doors; offices may segment floors and meeting wings.

We work with established security product lines used across Indian commercial projects — including options from brands such as Hikvision, Honeywell, Godrej, CP Plus, and others suited to the door hardware — and we size controllers to the number of doors rather than overselling enterprise platforms a small site will never administer.`,
  },

  whoNeeds: {
    heading: 'Who needs access control?',
    intro: 'If lost keys or uncontrolled tailgating create risk, structured credentials usually pay for themselves in fewer lock changes and clearer accountability.',
    items: [
      'Offices that need staff-only doors, server rooms, and after-hours schedules',
      'Apartment associations managing lobby, amenity, or terrace access for residents versus vendors',
      'Hospitals and clinics protecting pharmacies, records, and restricted clinical stores',
      'Hotels controlling staff corridors, stores, and back-of-house areas',
      'Schools and colleges securing exam cells, labs, and admin blocks',
      'Sites combining biometric attendance with door permissions for a unified entry experience',
    ],
  },

  commonProblems: {
    heading: 'Common access control problems',
    intro: 'Most frustrations come from incomplete door hardware planning or unclear visitor rules.',
    items: [
      'Readers installed without proper fail-safe/fail-secure lock selection for the door type',
      'No exit plan — people trapped by design that ignored egress needs',
      'Shared cards among contractors with no expiry or return process',
      'Overly complex software that nobody on site can administer after the installer leaves',
      'Doors controlled but CCTV angles missing, so incidents lack visual context',
      'Visitor processes that rely on shouting through glass instead of a defined reception release or temporary credential',
    ],
  },

  ourSolution: {
    heading: 'How AQ Enterprises designs access control',
    body: `We map doors into zones: public, staff, and restricted. Each door gets a credential method, lock type, exit method, and schedule. Controllers are placed in secure, ventilated locations with labelled cabling back to readers and locks. Enrolment lists are built with your admin owner — HR, facilities, or society manager — so card issuance has a named process.

Visitor workflows are written in plain language: reception unlock, temporary card with day’s validity, or escort-only zones. Where intercom or video door phone already exists, we discuss how guests call in and how staff release doors without weakening the controlled perimeter.

For hospitals and similar environments, we coordinate with your facilities team on which doors must remain aligned with life-safety expectations. We do not replace licensed fire or life-safety consultants; we install access hardware in a way that respects the egress approach you and those consultants define.`,
  },

  systemOptions: {
    heading: 'Access control options',
    intro: 'Scale from a few doors to multi-zone sites without forcing every customer onto the same architecture.',
    options: [
      {
        name: 'Single / few-door RFID control',
        description:
          'Controller and card readers for main staff door plus one or two restricted rooms. Simple schedules and card lists administered on site.',
        suitableFor: 'Small offices and clinics',
      },
      {
        name: 'Multi-door zone control',
        description:
          'Grouped doors for floors or departments with time schedules, holiday calendars, and clearer audit logs for facilities teams.',
        suitableFor: 'Mid-size offices and campuses',
      },
      {
        name: 'Card + biometric readers',
        description:
          'Higher assurance at sensitive doors using biometric confirmation or dual credentials, while keeping cards for general staff doors.',
        suitableFor: 'Server rooms, stores, finance',
      },
      {
        name: 'Apartment / society common access',
        description:
          'Resident credentials for lobby or amenity doors with vendor access windows managed by the association office.',
        suitableFor: 'Residential communities',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features we implement',
    items: [
      'Door controllers sized to reader and lock counts',
      'RFID/card or fob credentials with enrolment and revocation process',
      'PIN or biometric readers where the door risk justifies them',
      'Time schedules for shift doors and after-hours lockdown',
      'Restricted zone mapping with smaller authorised groups',
      'Visitor-friendly release paths via reception or temporary credentials',
      'Event logs for who opened which door when',
      'Neat cabling, labelled panels, and documentation for future AMC',
    ],
  },

  benefits: {
    heading: 'Benefits of structured access control',
    items: [
      'Stop relying on master keys that cannot be audited',
      'Revoke a lost card without changing every lock in the building',
      'Limit sensitive rooms to named groups on defined schedules',
      'Give facilities a log trail for dispute and incident review',
      'Align entry with CCTV and intercom for stronger overall security posture',
      'Support apartment and office visitor handling with less ad-hoc unlocking',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended configurations',
    intro: 'Door count and risk profile drive controller choice; these patterns are common in Hyderabad projects.',
    configs: [
      {
        name: 'Office starter',
        description:
          'Main staff door + server/store room on RFID, reception ability to release visitor entry, CCTV covering both doors, and a simple card register owned by admin.',
        suitableFor: 'SME offices',
      },
      {
        name: 'Apartment common areas',
        description:
          'Lobby or amenity doors on resident credentials, vendor time windows, and society office control of enrolment — coordinated with video door phone where present.',
        suitableFor: 'Residential societies',
      },
      {
        name: 'Hospital / clinic restricted stores',
        description:
          'Staff doors on cards; pharmacy or records on tighter groups and schedules; logs retained per your internal policy; camera coverage at restricted doors.',
        suitableFor: 'Healthcare facilities',
      },
    ],
  },

  installationProcess: {
    heading: 'Installation process',
    intro: 'Access control succeeds when door hardware, credentials, and admin ownership are completed together.',
    steps: standardProcessSteps({
      survey:
        'We inspect door types, swing, frames, power availability, and egress needs; list zones and who should pass each door; and note visitor paths from reception or gate.',
      installation:
        'Controllers, readers, locks, and exit devices are installed with neat cable routes, secure panel placement, and mechanical adjustments so doors latch reliably after electrification.',
      configuration:
        'Credentials, door schedules, zone rights, anti-misuse settings available on the platform, and admin accounts are configured to match your written access policy.',
      testing:
        'Every door is tested for unlock pulse, forced-door alerts if enabled, valid/invalid credential behaviour, and exit hardware function before go-live.',
      handover:
        'Facilities or HR learn enrolment, card blocking, schedule changes, and log export. You receive a door/zone list and panel labelling notes for service visits.',
    }),
  },

  maintenance: {
    heading: 'Maintenance and upkeep',
    body: `Access systems need mechanical and electronic attention. Door closers, strike alignment, and lock holding force affect whether a “valid card” feels reliable. Controllers need clean power and protected network paths if managed over LAN.

During AMC-style visits we check reader responsiveness, clean peripherals, verify that revoked cards stay revoked, and confirm backup of configuration where the platform supports it. After interior renovations, doors often go out of alignment — a quick re-adjust prevents “system blamed” tickets that are actually hardware binding.

Keep a living list of card holders. The technology cannot fix an outdated spreadsheet of who still works on site.`,
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
    heading: 'Why choose AQ Enterprises for access control',
    items: [
      'Zone-based design instead of random readers on convenient walls',
      'Visitor workflows that reception teams can actually run',
      'Coordination with biometric attendance, intercom, and CCTV when needed',
      'Documentation and labelling that make later service faster',
      'Hyderabad experience across offices, apartments, and institutional sites',
      'Clear boundary: we install access systems; statutory life-safety sign-offs stay with the appropriate licensed parties',
    ],
  },

  hyderabadCoverage: {
    heading: 'Hyderabad coverage',
    body: `We deploy access control across Hyderabad commercial and residential sites — including offices in Gachibowli and Hitech City, apartments in established neighbourhoods, and institutional facilities across the city. Surveys include door hardware checks so quotations reflect locks and cabling, not only readers.

Multi-building campuses can be phased: start with the highest-risk doors, then expand controllers as budgets allow.`,
  },

  cta: {
    heading: 'Map your doors and zones',
    body: 'Share how many doors need control and who should pass them. We will propose controllers, credentials, and a visitor process that fits your site.',
    primaryLabel: 'Request a site survey',
    primaryHref: '/#contact',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'access-faq-1',
      question: 'What is the difference between access control and biometric attendance?',
      answer:
        'Attendance records punches for timekeeping. Access control decides whether a door unlocks. They can share credentials or stay separate. Many offices use both: attendance at the staff entry and tighter access on server or store rooms.',
    },
    {
      id: 'access-faq-2',
      question: 'Can visitors enter without permanent cards?',
      answer:
        'Yes. Common patterns include reception release, temporary cards with short validity, or escort-only zones. We define the workflow with your front desk so guests are not stuck and controlled doors are not propped open.',
    },
    {
      id: 'access-faq-3',
      question: 'Will access control trap people inside during an emergency?',
      answer:
        'Egress must be designed correctly for each door type. We coordinate exit buttons and lock behaviour with your facilities requirements and do not override life-safety guidance from licensed fire consultants where they are engaged.',
    },
    {
      id: 'access-faq-4',
      question: 'Do I still need CCTV if I have access control?',
      answer:
        'Yes, for most sites. Access logs show credential use; cameras show what happened at the door — including tailgating. The two systems complement each other.',
    },
    {
      id: 'access-faq-5',
      question: 'Can apartment societies use access control?',
      answer:
        'Yes, typically on lobby, amenity, parking, or terrace doors with resident credentials managed by the association office. We keep administration realistic for volunteer or small facility teams.',
    },
    {
      id: 'access-faq-6',
      question: 'Which brands do you use for readers and controllers?',
      answer:
        'We commonly work with established lines used in Indian commercial projects, including options associated with Hikvision, Honeywell, Godrej, CP Plus, and similar. Final selection follows door count, features, and supportability.',
    },
  ],

  imagePlaceholders: [
    {
      id: 'access-panel',
      alt: 'Access control panel with labelled door controller wiring',
      label: 'Labelled access control panel',
    },
    {
      id: 'access-reader',
      alt: 'Wall-mounted RFID reader beside a restricted office door',
      label: 'RFID reader at a restricted door',
    },
  ],

  relatedLocations: [
    'hitech-city',
    'gachibowli',
    'financial-district',
    'jubilee-hills',
  ],
  relatedProjects: [
    'office-hitech',
    'apartment-gachibowli',
    'hospital-jubilee',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'biometric-attendance-systems',
    'office-cctv-installation',
    'apartment-cctv-installation',
    'hospital-cctv-installation',
    'intercom-systems',
    'cctv-amc-maintenance',
  ],

  seo: {
    title: 'Access Control Systems in Hyderabad | AQ Enterprises',
    description:
      'Access control installation in Hyderabad — door controllers, RFID/card readers, restricted zones, and visitor workflows for offices, apartments, and facilities. AQ Enterprises.',
    canonical: '/services/access-control-systems',
    keywords: [
      'access control systems Hyderabad',
      'RFID door access',
      'door controller installation',
      'office access control',
      'apartment access control',
      'AQ Enterprises security',
    ],
    ogTitle: 'Access Control Systems in Hyderabad',
    ogDescription:
      'Door controllers, RFID/cards, restricted zones, and practical visitor entry workflows for Hyderabad sites.',
  },
};
