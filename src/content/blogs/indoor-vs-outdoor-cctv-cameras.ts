import { createBlogPost } from './_factory';

export const indoorVsOutdoor = createBlogPost({
  slug: 'indoor-vs-outdoor-cctv-cameras',
  title: 'Indoor vs Outdoor CCTV Cameras: What Changes on Site',
  summary:
    'How weather housings, lighting, privacy, and mounting differ for indoor and outdoor CCTV — so you stop treating every camera as interchangeable.',
  categories: ['Buying & planning'],
  tags: ['outdoor CCTV', 'indoor cameras', 'weatherproof', 'mounting'],
  publishedAt: '2026-08-11',
  relatedServices: [
    'home-cctv-installation',
    'villa-cctv-installation',
    'warehouse-cctv-installation',
  ],
  relatedLocations: ['hyderabad'],
  relatedBlogs: [
    'night-vision-low-light-cctv',
    'how-many-cctv-cameras-do-you-need',
    'cctv-installation-planning-checklist',
  ],
  seoTitle: 'Indoor vs Outdoor CCTV Cameras: What Changes on Site',
  seoDescription:
    'Compare indoor and outdoor CCTV needs: weather housing, lighting, privacy, and mounts. Practical planning — not a product ranking.',
  keywords: [
    'indoor vs outdoor CCTV',
    'outdoor CCTV camera',
    'weatherproof CCTV',
    'indoor security camera',
  ],
  ctaHeading: 'Need a mix of indoor and outdoor coverage?',
  ctaBody:
    'List which zones are fully exposed, under eaves, or climate-controlled. We match housings and mounts after seeing how weather and light hit each point.',
  faq: [
    {
      id: 'io-faq-1',
      question: 'Can I use an indoor camera under a roof overhang?',
      answer:
        'Sometimes for light splash and dust — not as a substitute for a true outdoor housing in wind-driven rain. Eaves help; they do not make every indoor dome weather-safe.',
    },
    {
      id: 'io-faq-2',
      question: 'Do outdoor cameras always need infrared night vision?',
      answer:
        'Many outdoor approaches are dark enough that low-light performance matters. Existing street or compound lights change the answer. Survey after dusk — see the night-vision guide for selection factors.',
    },
  ],
  body: `Indoor and outdoor cameras share a job — capture a usable frame — but the site punishes them differently. Monsoon, sun load, spider webs, and lobby glare are not solved by the same dome.

This article is about placement physics, not brand leagues. Camera-count method: [How many CCTV cameras does a property need?](/blog/how-many-cctv-cameras-do-you-need). Night behaviour: [Night vision and low-light CCTV](/blog/night-vision-low-light-cctv).

## Weather and housing

Outdoor points need housings and seals that survive rain, heat, and dust. Gaskets age. Cheap “outdoor” stickers fail at cable glands first. Indoor cameras assume a dry room; condensation under a metal canopy still counts as weather.

Warehouses and yards blur the line: covered docks can still push dust and temperature swings that indoor office domes dislike — see [warehouse CCTV installation](/services/warehouse-cctv-installation) for industrial outdoor edges.

## Lighting challenges

Indoor problems: glass façades, polished floors, LED panels that bloom. Outdoor problems: headlights, IR wash on nearby walls, pitch-black side setbacks beside a bright porch.

A camera that looks fine at noon can be useless at 9 p.m. That is a survey issue, not a shopping-cart filter.

## Privacy boundaries

Indoor cameras near desks or living rooms need stricter aim and purpose. Outdoor cameras along shared walls must respect neighbouring windows. “Point it wide and crop later” is how disputes start.

Homes and villas often mix a few outdoor identification roles with optional indoor views — [home CCTV](/services/home-cctv-installation) and [villa CCTV](/services/villa-cctv-installation) keep those scopes distinct from estate-perimeter thinking.

## Mounting realities

Outdoor mounts fight wind load, conduit aesthetics, and ladder access for cleaning. Indoor mounts fight false ceilings, trunking rules, and landlord permissions. Height that “sees everything” often sees nothing identifiable.

Cable exits matter: a perfect housing with an open unglanded hole is not outdoor-ready.

## Typical zone mixes

Common patterns — not packages:

- House: outdoor gate + parking + optional rear path; indoor only if the household asks
- Villa: more outdoor perimeter and garden depth; indoor selective
- Office: mostly indoor corridors and doors; outdoor only where the tenant controls an external edge
- Warehouse: outdoor docks/gates plus aisle cameras under roof that still face dust

Pre-survey prep: [CCTV installation planning checklist](/blog/cctv-installation-planning-checklist).`,
});
