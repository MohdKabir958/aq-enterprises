import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const officeCctvInstallation: Service = {
  id: 'office-cctv-installation',
  slug: 'office-cctv-installation',
  name: 'Office CCTV Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Office CCTV installation for IT and commercial workplaces in Hyderabad — reception, cabins, floors, and server rooms with accountable recording.',
  h1: 'Office CCTV Installation in Hyderabad',
  hero: {
    eyebrow: 'Workplace security',
    headline: 'Office CCTV that matches how your workplace actually runs',
    subheadline:
      'Reception, cabins, corridors, and sensitive rooms need different coverage. AQ Enterprises designs multi-floor office surveillance you can review with confidence.',
    image: {
      id: 'office-cctv-hero',
      alt: 'Modern office reception and corridor with discreet CCTV dome cameras for workplace monitoring',
      label: 'Office CCTV coverage',
    },
  },
  introduction: `An office is not a warehouse and not a home. People move through reception all day, meeting rooms host visitors who are not on payroll, open floors hold laptops and documents, and a small server or UPS room may be the one place you cannot afford ambiguity. Office CCTV should support accountability and incident review without turning the workplace into a theatre of cameras pointed at every desk.

AQ Enterprises installs CCTV for IT offices, professional firms, and multi-floor commercial units across Hyderabad with that balance in mind. We plan camera positions around entrances, lifts, corridors, cash or asset rooms, and other operational risk points — then configure recording and user access so managers can retrieve footage without wrestling with the system.

If you already have access control or attendance devices, we align camera views with those doorways so entry events and video tell the same story.`,
  whatIs: {
    heading: 'What office CCTV installation covers',
    body: `Office CCTV installation includes surveying the floor plate (or multiple floors), selecting camera types that suit ceilings and façades, installing a central recorder, integrating with the office network where appropriate, and configuring role-based viewing for authorised staff.

Typical coverage includes the main entrance and reception, lift lobbies, corridor junctions, emergency exits, parking or basement access if under your control, and rooms that hold servers, stock, or confidential materials. Cabin and open-office cameras are placed deliberately — often for aisle and entrance context rather than invasive desk-level monitoring — according to your policy.

A complete job also addresses power backup for the recorder, storage retention aligned with your review needs, and documentation of camera maps so HR or facilities can find the right view after an incident.`,
  },
  whoNeeds: {
    heading: 'Who needs office CCTV',
    intro: 'Workplace surveillance is most valuable when visitor traffic, assets, or after-hours access create accountability gaps.',
    items: [
      'IT and tech offices with frequent guests, vendors, and multi-team floor access.',
      'Professional firms that need a clear record of reception and cabin-floor movement.',
      'Companies operating across two or more floors who want consistent coverage standards.',
      'Teams protecting server rooms, store rooms, or equipment closets with limited natural oversight.',
      'Landlords or facility managers fitting out commercial units before tenants move in.',
      'Offices preparing to pair cameras with access control or biometric attendance at key doors.',
    ],
  },
  commonProblems: {
    heading: 'Problems we see in office CCTV setups',
    intro: 'Office systems often look complete on paper yet fail when someone needs yesterday’s footage from a specific corridor.',
    items: [
      'Reception covered, but fire exits and back staircases left blind.',
      'Cameras aimed at employee screens in ways that create privacy conflict without improving security.',
      'NVR placed in an unlocked cabin with no network segmentation or password discipline.',
      'Remote viewing shared widely, so footage access is not limited to authorised roles.',
      'No consideration for PoE switch capacity or cable lengths across long floor plates.',
      'Recording retention too short for the time it typically takes to notice and investigate an issue.',
    ],
  },
  ourSolution: {
    heading: 'Our approach to office surveillance',
    body: `We begin with a facilities walkthrough: entry sequence from the lift or lobby, visitor flow at reception, after-hours access paths, and rooms that hold higher-value or sensitive assets. Lighting, false ceilings, and existing network racks all influence whether we recommend dome cameras for corridors, bullets for external approaches, or specialised views for rack rooms.

The proposal explains coverage intent per zone — not just a camera count. We commonly recommend IP camera systems with PoE for cleaner multi-floor runs, and we coordinate with your IT contact when the recorder must sit on a managed network. Brands such as Hikvision, CP Plus, Dahua, Uniview, Honeywell, and others are selected for supportability and the features your floors need.

During installation we keep work hours disruption in mind, label endpoints, and leave a camera map. Configuration includes user accounts for facilities or admin roles, storage schedules, and optional alerts on critical doors. Handover is practical: how to export a clip, how to search by time, and who should hold the admin credentials.`,
  },
  systemOptions: {
    heading: 'Office CCTV system options',
    intro: 'Choose a pattern that matches floor count and sensitivity — we refine models and storage after survey.',
    options: [
      {
        name: 'Single-floor professional office',
        description:
          'Focused coverage of reception, main corridor, emergency exit, and one or two sensitive rooms, with a compact NVR suitable for a small team’s review habits.',
        suitableFor: 'Boutique firms and single-plate offices',
      },
      {
        name: 'Multi-floor IT / commercial suite',
        description:
          'Consistent camera standards per floor, centralised recording where possible, and attention to lift lobbies and inter-floor stair access. PoE networking planned with cable distances in mind.',
        suitableFor: 'Growing teams across multiple levels',
      },
      {
        name: 'Reception-plus-secure-room emphasis',
        description:
          'Heavier detail at visitor entry and rooms holding servers, samples, or confidential stock, with lighter contextual coverage in open work areas per your policy.',
        suitableFor: 'Offices with clear high-risk rooms',
      },
      {
        name: 'CCTV ready for access control pairing',
        description:
          'Camera views aligned to controlled doors so entry events can be reviewed alongside video. Cabling routes considered for future readers and locks even if access control is phased.',
        suitableFor: 'Workplaces planning door security upgrades',
      },
    ],
  },
  keyFeatures: {
    heading: 'Key features of our office installs',
    items: [
      'Zone-based camera plans for reception, corridors, exits, and sensitive rooms.',
      'IP/PoE options suited to multi-floor commercial cabling.',
      'Role-aware remote and local viewing for authorised staff.',
      'Recorder placement with power stability and physical access in mind.',
      'Camera maps and labelling for faster incident review.',
      'Motion and schedule settings that match office hours and after-hours risk.',
      'Coordination with LAN cabling when new network paths are required.',
      'Optional alignment with biometric or access-control door points.',
    ],
  },
  benefits: {
    heading: 'Benefits for workplace managers',
    items: [
      'Faster, clearer incident review when something happens at reception or on a floor.',
      'Better accountability for after-hours entry and vendor movement.',
      'Reduced ambiguity around server-room or store-room access.',
      'A documented system that facilities can hand over when staff change.',
      'Scalable design so a second floor or cabin wing can be added without starting over.',
      'Cleaner integration path with attendance and door control projects.',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended office configurations',
    intro: 'Baselines for planning discussions; exact counts depend on floor geometry and policy.',
    configs: [
      {
        name: 'Small office plate',
        description:
          'Eight to twelve cameras typically cover reception, corridors, exits, and key rooms on a single floor, with retention planned for routine managerial review windows.',
        suitableFor: 'Teams on one commercial floor',
      },
      {
        name: 'Multi-floor workplace',
        description:
          'Per-floor corridor and lobby sets feeding a central NVR (or coordinated recorders), with dedicated views for shared server or UPS rooms and basement or parking links if applicable.',
        suitableFor: 'IT offices and larger commercial suites',
      },
      {
        name: 'Security-operations ready',
        description:
          'Higher retention, stricter user roles, and camera placement designed for a facilities or security desk to monitor live views during working hours.',
        suitableFor: 'Offices with dedicated admin or security staff',
      },
    ],
  },
  installationProcess: {
    heading: 'Office installation process',
    intro: 'We schedule around your working hours as much as practical and keep communication clear with office contacts.',
    steps: standardProcessSteps({
      survey:
        'We map reception flow, cabin corridors, server or store rooms, emergency exits, and multi-floor transitions, then agree which zones need detail versus contextual coverage under your workplace policy.',
      installation:
        'Cameras, PoE or power runs, and the recorder are installed with tidy ceiling and shaft routing suitable for commercial interiors, minimising disruption to occupied desks where possible.',
      configuration:
        'User roles, recording retention, office-hour schedules, and remote access for authorised managers are configured; critical rooms can receive tighter motion or alert settings.',
      testing:
        'We verify corridor and reception clarity, night or low-light performance in windowless areas, storage health, and that the right people can open live view and export clips.',
      handover:
        'Facilities or admin contacts receive a camera map, credential guidance, and a short training on search and export so investigations do not depend on the installer being on call.',
    }),
  },
  maintenance: {
    heading: 'Office CCTV maintenance',
    body: `Commercial ceilings collect dust, and firmware or password hygiene is often neglected after the first month. Periodic checks of recorder disks, camera focus after AC or false-ceiling work, and user-account audits keep the system trustworthy.

If your office already has an IT ticketing culture, treat CCTV health like any other critical appliance: note when a camera goes offline and avoid sharing admin passwords in group chats. Our AMC service can include scheduled inspections; otherwise we support break-fix repairs and expansions when floors are reconfigured.

Major interior renovations are the right moment to revisit angles — new partitions frequently blind previously good cameras.`,
  },
  brands: {
    heading: 'Brands for commercial office projects',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty terms',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why AQ Enterprises for office CCTV',
    items: [
      'Workplace-aware design that respects both security and staff privacy expectations.',
      'Experience planning multi-floor camera and cabling routes in commercial buildings.',
      'Clear documentation for facilities handovers when managers change.',
      'Natural pairing with access control, biometrics, and structured LAN cabling.',
      'Practical configuration — retention and users set for how offices actually investigate issues.',
      'Local Hyderabad support for expansions when you take additional floor space.',
    ],
  },
  hyderabadCoverage: {
    heading: 'Offices across Hyderabad',
    body: `We work with offices in commercial hubs and neighbourhood business districts across Hyderabad. Building rules vary — some properties restrict shaft access hours or require society/builder permissions for corridor work — so we factor those constraints into scheduling during the survey conversation.

Whether you occupy a single plate or a multi-level suite, the camera plan is written for your floors, not a generic “office pack.”`,
  },
  cta: {
    heading: 'Plan CCTV for your office',
    body: 'Tell us your floor count, whether you control reception and exits, and if server or store rooms need priority. We will arrange a survey with your facilities contact.',
    primaryLabel: 'Book an office survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'office-cctv-faq-1',
      question: 'Should every employee desk be under a camera?',
      answer:
        'Not usually. Most offices gain more from entrance, corridor, exit, and sensitive-room coverage. Desk-level monitoring can create privacy issues without improving incident evidence. We align placement with your written policy during the survey.',
      status: 'published',
    },
    {
      id: 'office-cctv-faq-2',
      question: 'Can CCTV work with our door access system?',
      answer:
        'Yes. We can aim cameras at controlled doors so video supports access events. If you are installing access control or biometrics at the same time, planning both together reduces duplicate cabling work.',
      status: 'published',
    },
    {
      id: 'office-cctv-faq-3',
      question: 'Where should the NVR be kept in an office?',
      answer:
        'In a restricted room with stable power — often near the network rack or in a locked admin area. Leaving the recorder under a reception desk is common and risky. We recommend placement during the survey.',
      status: 'published',
    },
    {
      id: 'office-cctv-faq-4',
      question: 'Do you work after office hours for installation?',
      answer:
        'When the site requires it, we schedule disruptive cable pulls outside peak hours. Exact timing depends on building access rules and your team’s availability.',
      status: 'published',
    },
    {
      id: 'office-cctv-faq-5',
      question: 'How long should we keep office recordings?',
      answer:
        'Retention depends on how long issues typically take to surface in your workplace and on disk capacity. We discuss realistic windows during design rather than promising indefinite storage.',
      status: 'published',
    },
    {
      id: 'office-cctv-faq-6',
      question: 'Can managers view cameras from home?',
      answer:
        'Authorised remote viewing can be configured. We recommend limiting accounts to people who truly need them and keeping admin credentials separate from day-to-day viewing logins.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'office-cctv-reception',
      alt: 'Office reception desk and visitor waiting area under CCTV surveillance',
      label: 'Reception coverage',
    },
    {
      id: 'office-cctv-server',
      alt: 'Server or network room doorway monitored by a dedicated indoor CCTV camera',
      label: 'Server room view',
    },
  ],
  relatedServices: [
    'access-control-systems',
    'biometric-attendance-systems',
    'ip-camera-installation',
    'commercial-lan-cabling-networking',
    'cctv-amc-maintenance',
    'fire-alarm-systems',
  ],
  relatedLocations: [
    'hitech-city',
    'gachibowli',
    'financial-district',
    'madhapur',
  ],
  relatedProjects: [
    'office-hitech',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'Office CCTV Installation in Hyderabad | AQ Enterprises',
    description:
      'Office CCTV installation in Hyderabad for IT workplaces — reception, cabins, multi-floor corridors and server rooms. Survey-led design by AQ Enterprises.',
    canonical: '/services/office-cctv-installation',
    keywords: [
      'office CCTV installation Hyderabad',
      'IT office CCTV cameras',
      'commercial CCTV Hyderabad',
      'workplace surveillance system',
      'multi-floor office CCTV',
      'server room CCTV installation',
      'office security cameras Hyderabad',
    ],
  },
};
