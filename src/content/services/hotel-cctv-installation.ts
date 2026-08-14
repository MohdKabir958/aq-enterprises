import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const hotelCctvInstallation: Service = {
  id: 'hotel-cctv-installation',
  slug: 'hotel-cctv-installation',
  name: 'Hotel CCTV Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Hotel and hospitality CCTV in Hyderabad — lobby, corridors, parking, and staff areas with guest privacy kept in focus.',
  h1: 'Hotel CCTV Installation in Hyderabad',
  hero: {
    eyebrow: 'Hospitality security',
    headline: 'Hotel cameras that support operations — not guest intrusion',
    subheadline:
      'CCTV for hotels, boutique stays, and serviced residences in Hyderabad. Lobby, corridors, parking, and back-of-house coverage with clear guest privacy boundaries.',
    image: {
      id: 'hotel-cctv-hero',
      alt: 'Hotel lobby CCTV camera placement for hospitality operations',
      label: 'Hotel lobby and corridor CCTV (placeholder)',
    },
  },
  introduction: `Hotels sell comfort and discretion as much as beds and breakfast. Guests expect to feel safe in corridors and parking areas without sensing that private rooms are under watch. AQ Enterprises designs hotel CCTV in Hyderabad for that hospitality balance: strong coverage where operations and liability meet, and firm boundaries where guest privacy begins.

Front-of-house needs differ from back-of-house. The lobby, reception approach, lift lobbies, floor corridors, banquet pre-function spaces, and parking ramps benefit from clear recording. Staff entries, stores, kitchen service corridors, and loading bays need accountability of a different kind. Guest rooms and private bathrooms stay off the camera plan.

Night audits, incident review after a lobby dispute, or checking a parking scrape at 2 a.m. are the moments systems earn their keep. We configure viewing for duty managers and security roles so the night team can respond without calling an engineer for every playback request.`,

  whatIs: {
    heading: 'What hotel CCTV installation includes',
    body: `Hotel CCTV installation is the planning and deployment of cameras and recorders across hospitality premises, with zoning that protects guest privacy while supporting safety and operational review. Coverage commonly includes the main porte-cochère or entrance, lobby and reception interface, lift lobbies, guest floor corridors, staircases, parking levels, pool or amenity edges only as policy allows, and staff or goods entries.

Privacy is not a slogan here — it is a placement rule. Cameras are not aimed into guest rooms through doors or peepholes, and washrooms remain no-camera zones. Where boutique properties have unusual layouts, we walk each floor with the general manager or chief engineer before finalising points.

Systems are typically IP-based with NVRs sized for multi-floor motion, PoE networking where the building allows, and user accounts for security and management. Hotels often pair CCTV with access control on staff doors, intercoms at service gates, video door phones at specific entries, and fire alarm awareness in equipment rooms. Those are complementary projects, not automatic add-ons.`,
  },

  whoNeeds: {
    heading: 'Who this service is for',
    items: [
      'Business hotels and airport-corridor properties',
      'Boutique hotels and heritage conversions with complex corridors',
      'Serviced apartments and extended-stay residences',
      'Banquet-led properties with large pre-function movement',
      'Properties refreshing outdated lobby and parking cameras',
      'Groups standardising viewing across more than one Hyderabad property',
    ],
  },

  commonProblems: {
    heading: 'Hospitality CCTV problems we see',
    items: [
      'Lobby cameras washed out by glass and chandelier lighting',
      'Corridor blind spots near lift lobbies and stair returns',
      'Parking cameras that miss ramp turns and exit barriers',
      'Staff area doors with no useful recording when stock moves',
      'Duty managers without a simple way to pull last night’s clip',
      'Guest privacy concerns from poorly aimed corridor cameras',
      'Recorders hidden in damp or unlocked spaces',
    ],
  },

  ourSolution: {
    heading: 'Our hospitality-focused approach',
    body: `We tour the guest journey and the staff journey separately. Guest path: arrival, lobby, lifts, floor corridor, parking. Staff path: service entry, stores, kitchen corridor, loading. That dual map prevents a “cameras everywhere” plan that still misses the loading bay.

Lighting is a first-class concern in hotels. Polished floors and façade glass create glare; we adjust angles and camera types accordingly. Corridor cameras are placed for length coverage without peering into room thresholds more than necessary for circulation safety.

Recorder location, UPS awareness, and account roles for security and night managers are configured during commissioning. If the property wants intercoms, door access, or video door phones at secondary gates, we align conduit and device positions so the façade and service corridors stay tidy.

Installation phasing respects occupied rooms — floor-by-floor work, quieter hours for drilling near stay corridors, and coordination with housekeeping and engineering. Handover includes how a duty manager finds footage after a lobby or parking incident.`,
  },

  systemOptions: {
    heading: 'System options for hotels',
    intro: 'Match the design to property size, parking depth, and how the night team works.',
    options: [
      {
        name: 'Lobby and corridor core',
        description:
          'Entrance, lobby, lift lobbies, and primary guest corridors with central recording for security and management review.',
        suitableFor: 'Boutique and compact business hotels',
      },
      {
        name: 'Parking and perimeter add-on',
        description:
          'Ramps, basement turns, exit barriers, and external approaches layered onto the core guest-path coverage.',
        suitableFor: 'Properties with multi-level or street parking risk',
      },
      {
        name: 'Back-of-house accountability',
        description:
          'Staff entries, stores, and service corridors emphasised alongside guest-area cameras.',
        suitableFor: 'Hotels tightening stock and service-door control',
      },
      {
        name: 'Multi-property viewing standard',
        description:
          'Consistent camera naming and remote access habits so a group operations role can recognise each hotel quickly.',
        suitableFor: 'Hospitality groups with more than one site',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features',
    items: [
      'Guest privacy boundaries documented in the camera map',
      'Lobby, corridor, parking, and staff-area planning from dual journeys',
      'Lighting-aware angles for glazed lobbies',
      'Duty-manager-friendly playback handover',
      'Secure NVR placement away from casual access',
      'Optional alignment with access control, intercom, and fire projects',
      'Phased install suitable for live occupied floors',
    ],
  },

  benefits: {
    heading: 'Benefits for hotel operations',
    items: [
      'Faster review of lobby, corridor, and parking incidents',
      'Clearer accountability at staff and goods entries',
      'Guest-facing spaces that feel safer without feeling invasive',
      'Night team autonomy for routine playback',
      'Cleaner documentation when engineering expands a wing',
      'A maintainable system through renovations and brand refreshes',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended configurations',
    intro: 'Property class and parking layout change camera counts; treat these as planning sketches.',
    configs: [
      {
        name: 'Boutique property',
        description:
          'Entrance, lobby, lift lobby, corridor spines, and one staff or goods door, with compact NVR and manager app access.',
        suitableFor: 'Small room-count hotels and boutique stays',
      },
      {
        name: 'Full-service city hotel',
        description:
          'Multi-floor corridors, lobby cluster, banquet approaches as needed, parking levels, and back-of-house doors with security desk viewing.',
        suitableFor: 'Mid to large hotels with active F&B and events',
      },
      {
        name: 'Serviced residence',
        description:
          'Lobby and lift focus, residential-style corridors, parking, and controlled service entry — privacy rules similar to hotels with longer stays.',
        suitableFor: 'Serviced apartments and extended stay',
      },
    ],
  },

  installationProcess: {
    heading: 'Installation process for live hotels',
    intro: 'Occupied rooms and guest comfort shape how we schedule noisy and ladder work.',
    steps: standardProcessSteps({
      survey:
        'We walk guest and staff journeys with engineering or security, note glare points in the lobby, map corridor blind spots, parking ramps, and no-camera privacy zones, then propose a role-based camera plan.',
      installation:
        'Cameras and cabling are installed in phases by floor or zone, with weather-safe external mounts and neat routes through service ceilings where available.',
      configuration:
        'Recording schedules, accounts for security and duty managers, retention as agreed, and remote viewing (if approved) are configured with hospitality-friendly camera names.',
      testing:
        'We check lobby lighting conditions, corridor night clarity, parking ramp coverage, storage health, and that a sample incident playback is easy for the night team.',
      handover:
        'Security and engineering receive live view, playback, export steps, and account hygiene notes, plus a floor-wise camera map for future renovations.',
    }),
  },

  maintenance: {
    heading: 'Keeping hospitality CCTV dependable',
    body: `Hotels renovate often — new lobby lighting, corridor carpet projects, façade work. Each change can defeat an old camera angle. Periodic re-aims, lens cleaning in dusty basement parking, and recorder health checks keep the system honest.

Account updates when security vendors or managers change are frequently skipped; we emphasise that during handover and AMC visits. External cameras on drop-off points face weather and vehicle vibration — housings and brackets deserve scheduled inspection.

Repair response for a dark parking channel matters at night. Pair CCTV maintenance with checks on related intercoms or access doors when those systems share the same service rooms.`,
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
    heading: 'Why hotels choose AQ Enterprises',
    items: [
      'Guest privacy treated as a hard design rule',
      'Lobby and parking lighting problems anticipated in the survey',
      'Install phasing that respects occupied inventory',
      'Duty-manager playback training, not only engineer-level setup',
      'Ready to align with access, intercom, and fire scopes',
      'Hyderabad service continuity after handover',
    ],
  },

  hyderabadCoverage: {
    heading: 'Hotels across Hyderabad',
    body: `From established hospitality districts to newer business hotels near IT corridors, we install and support hotel CCTV across Hyderabad. Properties differ in heritage constraints, basement parking depth, and brand engineering standards; the survey captures those realities before materials are locked.

Tell us your property type, approximate keys or floors, and whether parking and banquet areas are in scope. We will propose a survey with engineering and a privacy-aware camera layout. Twin-city edge properties are discussed when travel fits the project.`,
  },

  cta: {
    heading: 'Improve hotel surveillance without invading guest privacy',
    body: 'Share your property type and priority zones — lobby, corridors, parking, or staff areas. We will schedule a walkthrough with your engineering or security lead.',
    primaryLabel: 'Request a hotel survey',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'hotel-cctv-faq-1',
      question: 'Are cameras installed inside guest rooms?',
      answer:
        'No. Guest rooms and private bathrooms are outside a proper hospitality CCTV plan. Coverage focuses on lobbies, corridors, parking, and staff or service areas as agreed with management.',
      relatedServices: ['hotel-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hotel-cctv-faq-2',
      question: 'Can the night manager view cameras remotely?',
      answer:
        'If management approves remote access, we configure accounts for named roles. Many hotels keep primary viewing on a security desk and use remote access as a backup for managers. Local recording continues regardless of internet quality.',
      relatedServices: ['hotel-cctv-installation', 'ip-camera-installation'],
      status: 'published',
    },
    {
      id: 'hotel-cctv-faq-3',
      question: 'How do you handle parking and basement ramps?',
      answer:
        'We map ramp turns, exit barriers, and dark corners during the survey and choose cameras suited to low light where needed. Parking is often phased if the hotel wants guest-floor work completed first.',
      relatedServices: ['hotel-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hotel-cctv-faq-4',
      question: 'Can CCTV integrate with hotel door access or intercoms?',
      answer:
        'Cameras and access or intercom systems complement each other at staff doors and secondary gates. We can plan shared cabling routes and equipment rooms so the stack stays maintainable.',
      relatedServices: ['hotel-cctv-installation', 'access-control-systems', 'intercom-systems'],
      status: 'published',
    },
    {
      id: 'hotel-cctv-faq-5',
      question: 'Will guests notice a lot of disruption during installation?',
      answer:
        'We phase noisy work and avoid occupying guest corridors during peak check-in when possible. Engineering usually prefers floor-by-floor windows. Some lobby work may need off-peak scheduling.',
      relatedServices: ['hotel-cctv-installation'],
      status: 'published',
    },
    {
      id: 'hotel-cctv-faq-6',
      question: 'What about banquet and pre-function areas?',
      answer:
        'Many hotels include pre-function corridors and banquet entries for crowd and asset oversight. Exact points follow events operations and privacy expectations — we do not assume every hall interior needs cameras.',
      relatedServices: ['hotel-cctv-installation'],
      status: 'published',
    },
  ],

  imagePlaceholders: [
    {
      id: 'hotel-cctv-lobby',
      alt: 'Hotel lobby CCTV coverage concept for reception and entrance',
      label: 'Lobby and reception coverage (placeholder)',
    },
    {
      id: 'hotel-cctv-parking',
      alt: 'Hotel parking ramp CCTV coverage concept',
      label: 'Parking and ramp coverage (placeholder)',
    },
  ],

  relatedLocations: [
    'begumpet',
    'jubilee-hills',
    'banjara-hills',
  ],
  relatedProjects: [],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'access-control-systems',
    'ip-camera-installation',
    'intercom-systems',
    'cctv-amc-maintenance',
    'fire-alarm-systems',
    'video-door-phone-installation',
  ],

  seo: {
    title: 'Hotel CCTV Installation in Hyderabad',
    description:
      'Hotel CCTV in Hyderabad for lobby, corridors, parking, and staff areas — guest-privacy-aware installs by AQ Enterprises.',
    canonical: '/services/hotel-cctv-installation',
    keywords: [
      'hotel CCTV installation Hyderabad',
      'hospitality surveillance',
      'hotel lobby cameras',
      'hotel parking CCTV',
      'boutique hotel security cameras',
    ],
  },
};
