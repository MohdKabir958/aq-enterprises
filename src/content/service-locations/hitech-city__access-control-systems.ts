import { createServiceLocation } from './_factory';

export const hitechCityAccessControl = createServiceLocation({
  serviceSlug: 'access-control-systems',
  locationSlug: 'hitech-city',
  locationName: 'Hitech City',
  serviceName: 'Access Control Systems',

  h1: 'Access Control Systems in Hitech City',
  summary:
    'Door controllers, staff credentials, visitor release, and restricted-room access for Hitech City office floors — authorisation design that complements, not replaces, workplace CCTV.',

  heroEyebrow: 'Hitech City · Access control',
  heroHeadline: 'Staff doors and restricted rooms, not another camera map',
  heroSubheadline:
    'AQ Enterprises designs RFID and controller-based access for Hitech City tower floors — who opens which door, when visitors are released, and how server or store rooms stay tighter than the open office.',

  introduction: `Hitech City workplaces do not fail security because they lack cameras alone. They struggle when every staff door still depends on a shared key bunch, when contractors keep yesterday’s card, and when a server room or store sits on the same latch habit as the pantry. Access control answers a different question from CCTV: not “what happened at the door,” but “was this person allowed through?”

This page is about authorisation on office floors in Hitech City — staff entries, reception visitor workflows, and restricted rooms — not a rewrite of multi-floor camera planning. Cameras remain complementary evidence; door controllers, readers, locks, and credential lists are the core brief here. We serve the parks as a Mallapur-based service area. We do not claim a branded branch inside the campuses.

Typical Hitech City briefs map three door classes. Public or reception-side doors need a clear visitor path so guests are not stuck while employees walk through. Staff doors need schedules that match weekday and after-hours use. Restricted rooms — server closets, UPS rooms, labs, finance stores — need smaller authorised groups and easier revocation when someone leaves. Landlord rules on risers and penetrations still apply; we survey with facilities before promising controller or cable routes through shared building space.

If you also need floor cameras, biometric attendance at the workforce entry, or ongoing maintenance after go-live, those are separate but related conversations. For office CCTV patterns in this area, see our office CCTV service; this page stays on doors, credentials, and visitor release.`,

  requirementsHeading: 'Access requirements on Hitech City office floors',
  requirementsIntro:
    'Tower and tech-park floors reward zone maps and named admin owners more than a pile of readers on convenient walls.',
  requirements: [
    'Staff door control that separates weekday open hours from after-hours lockdown without prop-open habits.',
    'Visitor workflows reception can run — temporary credentials, escort rules, or desk release — so guests are not shouted through glass.',
    'Restricted rooms (server, UPS, stores, labs) on tighter groups than general floor access.',
    'Credential enrolment and revocation owned by HR or facilities, not a shared spreadsheet nobody updates.',
    'Exit hardware and lock behaviour planned with facilities so controlled doors do not fight egress expectations.',
    'Landlord-aware cabling and panel placement in leased plates and shared risers.',
    'Complementary — not substitute — CCTV at key doors when visual context is needed for incidents.',
  ],

  solutionHeading: 'How we design access control for Hitech City workplaces',
  solutionBody: `We walk the floor with facilities or security leads and list doors by zone: visitor-facing, staff circulation, and restricted. Each door gets a credential method, lock type, exit method, and schedule. Controllers sit in secure, ventilated locations with labelled cabling back to readers and locks. Enrolment lists are built with a named owner so card issuance has a process after the installer leaves.

Visitor handling is written in plain language for reception. Common patterns include desk release for the main arrival door, short-validity temporary cards, or escort-only zones for sensitive wings. We do not prop controlled doors “for convenience” as a design feature. Where biometric attendance is also in scope, we clarify whether timekeeping and door unlock share credentials or stay separate devices — attendance punches are not the same job as door authorisation.

Fail-safe versus fail-secure behaviour is agreed door-by-door with facilities and building rules — especially on fire egress paths — so a controlled lock never fights life-safety expectations. Tower BMS or existing door hardware is surveyed before we assume new maglocks or fresh frames; some floors only need controllers and readers on hardware the landlord already approved.

Access control in Hitech City often lands beside an existing or planned camera system. We keep those scopes honest: this engagement is doors and credentials; camera layouts belong on the office CCTV conversation. After commissioning, facilities learn enrolment, card blocking, schedule changes, and how to read event logs. AMC-style visits later check reader responsiveness, lock alignment, and that revoked cards stay revoked.`,

  equipmentHeading: 'What an access install typically includes',
  equipmentIntro:
    'Hardware follows door count and risk — not an enterprise platform every SME floor will never administer.',
  equipment: [
    'Door controllers sized to the number of readers and locks on the floor plate',
    'RFID/card or fob readers for staff doors with enrolment and revocation process',
    'PIN or biometric readers only where restricted-room risk justifies them',
    'Electric or electromagnetic locks matched to door type and fail behaviour agreed with facilities',
    'Exit buttons or free-egress hardware as required for each controlled door',
    'Time schedules and holiday calendars for shift and after-hours use',
    'Event logs for who opened which door when',
    'Labelled panels and zone documentation for future service',
  ],

  processOverrides: {
    survey:
      'We survey Hitech City floor doors with facilities stakeholders — swing, frames, power, egress needs, landlord constraints — and map staff, visitor, and restricted zones before quoting controllers.',
    configuration:
      'Credentials, door schedules, zone rights, and admin accounts are configured to match your written access policy for weekday and after-hours tower use.',
    testing:
      'Every controlled door is tested for unlock pulse, valid/invalid credential behaviour, and exit hardware function before go-live.',
    handover:
      'Facilities or HR learn enrolment, card blocking, schedule changes, and log review — plus a door/zone list for later service visits.',
  },

  whyIntro:
    'Hitech City access work succeeds when doors, visitors, and restricted rooms are designed as zones — not as random readers.',
  whyExtra: [
    'Authorisation-first brief distinct from multi-floor camera planning on the same corridor.',
    'Visitor workflows written for reception teams who actually run the desk.',
    'Clear boundary with complementary office CCTV and biometric attendance when those are separate scopes.',
  ],

  faqs: [
    {
      id: 'hitech-city-access-faq-1',
      question: 'Is this the same as installing office CCTV in Hitech City?',
      answer:
        'No. Access control decides whether a door unlocks for a credential; CCTV records what happens at the door. Many workplaces need both. This page covers controllers, readers, locks, and visitor release. Camera layouts belong on the office CCTV service conversation.',
    },
    {
      id: 'hitech-city-access-faq-2',
      question: 'Can visitors enter our Hitech City floor without permanent staff cards?',
      answer:
        'Yes. Typical patterns are reception release, temporary cards with short validity, or escort-only zones for sensitive rooms. We define the workflow with your front desk so guests are not stuck and controlled doors are not propped open.',
    },
    {
      id: 'hitech-city-access-faq-3',
      question: 'Which doors usually become restricted zones on a tech-park floor?',
      answer:
        'Server rooms, UPS rooms, labs, and stores commonly sit on tighter groups and schedules than the main staff door. Exact doors come from your survey and company policy — we do not invent a standard restricted list for every tower.',
    },
    {
      id: 'hitech-city-access-faq-4',
      question: 'Do you need landlord approval for access hardware in Hitech City towers?',
      answer:
        'Often yes for shared risers, corridor penetrations, or doors on building-managed paths. Tenant-only internal doors may be simpler. We note landlord constraints during survey so the quote reflects real mounting and cable routes.',
    },
    {
      id: 'hitech-city-access-faq-5',
      question: 'How does access control relate to biometric attendance?',
      answer:
        'Attendance records punches for timekeeping; access control unlocks doors. They can share credentials or stay separate. Many Hitech City offices use attendance at the workforce entry and tighter access on server or store rooms — we clarify ownership during design.',
    },
    {
      id: 'hitech-city-access-faq-6',
      question: 'What happens to controlled doors during a fire alarm or power loss?',
      answer:
        'Egress comes first. Fail-safe versus fail-secure behaviour is chosen per door with facilities and building rules — especially on fire exit paths — so locks do not trap people or violate landlord life-safety expectations. We document the agreed behaviour during design; we do not invent a one-size fire integration claim for every tower.',
    },
  ],

  relatedServices: [
    'office-cctv-installation',
    'biometric-attendance-systems',
    'cctv-amc-maintenance',
  ],
  relatedLocations: ['financial-district', 'gachibowli'],

  seoTitle: 'Access Control Systems in Hitech City | AQ Enterprises',
  seoDescription:
    'Access control for Hitech City office floors — staff doors, visitor workflows, and restricted rooms. Door controllers and credentials by AQ Enterprises, Mallapur.',
  keywords: [
    'access control Hitech City',
    'office door access Hitech City',
    'RFID access control Hyderabad IT park',
    'restricted room access Hitech City',
    'visitor access control office',
  ],

  ctaHeading: 'Map staff and restricted doors on your Hitech City floor',
  ctaBody:
    'Share how many doors need control, who should pass them, and how visitors arrive at reception. We will propose controllers, credentials, and a visitor process after a facilities-aware survey.',
});
