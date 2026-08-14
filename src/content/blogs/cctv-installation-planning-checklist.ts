import { createBlogPost } from './_factory';

export const installChecklist = createBlogPost({
  slug: 'cctv-installation-planning-checklist',
  title: 'CCTV Installation Planning Checklist',
  summary:
    'A practical pre-survey checklist: goals, doors and paths, power and network, privacy rules, password ownership, and handover expectations — so the site visit starts useful.',
  categories: ['Installation', 'Buying & planning'],
  tags: ['CCTV planning', 'site survey', 'installation checklist'],
  publishedAt: '2026-08-11',
  relatedServices: [
    'home-cctv-installation',
    'office-cctv-installation',
    'apartment-cctv-installation',
  ],
  relatedLocations: ['hyderabad'],
  relatedBlogs: [
    'how-cctv-systems-work',
    'how-many-cctv-cameras-do-you-need',
    'cctv-installation-cost-factors-hyderabad',
    'indoor-vs-outdoor-cctv-cameras',
    'how-much-cctv-storage-do-you-need',
  ],
  seoTitle: 'CCTV Installation Planning Checklist | Before the Survey',
  seoDescription:
    'Prepare for a CCTV site survey: map goals, entry points, power, privacy, and who will hold accounts. A planning checklist — not a fixed kit.',
  keywords: [
    'CCTV installation checklist',
    'CCTV planning before install',
    'CCTV site survey prep',
  ],
  ctaHeading: 'Ready for a walkthrough?',
  ctaBody:
    'Bring this checklist to the conversation. Share your property type and priority zones — we will map camera roles on site rather than guess from a chat message.',
  faq: [
    {
      id: 'install-check-faq-1',
      question: 'What should I prepare before a CCTV site visit?',
      answer:
        'A short list of incidents you want footage to answer, known entry points, any landlord or society rules, and who will hold the admin password. Photos of existing recorders help if you already have a system.',
    },
    {
      id: 'install-check-faq-2',
      question: 'Do I need a floor plan?',
      answer:
        'Helpful but not required. A walkthrough usually reveals lighting, cable routes, and blind corners that drawings miss. Bring plans if you have them; do not delay a survey waiting for perfect drawings.',
    },
  ],
  body: `Buying cameras before you can describe the job is how kits end up watching the ceiling fan. A planning checklist will not replace a survey — it makes the survey shorter and the quote honest.

This is preparation content. Transactional next steps live on service pages such as [home CCTV installation](/services/home-cctv-installation) and [office CCTV installation](/services/office-cctv-installation). For how the pieces fit together, see [How CCTV systems work](/blog/how-cctv-systems-work).

## Define goals before products

Write three situations you want to review later. Examples: who stood at the gate after 10 p.m., which vehicle used the dock, whether a side passage stayed quiet while the house was empty.

If you cannot name the question, you cannot name the camera. Package labels do not invent goals for you.

## Map doors and paths

Walk the property once as a stranger would:

- Primary gate, shutter, or reception
- Secondary or service entry
- Parking or two-wheeler bay
- Lobby, corridor spines, fire exits
- Rear utility or servant path where it exists

Mark neighbour windows you must not film by default. Camera-count method detail sits in [How many CCTV cameras does a property need?](/blog/how-many-cctv-cameras-do-you-need).

## Power and network

Note where a locked recorder could live, nearest power, and whether outdoor points need weather-safe supply. For IP plans, ask whether a PoE switch has space and whether the office Wi-Fi is already congested — CCTV should not lean on hope.

Societies and towers add stakeholders: association offices, landlord risers, quiet-hour drilling rules. Those constraints change cable routes more than brand stickers.

## Privacy rules

Decide hard no-camera zones early: guest bedrooms, washrooms, private flat interiors in society jobs, clinical or changing areas in specialised buildings. Write them down so they survive the quote stage.

## Who holds passwords

Name the people who may:

- View live
- Export playback
- Change schedules or users

Guards often need live view only. Shared “admin/admin” sticky notes are how systems become unmaintainable. Handover should include account roles, not one forever password.

## Handover expectations

Ask what you will receive on day one: camera map with human names, how to find a clip by date, how to tell if a camera is offline, and who to call for configuration vs hardware faults. If remote phone viewing matters, say so up front — see [Remote CCTV viewing explained](/blog/remote-cctv-viewing-explained).

## Ready for survey

You are ready when goals, entries, privacy limits, and password owners are written. Decide which points are truly outdoor versus indoor climate-controlled — [Indoor vs outdoor CCTV cameras](/blog/indoor-vs-outdoor-cctv-cameras) — and roughly how many days of footage you need — [How much CCTV storage do you need?](/blog/how-much-cctv-storage-do-you-need). Cost still depends on cable difficulty, retention, and add-ons — framed without fake ₹ tables in [CCTV installation cost factors in Hyderabad](/blog/cctv-installation-cost-factors-hyderabad).

Apartment common-area jobs use a different ownership model than a single house — see [apartment CCTV installation](/services/apartment-cctv-installation) when the buyer is an association, not a flat resident alone.`,
});
