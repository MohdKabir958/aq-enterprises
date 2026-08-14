import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const ipCameraInstallation: Service = {
  id: 'ip-camera-installation',
  slug: 'ip-camera-installation',
  name: 'IP Camera Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'IP camera and NVR installation in Hyderabad — PoE networking, resolution planning, remote app access, and network readiness for homes and businesses.',
  h1: 'IP Camera Installation in Hyderabad',
  hero: {
    eyebrow: 'IP & NVR systems',
    headline: 'IP cameras built on clear networking and recording',
    subheadline:
      'From PoE switches and NVR storage to remote phone apps — AQ Enterprises installs IP CCTV across Hyderabad with resolution and network readiness planned up front.',
    image: {
      id: 'ip-camera-hero',
      alt: 'IP camera and NVR recorder setup for networked CCTV',
      label: 'IP camera and NVR rack concept (placeholder)',
    },
  },
  introduction: `IP cameras send video over a network instead of relying only on older analogue coax chains. That shift brings sharper resolution options, flexible placement when PoE is available, and remote viewing that fits how people actually check property today — on a phone between meetings or after hours. It also introduces network responsibilities: switch capacity, cable quality, IP addressing, and storage planning on an NVR.

AQ Enterprises installs IP camera systems for homes, offices, and commercial sites in Hyderabad. We treat the network path as part of the security design, not an afterthought. A 4K camera on a weak cable or congested Wi-Fi hop will disappoint; a well-planned 2MP or 4MP layout on clean PoE often serves better day to day.

This service page is about the IP stack itself — cameras, NVR, PoE, app access, and resolution choices — whether the property is a villa, a shop, or a multi-floor office. Site-type pages (home, office, retail, and others) go deeper on placement habits for those spaces; here we focus on getting the technology foundation right.`,

  whatIs: {
    heading: 'What IP camera installation involves',
    body: `IP camera installation covers selecting network cameras, providing Power over Ethernet where suitable, terminating structured cable to a switch or NVR with built-in PoE, configuring recording and user accounts, and enabling remote access when the customer wants it. The NVR (network video recorder) stores footage locally; internet is required for remote live view and alerts, not for basic on-site recording.

Resolution planning means matching megapixels and lens fields of view to the job: recognising a face at a gate is different from overviewing a warehouse aisle. Higher resolution increases storage and bandwidth needs. We size disks and discuss retention so you are not surprised when footage overwrites sooner than expected.

Network readiness includes checking whether existing LAN can host cameras, whether a dedicated PoE switch is wiser, and how to keep camera traffic from degrading office Wi-Fi for laptops. For larger sites we often recommend separating camera traffic with guidance from your IT contact. Wireless bridges or Wi-Fi cameras are a different trade-off covered under our wireless CCTV service; pure IP over copper or fibre remains the reliability baseline for most permanent installs.`,
  },

  whoNeeds: {
    heading: 'Who needs a proper IP camera install',
    items: [
      'Homeowners moving from kits that never quite worked remotely',
      'Offices standardising on NVR-based recording with staff accounts',
      'Retailers and warehouses needing clearer digital zoom on playback',
      'Sites ready to replace ageing DVR and analogue cameras',
      'Projects that already have or want structured LAN for PoE cameras',
      'Anyone pairing fixed IP cameras with selective PTZ on large open areas',
    ],
  },

  commonProblems: {
    heading: 'Common IP CCTV pitfalls',
    items: [
      'Buying high-resolution cameras without calculating NVR storage',
      'Running cameras on random Wi-Fi instead of planned PoE cable',
      'PoE switch power budget exceeded after adding more devices',
      'Remote app that works on day one and fails after a router change',
      'Flat network where cameras are reachable by every guest laptop',
      'Mixed brands and protocols that complicate a single NVR plan',
      'No labeling on patch panels when a single channel fails months later',
    ],
  },

  ourSolution: {
    heading: 'How AQ Enterprises delivers IP camera projects',
    body: `We start with use cases: what must be identifiable, how many days of retention you want, who may view live video, and whether the site already has clean LAN paths. From that we propose camera resolutions, NVR channel count, disk sizing, and PoE switch needs. Brand options such as Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, or Panasonic are matched to the site rather than forced as a single default.

Cabling follows structured practices — neat routes, correct connectors, labeled ends — especially when commercial LAN work is part of the project. Cameras are addressed and named logically (gate, lobby, store) so the app and NVR tree stay understandable.

Configuration includes recording schedules, motion zones where useful, user accounts, and remote access method appropriate to the premises. We test day/night image quality, confirm storage is actually writing, and verify phone app login with you present when possible.

If wireless segments or solar-powered edge cameras are needed for a difficult span, we say so honestly and may steer that portion to the right service mix. IP over good cable remains our preference for mission-critical views.`,
  },

  systemOptions: {
    heading: 'IP system options',
    intro: 'Choose a topology that matches property size and IT comfort.',
    options: [
      {
        name: 'PoE NVR kit for compact sites',
        description:
          'NVR with built-in PoE ports for a modest camera count, suitable when the recorder can sit near a central cable bundle.',
        suitableFor: 'Homes, small offices, and compact shops',
      },
      {
        name: 'PoE switch + NVR architecture',
        description:
          'Separate PoE switching for larger camera counts, cleaner expansion, and better power budgeting across floors.',
        suitableFor: 'Multi-floor offices and commercial floors',
      },
      {
        name: 'Resolution-led evidence design',
        description:
          'Higher detail at gates and counters, efficient overview cameras elsewhere, with storage calculated to match.',
        suitableFor: 'Sites that review faces and plates more than empty yards',
      },
      {
        name: 'IT-coordinated segmented network',
        description:
          'Camera VLAN or dedicated switching agreed with your IT contact so surveillance traffic stays manageable.',
        suitableFor: 'Offices and campuses with existing network policy',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features of our IP installs',
    items: [
      'Resolution and retention planning before hardware purchase',
      'PoE power budget checked against camera load',
      'Labeled cabling and logical channel naming',
      'NVR accounts for owners, managers, or security roles',
      'Remote app setup with a practical recovery path after router changes',
      'Day/night and storage write verification at handover',
      'Clear advice when wireless is a weak substitute for cable',
    ],
  },

  benefits: {
    heading: 'Benefits of a well-built IP system',
    items: [
      'Clearer playback for the moments that matter',
      'Scalable channel growth when the property expands',
      'Local recording that continues if internet drops',
      'Remote checks when you are away from the site',
      'Easier fault isolation with labeled network paths',
      'A foundation that works with future PTZ or access projects',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended IP configurations',
    intro: 'Numbers are planning guides; survey results decide the final bill of materials.',
    configs: [
      {
        name: 'Home / small office IP stack',
        description:
          'Four to eight PoE cameras, compact NVR, retention sized for typical residential or small-office review habits, owner app access.',
        suitableFor: 'Villas, apartments with permission, and small offices',
      },
      {
        name: 'Commercial floor IP stack',
        description:
          'PoE switch, rack or cupboard NVR, mixed resolution plan for entry versus open floor, multiple user accounts.',
        suitableFor: 'Offices, clinics, and mid-size retail',
      },
      {
        name: 'Campus / multi-building IP backbone',
        description:
          'Structured cabling emphasis, possibly fibre uplinks between buildings, NVR strategy per block or centralised as the network allows.',
        suitableFor: 'Larger commercial and institutional sites',
      },
    ],
  },

  installationProcess: {
    heading: 'IP camera installation process',
    intro: 'Network and recording decisions are locked early so installation day is execution, not improvisation.',
    steps: standardProcessSteps({
      survey:
        'We assess camera purposes, mounting points, cable routes, PoE power needs, NVR location, internet quality for remote view, and whether existing LAN can be used or should be extended.',
      installation:
        'Cameras, PoE switching, NVR, and structured cabling are installed with neat routing and labeling. Outdoor cameras use appropriate housings and weather-aware mounts.',
      configuration:
        'IP addressing, channel names, recording schedules, motion settings, user accounts, and remote app access are configured to match how you will actually review footage.',
      testing:
        'We verify image clarity day and night, confirm continuous recording and retention behaviour, test remote login, and check that PoE devices remain stable under load.',
      handover:
        'You receive a walkthrough of live view, playback, user roles, and what to do if the router or phone changes — plus basic cable and NVR health checks to watch for.',
    }),
  },

  maintenance: {
    heading: 'Maintaining IP cameras and NVRs',
    body: `IP systems fail in quieter ways than a dangling analogue cable: a full disk that never alerted anyone, a PoE port that died, a DNS or router change that breaks the app, or a switch reboot that leaves cameras on old leases. Periodic checks of recording status, disk health, and remote login catch these early.

Firmware updates should be deliberate, not automatic surprises on a Friday night. Password rotation when staff leave matters more on networked cameras than on isolated DVRs of the past.

AMC visits, repair troubleshooting, and commercial LAN tidy-ups all support long-term IP reliability. When you add cameras later, re-check PoE budgets and NVR licenses or channel capacity before mounting the next dome.`,
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
    heading: 'Why choose AQ Enterprises for IP CCTV',
    items: [
      'Network-aware design, not camera-only selling',
      'Honest resolution versus storage trade-offs',
      'Clean PoE and labeling practices',
      'Remote app setup with real handover',
      'Fits homes and commercial sites without forcing one kit',
      'Local Hyderabad support when something drifts after month three',
    ],
  },

  hyderabadCoverage: {
    heading: 'IP camera installation across Hyderabad',
    body: `We deploy IP CCTV across Hyderabad residences, offices, and commercial properties. Building rules differ — some societies restrict corridor drilling, some IT parks require escorted vendor access, some older houses need creative cable paths. The survey surfaces those constraints early.

Share your property type, approximate camera count if you have one in mind, and whether you already have LAN or only power. We will recommend a PoE and NVR approach that matches the site. Surrounding localities are covered when the project justifies a proper visit.`,
  },

  cta: {
    heading: 'Get an IP camera plan that respects your network',
    body: 'Tell us about the property, how long you want to keep footage, and who needs app access. We will survey and propose cameras, NVR, and PoE that fit — without guessing prices on this page.',
    primaryLabel: 'Request an IP CCTV survey',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'ip-camera-faq-1',
      question: 'Do IP cameras need internet to record?',
      answer:
        'No. Recording to a local NVR continues without internet. Internet is needed for remote live view, remote playback, and cloud-style alerts if you use those features. A stable local network between cameras and NVR is what recording depends on.',
      relatedServices: ['ip-camera-installation'],
      status: 'published',
    },
    {
      id: 'ip-camera-faq-2',
      question: 'What is PoE and why does it matter?',
      answer:
        'Power over Ethernet delivers power and data on the same cable, reducing separate adapter clutter at each camera. PoE switch or NVR budgets must match camera consumption. Correct cable grade and length limits still apply.',
      relatedServices: ['ip-camera-installation', 'commercial-lan-cabling-networking'],
      status: 'published',
    },
    {
      id: 'ip-camera-faq-3',
      question: 'Is higher resolution always better?',
      answer:
        'Not always. Extra megapixels help when you need detail at a distance, but they consume more storage and bandwidth. Many sites do better with the right lens and angle at a moderate resolution than with a high-resolution camera aimed poorly.',
      relatedServices: ['ip-camera-installation'],
      status: 'published',
    },
    {
      id: 'ip-camera-faq-4',
      question: 'Can I view IP cameras on my phone?',
      answer:
        'Yes, when the NVR or camera platform is configured for remote access and your internet upload allows it. We set this up during commissioning and show you how to recover access after a router or SIM change.',
      relatedServices: ['ip-camera-installation'],
      status: 'published',
    },
    {
      id: 'ip-camera-faq-5',
      question: 'IP cameras versus wireless CCTV — which should I choose?',
      answer:
        'Wired PoE IP is usually more stable for permanent installs. Wireless helps in leased spaces or hard-to-cable spans, with trade-offs in interference and bandwidth. We recommend based on the site, not a slogan.',
      relatedServices: ['ip-camera-installation', 'wireless-cctv-installation'],
      status: 'published',
    },
    {
      id: 'ip-camera-faq-6',
      question: 'How much storage do I need on the NVR?',
      answer:
        'Storage depends on camera count, resolution, frame rate, recording mode, and how many days you want to retain. We estimate during design after those inputs are clear — fixed public numbers would mislead different sites.',
      relatedServices: ['ip-camera-installation', 'cctv-amc-maintenance'],
      status: 'published',
    },
  ],

  imagePlaceholders: [
    {
      id: 'ip-camera-poe',
      alt: 'PoE switch and IP camera cabling concept for CCTV network',
      label: 'PoE networking for IP cameras (placeholder)',
    },
    {
      id: 'ip-camera-app',
      alt: 'Remote mobile app viewing concept for IP CCTV NVR',
      label: 'Remote app viewing (placeholder)',
    },
  ],

  relatedLocations: [
    'hitech-city',
    'gachibowli',
    'banjara-hills',
  ],
  relatedProjects: [
    'office-hitech',
    'villa-banjara',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'home-cctv-installation',
    'office-cctv-installation',
    'wireless-cctv-installation',
    'ptz-camera-installation',
    'commercial-lan-cabling-networking',
    'cctv-amc-maintenance',
  ],

  seo: {
    title: 'IP Camera Installation in Hyderabad',
    description:
      'IP camera and NVR installation in Hyderabad with PoE, resolution planning, and remote app setup by AQ Enterprises.',
    canonical: '/services/ip-camera-installation',
    keywords: [
      'IP camera installation Hyderabad',
      'NVR CCTV setup',
      'PoE camera installation',
      'network camera system',
      'remote CCTV app',
    ],
  },
};
