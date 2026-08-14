import { createBlogPost } from './_factory';

export const maintenanceChecklist = createBlogPost({
  slug: 'cctv-maintenance-checklist',
  title: 'CCTV Maintenance Checklist for Homes and Businesses',
  summary:
    'Owner-level CCTV maintenance checks — lenses, housings, storage health, user accounts — and when scheduled AMC makes more sense than waiting for failure.',
  categories: ['Maintenance'],
  tags: ['CCTV maintenance', 'AMC', 'NVR health', 'lens cleaning'],
  publishedAt: '2026-08-11',
  relatedServices: [
    'cctv-amc-maintenance',
    'cctv-repair-troubleshooting',
    'ip-camera-installation',
  ],
  relatedLocations: ['hyderabad'],
  relatedBlogs: [
    'common-cctv-problems',
    'how-much-cctv-storage-do-you-need',
    'remote-cctv-viewing-explained',
  ],
  seoTitle: 'CCTV Maintenance Checklist for Homes and Businesses',
  seoDescription:
    'A practical CCTV maintenance checklist: cleaning, disk health, accounts, and when to use AMC. Education first — then link to maintenance service.',
  keywords: [
    'CCTV maintenance checklist',
    'CCTV AMC',
    'clean CCTV cameras',
    'NVR maintenance',
  ],
  ctaHeading: 'Want maintenance written into a plan?',
  ctaBody:
    'Share how many cameras you run and whether outdoor housings face dust or monsoon exposure. AMC scope and visit frequency belong in the quotation — not as invented SLAs.',
  faq: [
    {
      id: 'maint-faq-1',
      question: 'How often should CCTV cameras be cleaned?',
      answer:
        'Outdoor domes near roads, trees, or docks may need checks every few months; indoor corridors less often. After monsoon dust or heavy pollen, inspect sooner. Cleaning frequency follows the site, not a universal calendar.',
    },
    {
      id: 'maint-faq-2',
      question: 'What does a CCTV AMC usually include?',
      answer:
        'Typical scopes cover cleaning, basic health checks, firmware attention where appropriate, and scheduled visits. Exact inclusions vary — they should be written into your quotation rather than assumed from a blog list.',
    },
  ],
  body: `CCTV rarely fails only on installation day. Domes film over, disks fill, passwords multiply, and one “temporary” network change breaks the app for a month. Maintenance is how evidence stays available.

This checklist is for owners and facilities teams. The service conversation lives on [CCTV AMC and maintenance](/services/cctv-amc-maintenance). Symptom triage: [Common CCTV problems](/blog/common-cctv-problems).

## Monthly owner checks

Without opening every housing:

- Confirm live view on critical cameras
- Spot-check night clarity on the main gate after dark
- Verify the recorder shows healthy recording status
- Confirm you can still log in with your own account

If anything fails, note the date and whether it coincided with a power cut or router change.

## Lens and housing

Outdoor bubbles collect dust, film, webs, and water spots. Wipe with appropriate materials — abrasive cloths scratch domes and create permanent haze. Check that cable glands still look sealed after storms.

Indoor cameras need less weather care but still gather haze near kitchens or workshops.

## Storage health

Watch for sudden drops in retention days, recorder warnings, or clicking disks. Retention design belongs in [How much CCTV storage do you need?](/blog/how-much-cctv-storage-do-you-need); maintenance confirms the plan still matches reality.

Replace failing disks deliberately. Waiting until the volume dies mid-incident is how evidence gaps appear.

## User accounts

Audit who still has access:

- Former staff or tenants
- Old guard contractors
- Family members with shared passwords

Revoke early. Recreate named users instead of recycling one forever login. Remote app hygiene: [Remote CCTV viewing explained](/blog/remote-cctv-viewing-explained).

## When to call AMC

Schedule maintenance when you have many outdoor cameras, dusty industrial air, multi-user workplaces, or no in-house person who understands the recorder. AMC is not magic — it is planned attention.

Repair visits after failure are a different motion — [CCTV repair and troubleshooting](/services/cctv-repair-troubleshooting). If the system is aging across the board, read [Repair vs replace](/blog/repair-vs-replace-cctv-system) before paying for endless patchwork.

## What maintenance does not fix

Bad aim, cameras pointed at glare, or missing coverage at a second gate. Those need redesign, not only cleaning. Say so clearly when a visit finds a planning gap rather than a dirty dome.`,
});
