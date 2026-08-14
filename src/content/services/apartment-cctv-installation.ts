import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const apartmentCctvInstallation: Service = {
  id: 'apartment-cctv-installation',
  slug: 'apartment-cctv-installation',
  name: 'Apartment CCTV Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'CCTV for apartment societies in Hyderabad — lobby, gates, parking, lifts, and association-ready recording with clear handover.',
  h1: 'Apartment & Society CCTV Installation in Hyderabad',
  hero: {
    eyebrow: 'Housing societies',
    headline: 'Apartment CCTV built for shared spaces and association decisions',
    subheadline:
      'Lobbies, gates, parking, and lift areas need coverage the whole society can rely on. AQ Enterprises installs systems associations can operate and maintain.',
    image: {
      id: 'apartment-cctv-hero',
      alt: 'Apartment building lobby and entrance gate with CCTV cameras for society common-area surveillance',
      label: 'Apartment society CCTV',
    },
  },
  introduction: `Apartment security is a shared problem. Residents care about the main gate and basement parking; associations care about fair coverage, accountable footage access, and a system that does not become orphaned when the managing committee changes. Lift lobbies, stairwells, and visitor entry paths create blind spots that a single “watchman camera” never really solved.

AQ Enterprises designs and installs CCTV for housing societies and apartment complexes in Hyderabad with those realities in mind. We plan common-area coverage — not private flat interiors — and configure recording so authorised office bearers or facility staff can retrieve clips without depending on one resident’s personal login.

If your society is also considering door phones, intercoms, or gate access control, we can sequence those projects so cabling and control-room placement stay coherent.`,
  whatIs: {
    heading: 'What apartment CCTV installation means',
    body: `Apartment or society CCTV installation covers the survey of common areas, selection of cameras for outdoor gates and indoor lobbies, installation of a central recorder (often in a security room or association office), structured cabling across blocks where needed, and configuration of viewing rights for authorised roles.

Typical zones include the main gate and visitor entry, pedestrian wickets, stilt or basement parking aisles, ground-floor lobbies, lift lobbies on selected floors, stair fire exits, and amenity edges such as clubhouse approaches when the association requests them. Cameras are not aimed into individual flats.

The deliverable is not only hardware: associations need a camera map, credential ownership clarity, and retention settings that match how disputes and incidents are reviewed in community living.`,
  },
  whoNeeds: {
    heading: 'Who typically commissions society CCTV',
    intro: 'Most apartment CCTV projects are association-led, sometimes with builder handover upgrades when older kits fail.',
    items: [
      'Apartment associations replacing ageing or incomplete camera systems at gates and parking.',
      'New societies fitting out security rooms before occupancy ramps up.',
      'Complexes with multi-block layouts that need consistent coverage standards across towers.',
      'Communities dealing with parking disputes, package theft concerns, or unclear visitor logs.',
      'Societies preparing to add access control or intercoms and wanting CCTV aligned to those doors.',
      'Facility managers who need a documented system rather than ad-hoc resident-owned kits.',
    ],
  },
  commonProblems: {
    heading: 'Common apartment CCTV failures',
    intro: 'Shared systems fail operationally when nobody owns passwords, maps, or maintenance.',
    items: [
      'Gate cameras present, but basement parking aisles and lift lobbies left dark or uncovered.',
      'Recorder sitting in an unlocked guard cabin with a single shared password written on tape.',
      'No footage available for the date of a complaint because retention was never planned.',
      'Cameras added block-by-block over years with mixed brands and no central monitoring logic.',
      'Committee members unable to export clips when the one “technical” resident moves out.',
      'Cabling hanging in parking basements, vulnerable to vehicles and humidity.',
    ],
  },
  ourSolution: {
    heading: 'How we deliver society-ready CCTV',
    body: `We meet association representatives on site and walk the resident journey: vehicle gate, pedestrian entry, parking levels, lobby, lifts, and exits. Builder drawings help, but walking the property reveals columns, dark corners, and mounting constraints that drawings miss.

The proposal groups cameras by zone and explains what each view is for — visitor identification at the gate versus wide parking aisle context, for example. We recommend durable outdoor cameras for gates and weather-exposed edges, and suitable dome or equivalent cameras for lobbies, using brands commonly supported in Hyderabad such as Hikvision, CP Plus, Dahua, Uniview, and others as fit requires.

Installation is coordinated around society rules for drilling, shaft access, and working hours. Configuration emphasises role separation: security may have live view; office bearers may have playback export rights. Handover includes a camera map and guidance on password custody so the next committee is not locked out of its own system.`,
  },
  systemOptions: {
    heading: 'System options for apartments',
    intro: 'Scale depends on towers, parking depth, and how centralised your security desk is.',
    options: [
      {
        name: 'Gate and lobby essential set',
        description:
          'Prioritises main vehicle and pedestrian gates plus ground-floor lobby coverage, with a recorder sized for the association’s review habits.',
        suitableFor: 'Smaller societies or phased first upgrades',
      },
      {
        name: 'Gate, parking, and lift-lobby package',
        description:
          'Adds stilt or basement aisle cameras and selected lift lobby floors so common vertical circulation is not a blind corridor after the gate.',
        suitableFor: 'Mid-size apartment complexes',
      },
      {
        name: 'Multi-block centralised monitoring',
        description:
          'Standardised camera plans per block feeding a central security room where practical, with labelling and maps that work for multi-tower sites.',
        suitableFor: 'Larger gated apartment communities',
      },
      {
        name: 'CCTV with entry-system alignment',
        description:
          'Camera views planned alongside video door phones, intercoms, or access control at gates and lobbies so visitor events and video stay connected.',
        suitableFor: 'Societies upgrading multiple security layers',
      },
    ],
  },
  keyFeatures: {
    heading: 'Features associations care about',
    items: [
      'Common-area focus — gates, parking, lobbies, and lifts — not flat interiors.',
      'Central recorder placement suitable for a security room or association office.',
      'User roles for security staff versus committee playback access.',
      'Retention planning discussed openly with association decision-makers.',
      'Cable routing suited to basements and outdoor gate structures.',
      'Camera maps and labelling for committee handovers.',
      'Day/night performance considered for poorly lit parking levels.',
      'Upgrade path for intercoms, door phones, and access control.',
    ],
  },
  benefits: {
    heading: 'Benefits for residents and associations',
    items: [
      'Clearer evidence for gate and parking incidents without relying on memory alone.',
      'A system the association can operate after committee changes.',
      'More consistent coverage across blocks instead of uneven DIY additions.',
      'Better visitor accountability when paired with disciplined gate processes.',
      'Reduced orphaned equipment when passwords and maps are documented.',
      'A foundation for broader society security upgrades over time.',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended society configurations',
    intro: 'Final counts depend on gates, parking floors, and tower count — confirmed on survey.',
    configs: [
      {
        name: 'Single-block society',
        description:
          'Cameras at the gate set, ground lobby, parking level aisles, and key exits, with one NVR in the security room and retention agreed in the association quotation.',
        suitableFor: 'Compact apartment communities',
      },
      {
        name: 'Multi-tower complex',
        description:
          'Per-tower lobby and parking coverage with shared gate cameras, centralised monitoring where distances allow, and structured labelling across blocks.',
        suitableFor: 'Larger Hyderabad apartment communities',
      },
      {
        name: 'Parking-priority upgrade',
        description:
          'Focuses new cameras on basement or stilt aisles and ramp turns while retaining or refreshing gate views — common when older systems ignored vehicle areas.',
        suitableFor: 'Societies with recurring parking complaints',
      },
    ],
  },
  installationProcess: {
    heading: 'Installation process for apartment societies',
    intro: 'We work with association timings, security staff, and building permissions.',
    steps: standardProcessSteps({
      survey:
        'We walk gates, visitor paths, parking levels, lobbies, and lift areas with association or facility contacts, note mounting and cable constraints, and agree which common zones are in scope for this phase.',
      installation:
        'Cameras and cabling are installed across agreed common areas with basement-safe routing and outdoor protection at gates; the recorder is placed in a controlled security or association space.',
      configuration:
        'Live view for security, playback rights for authorised office bearers, retention settings, and remote access (if approved by the association) are configured with clear credential ownership.',
      testing:
        'We verify gate identification angles, parking aisle clarity, lobby coverage, recorder storage, and that authorised users can find and export footage before sign-off.',
      handover:
        'The association receives a camera map, account guidance, and a practical demo for security and committee representatives so the system survives the next handover of office bearers.',
    }),
  },
  maintenance: {
    heading: 'Maintaining society CCTV',
    body: `Apartment systems suffer when no budget line exists for disks, cleaning, and password updates. Basement cameras collect dust; outdoor gate housings face sun and rain; staff turnover resets informal knowledge.

Associations benefit from a simple annual checklist: confirm all cameras online, test playback for a known date, review who holds admin access, and inspect exposed basement cables. Our CCTV AMC can formalise that rhythm. Between visits, security should report black screens immediately rather than waiting for the next general body meeting.

If the society renovates the lobby or re-stripes parking, call for an angle review — layout changes often obsolete old views.`,
  },
  brands: {
    heading: 'Brands for apartment projects',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why associations choose AQ Enterprises',
    items: [
      'Society-aware design focused on common areas and committee operability.',
      'Documentation that helps the next managing committee, not only the current one.',
      'Practical coordination with security room workflows and guard viewing habits.',
      'Cleaner upgrade path to intercoms, video door phones, and access control.',
      'Honest phasing options when budgets require gate-first or parking-first rollouts.',
      'Local support across Hyderabad apartment communities for service calls.',
    ],
  },
  hyderabadCoverage: {
    heading: 'Apartment communities in Hyderabad',
    body: `We install and upgrade society CCTV across Hyderabad apartment communities — from compact single-block associations to multi-tower gated complexes. Permissions, working hours, and security desk locations differ by property, so those details are collected early.

If your builder left a partial system, we assess what is worth keeping versus replacing so the association does not pay twice for the same blind spots.`,
  },
  cta: {
    heading: 'Discuss CCTV for your society',
    body: 'Share your number of blocks, parking levels, and whether a security room already exists. We will schedule a survey with association or facility contacts.',
    primaryLabel: 'Request a society survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'apartment-cctv-faq-1',
      question: 'Do you install cameras inside individual flats?',
      answer:
        'No — apartment society projects focus on common areas such as gates, parking, lobbies, and lifts. Flat interiors are a separate home CCTV discussion with the resident, not the association scope.',
      status: 'published',
    },
    {
      id: 'apartment-cctv-faq-2',
      question: 'Who should hold the CCTV admin password?',
      answer:
        'Typically a small set of association office bearers or a designated facility manager — not a password shared with every guard shift. We help you set role-based access during handover.',
      status: 'published',
    },
    {
      id: 'apartment-cctv-faq-3',
      question: 'Can guards have live view without export rights?',
      answer:
        'Yes. Many societies give security live monitoring while restricting playback export to authorised committee members. We configure that separation when requested.',
      status: 'published',
    },
    {
      id: 'apartment-cctv-faq-4',
      question: 'How do you handle multi-tower cabling?',
      answer:
        'During survey we assess distances, existing conduits, and whether a central security room can host recording or whether block-wise recorders are more practical. The design follows the site, not a single template.',
      status: 'published',
    },
    {
      id: 'apartment-cctv-faq-5',
      question: 'Should we add intercoms at the same time?',
      answer:
        'If the association is already budgeting for intercoms or video door phones, planning cable routes together reduces repeated civil work. Related services can be phased if needed.',
      status: 'published',
    },
    {
      id: 'apartment-cctv-faq-6',
      question: 'What retention period should a society choose?',
      answer:
        'It depends on how long complaints typically take to surface and on disk capacity. We discuss realistic options in the quotation rather than implying unlimited storage.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'apartment-cctv-parking',
      alt: 'Apartment basement parking aisle with overhead CCTV cameras covering vehicle lanes',
      label: 'Parking aisle cameras',
    },
    {
      id: 'apartment-cctv-lobby',
      alt: 'Apartment ground-floor lobby and lift entrance under society CCTV monitoring',
      label: 'Lobby and lifts',
    },
  ],
  relatedServices: [
    'home-cctv-installation',
    'video-door-phone-installation',
    'access-control-systems',
    'intercom-systems',
    'cctv-amc-maintenance',
    'ip-camera-installation',
  ],
  relatedLocations: [
    'gachibowli',
    'kondapur',
    'kukatpally',
    'nanakramguda',
  ],
  relatedProjects: [
    'apartment-gachibowli',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'Apartment CCTV Installation in Hyderabad | AQ Enterprises',
    description:
      'Apartment and society CCTV in Hyderabad — gates, lobby, parking and lift coverage with association-ready setup. Survey and install by AQ Enterprises.',
    canonical: '/services/apartment-cctv-installation',
    keywords: [
      'apartment CCTV installation Hyderabad',
      'housing society CCTV',
      'apartment parking CCTV',
      'society gate camera installation',
      'lobby CCTV for apartments',
      'apartment complex surveillance',
      'association CCTV system Hyderabad',
    ],
  },
};
