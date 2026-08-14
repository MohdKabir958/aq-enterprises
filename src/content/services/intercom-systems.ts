import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const intercomSystems: Service = {
  id: 'intercom-systems',
  slug: 'intercom-systems',
  name: 'Intercom Systems',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Audio and video intercom systems for Hyderabad societies, offices, and hotels — visitor communication at gates and lobbies with practical integration to entry control.',
  h1: 'Intercom Systems in Hyderabad',
  hero: {
    eyebrow: 'AQ Enterprises',
    headline: 'Talk to the gate before you open it',
    subheadline:
      'Audio and video intercoms for apartments, offices, and hospitality — clearer visitor communication and cleaner handoff to entry decisions.',
    image: {
      id: 'intercom-hero',
      alt: 'Apartment lobby video intercom handset and outdoor gate station in a Hyderabad society',
      label: 'Lobby intercom',
    },
  },
  introduction: `An intercom is the conversation layer of building security. Before a gate opens or a lobby door unlocks, someone needs to hear — and often see — who is asking to come in. In Hyderabad societies and offices, that conversation happens dozens of times a day, which means the system has to be simple for residents and staff, not only impressive in a brochure.

AQ Enterprises supplies and installs audio and video intercom systems for apartments, villas, offices, and hotels. We focus on reliable call quality, sensible station placement, and integration with the entry hardware you already use or plan to add — door releases, access control, or a video door phone at a private flat.

This page does not invent package prices or claim every intercom “integrates with everything.” Compatibility depends on door hardware, wiring distance, and whether you need IP, 2-wire, or wireless extensions.`,
  whatIs: {
    heading: 'What an intercom system does',
    body: `An intercom connects an outdoor or lobby call station to indoor handsets or apps so visitors can request entry and occupants can respond. Audio-only systems handle voice; video intercoms add a camera at the call point so you can recognise delivery staff, guests, or unexpected callers before releasing a lock.

In housing societies, the typical pattern is a gate or lobby panel that rings a flat, guard desk, or both. In offices, reception and floor stations help manage vendors and meeting guests without leaving doors propped open. Hotels use intercoms at service doors, staff areas, and sometimes suite entries where privacy and visitor screening matter.

Intercoms sit beside CCTV and access control rather than replacing them. Cameras record; access control authenticates credentials; the intercom handles human conversation and the decision to admit someone who does not have a card or code.`,
  },
  whoNeeds: {
    heading: 'Who needs a dedicated intercom',
    intro: 'If strangers regularly ask for entry, you need a controlled conversation channel.',
    items: [
      'Apartment associations replacing failed gate handsets or fragmented WhatsApp-only entry habits',
      'Offices that want reception to screen visitors before releasing lobby doors',
      'Hotels and serviced residences managing guest and service-entry communication',
      'Villas and homes that prefer a proper gate station over shouting across a compound',
      'Facilities teams coordinating intercom with access control and CCTV at the same entrance',
      'Builders and fit-out projects specifying audio/video communication as part of the security package',
    ],
  },
  commonProblems: {
    heading: 'Problems poor intercom setups create',
    items: [
      'Gates opened for anyone because residents cannot hear or see callers clearly',
      'One dead handset that forces the whole tower onto the security guard’s phone',
      'Video door phones that work per flat but leave the society gate without a shared process',
      'No integration with door release — staff walk to the door for every courier',
      'Outdoor stations that fail after one monsoon because sealing and surge paths were ignored',
      'IP intercoms installed without a stable LAN plan, causing dropped calls during peak hours',
    ],
  },
  ourSolution: {
    heading: 'How AQ Enterprises designs intercom systems',
    body: `We map call flows first: who should ring when a visitor presses Flat 302, Reception, or Service Entry? From that flow we choose audio vs video stations, wired vs IP architecture, and whether a guard concierge station sits in the middle.

Integration with entry is planned explicitly — electric strike, magnetic lock, or existing access control relay — so answering a call can release the correct door without unlocking the whole building. Where a private video door phone is already planned for villas or flats, we keep society-level intercom and apartment-level door phones from fighting over the same wiring assumptions.

Equipment may include established security brands used in Hyderabad projects such as Hikvision, Godrej, Honeywell, Panasonic, and related lines, chosen for the wiring standard and supportability of your building — not for a single logo preference.`,
  },
  systemOptions: {
    heading: 'Intercom options we commonly install',
    intro: 'Architecture follows building type and cabling reality.',
    options: [
      {
        name: 'Audio gate-to-flat intercom',
        description:
          'Classic voice path from gate or lobby panel to flat handsets, with optional guard station monitoring.',
        suitableFor: 'Societies prioritising reliable voice and door release',
      },
      {
        name: 'Video lobby / gate intercom',
        description:
          'Call stations with camera so occupants see visitors before releasing entry, with indoor monitors or app endpoints where supported.',
        suitableFor: 'Apartments and offices that want visual screening',
      },
      {
        name: 'Office reception intercom',
        description:
          'Desk and door stations for vendor and guest screening, often paired with access control at lobby doors.',
        suitableFor: 'IT offices and commercial floors',
      },
      {
        name: 'Hotel / service-entry intercom',
        description:
          'Service corridor and back-of-house stations for staff and supplier communication without opening guest-facing doors casually.',
        suitableFor: 'Hotels and hospitality properties',
      },
    ],
  },
  keyFeatures: {
    heading: 'Features we design for',
    items: [
      'Clear audio paths sized for real gate and lobby noise',
      'Video call stations where visual confirmation matters',
      'Door release integration for the correct entrance only',
      'Guard or concierge stations when associations need a human filter',
      'Wiring and IP planning that matches building distance and switch capacity',
      'Weather-aware outdoor station mounting for Hyderabad conditions',
      'Coordination with CCTV and access control instead of siloed gadgets',
    ],
  },
  benefits: {
    heading: 'Benefits of a proper intercom layer',
    items: [
      'Fewer blind gate openings for unknown visitors',
      'Faster resident and staff response without running to the entrance',
      'Clearer accountability when a guard or flat answers a call',
      'Better guest experience at offices and hotels than ad-hoc phone calls',
      'A communication backbone that access cards alone cannot provide',
      'Room to grow into video door phones or access control without rethinking the whole entrance',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended configurations by property type',
    configs: [
      {
        name: 'Society gate + lobby package',
        description:
          'Outdoor gate station, lobby panel if needed, flat handsets or indoor monitors, and guard station with door release for pedestrian and vehicle gates as applicable.',
        suitableFor: 'Apartment associations',
      },
      {
        name: 'Office lobby screening',
        description:
          'Reception master station, door station at main entry, optional floor extensions, integrated with access control for staff while visitors use intercom.',
        suitableFor: 'Commercial offices',
      },
      {
        name: 'Villa gate intercom',
        description:
          'Gate video or audio station to indoor handset, often paired with a video door phone at the main door and CCTV on the compound.',
        suitableFor: 'Independent houses and villas',
      },
      {
        name: 'Hotel service & guest flow',
        description:
          'Intercoms at service entries and select guest areas, coordinated with hotel CCTV and access policies rather than a single all-purpose panel.',
        suitableFor: 'Hotels and serviced residences',
      },
    ],
  },
  installationProcess: {
    heading: 'How we install intercom systems',
    intro: 'Call flow and door hardware decide success more than the handset colour.',
    steps: standardProcessSteps({
      survey:
        'We walk gates, lobbies, and indoor endpoints with association or facilities stakeholders, note wiring routes, door lock types, and how visitors are handled today in your Hyderabad building.',
      installation:
        'Outdoor stations, indoor handsets or monitors, power supplies, and door release wiring are installed with neat terminations and weather-safe outdoor glands where needed.',
      configuration:
        'Directory numbering, call routing to flats or reception, door release timing, and any IP/network settings are configured to match the agreed visitor flow.',
      testing:
        'We test call quality, video clarity if applicable, door release on the correct leaf, and busy-hour behaviour for multi-flat directories where practical.',
      handover:
        'Residents or staff get a short how-to for answering and releasing doors, plus guidance on what to check if a single handset goes silent.',
    }),
  },
  maintenance: {
    heading: 'Keeping intercoms reliable',
    body: `Outdoor stations collect dust and face weather; keep panels clean and report crackle or one-way audio early. After electrical work or network changes, retest door release and call routing — intercoms often share power or LAN with other systems.

If you add access control or CCTV later, tell us so call stations and cameras cover complementary angles instead of duplicating the same blind spot.`,
  },
  brands: {
    heading: 'Brands we work with for intercoms',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty for intercom installations',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why AQ Enterprises for intercom systems',
    items: [
      'Call-flow design before product selection — societies and offices are not the same problem',
      'Practical integration with door release and access control rather than orphan handsets',
      'Ability to coordinate intercom with CCTV and video door phone projects under one team',
      'Hyderabad-aware outdoor mounting for dust and monsoon exposure',
      'Clear documentation for associations and facilities managers',
      'No fake bundle prices; scope follows station count and wiring reality',
    ],
  },
  hyderabadCoverage: {
    heading: 'Hyderabad coverage for intercom projects',
    body: `We install intercoms across Hyderabad apartments, office campuses, villas, and hospitality properties. Society projects usually need association approvals and a clear directory plan before drilling begins; office and hotel jobs need coordination with existing access hardware and reception workflows.

If your building has old 2-wire risers or a mix of previous brands, bring that up in the survey — reuse versus rip-and-replace is often the biggest cost and disruption decision, and inventing a one-line answer online would not help your block.`,
  },
  cta: {
    heading: 'Planning intercoms for your building?',
    body: 'Tell us whether you need audio or video, how many flats or desks must answer, and what door hardware exists today. We will propose a Hyderabad-ready intercom plan tied to your entry flow.',
    primaryLabel: 'Request intercom survey',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'intercom-audio-vs-video',
      question: 'Should we choose audio or video intercom?',
      answer:
        'Audio is enough when callers are mostly known and a guard also watches the gate. Video helps when residents or reception need to recognise delivery staff and unknown visitors before releasing a door. Many societies use video at the main gate and simpler audio at secondary points.',
      status: 'published',
    },
    {
      id: 'intercom-vs-video-door-phone',
      question: 'How is an intercom different from a video door phone?',
      answer:
        'A video door phone usually serves one home or flat door. An intercom system often serves a shared gate or lobby with many indoor endpoints. Homes sometimes need both: society intercom plus a private door phone. We can scope them together so wiring and user habits stay coherent.',
      status: 'published',
    },
    {
      id: 'intercom-access-control',
      question: 'Can intercoms integrate with access control?',
      answer:
        'Often yes, via door release relays or coordination with the access controller so a answered call opens only the intended door. Exact compatibility depends on lock type and controller inputs. We verify that during the survey instead of assuming universal plug-and-play.',
      status: 'published',
    },
    {
      id: 'intercom-apartment-wiring',
      question: 'Can you use existing apartment wiring?',
      answer:
        'Sometimes. Older risers may support audio upgrades; video and IP systems may need new cable or network capacity. We test what you have and recommend reuse only when call quality and reliability will hold up.',
      status: 'published',
    },
    {
      id: 'intercom-office-hotel',
      question: 'Do offices and hotels use the same intercom design as societies?',
      answer:
        'The hardware family can be similar, but call routing differs. Offices centre on reception and meeting flow; hotels add service entries and staff areas. We design the directory and door release logic for that workflow rather than forcing a residential template.',
      status: 'published',
    },
    {
      id: 'intercom-pricing',
      question: 'Why are intercom prices not listed here?',
      answer:
        'Station count, video vs audio, wiring distance, and door hardware change the bill of materials. A single website price would mislead associations and offices. We quote after understanding your Hyderabad building’s call flow and cabling.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'intercom-gate-station',
      alt: 'Outdoor video intercom call station at an apartment gate in Hyderabad',
      label: 'Gate call station',
    },
    {
      id: 'intercom-indoor-handset',
      alt: 'Indoor intercom handset on an apartment wall for visitor communication',
      label: 'Indoor handset',
    },
  ],
  relatedServices: [
    'video-door-phone-installation',
    'apartment-cctv-installation',
    'access-control-systems',
    'office-cctv-installation',
    'hotel-cctv-installation',
    'home-cctv-installation',
  ],
  relatedLocations: [
    'gachibowli',
    'kondapur',
    'kukatpally',
  ],
  relatedProjects: [
    'apartment-gachibowli',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'Intercom Systems Hyderabad | AQ Enterprises',
    description:
      'Audio and video intercom systems for Hyderabad societies, offices, and hotels. Visitor communication with practical door-release and entry integration.',
    canonical: '/services/intercom-systems',
    keywords: [
      'intercom systems Hyderabad',
      'video intercom apartment',
      'audio intercom office',
      'society gate intercom',
      'lobby intercom',
      'hotel intercom',
      'door release intercom',
    ],
    ogTitle: 'Intercom Systems in Hyderabad',
    ogDescription:
      'Audio/video intercoms for societies and offices — visitor talk-through with sensible entry integration.',
  },
};
