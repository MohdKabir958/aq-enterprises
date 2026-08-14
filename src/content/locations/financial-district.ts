import type { Location } from '@/types';
import { locationProcessSteps, maintenanceBody } from './_shared';

export const financialDistrictLocation: Location = {
  id: 'financial-district',
  slug: 'financial-district',
  name: 'Financial District',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Corporate CCTV, access control, and networking for Financial District campus workplaces — finance and office corridors distinct from Nanakramguda residential edges.',
  h1: 'CCTV Installation in Financial District, Hyderabad',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  hero: {
    eyebrow: 'Financial District service area',
    headline: 'Campus-corridor CCTV for finance and corporate workplaces',
    subheadline:
      'AQ Enterprises plans IP surveillance, access control, and related systems for Financial District office campuses — Wave Rock–style corporate character, surveyed on site and supported from Mallapur.',
    image: {
      id: 'financial-district-location-hero',
      alt: 'Large corporate campus buildings and landscaped office approaches suggesting Financial District workplace security planning',
      label: 'Financial District campuses',
    },
  },
  introduction: `Hyderabad’s Financial District is defined by large corporate and finance campuses — wide approaches, multi-building clusters, formal lobbies, and facility teams that treat security as an operations discipline. The character is closer to Wave Rock–scale campus planning than to a neighbourhood apartment street. Briefs usually start with perimeter and lobby visibility, staff doors, restricted floors, and network-stable IP cameras — not family gate kits.

AQ Enterprises serves the Financial District as a workplace service area from Mallapur. We do not claim a campus branch office here. Surveys focus on how employees and visitors move, where building management already owns shared cameras, and what the tenant must cover on their own floors. That differs from Nanakramguda’s residential-and-spillover mix and from DLF Cyber City’s campus-brand context; those pages stay separate so copy and recommendations do not blur.

If your requirement is an apartment or gated home on the district’s residential edge, use the Nanakramguda page and residential services. This page stays corporate: office CCTV, access control, biometrics, LAN, PTZ where large approaches need it, fire-alarm-aware mounting, and AMC for systems that run every weekday.`,
  propertyTypes: {
    heading: 'Workplace types in the Financial District',
    intro: 'Campus and corporate patterns that drive system design in this corridor.',
    items: [
      'Multi-building finance and corporate campuses with formal arrival plazas and lobbies.',
      'Tenant office floors inside large campus towers with shared building infrastructure.',
      'Meeting centres, training rooms, and executive floors needing discreet but reliable coverage.',
      'Basement and surface parking managed with facilities and security teams.',
      'Restricted areas — treasury-adjacent rooms, data rooms, or document zones — with layered access.',
      'Outdoor campus paths and plaza edges where PTZ or carefully aimed fixed cameras may help.',
    ],
  },
  securityRequirements: {
    heading: 'Security requirements on finance campuses',
    intro: 'Scale and formality change how cameras and access should be planned.',
    items: [
      'Clear split between landlord/common cameras and tenant-owned floor systems.',
      'Visitor management that pairs reception process with lobby and lift-bank recording.',
      'Role-based viewing for security operations versus department managers.',
      'Network design that keeps camera traffic predictable on campus LAN segments.',
      'Outdoor approaches with sun glare, landscaping motion, and monsoon exposure.',
      'Documentation suitable for audits and facility handover when teams change.',
    ],
  },
  recommendedSolutions: {
    heading: 'Recommended campus solutions',
    body: `Office IP CCTV with storage sized for campus weekday volume is the core. Access control on staff and restricted doors, plus biometric attendance where workforce logging is required, keeps entry events aligned with video. Commercial LAN cabling supports clean camera and controller connectivity in large buildings. PTZ can cover plaza-scale outdoor movement when fixed lenses would multiply too quickly; fire alarm systems on site should be respected when choosing mount and cable paths.

AMC matters because campus outdoor units and busy lobbies collect dust and configuration drift. We do not treat Financial District as a residential catalogue page — apartments and gated communities on the edge belong under Nanakramguda or home/apartment services so recommendations stay honest.`,
  },
  servicesIntro:
    'Corporate services that fit Financial District campuses. Open each for full detail; we still design from your floor or building survey.',
  installationProcess: {
    heading: 'Installation process in the Financial District',
    intro:
      'Campus work needs stakeholder alignment before drilling — then disciplined install and facilities handover.',
    steps: locationProcessSteps('Financial District', {
      survey:
        'We meet facilities or security stakeholders on the Financial District campus, separate common versus tenant scope, and map lobby, floor, restricted, and outdoor approaches before finalising camera and access counts.',
      installation:
        'IP cameras, access hardware, and cabling are installed with routing suited to large office campuses, coordinating penetrations and shared spaces with building management where required.',
      configuration:
        'Recording retention, corridor and plaza motion zones, role-based accounts, and approved remote viewing are configured for campus operating hours and after-hours rules.',
      handover:
        'Security or facilities leads receive live view, playback, access-event checks, and documentation for future expansions on the same campus floor plate.',
    }),
  },
  maintenance: {
    heading: 'Maintenance & AMC',
    body: maintenanceBody,
  },
  whyLocal: {
    heading: 'Financial District focus — not a generic west-Hyderabad page',
    items: [
      'Campus and finance-corridor framing distinct from Nanakramguda residential mix.',
      'Separate from DLF Cyber City branding so recommendations stay context-specific.',
      'Links to Nanakramguda, Gachibowli, Hitech City, and DLF Cyber City for adjacent contexts.',
      'Service-area delivery from Mallapur — no invented Financial District branch office.',
    ],
  },
  cta: {
    heading: 'Plan security for your Financial District workplace',
    body: 'Share campus or tower details, tenant versus landlord scope, and whether you need CCTV, access, biometrics, or cabling. We will schedule a facilities-aware survey.',
    primaryLabel: 'Request a campus survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'financial-district-faq-1',
      question: 'Do you install CCTV for offices in the Financial District?',
      answer:
        'Yes. We plan office and campus CCTV for Financial District workplaces, including IP camera layouts, storage planning, and coordination with building facilities where mounts or risers are shared.',
      status: 'published',
    },
    {
      id: 'financial-district-faq-2',
      question: 'How is this different from Nanakramguda?',
      answer:
        'This page focuses on corporate and finance campus corridors. Nanakramguda covers the residential-and-office-spillover edge — apartments, gated communities, and mixed briefs. Choose the page that matches your property type.',
      status: 'published',
    },
    {
      id: 'financial-district-faq-3',
      question: 'Can you add access control and biometric attendance?',
      answer:
        'Yes. Access control and biometric attendance are commonly paired with IP CCTV on Financial District floors so staff entry and restricted rooms are controlled and recorded coherently.',
      status: 'published',
    },
    {
      id: 'financial-district-faq-4',
      question: 'Do you have an office inside the Financial District?',
      answer:
        'No. AQ Enterprises is headquartered in Mallapur, Hyderabad. The Financial District is a service area for surveys, installation, and AMC — not a claimed campus branch.',
      status: 'published',
    },
    {
      id: 'financial-district-faq-5',
      question: 'When should we consider PTZ cameras on campus?',
      answer:
        'PTZ can help large plazas or long outdoor approaches where a few movable views outperform many fixed cameras. Suitability depends on sightlines and who will operate the PTZ — we assess that during the survey rather than defaulting to PTZ everywhere.',
      status: 'published',
    },
  ],
  verifiedProjectIds: [],
  imagePlaceholders: [
    {
      id: 'financial-district-campus-approach',
      alt: 'Landscaped corporate campus approach and office façades typical of Financial District security planning',
      label: 'Campus approaches',
    },
    {
      id: 'financial-district-lobby-security',
      alt: 'Formal corporate lobby area illustrating reception and lift-bank CCTV coverage needs',
      label: 'Lobby coverage',
    },
  ],
  relatedServices: [
    'office-cctv-installation',
    'access-control-systems',
    'biometric-attendance-systems',
    'ip-camera-installation',
    'commercial-lan-cabling-networking',
    'cctv-amc-maintenance',
    'fire-alarm-systems',
    'ptz-camera-installation',
  ],
  relatedLocations: [
    'nanakramguda',
    'gachibowli',
    'hitech-city',
    'dlf-cyber-city',
  ],
  relatedProjects: [],
  relatedBlogs: [],
  relatedIndustries: [],
  seo: {
    title: 'CCTV Installation in Financial District Hyderabad | AQ Enterprises',
    description:
      'Corporate CCTV, access control, and IP systems for Financial District campuses in Hyderabad. Survey-led installs by AQ Enterprises from Mallapur.',
    canonical: '/locations/financial-district',
    keywords: [
      'CCTV Financial District Hyderabad',
      'office CCTV Financial District',
      'access control Financial District',
      'campus CCTV Hyderabad',
      'IP camera Financial District',
      'biometric attendance Financial District',
      'CCTV AMC Financial District',
    ],
  },
};
