import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const solarCctvSystems: Service = {
  id: 'solar-cctv-systems',
  slug: 'solar-cctv-systems',
  name: 'Solar CCTV Systems',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Solar-powered CCTV for Hyderabad remote gates, farms, and perimeters without stable grid — panel and battery sizing planned on site, not sold as fixed watt guarantees.',
  h1: 'Solar CCTV Systems in Hyderabad',
  hero: {
    eyebrow: 'AQ Enterprises',
    headline: 'Surveillance where the grid does not reach',
    subheadline:
      'Solar CCTV for remote gates, farm edges, and perimeter posts — designed around real sun hours, battery autonomy, and wireless backhaul for Hyderabad fringe sites.',
    image: {
      id: 'solar-cctv-hero',
      alt: 'Solar panel and CCTV camera mounted at a remote perimeter gate near Hyderabad',
      label: 'Solar CCTV pole',
    },
  },
  introduction: `Not every camera can plug into a neat indoor UPS. Remote farm gates, long compound walls, temporary yards, and peri-urban plots around Hyderabad often sit far from stable mains — or sit where trenching power would cost more than the cameras themselves.

AQ Enterprises designs and installs solar CCTV systems for those edges: a camera (or small camera cluster), a solar panel, a charge controller, a battery bank sized for your autonomy target, and usually a wireless link back to a recorder or viewing point. We treat panel and battery sizing as site-specific engineering, not a marketing wattage promise.

You will not find invented panel watt guarantees or “X days backup always” claims here. Autonomy depends on season, shading, camera load (especially IR at night), and how often the site is visited for cleaning.`,
  whatIs: {
    heading: 'What a solar CCTV system is',
    body: `A solar CCTV node is a self-powered surveillance point. The solar panel charges a battery through a controller; the battery powers the camera and any radio or 4G/Wi-Fi bridge that carries video. Some designs record locally on an SD card or mini-NVR at the pole; others stream to a central NVR when the wireless path allows.

Sizing concepts matter more than brand stickers. Camera watt draw (day vs night IR), hours of poor sun during monsoon stretches, desired autonomy if the panel is dirty or shaded, and whether you need continuous recording or event-based clips all change the battery and panel combination. Site-specific panel wattage, battery capacity, and autonomy hours are calculated after survey — catalogue figures are not installation guarantees.

Solar CCTV is not automatically wireless, and wireless is not automatically solar — but the two pair naturally on farms and long perimeters where both power and data cabling are expensive.`,
  },
  whoNeeds: {
    heading: 'Who needs solar-powered CCTV',
    intro: 'Best fit when grid power is absent, unreliable, or uneconomical to extend.',
    items: [
      'Remote farm and orchard gates outside continuous mains coverage',
      'Villa or factory perimeters where a far corner has no nearby power spur',
      'Temporary yards, construction edges, and storage lots that move over time',
      'Warehouses with outer fencing far from the electrical room',
      'Sites that want a wireless camera spur without digging long power trenches',
      'Owners who already plan IP or wireless CCTV and need off-grid power at specific posts',
    ],
  },
  commonProblems: {
    heading: 'Problems solar CCTV is meant to solve — and new ones to avoid',
    items: [
      'Cameras that die every night because overnight IR draw empties an undersized battery',
      'Panels mounted in shade from trees or walls that never recover charge in monsoon weeks',
      'Theft of batteries or panels when mounts and enclosures are weak',
      'Wireless links that drop when the power node browns out under load',
      'Owners expecting city-grid uptime from a small solar kit without autonomy planning',
      'Mixed DIY parts with no charge controller protection, leading to early battery failure',
    ],
  },
  ourSolution: {
    heading: 'How AQ Enterprises designs solar CCTV',
    body: `We survey the post location for sun path, shading, mounting height, flood risk, and whether the camera must see a gate, road, or long fence line. We estimate electrical load for the proposed camera class — including night IR — and discuss autonomy targets honestly: how many poor-sun days you want to ride through versus how often staff can visit to clean panels.

Wireless backhaul is planned in parallel: point-to-point radio, outdoor Wi-Fi bridge, or cellular options where appropriate, each with its own power cost. Cameras may come from lines you already trust in Hyderabad projects — Hikvision, CP Plus, Dahua, Uniview, and similar — chosen for draw and feature fit, not solar branding alone.

Enclosures, anti-tamper mounts, and cable glands get as much attention as the panel. A perfect solar calculation fails if water enters the battery box or someone walks off with the battery after dusk.`,
  },
  systemOptions: {
    heading: 'Solar CCTV configurations we commonly propose',
    intro: 'Final watt/Ah values are placeholders until the site survey closes the load model.',
    options: [
      {
        name: 'Single-gate solar node',
        description:
          'One outdoor camera, panel, controller, and battery sized for gate viewing with local or wireless uplink. Exact panel wattage and battery capacity follow the load study.',
        suitableFor: 'Farm and compound gates',
      },
      {
        name: 'Perimeter spur pair',
        description:
          'Two cameras on a shared or twin solar feed covering a corner and straight fence run, with careful night-load budgeting.',
        suitableFor: 'Long villa or factory boundaries',
      },
      {
        name: 'Solar + wireless to central NVR',
        description:
          'Off-grid camera posts that stream back to a mains-powered recorder in the house, office, or guard room when radio path is reliable.',
        suitableFor: 'Sites with a powered building and dark far corners',
      },
      {
        name: 'Local-record solar kit',
        description:
          'Edge recording at the pole when backhaul is intermittent, with periodic export when staff visit the site.',
        suitableFor: 'Remote farms and temporary yards',
      },
    ],
  },
  keyFeatures: {
    heading: 'Design features we emphasise',
    items: [
      'Load-aware panel and battery planning instead of one-size kits',
      'Night IR draw considered in autonomy discussions',
      'Weather-resistant enclosures and anti-tamper mounting practices',
      'Wireless or cellular backhaul options matched to the site',
      'Compatibility with common IP camera brands used across Hyderabad',
      'Clear placeholders for site-specific sizing rather than fake watt guarantees',
      'Optional AMC for panel cleaning and battery health checks',
    ],
  },
  benefits: {
    heading: 'Benefits of a well-scoped solar CCTV node',
    items: [
      'Coverage at gates and fences where trenching power is impractical',
      'Faster deployment than waiting on electrical extensions',
      'Lower disruption to farmland and finished landscapes',
      'Flexible relocation if a temporary yard moves',
      'Pairs cleanly with wireless CCTV for truly cable-light edges',
      'Honest autonomy expectations reduce surprise overnight dropouts',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended starting points (sizing still site-specific)',
    intro: 'Use these as conversation starters; numbers are finalised after survey.',
    configs: [
      {
        name: 'Villa far-corner solar camera',
        description:
          'One high outdoor camera on solar power covering a dark garden or rear gate, wireless back to the house NVR. Panel and battery sizing follow shade and IR load checks on site.',
        suitableFor: 'Large residential plots',
      },
      {
        name: 'Farm gate surveillance',
        description:
          'Gate-facing camera with local recording and/or cellular uplink, panel cleaning schedule explained to the caretaker.',
        suitableFor: 'Agricultural and rural edges near Hyderabad',
      },
      {
        name: 'Factory perimeter spur',
        description:
          'Solar posts where the fence line outruns electrical rooms, coordinated with factory CCTV and AMC routines.',
        suitableFor: 'Industrial boundaries',
      },
      {
        name: 'Warehouse outer fence',
        description:
          'Dock-area mains CCTV remains grid-powered; outer fence posts use solar where cabling is uneconomical.',
        suitableFor: 'Logistics yards',
      },
    ],
  },
  installationProcess: {
    heading: 'How we deliver solar CCTV',
    intro: 'Solar installs add energy design to the usual camera workflow.',
    steps: standardProcessSteps({
      survey:
        'We assess sun exposure, shading, mount points, flood risk, camera viewing needs, and wireless path back to your Hyderabad building or viewing device — then outline sizing assumptions as placeholders pending final load calc.',
      installation:
        'Poles or wall mounts, panel angle, battery enclosure, camera, and grounding/bonding practices appropriate to the site are installed with theft-resistant hardware where practical.',
      configuration:
        'Camera recording mode, IR schedule, wireless link, and any low-power behaviours are configured so night draw matches the battery plan discussed in the survey.',
      testing:
        'We verify day charge behaviour, night camera stability, recording or uplink continuity, and document what autonomy you should expect under normal sun — not as a marketing guarantee.',
      handover:
        'You receive cleaning guidance for panels, signs of battery stress to watch for, and when to call for AMC or repair if the node browns out repeatedly.',
    }),
  },
  maintenance: {
    heading: 'Maintaining solar CCTV nodes',
    body: `Dust on panels is a silent killer of autonomy around Hyderabad. Include panel wiping in caretaker routines, especially before and after dusty stretches. Listen for cameras that reboot every night — that often means the battery is no longer meeting IR load.

Periodic AMC visits can include battery health checks and enclosure inspection for water or insects. Batteries are consumables; expect replacement cycles over years of outdoor use rather than lifetime performance.`,
  },
  brands: {
    heading: 'Cameras and ecosystem brands',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty notes for solar CCTV',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why AQ Enterprises for solar CCTV',
    items: [
      'Energy and camera design treated together — not a panel bolted onto a random camera',
      'Transparent placeholders for watt/Ah sizing instead of fake guarantees',
      'Hyderabad experience with fringe plots, farms, villas, and industrial edges',
      'Wireless and IP options coordinated with the power plan',
      'Theft-aware mounting and enclosure practices',
      'Path into AMC and repair when solar nodes need seasonal attention',
    ],
  },
  hyderabadCoverage: {
    heading: 'Hyderabad and fringe-area solar CCTV',
    body: `We work on solar CCTV posts across Hyderabad and the surrounding fringe where farms, open plots, and long industrial fences leave cameras without convenient mains. Travel time and site access for tall poles or remote gates are planned during the survey.

If your site is far outside regular urban routes, say so early — visit scheduling and spare-parts logistics differ from a Banjara Hills apartment lobby job, and we would rather set expectations before installation day.`,
  },
  cta: {
    heading: 'Planning a solar CCTV post?',
    body: 'Share photos of the gate or fence line, whether night IR is mandatory, and how you want to view footage. We will propose a site-specific solar and wireless plan without inventing fixed watt guarantees online.',
    primaryLabel: 'Request solar CCTV survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'solar-cctv-when',
      question: 'When is solar CCTV better than extending mains power?',
      answer:
        'When the camera post is far from electrical rooms, when trenching would damage farmland or finished hardscape, or when the location is temporary. If a short, cheap power spur exists, mains plus UPS is often simpler. We compare both during the survey.',
      status: 'published',
    },
    {
      id: 'solar-cctv-sizing',
      question: 'Why don’t you publish exact panel watts and battery Ah?',
      answer:
        'Because load and sun exposure change the answer. Night IR, recording mode, wireless radios, monsoon shading, and desired autonomy all matter. We calculate sizing after survey and mark catalogue figures as placeholders until then.',
      status: 'published',
    },
    {
      id: 'solar-cctv-monsoon',
      question: 'Will solar CCTV work through Hyderabad monsoon weeks?',
      answer:
        'It can, if the battery bank is sized for poor-sun stretches and panels stay reasonably clean. Undersized kits often fail at night first. We discuss autonomy targets honestly rather than promising uninterrupted uptime in every weather pattern.',
      status: 'published',
    },
    {
      id: 'solar-cctv-wireless',
      question: 'Does solar CCTV require wireless cameras?',
      answer:
        'Not always, but wireless or cellular backhaul is common because running data cable can be as hard as running power. Some nodes record locally and do not stream continuously. We match the link to distance and reliability needs.',
      status: 'published',
    },
    {
      id: 'solar-cctv-theft',
      question: 'How do you reduce theft of solar panels and batteries?',
      answer:
        'Through higher mounts, locked enclosures, visible cabling practices that are harder to cut quickly, and camera placement that watches the solar kit itself when practical. No outdoor asset is theft-proof; we reduce easy opportunities.',
      status: 'published',
    },
    {
      id: 'solar-cctv-amc',
      question: 'Do solar CCTV systems need AMC?',
      answer:
        'They benefit from it. Panel cleaning, battery health, and enclosure checks prevent many “camera dead at night” tickets. Our CCTV AMC service can include solar nodes alongside mains-powered cameras.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'solar-cctv-panel',
      alt: 'Close-up of solar panel and charge controller enclosure for a CCTV pole',
      label: 'Panel and controller',
    },
    {
      id: 'solar-cctv-gate',
      alt: 'Remote farm gate under solar CCTV surveillance near Hyderabad outskirts',
      label: 'Remote gate view',
    },
  ],
  relatedServices: [
    'wireless-cctv-installation',
    'villa-cctv-installation',
    'factory-cctv-surveillance',
    'warehouse-cctv-installation',
    'ip-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedLocations: [
    'banjara-hills',
    'kompally',
    'nacharam',
  ],
  relatedProjects: [
    'villa-banjara',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'Solar CCTV Systems Hyderabad | AQ Enterprises',
    description:
      'Solar CCTV for Hyderabad remote gates, farms, and perimeters. Battery and panel sizing planned on site — no fake watt guarantees. Wireless options available.',
    canonical: '/services/solar-cctv-systems',
    keywords: [
      'solar CCTV Hyderabad',
      'solar powered camera',
      'off grid CCTV',
      'farm gate CCTV',
      'solar surveillance',
      'wireless solar CCTV',
      'perimeter solar camera',
    ],
    ogTitle: 'Solar CCTV Systems in Hyderabad',
    ogDescription:
      'Off-grid and fringe-site CCTV with honest solar sizing for gates, farms, and perimeters.',
  },
};
