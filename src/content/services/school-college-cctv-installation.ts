import type { Service } from '@/types';
import { standardProcessSteps, warrantyBody, brandsBody } from './_shared';

export const schoolCollegeCctvInstallation: Service = {
  id: 'school-college-cctv-installation',
  slug: 'school-college-cctv-installation',
  name: 'School & College CCTV Installation',
  status: 'published',
  createdAt: '2026-08-11',
  updatedAt: '2026-08-11',
  publishedAt: '2026-08-11',
  summary:
    'Campus CCTV for schools and colleges in Hyderabad — gates, corridors, labs, and admin oversight with privacy-aware camera placement.',
  h1: 'School & College CCTV Installation in Hyderabad',
  hero: {
    eyebrow: 'Campus security',
    headline: 'Campus cameras planned for safety and sensible privacy',
    subheadline:
      'CCTV for schools and colleges across Hyderabad — entrance gates, corridors, labs, and shared spaces, with admin viewing that respects privacy-sensitive rooms.',
    image: {
      id: 'school-college-cctv-hero',
      alt: 'School campus corridor with discreet CCTV camera placement',
      label: 'Campus corridor and gate CCTV (placeholder)',
    },
  },
  introduction: `Educational campuses are not warehouses and they are not offices. Students, staff, visitors, and vendors move through gates and corridors on a daily rhythm that changes with bells, exams, and events. CCTV on a school or college campus should support safety and accountability without turning every private space into a camera zone. AQ Enterprises designs campus surveillance in Hyderabad with that balance in mind.

Administrators typically need clear views of the main gate, reception or visitor desk, staircases, long corridors, laboratories, parking or cycle stands, and outdoor assembly edges. At the same time, washrooms, changing areas, and other privacy-sensitive rooms must stay off camera. Hostel blocks, if present, need careful zoning discussed with the institution — not a one-size template.

Recording and access matter as much as placement. Footage is often reviewed by a small authorised group: principal’s office, admin, or security desk. User accounts, password discipline, and retention habits should match institutional policy. We help you build a system that is understandable for non-technical staff so a corridor incident can be reviewed without waiting days for outside help.`,

  whatIs: {
    heading: 'What school and college CCTV installation covers',
    body: `School and college CCTV installation is the campus-wide planning and deployment of cameras, recorders, and viewing access for educational premises. It includes surveying pedestrian and vehicle gates, mapping corridor sightlines, identifying labs and libraries that need coverage, and deliberately excluding privacy-sensitive spaces from the camera plan.

Technical work typically involves IP or hybrid cameras suited to corridor lengths and outdoor gates, PoE or structured cabling where the campus network allows, NVR placement in a secure admin or IT room, and configuration of recording schedules around academic hours plus after-hours perimeter needs. Larger campuses may use multiple recorders or networked viewing so different blocks remain manageable.

This service also overlaps with related campus systems when the institution wants them: biometric attendance for staff, access control on restricted doors, intercoms at gates, and fire alarm awareness in shared buildings. CCTV does not replace those systems; it complements them when the administration wants a coherent security picture.`,
  },

  whoNeeds: {
    heading: 'Institutions that benefit from campus CCTV',
    intro: 'Any campus with shared corridors, visitor traffic, and duty of care for students and staff.',
    items: [
      'Private and aided schools with active gate and parent traffic',
      'Junior and degree colleges with multi-block campuses',
      'Coaching centres and training institutes with dense peak-hour movement',
      'Institutions adding labs, libraries, or new academic blocks',
      'Campuses upgrading outdated analogue cameras to clearer IP recording',
      'Administrations that need authorised remote or desk viewing for security staff',
    ],
  },

  commonProblems: {
    heading: 'Common campus CCTV problems',
    items: [
      'Gate cameras that miss vehicle number context or pedestrian side entries',
      'Corridor blind spots at stair landings and corridor turns',
      'Cameras incorrectly considered for privacy-sensitive rooms',
      'Lab coverage that forgets secondary doors or equipment stores',
      'Too many people sharing one admin password for the recorder',
      'No documented policy for who may export footage and for how long it is kept',
      'Old systems that fail quietly during holidays when buildings are empty',
    ],
  },

  ourSolution: {
    heading: 'Our approach to educational campus surveillance',
    body: `We begin with a campus walk with a designated admin or facilities contact. Together we mark must-cover zones: main gate, visitor interface, primary corridors, stair cores, labs, and outdoor edges the institution cares about. We also mark must-not-cover zones explicitly so there is no ambiguity during installation.

Camera heights and housings are chosen for durability and appropriate deterrence without creating an intimidating classroom atmosphere. Outdoor gate cameras need weather-aware mounting and lighting awareness for early morning and late evening movements. Indoor corridor cameras favour overlapping views at junctions rather than sparse dots that leave corners dark.

On the recorder side, we configure accounts for authorised roles, set retention according to what the institution states it needs, and demonstrate playback for a sample gate event and corridor event. If the campus already has network infrastructure, we discuss PoE switch capacity and VLAN or network segmentation preferences with your IT contact — without inventing compliance claims.

Where biometric attendance, door access, intercoms, or fire alarm systems are part of a wider upgrade, we coordinate placement so cabling routes and equipment rooms stay orderly. Quotations follow the survey; campus size and building age affect labour as much as camera count.`,
  },

  systemOptions: {
    heading: 'System options for campuses',
    intro: 'Scale and privacy rules differ between a compact school and a multi-block college.',
    options: [
      {
        name: 'Gate and corridor core',
        description:
          'Focused coverage of entrances, reception, and main corridors with a central recorder for admin review.',
        suitableFor: 'Compact schools and single-block institutes',
      },
      {
        name: 'Multi-block campus layout',
        description:
          'Zoned cameras across academic blocks, labs, and outdoor paths, with recorder strategy matched to building spread.',
        suitableFor: 'Colleges and larger school campuses',
      },
      {
        name: 'Lab and facility emphasis',
        description:
          'Stronger coverage for laboratories, stores, and equipment areas alongside general corridor monitoring.',
        suitableFor: 'STEM-heavy or skill-training campuses',
      },
      {
        name: 'Security desk viewing setup',
        description:
          'Live view and playback arranged for a gate or admin security desk, with limited accounts for authorised staff only.',
        suitableFor: 'Institutions with on-site security personnel',
      },
    ],
  },

  keyFeatures: {
    heading: 'Key features of our campus installs',
    items: [
      'Privacy-aware placement with explicit no-camera zones',
      'Gate, corridor, lab, and outdoor edge planning from a site walk',
      'Secure recorder location and role-based viewing access',
      'Day/night checks at gates and long indoor corridors',
      'Handover training for admin or security staff',
      'Pathways to align with access control, attendance, and intercom later',
      'Documentation of camera roles for future block expansions',
    ],
  },

  benefits: {
    heading: 'Benefits for school and college administrations',
    items: [
      'Clearer accountability at gates and visitor touchpoints',
      'Faster review of corridor and common-area incidents',
      'Better oversight of labs and equipment spaces',
      'Deterrence without invading privacy-sensitive rooms',
      'Authorised viewing that matches institutional responsibility',
      'A maintainable system as the campus adds floors or blocks',
    ],
  },

  recommendedConfigurations: {
    heading: 'Recommended campus configurations',
    intro: 'Use these as discussion starters; final design follows building plans and privacy rules.',
    configs: [
      {
        name: 'Primary / high school campus',
        description:
          'Gate cluster, reception, corridor spines, playground or assembly edges as agreed, and admin recorder access with strict account control.',
        suitableFor: 'Schools with defined parent pickup patterns',
      },
      {
        name: 'College multi-block',
        description:
          'Per-block corridor coverage, shared lab emphasis, parking or approach roads, and networked viewing for a central security or admin point.',
        suitableFor: 'Degree colleges and larger institutes',
      },
      {
        name: 'Institute with controlled labs',
        description:
          'Standard campus coverage plus tighter camera attention on lab doors and stores, optionally paired later with access control.',
        suitableFor: 'Campuses protecting specialised equipment',
      },
    ],
  },

  installationProcess: {
    heading: 'How campus installation typically runs',
    intro: 'Work is sequenced to reduce disruption during teaching hours wherever the institution prefers.',
    steps: standardProcessSteps({
      survey:
        'We tour gates, corridors, labs, and admin rooms with your contact, list cover and no-cover zones, note power and network rooms, and draft a camera role map before procurement.',
      installation:
        'Cameras and cabling are installed block by block where needed, with neat routes through corridors and weather-safe mounts at gates. Work timing follows your academic calendar preferences.',
      configuration:
        'Recorder accounts, retention, motion or schedule settings, and desk or remote viewing are configured for authorised campus roles only.',
      testing:
        'We verify gate day/night clarity, corridor junction coverage, lab door views, storage health, and that playback is findable for sample events.',
      handover:
        'Admin or security staff receive a walkthrough of live view, playback, export basics, and password hygiene — plus a simple map of camera roles for future reference.',
    }),
  },

  maintenance: {
    heading: 'Maintenance on an academic calendar',
    body: `Campus systems face dust, festival decorations, monsoon exposure at gates, and occasional renovations between terms. Scheduled cleaning and recording checks before exam seasons and after long holidays catch failures early. Outdoor housings deserve extra attention after heavy rain.

Account hygiene is critical: when staff change roles, recorder passwords and app access should be updated. If the institution adds a floor or converts a room into a lab, camera plans should be revisited rather than assuming old angles still work.

AMC visits, repair calls for failed channels, and coordination with fire alarm or access projects keep the security stack coherent. We treat CCTV as living infrastructure, not a one-time fixture.`,
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
    heading: 'Why institutions work with AQ Enterprises',
    items: [
      'Privacy-aware design discussed openly before drilling starts',
      'Campus walks that respect teaching schedules',
      'Clear admin handover for non-technical staff',
      'Integration-minded cabling when attendance or access is planned',
      'Practical brand advice for corridor and outdoor gate conditions',
      'Hyderabad-based follow-up for service and expansion',
    ],
  },

  hyderabadCoverage: {
    heading: 'Schools and colleges across Hyderabad',
    body: `We support educational CCTV projects across Hyderabad — established neighbourhood schools, colleges in older academic belts, and newer campuses along expanding residential corridors. Access rules differ: some campuses require visitor passes and escort for installers; we plan surveys and installation windows with that in mind.

Share your campus location, approximate block count, and whether you already have a network room. We will propose a survey slot and a camera plan that matches your privacy and oversight priorities. Outlying institute locations are considered when the project scope makes a site visit practical.`,
  },

  cta: {
    heading: 'Discuss campus CCTV for your institution',
    body: 'Tell us about your gates, blocks, and who should have viewing access. We will schedule a campus survey and outline a privacy-aware camera plan.',
    primaryLabel: 'Book a campus survey',
    secondaryLabel: 'Call AQ Enterprises',
  },

  faqs: [
    {
      id: 'school-college-cctv-faq-1',
      question: 'Can CCTV be installed in classrooms?',
      answer:
        'Some institutions choose limited classroom coverage; others restrict cameras to corridors and common areas. We follow the institution’s policy and local expectations. Privacy-sensitive spaces such as washrooms are not camera locations. Decisions should be documented by the administration before installation.',
      relatedServices: ['school-college-cctv-installation'],
      status: 'published',
    },
    {
      id: 'school-college-cctv-faq-2',
      question: 'How do you handle privacy on a school campus?',
      answer:
        'We mark no-camera zones during the survey, avoid invasive angles into private rooms, and configure access so only authorised staff can view or export footage. Placement is a design choice guided by the institution, not a maximum-camera default.',
      relatedServices: ['school-college-cctv-installation'],
      status: 'published',
    },
    {
      id: 'school-college-cctv-faq-3',
      question: 'Can parents get direct access to live cameras?',
      answer:
        'Most schools keep live viewing limited to admin or security roles. Broad parent access raises privacy and bandwidth concerns. If an institution wants a specific visitor or gate workflow, we discuss controlled options — we do not assume open public streaming.',
      relatedServices: ['school-college-cctv-installation'],
      status: 'published',
    },
    {
      id: 'school-college-cctv-faq-4',
      question: 'Should we add biometric attendance with CCTV?',
      answer:
        'Many campuses pair CCTV at gates with biometric attendance for staff or, where policy allows, student tracking at entry. They solve different problems. We can plan cabling and equipment rooms so both systems coexist cleanly when you choose both.',
      relatedServices: ['school-college-cctv-installation', 'biometric-attendance-systems'],
      status: 'published',
    },
    {
      id: 'school-college-cctv-faq-5',
      question: 'When is the best time to install cameras on campus?',
      answer:
        'Vacation windows and weekends reduce disruption. Urgent gate coverage can be staged earlier. We align with your academic calendar and security priorities rather than forcing a single timeline.',
      relatedServices: ['school-college-cctv-installation'],
      status: 'published',
    },
    {
      id: 'school-college-cctv-faq-6',
      question: 'How long should campus footage be retained?',
      answer:
        'Retention depends on institutional policy, storage capacity, and the kinds of incidents you review. We size disks and configure overwrite behaviour based on what you specify during design — we do not invent a universal legal period on your behalf.',
      relatedServices: ['school-college-cctv-installation', 'cctv-amc-maintenance'],
      status: 'published',
    },
  ],

  imagePlaceholders: [
    {
      id: 'school-college-cctv-gate',
      alt: 'School gate CCTV placement concept for campus entry monitoring',
      label: 'Campus gate camera coverage (placeholder)',
    },
    {
      id: 'school-college-cctv-lab',
      alt: 'Laboratory corridor CCTV for college facility oversight',
      label: 'Lab and corridor coverage (placeholder)',
    },
  ],

  relatedLocations: [
    'kompally',
    'secunderabad',
    'lb-nagar',
  ],
  relatedProjects: [
    'school-kompally',
  ],
  relatedBrands: [],
  relatedBlogs: [],
  relatedServices: [
    'access-control-systems',
    'biometric-attendance-systems',
    'ip-camera-installation',
    'cctv-amc-maintenance',
    'intercom-systems',
    'fire-alarm-systems',
  ],

  seo: {
    title: 'School & College CCTV Installation in Hyderabad',
    description:
      'Privacy-aware CCTV for schools and colleges in Hyderabad — gates, corridors, labs, and admin oversight by AQ Enterprises.',
    canonical: '/services/school-college-cctv-installation',
    keywords: [
      'school CCTV installation Hyderabad',
      'college campus CCTV',
      'campus surveillance',
      'school gate cameras',
      'educational institution CCTV',
    ],
  },
};
