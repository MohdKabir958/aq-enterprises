import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const cctvAmcMaintenance: Service = {
  id: 'cctv-amc-maintenance',
  slug: 'cctv-amc-maintenance',
  name: 'CCTV AMC & Maintenance',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Planned CCTV AMC for Hyderabad homes, offices, factories, and warehouses — lens cleaning, firmware checks, health reports, and priority support on quarterly or annual plans.',
  h1: 'CCTV AMC & Maintenance in Hyderabad',
  hero: {
    eyebrow: 'AQ Enterprises',
    headline: 'CCTV AMC that keeps cameras honest',
    subheadline:
      'Scheduled cleaning, health checks, and priority support so your Hyderabad surveillance stays clear, recording, and reachable when something fails.',
    image: {
      id: 'cctv-amc-hero',
      alt: 'Technician inspecting a CCTV camera and NVR during scheduled AMC maintenance in Hyderabad',
      label: 'CCTV AMC visit',
    },
  },
  introduction: `A CCTV system only earns its keep when it is still recording, still focusing, and still reachable months after installation. Dust on lenses, loose connectors, filled hard drives, and skipped firmware updates quietly erode coverage — often without anyone noticing until an incident needs playback.

AQ Enterprises provides CCTV AMC and maintenance across Hyderabad for homes, offices, factories, warehouses, and mixed-use sites. The goal is simple: keep cameras clean, recorders healthy, and alerts working, with a named contact path when something breaks between visits.

We do not invent fixed package prices on this page. Quarterly and annual plans are scoped after we understand camera count, recorder type, outdoor exposure, and how critical remote viewing is for your site.`,
  whatIs: {
    heading: 'What CCTV AMC maintenance covers',
    body: `Annual Maintenance Contract (AMC) for CCTV is a scheduled service relationship, not a one-off repair call. Visits follow an agreed rhythm — commonly quarterly or annual — and include physical inspection, lens and housing cleaning where access allows, verification that every camera is streaming and recording, and a short health report of what was found and fixed.

Firmware and software checks sit alongside the hardware work. Recorder firmware, camera firmware where supported, user account hygiene, and storage health are reviewed so you are not discovering a failed disk or corrupted database only when you need footage. Priority support between visits means fault calls are handled ahead of ad-hoc jobs when capacity is tight.

In Hyderabad’s dust, monsoon humidity, and outdoor heat, outdoor cameras and junction boxes need more attention than indoor lobby units. An AMC plan should reflect that difference rather than treating every site as a desktop checklist.`,
  },
  whoNeeds: {
    heading: 'Who benefits from a CCTV AMC plan',
    intro: 'AMC is most useful when downtime or blind spots carry real operational or safety cost.',
    items: [
      'Housing societies and apartments where lobby, gate, and parking cameras must stay clear for association records',
      'Offices and IT floors that rely on reception, floor, and server-room coverage for daily operations',
      'Factories and warehouses with large camera counts and outdoor perimeters that gather dust and weather wear',
      'Retail and branch sites that need consistent recording retention without waiting for a crisis to call a technician',
      'Homes and villas where owners want scheduled checkups rather than guessing whether night vision still works',
      'Any site already using Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, or Panasonic gear that needs brand-aware servicing',
    ],
  },
  commonProblems: {
    heading: 'Problems that show up without maintenance',
    intro: 'These issues rarely announce themselves until playback is needed.',
    items: [
      'Fogged or dusty lenses that look “fine” on a phone thumbnail but fail to identify faces or plates',
      'Hard disks filling early, failing SMART checks, or recording only intermittently',
      'Cameras online in the app but not writing to the NVR/DVR channel map',
      'Outdated firmware leaving known bugs or unstable remote access unaddressed',
      'Loose outdoor mounts, water ingress in junction boxes, and PoE drops after monsoon season',
      'Forgotten passwords, unused accounts, and alerts that were never re-enabled after a power cut',
    ],
  },
  ourSolution: {
    heading: 'How AQ Enterprises runs CCTV AMC',
    body: `We start with an inventory of cameras, recorders, switches, and UPS or power paths where they exist. From that baseline we propose a visit cadence — typically quarterly for exposed commercial and industrial sites, or annual for smaller indoor-heavy homes — and agree what “priority support” means for your team (response window language is written into the quotation, not marketed as a universal SLA).

Each visit follows a practical checklist: visual inspection, cleaning where safe, focus and IR check at night-relevant angles when access timing allows, recorder health, storage retention, network reachability for remote viewing, and a short written note of open issues. If a repair needs parts outside the AMC scope, we separate that clearly so you are not surprised later.

Firmware updates are applied when stable and appropriate for the brand and model — Hikvision, CP Plus, Dahua, Uniview, and similar — never as a blind “update everything” rush that risks bricking a production recorder without a rollback plan.`,
  },
  systemOptions: {
    heading: 'AMC plan styles we commonly structure',
    intro: 'Plans are described by cadence and scope, not by invented rupee figures.',
    options: [
      {
        name: 'Quarterly health & cleaning plan',
        description:
          'Four scheduled visits a year with lens cleaning, channel verification, storage health, and a visit report. Suited to dusty outdoor cameras and busy commercial sites.',
        suitableFor: 'Factories, warehouses, large societies, multi-floor offices',
      },
      {
        name: 'Annual comprehensive checkup',
        description:
          'One deep annual service covering physical inspection, configuration review, firmware assessment, and remote access validation, with call-out support for faults in between as agreed.',
        suitableFor: 'Homes, small offices, compact retail sites',
      },
      {
        name: 'Priority support add-on',
        description:
          'Fault calls from AMC clients are queued ahead of one-off jobs when technician capacity is limited. Exact response windows are confirmed on the quotation for your site.',
        suitableFor: 'Sites that cannot wait days for a blank channel to be diagnosed',
      },
      {
        name: 'Multi-site AMC coordination',
        description:
          'Shared visit calendars and inventory tracking when you operate more than one Hyderabad location under the same ownership or facilities team.',
        suitableFor: 'Branch offices, warehouse + factory pairs, society clusters',
      },
    ],
  },
  keyFeatures: {
    heading: 'What is included in a typical AMC visit',
    items: [
      'Camera lens and housing cleaning where safe access exists',
      'Live view and recording verification for each channel',
      'Hard disk / storage health and retention review',
      'Firmware and software status check for recorder and supported cameras',
      'Basic network and remote viewing reachability test',
      'Written visit notes with open items and recommended next actions',
      'Priority handling for AMC fault tickets between scheduled visits',
    ],
  },
  benefits: {
    heading: 'Why scheduled maintenance matters',
    items: [
      'Fewer surprise blind spots when you need evidence',
      'Longer practical life for outdoor cameras in Hyderabad dust and rain',
      'Clearer accountability — you know when the system was last verified',
      'Faster fault path through priority support instead of starting from zero each time',
      'Storage and firmware issues caught before they erase weeks of history',
      'Easier budgeting for facilities teams versus purely reactive repairs',
    ],
  },
  recommendedConfigurations: {
    heading: 'Recommended AMC pairings by site type',
    intro: 'These are planning guides; final scope follows a site survey of camera count and exposure.',
    configs: [
      {
        name: 'Home / villa AMC',
        description:
          'Annual or bi-annual visit focused on outdoor gate/compound cameras, night IR check, and mobile app access for family accounts.',
        suitableFor: 'Independent houses and villas',
      },
      {
        name: 'Office AMC',
        description:
          'Quarterly or half-yearly checks for reception, floor corridors, and server-room channels plus user account hygiene for staff turnover.',
        suitableFor: 'IT and commercial offices',
      },
      {
        name: 'Industrial AMC',
        description:
          'Quarterly cleaning and health checks for high mounts, loading bays, and perimeter cameras with storage growth review as camera counts expand.',
        suitableFor: 'Factories and warehouses',
      },
      {
        name: 'AMC + repair path',
        description:
          'Combine scheduled maintenance with on-demand troubleshooting when a channel fails between visits — see our CCTV repair service for fault-focused work.',
        suitableFor: 'Any site that wants both prevention and recovery',
      },
    ],
  },
  installationProcess: {
    heading: 'How we onboard and run your AMC',
    intro: 'AMC starts with clarity on inventory and expectations, then settles into a repeatable visit rhythm.',
    steps: standardProcessSteps({
      survey:
        'We list cameras, recorders, switches, and outdoor vs indoor exposure, note existing faults, and agree visit cadence and what priority support covers for your Hyderabad site.',
      installation:
        'First AMC visit includes deep cleaning where accessible, connector and mount checks, and correction of minor issues that do not require separate parts quotations.',
      configuration:
        'We review recording schedules, motion zones if used, alert settings, firmware status, and remote viewing accounts so maintenance is not only cosmetic.',
      testing:
        'Every channel is checked for live stream and recent recordings; night-critical outdoor cameras are validated for IR/glow performance when visit timing allows.',
      handover:
        'You receive a visit report, open-item list, and the contact path for priority support between scheduled AMC visits.',
    }),
  },
  maintenance: {
    heading: 'Between AMC visits',
    body: `Between scheduled visits, watch for sudden channel loss, repeated remote login failures, or storage warnings on the recorder. Note the date and any recent power cuts or network changes — that context shortens diagnosis.

If you expand the camera count or relocate cameras after renovation, tell us so the AMC inventory stays accurate. An outdated channel list is how “all cameras checked” still misses a new blind spot.`,
  },
  brands: {
    heading: 'Brands we service under AMC',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty alongside AMC',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why choose AQ Enterprises for CCTV AMC',
    items: [
      'Maintenance framed around real Hyderabad dust, heat, and monsoon conditions — not a generic indoor checklist',
      'Clear separation between AMC labour/visits and parts or major repairs that need separate approval',
      'Experience across home, office, factory, and warehouse camera densities',
      'Brand-aware servicing for common lines such as Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, and Panasonic',
      'Written visit notes so facilities managers and owners share the same status',
      'Natural handoff to repair or reinstall work when AMC alone cannot restore a failed component',
    ],
  },
  hyderabadCoverage: {
    heading: 'Hyderabad coverage for CCTV AMC',
    body: `We schedule AMC visits across Hyderabad for residential societies, offices, industrial belts, and warehouse corridors. Visit windows are planned around site access rules — security gate passes, factory shutdown slots, or society association permissions — so cleaning and testing are not rushed through locked areas.

If your property sits on the city fringe with longer travel or restricted entry hours, we factor that into the visit plan during onboarding rather than promising same-day appearance for every call.`,
  },
  cta: {
    heading: 'Ready to put your CCTV on a maintenance plan?',
    body: 'Share your camera count, recorder type, and preferred quarterly or annual cadence. We will propose an AMC scope for your Hyderabad site without inventing fixed package prices online.',
    primaryLabel: 'Request AMC quote',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'cctv-amc-what-included',
      question: 'What is typically included in a CCTV AMC visit?',
      answer:
        'A typical visit includes lens and housing cleaning where access is safe, live and recording checks for each channel, storage health review, firmware status assessment, basic remote viewing verification, and a short written report. Parts replacement and major repairs are usually quoted separately unless your contract says otherwise.',
      status: 'published',
    },
    {
      id: 'cctv-amc-quarterly-vs-annual',
      question: 'Should I choose quarterly or annual CCTV AMC?',
      answer:
        'Outdoor-heavy and industrial sites in Hyderabad usually benefit from quarterly visits because dust and weather wear accumulate faster. Smaller indoor-focused homes and offices often do well with an annual deep checkup plus call-outs when something fails. We recommend cadence after seeing camera exposure and criticality.',
      status: 'published',
    },
    {
      id: 'cctv-amc-priority-support',
      question: 'What does priority support mean on an AMC?',
      answer:
        'Priority support means AMC client fault tickets are handled ahead of ad-hoc one-off jobs when technician capacity is limited. Exact response windows are written into your quotation rather than advertised as a universal guarantee for every neighbourhood and hour.',
      status: 'published',
    },
    {
      id: 'cctv-amc-firmware',
      question: 'Do you update CCTV firmware during AMC?',
      answer:
        'We assess firmware status and apply updates when they are appropriate and stable for the brand and model. We avoid blind mass updates that risk disrupting a working recorder without a rollback plan. Critical production systems may be updated in a controlled window you approve.',
      status: 'published',
    },
    {
      id: 'cctv-amc-other-brands',
      question: 'Can you maintain cameras installed by another vendor?',
      answer:
        'Yes, in many cases. We start with an inventory and access check. If login credentials, proprietary locks, or obsolete hardware block proper servicing, we document that honestly and propose practical options before committing to an AMC.',
      status: 'published',
    },
    {
      id: 'cctv-amc-pricing',
      question: 'Why are AMC prices not listed on this page?',
      answer:
        'Camera count, outdoor exposure, site access time, and recorder complexity change the labour needed. Listing a single price would mislead. We quote after a short inventory discussion or site survey so the plan matches your Hyderabad property.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'cctv-amc-cleaning',
      alt: 'Close-up of CCTV lens cleaning during quarterly AMC in Hyderabad',
      label: 'Lens cleaning',
    },
    {
      id: 'cctv-amc-report',
      alt: 'Technician reviewing NVR health status during CCTV maintenance visit',
      label: 'Health check report',
    },
  ],
  relatedServices: [
    'cctv-repair-troubleshooting',
    'home-cctv-installation',
    'office-cctv-installation',
    'factory-cctv-surveillance',
    'ip-camera-installation',
    'warehouse-cctv-installation',
  ],
  relatedLocations: [
    'hyderabad',
    'hitech-city',
    'nacharam',
    'banjara-hills',
  ],
  relatedProjects: [
    'office-hitech',
    'factory-nacharam',
    'villa-banjara',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'CCTV AMC & Maintenance Hyderabad | AQ Enterprises',
    description:
      'CCTV AMC in Hyderabad with cleaning, firmware checks, health reports, and priority support. Quarterly and annual plans for homes, offices, and industry.',
    canonical: '/services/cctv-amc-maintenance',
    keywords: [
      'CCTV AMC Hyderabad',
      'CCTV maintenance Hyderabad',
      'CCTV annual maintenance contract',
      'NVR health check',
      'camera cleaning service',
      'CCTV firmware update',
      'priority CCTV support',
    ],
    ogTitle: 'CCTV AMC & Maintenance in Hyderabad',
    ogDescription:
      'Scheduled CCTV maintenance — cleaning, health checks, firmware review, and priority support for Hyderabad sites.',
  },
};
