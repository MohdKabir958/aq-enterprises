import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const ptzCameraInstallation: Service = {
  id: 'ptz-camera-installation',
  slug: 'ptz-camera-installation',
  name: 'PTZ Camera Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',

  summary:
    'PTZ camera installation in Hyderabad for large open areas — pan, tilt, zoom coverage with presets, patrols, and practical guidance on when fixed cameras are the better choice.',

  h1: 'PTZ Camera Installation in Hyderabad',

  hero: {
    eyebrow: 'AQ Enterprises · CCTV & Security',
    headline: 'PTZ Camera Installation for Wide-Area Surveillance',
    subheadline:
      'Pan-tilt-zoom cameras for yards, gates, warehouses, and campuses across Hyderabad — configured with presets and patrols so operators can track activity without blind-spot guesswork.',
    image: {
      id: 'ptz-hero',
      alt: 'PTZ speed dome camera mounted for wide-area surveillance at a commercial site in Hyderabad',
      label: 'PTZ dome covering a large open yard / gate approach',
    },
  },

  introduction: `A PTZ (pan-tilt-zoom) camera is not a replacement for a full fixed-camera plan — it is a force multiplier for sites where one operator needs to watch a large open space and then follow movement when something happens. Factories with long yards, warehouse loading bays, villa compounds with long driveway approaches, and office campuses with shared parking often benefit from one or two well-placed PTZ units paired with fixed cameras at doors and choke points.

AQ Enterprises designs and installs PTZ systems in Hyderabad with a clear operating model: what should be watched on patrol, which presets matter for night shifts, and how zoom and recording interact with your NVR storage plan. We also tell you honestly when a fixed camera grid will outperform a PTZ — because a dome that “can look everywhere” still only looks in one direction at a time.`,

  whatIs: {
    heading: 'What is PTZ camera installation?',
    body: `PTZ camera installation means mounting a motorised camera that can pan horizontally, tilt vertically, and optically zoom into a scene, then integrating it with your recorder, network, and (where needed) control software or joystick. Unlike a fixed bullet or dome that always frames the same area, a PTZ can sweep a parking lot, zoom on a vehicle number plate at a gate, or return to a home position after a patrol.

A complete installation covers more than the dome itself. Power and data (often PoE or dedicated PTZ power), sturdy mounting height and reach, IR or low-light performance for night use, NVR channel allocation, and operator training all matter. Presets store useful angles — main gate, loading dock, generator yard — so staff can jump to a view in one click instead of hunting with the joystick. Auto-patrol routes can cycle through those presets on a schedule when nobody is actively controlling the camera.

PTZ systems from brands such as Hikvision, Dahua, Uniview, CP Plus, Bosch, and Honeywell are commonly specified depending on zoom ratio, weather rating, and control protocol. We match the product to the site: a villa compound does not need the same zoom class as a factory perimeter, and a warehouse aisle may be better served by fixed cameras than by a single expensive PTZ.`,
  },

  whoNeeds: {
    heading: 'Who needs PTZ cameras?',
    intro: 'PTZ makes sense when the site has large open sightlines and someone who will actually use the control — or when automated patrols meaningfully reduce blind time.',
    items: [
      'Factories and industrial yards with long perimeter walls, truck lanes, and scrap or material storage areas',
      'Warehouses and logistics sites that need to follow forklift or vehicle movement across loading bays',
      'Villas and gated residences with long approaches, side gardens, or rear service lanes',
      'Office campuses and tech parks with shared parking, entry plazas, and multi-building courtyards',
      'Schools, colleges, and institutions with playgrounds or large outdoor assembly spaces (as a complement to fixed cameras)',
      'Sites where security staff already watch live monitors and can benefit from joystick or on-screen PTZ control',
    ],
  },

  commonProblems: {
    heading: 'Common problems with PTZ deployments',
    intro: 'Most PTZ complaints come from poor placement or unrealistic expectations — not from the motor itself.',
    items: [
      'Expecting one PTZ to replace a full fixed-camera design, leaving doors and corridors unmonitored while the dome looks elsewhere',
      'Mounting too low or behind trees and signage so pan range and zoom are wasted',
      'No presets or patrols configured — operators rarely use the camera because aiming feels slow',
      'Night zoom that looks sharp in demos but fails on site due to lighting, IR wash, or haze',
      'Network or power instability causing freezes, reboots, or loss of position after power cuts',
      'Recording only the PTZ stream without enough fixed context cameras, making incident review incomplete',
    ],
  },

  ourSolution: {
    heading: 'How AQ Enterprises approaches PTZ installation',
    body: `We start with a site survey that maps open areas versus choke points. Fixed cameras still cover doors, aisles, cash counters, and reception; PTZ units are placed where a sweeping view and zoom add real value — typically high on a building corner, mast, or sturdy pole with a clear 360° or wide sector.

During design we define presets with you: gate in, gate out, parking row, loading dock, generator, boundary wall. Patrol dwell times are set so the camera does not rush past useful views. We configure home position after idle time, user permissions so only authorised staff can drive the PTZ, and recording retention that accounts for higher bitrate when zoomed or when continuous recording is required.

When fixed cameras are better, we say so. Narrow corridors, indoor office floors, retail shelves, and hospital wards almost always need fixed coverage. A PTZ shines outdoors and in large volumes; indoors it can become a distraction if every room fights for the same dome. Our quotes describe both layers so you are not sold a single “all-in-one” camera for a problem that needs a layout.`,
  },

  systemOptions: {
    heading: 'PTZ system options',
    intro: 'Options vary by zoom class, mounting, control method, and how tightly PTZ integrates with your existing IP CCTV stack.',
    options: [
      {
        name: 'Outdoor speed dome (moderate zoom)',
        description:
          'Weather-rated PTZ for parking, villa compounds, and mid-size yards. Suitable when you need pan coverage and moderate optical zoom for people and vehicles at typical campus distances.',
        suitableFor: 'Villas, offices, small warehouses',
      },
      {
        name: 'Long-zoom PTZ for large perimeters',
        description:
          'Higher optical zoom for factory boundaries, long driveways, and open industrial plots where identifying activity at distance matters. Mount height and vibration control are critical.',
        suitableFor: 'Factories, large logistics yards',
      },
      {
        name: 'Indoor PTZ / mini PTZ',
        description:
          'Used selectively in atriums, large lobbies, or halls. Often secondary to fixed cameras; chosen when staff need to follow a person across a wide indoor volume.',
        suitableFor: 'Lobbies, campus halls',
      },
      {
        name: 'PTZ + fixed camera hybrid',
        description:
          'Recommended default: fixed cameras for continuous evidence at doors and work zones; one or more PTZs for yard and gate follow-up. Best balance of cost, storage, and investigation quality.',
        suitableFor: 'Most commercial sites in Hyderabad',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features we configure',
    items: [
      'Pan, tilt, and optical zoom matched to site distances — not just brochure maximums',
      'Named presets for gates, docks, parking, and critical outdoor assets',
      'Auto-patrol schedules with sensible dwell times for night and holiday shifts',
      'Home position and idle return so the camera does not stay stuck on the last zoom',
      'Integration with IP NVR / VMS viewing for live control and playback',
      'User roles so casual viewers cannot accidentally drive the PTZ off a useful angle',
      'Weather-appropriate housings, IR or low-light settings, and surge-aware power practice',
      'Labelled cabling and mount documentation for faster future AMC visits',
    ],
  },

  benefits: {
    heading: 'Benefits of a well-planned PTZ setup',
    items: [
      'Cover large open areas with fewer cameras than a dense fixed grid alone',
      'Zoom in during live incidents without waiting for someone to walk to the scene',
      'Give security staff a clear “follow” tool while fixed cameras keep continuous context',
      'Improve gate and parking oversight for factories, warehouses, and campuses',
      'Reduce wasted spend by placing PTZ only where pan/zoom is justified',
      'Support AMC and troubleshooting with documented presets and network ports',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended configurations',
    intro: 'These are starting points for discussion during survey — final counts depend on sightlines, lighting, and how the site is staffed.',
    configs: [
      {
        name: 'Villa / compound',
        description:
          'One outdoor PTZ covering driveway and front approach, plus fixed cameras at main door, rear service door, and parking bay. Presets for gate, porch, and side lane.',
        suitableFor: 'Independent houses and villas',
      },
      {
        name: 'Office campus parking',
        description:
          'PTZ for parking plaza and entry road; fixed cameras at lobby, lifts, and server/store rooms. Patrol focused on vehicle rows during off-hours.',
        suitableFor: 'IT parks and multi-floor offices',
      },
      {
        name: 'Factory / warehouse yard',
        description:
          'One or two long-zoom or mid-zoom PTZs for yard and truck lane; dense fixed coverage at docks, stores, and production exits. Presets aligned to shift change and dispatch peaks.',
        suitableFor: 'Industrial and logistics sites',
      },
    ],
  },

  installationProcess: {
    heading: 'Installation process',
    intro: 'We follow a standard workflow with PTZ-specific checks for mount stability, preset programming, and operator handover.',
    steps: standardProcessSteps({
      survey:
        'We walk yards, gates, parking, and rooftops with you, measure practical zoom distances, note lighting and power, and decide where PTZ adds value versus where fixed cameras should remain the primary evidence layer.',
      installation:
        'PTZ domes are mounted on verified structures or poles with weather-safe fittings, neat PoE or hybrid power/data runs, and cable slack managed so pan movement does not stress connectors over time.',
      configuration:
        'Presets, patrols, home position, user permissions, OSD naming, and NVR channel settings are configured; bitrate and retention are checked against continuous versus event recording goals.',
      testing:
        'We exercise full pan/tilt range, confirm zoom clarity day and night, verify patrol timing, and ensure the camera recovers position after reboot or power interruption.',
      handover:
        'Your team learns live PTZ control, preset recall, playback of PTZ footage, and basic rules for when to leave the camera on patrol versus manual drive — with notes listing preset names and network identity.',
    }),
  },

  maintenance: {
    heading: 'Maintenance and upkeep',
    body: `PTZ cameras need a slightly different maintenance mindset than fixed domes. Motors, weather seals, and preset accuracy benefit from periodic checks. During AMC visits we clean housings, verify pan/tilt smoothness, re-confirm presets after any network or NVR changes, and check that firmware or configuration backups are sensible for your site.

Power quality and surge exposure matter outdoors. After monsoon storms or site electrical work, we recommend a quick functional test of patrol and zoom. If you expand the site — new shed, new gate — presets should be updated so operators are not zooming into obsolete angles.

For continuous reliability, pair PTZ AMC with the rest of your CCTV maintenance rather than treating the dome as a one-time gadget.`,
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
    heading: 'Why choose AQ Enterprises for PTZ installation',
    items: [
      'Honest design: we recommend PTZ only where pan-tilt-zoom improves outcomes',
      'Hybrid layouts that keep fixed cameras for continuous door and aisle evidence',
      'Preset and patrol programming aligned to how your security staff actually work',
      'Hyderabad site surveys that account for local lighting, mounting constraints, and power reality',
      'Support path through CCTV AMC rather than orphaned “set and forget” domes',
      'Clear documentation of channels, presets, and related network points',
    ],
  },

  hyderabadCoverage: {
    heading: 'Hyderabad coverage',
    body: `We install and support PTZ camera systems across Hyderabad — including industrial belts, warehouse corridors, villa neighbourhoods, and office campuses in areas such as Nacharam, Uppal, Kompally, Gachibowli, Hitech City, Banjara Hills, and surrounding localities.

Surveys are scheduled around site access windows so factory and warehouse teams are not disrupted. If your property spans multiple sheds or a long compound wall, we plan mount points and cable routes before hardware is finalised.`,
  },

  cta: {
    heading: 'Plan a PTZ survey for your site',
    body: 'Tell us about your yard, gate, or campus layout. We will recommend a practical PTZ-plus-fixed design — or explain when fixed cameras alone are the smarter spend.',
    primaryLabel: 'Request a site survey',
    primaryHref: '/#contact',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'ptz-faq-1',
      question: 'When should I choose a PTZ camera instead of more fixed cameras?',
      answer:
        'Choose PTZ when you have large open outdoor areas and a need to follow movement or zoom on demand. Keep fixed cameras for doors, aisles, and any spot that must be recorded continuously from a constant angle. Many Hyderabad sites do best with a hybrid design.',
    },
    {
      id: 'ptz-faq-2',
      question: 'Can one PTZ cover my entire factory?',
      answer:
        'Rarely as a sole solution. A PTZ only views one direction at a time. It can patrol a yard effectively, but loading docks, stores, and exits still need fixed cameras for reliable incident evidence.',
    },
    {
      id: 'ptz-faq-3',
      question: 'What are PTZ presets and patrols?',
      answer:
        'Presets are saved camera angles (for example main gate or dock 2). Patrols automatically move through those presets on a schedule. We configure both during installation so night staff are not manually aiming the camera all shift.',
    },
    {
      id: 'ptz-faq-4',
      question: 'Do PTZ cameras work at night in Hyderabad?',
      answer:
        'Yes, when the model, mounting height, and site lighting are matched correctly. We test night zoom during commissioning. Extreme distance identification at night still depends on lighting and atmosphere, not only the camera brand.',
    },
    {
      id: 'ptz-faq-5',
      question: 'Which brands do you install for PTZ?',
      answer:
        'Depending on zoom needs and budget, we commonly work with Hikvision, Dahua, Uniview, CP Plus, Bosch, Honeywell, and related product lines suited to the site. Brand choice is confirmed after survey.',
    },
    {
      id: 'ptz-faq-6',
      question: 'Do you provide AMC for PTZ systems?',
      answer:
        'Yes. PTZ units benefit from periodic mechanical and configuration checks. Ask about our CCTV AMC and maintenance plans when you request a quote.',
    },
  ],

  imagePlaceholders: [
    {
      id: 'ptz-presets',
      alt: 'PTZ camera preset list showing gate and loading dock views',
      label: 'Configured presets for gate and dock views',
    },
    {
      id: 'ptz-mount',
      alt: 'Outdoor PTZ camera on a corner mount overlooking a warehouse yard',
      label: 'Corner-mounted outdoor PTZ over a warehouse yard',
    },
  ],

  relatedLocations: [
    'nacharam',
    'uppal',
    'hitech-city',
  ],
  relatedProjects: [
    'factory-nacharam',
    'warehouse-uppal',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'factory-cctv-surveillance',
    'warehouse-cctv-installation',
    'villa-cctv-installation',
    'ip-camera-installation',
    'cctv-amc-maintenance',
    'office-cctv-installation',
  ],

  seo: {
    title: 'PTZ Camera Installation in Hyderabad | AQ Enterprises',
    description:
      'PTZ camera installation in Hyderabad for factories, warehouses, villas, and campuses. Presets, patrols, and hybrid designs with fixed CCTV. Site survey by AQ Enterprises.',
    canonical: '/services/ptz-camera-installation',
    keywords: [
      'PTZ camera installation Hyderabad',
      'pan tilt zoom CCTV',
      'speed dome camera installation',
      'warehouse PTZ camera',
      'factory perimeter PTZ',
      'AQ Enterprises CCTV',
    ],
    ogTitle: 'PTZ Camera Installation in Hyderabad',
    ogDescription:
      'Pan-tilt-zoom CCTV for large open areas — presets, patrols, and practical hybrid designs with fixed cameras.',
  },
};
