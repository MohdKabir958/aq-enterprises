import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const homeCctvInstallation: Service = {
  id: 'home-cctv-installation',
  slug: 'home-cctv-installation',
  name: 'Home CCTV Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'CCTV installation for independent houses in Hyderabad — gates, compounds, parking, and family mobile viewing with practical camera plans.',
  h1: 'Home CCTV Installation in Hyderabad',
  hero: {
    eyebrow: 'Residential security',
    headline: 'Home CCTV that covers the places your family actually uses',
    subheadline:
      'From the main gate to the parking bay and backyard, AQ Enterprises designs house CCTV systems for clear day-and-night recording and simple phone viewing.',
    image: {
      id: 'home-cctv-hero',
      alt: 'Independent house entrance and compound with outdoor CCTV cameras mounted for gate and driveway coverage',
      label: 'Home CCTV coverage',
    },
  },
  introduction: `Independent houses in Hyderabad rarely have a single “front door” problem. Visitors approach through a gate, vehicles stop in a semi-open parking bay, delivery staff wait near the compound wall, and side passages stay poorly lit after dusk. A home CCTV system should follow that real movement — not a generic four-camera diagram copied from a brochure.

AQ Enterprises plans residential CCTV around how your household lives: who opens the gate, where children play, which corners feel blind after sunset, and whether you need to check footage while travelling. We balance coverage with sensible cable routes, weather-safe outdoor mounts, and a recorder setup that family members can actually use without calling a technician for every playback.

Whether you are securing a single-storey house in an older colony or a newer independent home with a larger setback, the goal stays the same: useful evidence when something happens, and everyday peace of mind when nothing does.`,
  whatIs: {
    heading: 'What home CCTV installation includes',
    body: `Home CCTV installation is the complete process of surveying your house, selecting camera types for indoor and outdoor zones, installing a recorder (NVR or DVR depending on the system), routing power and network or coaxial cabling, and configuring remote viewing on phones or tablets.

For independent houses, that usually means covering the main gate, compound walls or open sides, vehicle parking, entrance lobby or verandah, and any backyard or servant access path that stays out of natural sightlines. Indoor cameras are optional and used selectively — living areas are often left private unless the household specifically wants them.

A proper install also includes storage planning (how many days of recording you want to keep), user accounts for family members, and a handover so you know how to find footage from a specific date and time. The hardware is only half the job; usable configuration is the other half.`,
  },
  whoNeeds: {
    heading: 'Who typically needs house CCTV',
    intro: 'Home CCTV is useful whenever the property has multiple approaches or periods when no one is present to notice activity.',
    items: [
      'Families in independent houses who want gate, driveway, and compound visibility when adults are at work.',
      'Households with elderly parents or children at home who benefit from quick mobile checks during the day.',
      'Homeowners who receive frequent courier and vendor visits and want a clear record of who entered the compound.',
      'Residents with side gates, open parking, or shared compound walls where casual access is easy.',
      'People renovating or newly occupying a house who prefer cameras planned with wiring rather than added later as clutter.',
      'Owners who travel often and want to verify that the house and parking area look normal remotely.',
    ],
  },
  commonProblems: {
    heading: 'Common problems with poorly planned home CCTV',
    intro: 'Many residential systems fail not because cameras are “bad,” but because placement and configuration ignored how the house is used.',
    items: [
      'Gate cameras pointed too high, so faces and vehicle numbers are unclear when someone stands at the latch.',
      'Parking covered in daylight but washed out or grainy after evening lighting changes.',
      'Long outdoor cable runs left exposed to weather, rodents, or DIY “temporary” routing that becomes permanent.',
      'Remote viewing set up on one phone only, with no shared family access or forgotten passwords.',
      'Recording set to motion-only without sensible zones, so trees and street traffic fill the hard disk.',
      'No spare ports or capacity left when the household later wants a backyard or terrace camera.',
    ],
  },
  ourSolution: {
    heading: 'How AQ Enterprises approaches home CCTV',
    body: `We start with a walkthrough of your property — not a phone quote based on room count. During the survey we note gate width, parking orientation, tree cover, existing lights, power points near likely mount positions, and whether you prefer wired reliability or selective wireless links for hard-to-cable corners.

From there we propose a camera plan with clear reasons: which view protects the gate, which angle covers the car, and where a single camera can serve two purposes without creating privacy issues for neighbours. Brand and resolution choices (Hikvision, CP Plus, Dahua, Uniview, and other supported lines) follow the site needs and your retention preference rather than a one-size kit.

Installation focuses on neat routing along walls, conduits where exposure is likely, and mounts that stay stable in monsoon wind and heat. After configuration, you and relevant family members get a practical handover: live view, playback search, and what to check if the app disconnects. If you later add a video door phone or expand coverage, the home NVR plan is already documented so upgrades do not require a full redesign.`,
  },
  systemOptions: {
    heading: 'System options for independent houses',
    intro: 'Most homes fall into one of these practical patterns; we refine camera count and storage after the site survey.',
    options: [
      {
        name: 'Essential gate and parking set',
        description:
          'A compact wired setup focused on the main gate, driveway or parking bay, and the front entrance. Ideal when the compound is modest and rear access is limited or already secure.',
        suitableFor: 'Compact independent houses with one primary approach',
      },
      {
        name: 'Full-compound coverage',
        description:
          'Adds side-passage, backyard, and terrace or first-floor external views so open flanks and secondary gates are recorded. Uses a mix of bullet and dome cameras based on mounting surfaces.',
        suitableFor: 'Larger plots or houses with multiple open sides',
      },
      {
        name: 'Family remote-viewing package',
        description:
          'Same coverage planning with extra attention to multi-user app access, notification settings, and storage sized for longer retention when the house is often empty during the day.',
        suitableFor: 'Working families and frequent travellers',
      },
      {
        name: 'Hybrid wired with selective wireless',
        description:
          'Keeps critical outdoor points on wired cameras while using wireless links only where trenching or long façade cable runs are impractical. Still centralises recording on a home NVR/DVR.',
        suitableFor: 'Renovated homes or sites with difficult cable paths',
      },
    ],
  },
  keyFeatures: {
    heading: 'What we design into a home install',
    intro: 'Features are chosen for daily use — not for filling a specification sheet.',
    items: [
      'Day/night outdoor cameras suited to gate and compound lighting conditions.',
      'Recorder capacity planned against the number of cameras and how many days you want to keep.',
      'Mobile viewing for household members with role-appropriate access where needed.',
      'Weather-conscious outdoor mounting and cable protection on exposed walls.',
      'Motion zones tuned to reduce false alerts from street traffic and moving foliage.',
      'Clear labelling and documentation so future service or camera additions are straightforward.',
      'Optional indoor cameras only where the family explicitly wants them.',
      'Handover training focused on finding footage quickly after an incident.',
    ],
  },
  benefits: {
    heading: 'Benefits of a well-planned house CCTV system',
    items: [
      'Know who approached the gate or parking area when you were not home.',
      'Reduce uncertainty around deliveries, domestic staff entry, and unexpected visitors.',
      'Support insurance or police follow-up with time-stamped video when something goes wrong.',
      'Give family members a shared way to check the property without installing multiple apps or kits.',
      'Avoid messy rework later by planning cable paths and spare capacity during the first install.',
      'Keep neighbour privacy in mind with angles that prioritise your compound, not adjacent interiors.',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended starting configurations',
    intro: 'These are planning baselines. Final camera count and storage are confirmed after measuring distances and light levels on site.',
    configs: [
      {
        name: 'Compact independent house',
        description:
          'Typically four to six cameras covering gate, parking, front entrance, and one rear or side path, with a recorder sized for roughly one to two weeks of continuous or smart recording depending on settings.',
        suitableFor: 'Standard single-gate houses',
      },
      {
        name: 'Larger compound home',
        description:
          'Six to ten cameras with dedicated views for secondary access, backyard, and first-floor external approaches, plus storage planned for longer retention if the property is frequently unoccupied.',
        suitableFor: 'Corner plots and multi-access homes',
      },
      {
        name: 'Home plus entry intercom path',
        description:
          'CCTV for perimeter and parking coordinated with a video door phone at the main entrance so visitors are identified before the gate opens. Systems remain separate but planned together for cable routes.',
        suitableFor: 'Families upgrading both cameras and door entry',
      },
    ],
  },
  installationProcess: {
    heading: 'Our home CCTV installation process',
    intro: 'Every residential job follows the same disciplined stages, with details tailored to your house layout.',
    steps: standardProcessSteps({
      survey:
        'We walk the gate, parking, compound edges, and indoor paths with you, note lighting and power, and mark practical camera positions that protect approaches without aiming into neighbouring homes.',
      installation:
        'Cameras and the recorder are installed with neat outdoor routing, weather-safe mounts at the gate and compound, and indoor cabling kept tidy along skirting or conduit rather than loose across living spaces.',
      configuration:
        'Recording schedules, motion zones around the driveway and gate, family user accounts, and phone viewing are set up so alerts stay useful and storage is not wasted on street traffic.',
      testing:
        'We check day and night clarity at the gate and parking, confirm playback for recent hours, verify remote access on your phones, and adjust angles before tools leave the site.',
      handover:
        'You receive a walkthrough of live view and date-based playback, plus simple guidance on what to check if a camera goes offline — written notes are left with the system details.',
    }),
  },
  maintenance: {
    heading: 'Keeping home CCTV reliable',
    body: `Residential cameras sit in heat, dust, and monsoon moisture. Occasional lens cleaning, checking that outdoor junctions stay sealed, and confirming the recorder hard disk health prevent the “it stopped recording last month” surprise.

We recommend a periodic review of motion zones after trees grow or new compound lights are added, because lighting changes can quietly ruin night images. If you prefer scheduled upkeep, our CCTV AMC option covers routine checks; otherwise, call us when an app disconnects, a camera shows colour issues at night, or you want to add coverage after a renovation.

Never ignore repeated power trips on the recorder circuit — unstable power is a common cause of corrupted storage in home systems.`,
  },
  brands: {
    heading: 'Brands we use for home projects',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty and support',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why choose AQ Enterprises for home CCTV',
    items: [
      'Site-first planning for independent houses — not a fixed “4-camera kit” pushed on every plot.',
      'Practical family mobile viewing setup during handover, not left as a weekend DIY task.',
      'Neat outdoor workmanship suited to Hyderabad weather on gates and compound walls.',
      'Honest brand and storage advice based on how long you need footage kept.',
      'Clear path to add villa-style perimeter coverage, wireless links, or a video door phone later.',
      'Local support for configuration changes when your household’s routines change.',
    ],
  },
  hyderabadCoverage: {
    heading: 'Serving homes across Hyderabad',
    body: `We install home CCTV across Hyderabad and surrounding residential areas — from established independent-house localities to newer plotted developments. Coverage planning always reflects your specific plot: gate setbacks, parking orientation, and neighbourhood lighting vary widely, so we survey before finalising camera positions.

If your house is in a gated community with association rules about façade drilling or shared walls, tell us during the enquiry so the install plan respects those constraints from day one.`,
  },
  cta: {
    heading: 'Ready to plan CCTV for your house?',
    body: 'Share your locality, a rough idea of gates and parking, and whether you need phone viewing for multiple family members. We will schedule a site survey and propose a clear camera plan.',
    primaryLabel: 'Request a home survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'home-cctv-faq-1',
      question: 'How many cameras does a typical independent house need?',
      answer:
        'Many compact homes work well with four to six cameras covering the gate, parking, front entrance, and one rear or side approach. Larger compounds or corner plots often need more. The right number comes from a site survey, not a fixed package count.',
      status: 'published',
    },
    {
      id: 'home-cctv-faq-2',
      question: 'Can the whole family view cameras on their phones?',
      answer:
        'Yes. During configuration we set up remote viewing and can add accounts for household members. We also show you how to review playback so you are not dependent on one person’s phone.',
      status: 'published',
    },
    {
      id: 'home-cctv-faq-3',
      question: 'Is wired CCTV better than wireless for houses?',
      answer:
        'Wired cameras are generally more stable for primary gate and parking views. Wireless can help for difficult cable routes, but we use it selectively and still plan central recording carefully so you are not relying on consumer Wi-Fi alone for critical points.',
      status: 'published',
    },
    {
      id: 'home-cctv-faq-4',
      question: 'Will cameras record at night near my gate?',
      answer:
        'Outdoor cameras are chosen and aimed with night performance in mind. Existing compound lights help; if a corner is extremely dark, we may recommend adjusting lighting or camera type during the survey rather than promising miracles from a poorly lit angle.',
      status: 'published',
    },
    {
      id: 'home-cctv-faq-5',
      question: 'Do you install indoor cameras in living rooms?',
      answer:
        'Only if you ask for them. Many families prefer outdoor and entrance coverage and keep living spaces private. Indoor cameras are discussed explicitly so there are no surprises for household members.',
      status: 'published',
    },
    {
      id: 'home-cctv-faq-6',
      question: 'What if I want a video door phone as well?',
      answer:
        'We can plan CCTV and a video door phone together so cable routes and entrance mounting are coordinated. Related services include video door phone installation if you want visitor audio/video at the door in addition to compound cameras.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'home-cctv-gate',
      alt: 'Close view of a residential gate camera covering the latch and visitor approach path',
      label: 'Gate camera view',
    },
    {
      id: 'home-cctv-parking',
      alt: 'House parking bay under outdoor CCTV coverage for vehicle and pedestrian movement',
      label: 'Parking coverage',
    },
  ],
  relatedServices: [
    'villa-cctv-installation',
    'apartment-cctv-installation',
    'wireless-cctv-installation',
    'video-door-phone-installation',
    'ip-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedLocations: [
    'banjara-hills',
    'jubilee-hills',
    'kondapur',
    'kukatpally',
    'mehdipatnam',
  ],
  relatedProjects: [
    'villa-banjara',
    'apartment-gachibowli',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'Home CCTV Installation in Hyderabad | AQ Enterprises',
    description:
      'Home CCTV installation for independent houses in Hyderabad — gate, compound, parking and family mobile viewing. Survey-led installs by AQ Enterprises.',
    canonical: '/services/home-cctv-installation',
    keywords: [
      'home CCTV installation Hyderabad',
      'house CCTV camera installation',
      'residential CCTV Hyderabad',
      'gate CCTV for independent house',
      'home security cameras Hyderabad',
      'CCTV for house parking',
      'family mobile CCTV viewing',
    ],
  },
};
