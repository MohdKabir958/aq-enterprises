import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const cctvRepairTroubleshooting: Service = {
  id: 'cctv-repair-troubleshooting',
  slug: 'cctv-repair-troubleshooting',
  name: 'CCTV Repair & Troubleshooting',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'On-site CCTV repair in Hyderabad for no video, HDD failure, night vision faults, PoE/power issues, and practical DVR/NVR recovery — diagnosed before parts are replaced.',
  h1: 'CCTV Repair & Troubleshooting in Hyderabad',
  hero: {
    eyebrow: 'AQ Enterprises',
    headline: 'Fix the channel that went dark',
    subheadline:
      'Structured troubleshooting for blank screens, dead hard disks, weak night vision, and power faults — so you restore evidence, not guesswork.',
    image: {
      id: 'cctv-repair-hero',
      alt: 'Technician diagnosing a CCTV NVR and camera channel with no video in a Hyderabad office',
      label: 'CCTV fault diagnosis',
    },
  },
  introduction: `When a camera shows no video, night vision washes out, or the recorder beeps about a failed disk, the temptation is to replace the nearest box. That approach wastes money when the real fault is a PoE injector, a crushed cable, a full HDD, or a mis-mapped channel after a power cut.

AQ Enterprises provides CCTV repair and troubleshooting across Hyderabad for homes, offices, and commercial sites. We diagnose systematically — power, link, configuration, storage, then hardware — and explain what we found before recommending parts or a reinstall path.

This page does not invent repair prices or promise magic recovery of every overwritten recording. Some faults need a camera replacement; some need cabling; some need a careful NVR rebuild with whatever footage remains.`,
  whatIs: {
    heading: 'What CCTV repair and troubleshooting means',
    body: `Repair work starts with symptoms you can describe: no video on one channel, all channels blank, recorder not booting, remote app offline, IR night vision useless, or playback missing for a date range. Troubleshooting maps those symptoms to likely layers — camera power, network/PoE, recorder software, hard disk health, or physical damage.

DVR and NVR recovery basics matter when the system still powers on but recordings look corrupt, channels were remapped, or a disk dropped out of the array. Recovery is not the same as forensic data reconstruction; it means restoring a working recording path and salvaging accessible footage where the file system still allows it.

Wireless and IP systems add another layer: Wi-Fi congestion, weak bridges, and VLAN mistakes can look identical to a “dead camera” until you test with a known-good PoE port or short temporary cable.`,
  },
  whoNeeds: {
    heading: 'Who calls for CCTV repair',
    intro: 'Anyone who depends on footage and suddenly cannot trust what they see.',
    items: [
      'Homeowners with a blank gate camera or app that no longer loads live view',
      'Office facilities teams facing a dead reception channel or server-room blind spot',
      'Sites where the NVR/DVR reports HDD failure or stops recording without warning',
      'Outdoor cameras that work by day but fail at night due to IR, power, or housing issues',
      'Properties after electrical work, renovation, or water ingress that disturbed cabling',
      'Managers who need a second opinion before replacing an entire brand-new camera set',
    ],
  },
  commonProblems: {
    heading: 'Faults we diagnose most often',
    intro: 'Symptoms overlap; root causes usually do not.',
    items: [
      'No video on one channel while neighbouring cameras still stream',
      'Entire recorder UI offline or stuck in reboot loops after power events',
      'HDD fail / SMART warnings / recording stopped with disk full or disk missing errors',
      'Night vision washed out, IR LEDs dead, or spider-web reflection flooding the image',
      'PoE switch port failures, injector faults, voltage drop on long outdoor runs',
      'Remote viewing broken after ISP change, router reset, or expired DDNS/cloud bindings',
    ],
  },
  ourSolution: {
    heading: 'How we approach CCTV fault finding',
    body: `We begin with what changed: power cuts, monsoon water, IT network changes, or someone “tidying” cables in a rack. Then we isolate — swap known-good ports, measure PoE where tools allow, check camera web UI versus recorder channel map, and inspect outdoor junctions for moisture.

For HDD failures we confirm whether the disk is physically failing, only full, or logically corrupted. Options may include disk replacement with reconfiguration, cautious attempts to export remaining clips, or accepting that overwritten segments are gone. We do not claim guaranteed recovery of every deleted frame.

Night vision issues get optical and electrical checks: dirty lenses, failed IR arrays, over-sensitive exposure settings, and white-light glare from nearby fixtures. Brands such as Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, and Panasonic each have model-specific menus; we navigate those rather than resetting everything to factory as a first move.`,
  },
  systemOptions: {
    heading: 'Repair paths we commonly recommend',
    intro: 'The right path depends on diagnosis — not a one-size kit.',
    options: [
      {
        name: 'Single-channel restore',
        description:
          'Isolate one blank camera: power, cable/PoE, configuration, then camera replacement only if the unit itself has failed.',
        suitableFor: 'Homes and offices with one dark channel',
      },
      {
        name: 'Recorder & storage recovery',
        description:
          'Address DVR/NVR boot issues, channel map repair, and HDD replacement or reinitialisation with clear talk about what footage may still export.',
        suitableFor: 'Sites that lost recording or hear disk alarms',
      },
      {
        name: 'Power & PoE remediation',
        description:
          'Fix injectors, switch ports, UPS behaviour, and voltage drop on long outdoor runs that mimic camera failure.',
        suitableFor: 'Outdoor compounds, parking, and multi-building links',
      },
      {
        name: 'Network path repair',
        description:
          'Restore LAN/Wi-Fi pathing for IP cameras, including coordination with commercial cabling work when the fault sits in the network plant.',
        suitableFor: 'IP and wireless CCTV after IT or ISP changes',
      },
    ],
  },
  keyFeatures: {
    heading: 'What you get in a repair visit',
    items: [
      'Symptom-led diagnosis before parts are ordered',
      'Channel-by-channel isolation for no-video cases',
      'HDD health assessment and practical recovery options explained plainly',
      'Night vision and IR checks for outdoor cameras',
      'PoE/power path verification where relevant',
      'Configuration repair without unnecessary factory wipes',
      'Clear next-step quote if hardware replacement is required',
    ],
  },
  benefits: {
    heading: 'Benefits of proper troubleshooting',
    items: [
      'Avoid replacing working cameras when the fault is cable or power',
      'Restore recording continuity faster with a focused repair plan',
      'Understand what footage can and cannot be salvaged after disk failure',
      'Reduce repeat call-outs caused by misdiagnosed “camera dead” tickets',
      'Keep mixed-brand sites serviceable without forcing a full rip-and-replace',
      'Document findings for insurance or internal incident follow-up when needed',
    ],
  },
  recommendedConfigurations: {
    heading: 'When repair vs replace vs AMC makes sense',
    configs: [
      {
        name: 'Repair-first visit',
        description:
          'Best when one or a few channels failed recently and the rest of the system still records normally.',
        suitableFor: 'Sudden single-camera or single-disk faults',
      },
      {
        name: 'Recorder rebuild',
        description:
          'Appropriate when the NVR/DVR is unstable, disks are failing, or channel maps are corrupted after power events.',
        suitableFor: 'Sites with storage or boot failures',
      },
      {
        name: 'Partial camera replacement',
        description:
          'Used when optics, IR, or electronics have failed and repair of the unit is not economical for that model.',
        suitableFor: 'Aged outdoor cameras with confirmed hardware failure',
      },
      {
        name: 'Move to AMC after restore',
        description:
          'Once the system is healthy again, scheduled AMC reduces the chance of the same silent failures returning unnoticed.',
        suitableFor: 'Societies, offices, and industrial sites',
      },
    ],
  },
  installationProcess: {
    heading: 'Our repair workflow',
    intro: 'Repair uses the same discipline as installation — survey, fix, verify — with fault isolation at the centre.',
    steps: standardProcessSteps({
      survey:
        'We capture symptoms, recent power or network changes, camera and recorder models, and which channels still work so we do not disturb healthy parts of the Hyderabad site unnecessarily.',
      installation:
        'We apply the least invasive fix first: reseat connectors, restore PoE, replace failed disks or cameras only after isolation, and repair outdoor junctions where water or rodents caused the fault.',
      configuration:
        'Channel maps, recording schedules, user logins, and remote access are corrected carefully so a fix for one camera does not wipe settings for the whole system.',
      testing:
        'We confirm live view, recent recording, night performance where relevant, and remote app reachability before closing the ticket.',
      handover:
        'You get a plain-language summary of root cause, what was replaced, what footage could be exported, and whether AMC or cabling upgrades would prevent a repeat.',
    }),
  },
  maintenance: {
    heading: 'After the repair',
    body: `Watch the repaired channel for a few days of day and night cycles. If the same camera drops again after rain or heat, the root cause may still be cabling or power rather than the camera body.

Consider AMC if your site has many outdoor cameras or a history of ignored disk warnings. Repair restores today’s fault; maintenance catches the next one earlier.`,
  },
  brands: {
    heading: 'Brands we troubleshoot',
    body: brandsBody,
  },
  warranty: {
    heading: 'Warranty on repair work',
    body: warrantyBody,
  },
  whyChoose: {
    heading: 'Why AQ Enterprises for CCTV repair',
    items: [
      'Diagnosis before replacement — cable and PoE faults are treated as first-class causes',
      'Honest limits on DVR/NVR recovery; we do not promise impossible forensic restoration',
      'Experience with common Hyderabad installs using Hikvision, CP Plus, Dahua, Uniview, and related brands',
      'Ability to escalate into cabling or IP redesign when the network plant is the real problem',
      'Clear written findings for owners and facilities teams',
      'Optional handoff into AMC so the system stays healthy after the emergency visit',
    ],
  },
  hyderabadCoverage: {
    heading: 'Hyderabad on-site repair coverage',
    body: `We attend repair calls across Hyderabad residential neighbourhoods, office clusters, and industrial/warehouse corridors. Access rules matter: society gate passes, factory inductions, and after-hours server-room entry should be arranged before the visit so diagnosis time is spent on the fault, not waiting at the gate.

For urgent no-video situations affecting main entrances or cash areas, tell us the business impact when you book so we can prioritise scheduling within the day’s capacity — without inventing a city-wide emergency SLA on this page.`,
  },
  cta: {
    heading: 'Need a CCTV channel or recorder diagnosed?',
    body: 'Describe the symptom, brand if known, and whether night vision or remote viewing is affected. We will schedule a Hyderabad site visit and quote parts only after diagnosis.',
    primaryLabel: 'Book repair visit',
    primaryHref: '/#contact',
  },
  faqs: [
    {
      id: 'cctv-repair-no-video',
      question: 'My CCTV shows no video — is the camera dead?',
      answer:
        'Not always. No video can come from PoE failure, cable damage, wrong channel mapping, or a recorder software glitch. We isolate power and link first, then test the camera on a known-good path before recommending replacement.',
      status: 'published',
    },
    {
      id: 'cctv-repair-hdd-fail',
      question: 'Can you recover footage after an HDD failure?',
      answer:
        'Sometimes we can export clips that are still readable after a disk is remounted or replaced carefully. Overwritten or severely corrupted segments are often unrecoverable. We explain what is realistic after inspecting the recorder and disk health — we do not guarantee full forensic recovery.',
      status: 'published',
    },
    {
      id: 'cctv-repair-night-vision',
      question: 'Why does night vision look worse than daytime?',
      answer:
        'Common causes include dirty lenses, failed IR LEDs, spider webs or nearby lights reflecting into the dome, underpowered outdoor runs, and exposure settings that do not suit the scene. We check optical and electrical factors before replacing the camera.',
      status: 'published',
    },
    {
      id: 'cctv-repair-poe',
      question: 'How do PoE faults show up in CCTV systems?',
      answer:
        'Cameras may reboot randomly, drop at night when IR draws more power, or stay offline while the recorder still shows the channel name. Switch ports, injectors, cable length, and water in junctions are typical culprits we test during a repair visit.',
      status: 'published',
    },
    {
      id: 'cctv-repair-other-installer',
      question: 'Can you repair a system installed by someone else?',
      answer:
        'Yes in most cases, provided we can access the recorder and cameras. If passwords are lost or hardware is obsolete, we document limitations and propose a repair or staged upgrade path without forcing an unnecessary full replacement.',
      status: 'published',
    },
    {
      id: 'cctv-repair-cost',
      question: 'Why don’t you list repair prices here?',
      answer:
        'Labour and parts differ completely between a loose connector, a new hard disk, and a failed outdoor camera on a high mount. Honest pricing follows diagnosis at your Hyderabad site.',
      status: 'published',
    },
  ],
  imagePlaceholders: [
    {
      id: 'cctv-repair-nvr',
      alt: 'Open NVR chassis showing hard disk bay during CCTV troubleshooting',
      label: 'NVR storage check',
    },
    {
      id: 'cctv-repair-poe',
      alt: 'Technician testing PoE switch ports for CCTV camera power faults',
      label: 'PoE diagnosis',
    },
  ],
  relatedServices: [
    'cctv-amc-maintenance',
    'ip-camera-installation',
    'wireless-cctv-installation',
    'home-cctv-installation',
    'office-cctv-installation',
    'commercial-lan-cabling-networking',
  ],
  relatedLocations: [
    'ameerpet',
    'kukatpally',
    'hyderabad',
  ],
  relatedProjects: [
    'retail-ameerpet',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  seo: {
    title: 'CCTV Repair & Troubleshooting Hyderabad | AQ',
    description:
      'CCTV repair in Hyderabad for no video, HDD failure, night vision issues, and PoE faults. Practical DVR/NVR recovery with diagnosis before parts.',
    canonical: '/services/cctv-repair-troubleshooting',
    keywords: [
      'CCTV repair Hyderabad',
      'CCTV troubleshooting',
      'NVR HDD failure',
      'no video CCTV',
      'PoE camera fault',
      'night vision CCTV repair',
      'DVR recovery',
    ],
    ogTitle: 'CCTV Repair & Troubleshooting in Hyderabad',
    ogDescription:
      'Diagnose blank channels, failed disks, night vision, and power faults before replacing hardware.',
  },
};
