import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const videoDoorPhoneInstallation: Service = {
  id: 'video-door-phone-installation',
  slug: 'video-door-phone-installation',
  name: 'Video Door Phone Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',

  summary:
    'Video door phone installation in Hyderabad for villas and apartments — outdoor stations, indoor monitors, and clearer visitor screening before you unlock the door.',

  h1: 'Video Door Phone Installation in Hyderabad',

  hero: {
    eyebrow: 'AQ Enterprises · CCTV & Security',
    headline: 'Video Door Phones for Safer Home Entry',
    subheadline:
      'See and speak to visitors at the gate or flat door before you open — villa and apartment video door phone systems installed and configured across Hyderabad.',
    image: {
      id: 'vdp-hero',
      alt: 'Video door phone outdoor station and indoor monitor in a Hyderabad apartment',
      label: 'Outdoor call station with indoor video monitor',
    },
  },

  introduction: `A peephole only helps when you are already at the door. A video door phone puts a camera and call button at the gate or flat entrance and a monitor inside so you can see who is waiting, speak to them, and release the lock when appropriate. For Hyderabad villas with street-facing gates and apartments where delivery traffic is constant, that screening step reduces unnecessary door opening — especially for children, elders, or staff alone at home during the day.

AQ Enterprises installs video door phone systems as a focused entry layer: outdoor station, indoor monitor(s), wiring or wireless links where suitable, and optional electric lock integration. We also explain how door phones relate to CCTV and full access control — complementary tools, not duplicates — so you do not buy three products that all try to do the same job poorly.`,

  whatIs: {
    heading: 'What is a video door phone?',
    body: `A video door phone (video door entry / video intercom) connects an outdoor audio-video station to one or more indoor monitors. When a visitor presses the call button, the monitor rings, shows a live image, and lets residents talk hands-free or with a handset depending on the model. Many systems can trigger an electric strike or gate lock so you open the entrance remotely after screening.

Villa systems often place the outdoor unit at the compound gate with a monitor in the living area and sometimes a second monitor upstairs. Apartment systems may be flat-to-door for a single residence, or part of a building lobby pattern depending on what the society already supports. Indoor monitors should be mounted where someone can actually hear the call — not hidden behind wardrobe doors.

Brands commonly used in residential projects include options from Hikvision, CP Plus, Dahua, Godrej, Panasonic, and similar lines. We select for night visibility at the door, durable outdoor housings, and monitor usability for non-technical family members.`,
  },

  whoNeeds: {
    heading: 'Who needs a video door phone?',
    intro: 'Homes and flats that receive frequent unknown visitors benefit most — especially where the gate is far from the living space.',
    items: [
      'Villas and independent houses with compound gates away from the main door',
      'Apartments that want flat-level screening of visitors and deliveries',
      'Households with elders or children who should not open doors blindly',
      'Homes where domestic staff manage daytime entry and need a clear process',
      'Residences combining door phones with wireless or IP CCTV for wider coverage',
      'Townhouses and gated plots that want audio-video at the pedestrian gate',
    ],
  },

  commonProblems: {
    heading: 'Common video door phone problems',
    intro: 'Poor mounting and ignored lighting cause more complaints than the electronics themselves.',
    items: [
      'Outdoor camera pointed into harsh sun or complete darkness with no porch light',
      'Monitor placed where nobody hears the ringtone during daily routines',
      'Wireless links chosen for convenience but unreliable through thick walls',
      'Lock release wired without checking gate alignment and power for the strike',
      'No rain protection or mounting height that invites vandalism at street level',
      'Expecting a door phone to replace CCTV for driveway and parking evidence',
    ],
  },

  ourSolution: {
    heading: 'How AQ Enterprises installs video door phones',
    body: `We survey gate geometry, cable paths, indoor monitor locations, and whether an electric lock already exists. For villas, we plan neat outdoor routing that survives weather and gardener activity. For apartments, we respect society rules on common-area drilling and prefer paths that do not create disputes with the association.

Configuration includes ringtone volume, unlock pulse timing, and night image checks. If you also want CCTV, we keep the door phone as the conversation layer and cameras as the recording layer. If you need card access for staff or drivers, we discuss access control as a separate but compatible track rather than forcing every credential through the door phone.

Handover focuses on the people who will use it daily — including how to ignore nuisance calls and when not to unlock for unfamiliar voices.`,
  },

  systemOptions: {
    heading: 'Video door phone options',
    intro: 'Wired systems remain the reliability default; wireless helps where cabling is constrained.',
    options: [
      {
        name: 'Villa gate video door phone',
        description:
          'Outdoor station at the compound gate, indoor monitor in the living area, optional second monitor, and gate lock release where hardware allows.',
        suitableFor: 'Independent houses and villas',
      },
      {
        name: 'Apartment flat door system',
        description:
          'Compact outdoor unit at the flat entrance with indoor monitor — ideal for delivery screening when lobby security is limited.',
        suitableFor: 'Individual apartments',
      },
      {
        name: 'Multi-monitor household',
        description:
          'Same outdoor station calling two indoor points so upstairs and downstairs can answer without running to one screen.',
        suitableFor: 'Larger villas and duplexes',
      },
      {
        name: 'Door phone + CCTV complement',
        description:
          'Video door phone for talk-and-release; fixed or wireless CCTV for driveway, parking, and side lanes that the door station cannot see.',
        suitableFor: 'Homes wanting full perimeter awareness',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features we configure',
    items: [
      'Clear outdoor video for day visitor identification',
      'Two-way audio tuned so voices are intelligible at the gate',
      'Indoor monitor placement where calls are heard and answered',
      'Electric lock / gate release timing matched to your door hardware',
      'Night performance checks with existing porch or gate lighting',
      'Durable outdoor mounting with weather consideration',
      'Optional second indoor monitor for multi-floor homes',
      'Guidance on combining with intercom, CCTV, or access control',
    ],
  },

  benefits: {
    heading: 'Benefits of video door phones',
    items: [
      'Screen visitors before unlocking the gate or flat door',
      'Reduce door-opening for unknown delivery claims',
      'Give elders a safer way to speak to callers without stepping outside',
      'Let staff verify guests against your instructions',
      'Add a dedicated entry conversation channel without watching CCTV apps all day',
      'Improve everyday convenience for villa gates far from the living room',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended configurations',
    intro: 'Entry distance and building rules decide cabling; these layouts cover most Hyderabad homes.',
    configs: [
      {
        name: 'Villa essential',
        description:
          'Gate station + one indoor monitor + lock release on the pedestrian gate; optional CCTV on driveway and rear service door.',
        suitableFor: 'Most independent houses',
      },
      {
        name: 'Villa expanded',
        description:
          'Gate station, two indoor monitors, lock release, and coordinated wireless or IP cameras for parking and side setbacks.',
        suitableFor: 'Larger compounds',
      },
      {
        name: 'Apartment flat kit',
        description:
          'Flat-door outdoor unit and indoor monitor with simple unlock where the door hardware supports it; society permissions confirmed first.',
        suitableFor: 'Apartment residents',
      },
    ],
  },

  installationProcess: {
    heading: 'Installation process',
    intro: 'Door phones are small systems, but cable path and lock timing still need a disciplined process.',
    steps: standardProcessSteps({
      survey:
        'We check gate or flat door position, indoor answer points, cable routes or wireless feasibility, lock hardware, and lighting for night identification.',
      installation:
        'Outdoor stations and indoor monitors are mounted securely with neat wiring, weather-aware outdoor seals, and lock release cabling tested for correct strike behaviour.',
      configuration:
        'Call routing, volume, unlock duration, and date/time settings are configured; night image and audio levels are adjusted for your doorway.',
      testing:
        'We place test calls from the outdoor unit, verify audio both ways, confirm unlock pulses, and check behaviour if a second monitor is installed.',
      handover:
        'Household users learn answer, reject, unlock, and basic care of the outdoor lens. You receive a simple do/don’t guide for visitor screening.',
    }),
  },

  maintenance: {
    heading: 'Maintenance and upkeep',
    body: `Wipe outdoor lenses gently when dust or rain spots build up — Hyderabad’s dry and monsoon cycles both leave residue. Keep porch or gate lights working; the best camera still needs photons at night.

If you renovate interiors, protect monitor cables before carpentry begins. For AMC customers who also have CCTV with us, we can include a functional door-phone call test during visit routines.

Replace damaged outdoor stations promptly after vandalism or vehicle strikes at low gates; bent mounts create permanent misframed views.`,
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
    heading: 'Why choose AQ Enterprises for video door phones',
    items: [
      'Residential focus on villa gates and apartment flat doors',
      'Honest advice on wired versus wireless reliability for your walls',
      'Lock release integration checked mechanically, not assumed',
      'Clear separation of door phone, CCTV, and access control roles',
      'Family-friendly handover, not only technician settings',
      'Hyderabad installation support and optional ongoing maintenance',
    ],
  },

  hyderabadCoverage: {
    heading: 'Hyderabad coverage',
    body: `We install video door phones across Hyderabad villa neighbourhoods and apartment communities — including areas such as Banjara Hills, Jubilee Hills, Gachibowli, Kondapur, Kompally, and other residential localities.

Apartment work is scheduled with society permissions in mind. Villa jobs can often combine door phone and home CCTV in one survey when you want a single entry and perimeter plan.`,
  },

  cta: {
    heading: 'Screen visitors before you open',
    body: 'Tell us whether you need a villa gate system or an apartment flat kit. We will recommend outdoor and indoor units that fit your doorway and daily routine.',
    primaryLabel: 'Request a home survey',
    primaryHref: '/#contact',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'vdp-faq-1',
      question: 'Is a video door phone the same as CCTV?',
      answer:
        'No. A door phone is for live visitor conversation and optional door release. CCTV records wider areas for later review. Many homes use both: door phone at the gate and cameras on driveway or parking.',
    },
    {
      id: 'vdp-faq-2',
      question: 'Can I open my villa gate from the indoor monitor?',
      answer:
        'Yes, when an electric lock or compatible gate release is installed and wired correctly. We verify gate alignment and power so unlock pulses actually open the entrance.',
    },
    {
      id: 'vdp-faq-3',
      question: 'Do apartment societies allow video door phone installation?',
      answer:
        'Many do for flat-level devices; common-area work may need written permission. We survey cable paths that respect society rules before drilling.',
    },
    {
      id: 'vdp-faq-4',
      question: 'Wired or wireless — which is better?',
      answer:
        'Wired is generally more stable for permanent homes. Wireless can help where cabling is blocked, but thick walls and interference can affect calls. We recommend based on the actual route survey.',
    },
    {
      id: 'vdp-faq-5',
      question: 'Can two indoor monitors ring for one outdoor station?',
      answer:
        'Often yes on multi-monitor kits. We confirm model capability during selection so upstairs and downstairs can both answer.',
    },
    {
      id: 'vdp-faq-6',
      question: 'Which brands do you install?',
      answer:
        'Depending on features and budget, we commonly work with residential lines from Hikvision, CP Plus, Dahua, Godrej, Panasonic, and similar. Final choice follows your doorway and monitor preferences.',
    },
  ],

  imagePlaceholders: [
    {
      id: 'vdp-gate',
      alt: 'Villa gate with outdoor video door phone station',
      label: 'Outdoor station at a villa gate',
    },
    {
      id: 'vdp-monitor',
      alt: 'Indoor video door phone monitor showing visitor at entrance',
      label: 'Indoor monitor visitor view',
    },
  ],

  relatedLocations: [
    'banjara-hills',
    'jubilee-hills',
    'kondapur',
    'gachibowli',
  ],
  relatedProjects: [
    'villa-banjara',
    'apartment-gachibowli',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'home-cctv-installation',
    'apartment-cctv-installation',
    'villa-cctv-installation',
    'intercom-systems',
    'access-control-systems',
    'wireless-cctv-installation',
  ],

  seo: {
    title: 'Video Door Phone Installation in Hyderabad | AQ Enterprises',
    description:
      'Video door phone installation in Hyderabad for villas and apartments. Outdoor stations, indoor monitors, and visitor screening before you unlock. AQ Enterprises.',
    canonical: '/services/video-door-phone-installation',
    keywords: [
      'video door phone Hyderabad',
      'video door entry system',
      'villa gate video phone',
      'apartment video door phone',
      'indoor monitor installation',
      'AQ Enterprises',
    ],
    ogTitle: 'Video Door Phone Installation in Hyderabad',
    ogDescription:
      'Villa and apartment video door phones for clearer visitor screening and optional gate release.',
  },
};
