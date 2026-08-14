import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const factoryCctvSurveillance: Service = {
  id: 'factory-cctv-surveillance',
  slug: 'factory-cctv-surveillance',
  name: 'Factory CCTV Surveillance',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Factory CCTV surveillance in Hyderabad for shop floors, loading bays, and industrial perimeters — durable cameras, practical coverage plans, and recording that stands up to dust, heat, and shift work.',
  h1: 'Factory CCTV Surveillance in Hyderabad',
  hero: {
    eyebrow: 'Industrial security',
    headline: 'Factory CCTV built for shop floors, bays, and perimeters',
    subheadline:
      'AQ Enterprises designs industrial surveillance for Hyderabad factories — clear coverage of production areas, material movement, and boundary lines without fragile consumer-style installs.',
    image: {
      id: 'factory-cctv-hero',
      alt: 'Industrial shop floor and loading bay under outdoor and high-mount CCTV cameras at a Hyderabad factory',
      label: 'Factory CCTV coverage',
    },
  },
  introduction: `Factory sites in Hyderabad are not office lobbies with neat false ceilings. Shop floors throw dust and vibration, loading bays stay busy across shifts, and perimeters stretch along compound walls that see little natural oversight after dark. A useful CCTV plan has to survive that environment and still produce identifiable footage when materials move, vehicles queue, or an incident needs review.

AQ Enterprises plans factory CCTV surveillance around real industrial flow: raw material entry, production lines or work cells, finished-goods staging, scrap yards, utility rooms, and the gate where contractors and tankers arrive. We favour durable mounts, protected cable paths, and recorder placement that facilities teams can reach without shutting a line.

Whether you run a compact unit in an industrial estate or a multi-shed campus on the outskirts, the goal is the same — coverage that matches how the plant actually operates, not a brochure layout that ignores crane beams, mezzanines, and monsoon-exposed walls.`,
  whatIs: {
    heading: 'What factory CCTV surveillance includes',
    body: `Factory CCTV surveillance is the end-to-end design and installation of cameras, networking or power runs, and recording for industrial premises. It covers shop-floor overview and choke points, loading and unloading bays, perimeter and compound approaches, stores and tool cribs, and often the admin block or time-office interface where people and visitors enter the plant.

A complete project includes a site survey that accounts for mounting height, vibration, lighting changes between day and night shifts, and whether cameras need weather-rated housings or protected junctions. Recorders are typically NVR-based IP systems sized for continuous or smart recording across many channels, with storage planned for the retention window your operations or compliance team needs.

Integration with access control at gates, PTZ views over large yards, and structured LAN cabling for PoE cameras is common on industrial sites. The install is not finished until channels are mapped, remote viewing for authorised managers works, and plant contacts know how to find footage by bay or time — not only how to open a live app thumbnail.`,
  },
  whoNeeds: {
    heading: 'Who typically needs factory CCTV',
    intro: 'Industrial CCTV is most valuable when material, people, and vehicles move through spaces that cannot be watched continuously by supervisors alone.',
    items: [
      'Manufacturing units that need shop-floor and store visibility across multiple shifts.',
      'Plants with busy loading bays where vehicle and material disputes need time-stamped video.',
      'Factories with long compound walls, scrap yards, or outdoor staging that stay poorly lit at night.',
      'Sites receiving contractors, tankers, and temporary labour who must pass through controlled gates.',
      'Facilities teams expanding camera counts after theft, process incidents, or insurer recommendations.',
      'Multi-shed campuses that want a single recording strategy rather than disconnected DVR islands.',
    ],
  },
  commonProblems: {
    heading: 'Common problems with poorly planned factory CCTV',
    intro: 'Industrial systems often fail in predictable ways when consumer habits meet factory conditions.',
    items: [
      'Cameras mounted too low on shop floors, so forklifts, dust, and accidental knocks destroy alignment within months.',
      'Loading-bay views that show the truck roof but not the dock face, seals, or people at the rear doors.',
      'Outdoor perimeter cameras left with exposed junctions that fail after the first heavy monsoon.',
      'Recording retained for only a few days when investigations typically surface later in the week.',
      'No spare PoE or NVR capacity when a new shed or mezzanine needs cameras after production expands.',
      'Admin passwords shared on WhatsApp groups, so nobody owns channel health when a camera goes dark.',
    ],
  },
  ourSolution: {
    heading: 'How AQ Enterprises approaches factory surveillance',
    body: `We begin with a walkthrough timed around how your plant actually runs — not a phone estimate based on shed count. During the survey we note crane and duct clearances, preferred cable trays or conduit routes, power quality near recorder rooms, gate procedures, and which zones need identification-level detail versus contextual overview.

From that map we propose camera types and heights: fixed cameras for doors, stores, and dock faces; wider views for shop-floor context; PTZ where a large yard or parking apron needs operator-led zoom. Brand choices among Hikvision, CP Plus, Dahua, Uniview, and other supported industrial lines follow environment and supportability, not a single default kit.

Installation emphasises industrial durability — secure high mounts, protected outdoor cabling, labelled channels by bay or zone, and NVR placement in a restricted, ventilated room. After configuration, plant or security contacts receive a practical handover: how to search by area and time, who holds admin rights, and what to check after power cuts. If you later add access control or structured cabling upgrades, the camera plan is already documented so expansions do not require ripping out the first install.`,
  },
  systemOptions: {
    heading: 'System options for factory sites',
    intro: 'Most plants fall into one of these planning patterns; channel count and storage are confirmed after the site survey.',
    options: [
      {
        name: 'Gate and perimeter focused',
        description:
          'Prioritises main gate, compound approaches, and outdoor staging with weather-rated cameras and night-capable views. Shop-floor cameras are limited to critical stores or process exits.',
        suitableFor: 'Compact units securing boundary and material entry first',
      },
      {
        name: 'Shop floor and bay coverage',
        description:
          'Adds high-mount shop-floor cameras, loading-bay dock faces, and finished-goods or raw-material stores so internal movement is recorded alongside the gate.',
        suitableFor: 'Active manufacturing and dispatch-heavy plants',
      },
      {
        name: 'Multi-shed campus system',
        description:
          'Central or zone-wise NVRs with structured cabling between sheds, consistent channel naming, and capacity planned for future lines or warehouses on the same plot.',
        suitableFor: 'Larger industrial campuses with several buildings',
      },
      {
        name: 'Factory plus PTZ yard oversight',
        description:
          'Fixed cameras at choke points paired with one or more PTZ units for large open yards, parking aprons, or long perimeters that need operator zoom during incidents.',
        suitableFor: 'Sites with wide outdoor areas and a security cabin',
      },
    ],
  },
  keyFeatures: {
    heading: 'What we design into a factory install',
    intro: 'Features are chosen for shift operations and industrial conditions — not for filling a specification sheet.',
    items: [
      'High mounts and housings suited to dust, heat, and accidental contact risk on shop floors.',
      'Loading-bay angles that capture dock activity and vehicle presence, not only distant silhouettes.',
      'Perimeter and compound coverage planned for Hyderabad night lighting and monsoon exposure.',
      'NVR capacity and retention sized to how long your team typically needs to review incidents.',
      'PoE and structured cabling paths that can grow when sheds or lines are added.',
      'Channel maps labelled by zone so night-shift staff can find the right view quickly.',
      'Optional PTZ for large yards where fixed grids alone leave too many open angles.',
      'Handover focused on playback search and post-power-cut checks for plant contacts.',
    ],
  },
  benefits: {
    heading: 'Benefits of well-planned factory CCTV',
    items: [
      'Clearer accountability around material movement at gates, bays, and stores.',
      'Faster incident review when supervisors can search by bay and time instead of guessing channels.',
      'Fewer blind outdoor stretches along compound walls and scrap or staging yards.',
      'Hardware and cabling that last longer under industrial dust, vibration, and weather.',
      'A documented path to add cameras, access control, or LAN upgrades without redesigning from zero.',
      'Support for insurer or internal audit expectations with continuous, time-stamped recording.',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended starting configurations',
    intro: 'These are planning baselines. Final camera count, height, and storage are confirmed after measuring distances, light levels, and cable routes on site.',
    configs: [
      {
        name: 'Single-shed manufacturing unit',
        description:
          'Gate and compound cameras plus shop-floor overview, store or tool crib coverage, and loading-bay views, with an NVR sized for multi-day retention across continuous shifts.',
        suitableFor: 'Compact factories in industrial estates',
      },
      {
        name: 'Dispatch-heavy plant',
        description:
          'Stronger bay and yard coverage, vehicle approach angles at the gate, and stores cameras coordinated so dispatch disputes can be reviewed with matching time stamps.',
        suitableFor: 'Units with frequent truck and material movement',
      },
      {
        name: 'Multi-building industrial campus',
        description:
          'Zone-wise camera plans linked by structured cabling, centralised or distributed recording, and spare capacity for future sheds — often paired with PTZ on the largest open perimeter.',
        suitableFor: 'Larger Hyderabad industrial campuses',
      },
    ],
  },
  installationProcess: {
    heading: 'Our factory CCTV installation process',
    intro: 'Industrial jobs follow the same disciplined stages, with scheduling that respects production and safety rules on site.',
    steps: standardProcessSteps({
      survey:
        'We walk shop floors, loading bays, stores, utility rooms, and perimeter lines with your plant or security contact, note mounting heights, cable trays, lighting by shift, and gate procedures, then mark camera positions that survive industrial use.',
      installation:
        'Cameras, PoE or power runs, and the recorder are installed with high secure mounts, protected outdoor junctions, and labelled routes along trays or conduit — work sequenced to minimise disruption to live production where possible.',
      configuration:
        'Recording schedules suited to continuous or shift-based operations, motion or smart settings that do not flood disks with irrelevant yard motion, user roles for security and management, and remote access for authorised staff are configured.',
      testing:
        'We verify day and night clarity at gates, bays, and perimeter corners, confirm playback by zone, check storage health, and validate that plant contacts can open the views they need before sign-off.',
      handover:
        'You receive a channel map, credential guidance, and a walkthrough of live view and date-based playback, plus simple checks after power events — documentation stays with the facilities or security team.',
    }),
  },
  maintenance: {
    heading: 'Keeping factory CCTV reliable',
    body: `Industrial cameras collect dust faster than office domes, and outdoor junctions take monsoon and heat stress hard. Periodic lens cleaning on accessible units, verification that high mounts have not drifted after vibration, and hard-disk health checks prevent silent recording gaps.

We recommend reviewing angles after major layout changes — new mezzanines, relocated lines, or added racks often blind previously good cameras. If you prefer scheduled upkeep, our CCTV AMC plans suit dusty outdoor and high-mount sites; otherwise call when a bay channel fails, night images wash out after new yard lights, or you need coverage for a new shed.

Unstable power near the NVR is a common industrial failure mode. Treat recorder circuits and UPS paths as part of the surveillance system, not as an afterthought.`,
  },
  brands: {
    heading: 'Brands we use for factory projects',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty and support',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why choose AQ Enterprises for factory CCTV',
    items: [
      'Industrial walkthroughs that respect shop-floor, bay, and perimeter reality — not a generic camera count.',
      'Durable mounting and grounding of cable practice suited to Hyderabad factory conditions.',
      'Clear channel documentation for shift teams who need footage without calling the installer every time.',
      'Natural pairing with warehouse CCTV, PTZ, IP cameras, access control, and commercial LAN cabling.',
      'Honest advice when a fixed grid beats an oversized PTZ — or when a yard truly needs one.',
      'Local support for expansions when production adds sheds, docks, or outdoor staging.',
    ],
  },
  hyderabadCoverage: {
    heading: 'Serving factories across Hyderabad',
    body: `We install factory CCTV across Hyderabad’s industrial corridors and surrounding manufacturing clusters — from compact units in established estates to larger campuses on the city’s outskirts. Each plant has different gate culture, bay orientation, and dust or lighting conditions, so camera plans are surveyed on site rather than copied from a previous job.

If your estate or landlord requires work permits, height restrictions, or limited shutdown windows for cable pulls, tell us during the enquiry so installation sequencing fits those rules from the start.`,
  },
  cta: {
    heading: 'Ready to plan factory CCTV?',
    body: 'Share your locality, roughly how many sheds or bays you operate, and whether gate, shop floor, or perimeter is the priority. We will schedule a site survey with your plant or security contact.',
    primaryLabel: 'Request a factory survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'factory-cctv-faq-1',
      question: 'Do factory cameras need to cover every machine?',
      answer:
        'Usually not. Most plants gain more from gates, stores, loading bays, process exits, and perimeter coverage than from aiming a camera at every workstation. We align placement with theft risk, safety review needs, and how supervisors actually investigate incidents.',
      status: 'published',
    },
    {
      id: 'factory-cctv-faq-2',
      question: 'Can CCTV survive dust and heat on a Hyderabad shop floor?',
      answer:
        'Industrial-appropriate housings, sensible mounting height, and protected cable junctions make a large difference. No camera is maintenance-free in heavy dust, so we also discuss cleaning access and AMC for exposed units during design.',
      status: 'published',
    },
    {
      id: 'factory-cctv-faq-3',
      question: 'Should we use PTZ or fixed cameras in the yard?',
      answer:
        'Fixed cameras should cover choke points that must never be “looking the wrong way.” PTZ helps large open yards when a security cabin can operate it. Many factories use both. We recommend the mix after seeing yard size and staffing.',
      status: 'published',
    },
    {
      id: 'factory-cctv-faq-4',
      question: 'Where should the NVR sit in a factory?',
      answer:
        'In a restricted, ventilated room with stable power — often near the network rack or security office, not on an open shop-floor shelf. We confirm placement during the survey based on heat, access, and cable distances.',
      status: 'published',
    },
    {
      id: 'factory-cctv-faq-5',
      question: 'Can factory CCTV link with gate access control?',
      answer:
        'Yes. Cameras at controlled doors and vehicle gates complement access events. Planning both together with structured cabling reduces duplicate work. See our access control and commercial LAN services if you are upgrading entry and network at the same time.',
      status: 'published',
    },
    {
      id: 'factory-cctv-faq-6',
      question: 'How long should factories keep recordings?',
      answer:
        'Retention depends on how long issues typically take to surface in your operation and on disk capacity. We discuss realistic windows during design rather than promising indefinite storage. Many plants size for multi-day continuous recording with growth room.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'factory-cctv-shopfloor',
      alt: 'High-mount CCTV camera overlooking a manufacturing shop floor work area',
      label: 'Shop floor view',
    },
    {
      id: 'factory-cctv-loading-bay',
      alt: 'Factory loading bay and dock face covered by outdoor industrial CCTV cameras',
      label: 'Loading bay coverage',
    },
  ],
  relatedServices: [
    'warehouse-cctv-installation',
    'ptz-camera-installation',
    'ip-camera-installation',
    'access-control-systems',
    'cctv-amc-maintenance',
    'commercial-lan-cabling-networking',
  ],
  relatedLocations: [
    'nacharam',
    'uppal',
    'kompally',
  ],
  relatedProjects: [
    'factory-nacharam',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'Factory CCTV Surveillance in Hyderabad | AQ Enterprises',
    description:
      'Factory CCTV surveillance in Hyderabad for shop floors, loading bays and industrial perimeters. Durable cameras and survey-led installs by AQ Enterprises.',
    canonical: '/services/factory-cctv-surveillance',
    keywords: [
      'factory CCTV Hyderabad',
      'industrial CCTV installation',
      'shop floor CCTV cameras',
      'factory loading bay CCTV',
      'perimeter CCTV factory',
      'industrial surveillance Hyderabad',
      'manufacturing unit CCTV installation',
    ],
  },
};
