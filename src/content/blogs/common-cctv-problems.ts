import { createBlogPost } from './_factory';

export const commonProblems = createBlogPost({
  slug: 'common-cctv-problems',
  title: 'Common CCTV Problems and What They Usually Mean',
  summary:
    'A practical triage guide for black screens, bad night images, early overwrite, offline apps, and power faults — so you know what to check before assuming the cameras are dead.',
  categories: ['Repair', 'System operation'],
  tags: ['CCTV troubleshooting', 'NVR offline', 'CCTV no video', 'repair'],
  publishedAt: '2026-08-11',
  relatedServices: [
    'cctv-repair-troubleshooting',
    'cctv-amc-maintenance',
  ],
  relatedLocations: ['hyderabad'],
  relatedBlogs: [
    'cctv-maintenance-checklist',
    'remote-cctv-viewing-explained',
    'repair-vs-replace-cctv-system',
  ],
  seoTitle: 'Common CCTV Problems and What They Usually Mean',
  seoDescription:
    'Troubleshoot CCTV issues: no video, night image problems, disk overwrite, remote app offline, and power faults. Education first — then repair service.',
  keywords: [
    'CCTV troubleshooting',
    'CCTV camera not working',
    'NVR offline',
    'CCTV night image problems',
  ],
  ctaHeading: 'Need a troubleshooting visit?',
  ctaBody:
    'Describe what failed (live view, playback, night image, or app) and when it started. We diagnose on site — without inventing fixed repair prices in this article.',
  faq: [
    {
      id: 'prob-faq-1',
      question: 'Why did remote viewing stop while local viewing still works?',
      answer:
        'Usually internet, router, DNS/app relay, or account changes — not necessarily a dead camera. Confirm on-site live view first, then trace the network path.',
    },
    {
      id: 'prob-faq-2',
      question: 'Is a black screen always a failed camera?',
      answer:
        'No. Power, cable, recorder channel settings, or a closed IR cut filter issue can look identical to a dead camera until tested. Swap tests and cable checks come before replacement.',
    },
  ],
  body: `When CCTV misbehaves, people jump to “replace everything.” Most failures cluster into a few patterns. Naming the pattern saves money and arguments.

This is triage education. Hands-on repair work is scoped on [CCTV repair and troubleshooting](/services/cctv-repair-troubleshooting). Prevention habits: [CCTV maintenance checklist](/blog/cctv-maintenance-checklist).

## No video / black screen

Check the simple stack first: recorder power, camera power, cable continuity, and whether the channel is enabled/disabled in the menu. A single black channel with others healthy often points to that run or that camera — not the whole NVR.

After storms or electrical work, look for loose DC connectors and damaged outdoor glands before ordering parts.

## Night image issues

Washed-out or foggy night frames frequently mean dirty domes, IR bounce, insects on warm housings, or aim into headlights. Clean and re-aim before condemning the sensor. Selection context: [Night vision and low-light CCTV](/blog/night-vision-low-light-cctv).

If daytime looks fine and night collapsed suddenly, ask what lighting changed on the street or compound.

## Disk full / overwrite

Footage disappearing “too soon” is often more cameras, higher bitrates, or continuous recording on a disk that never grew. It can also be a dying disk that remounts in a weird state. Retention design: [How much CCTV storage do you need?](/blog/how-much-cctv-storage-do-you-need).

Do not keep lowering retention silently as a permanent fix for a failing drive.

## Remote app offline

If the guard monitor still shows live video, the cameras are not “all dead.” Trace internet, router reboot history, password resets, and mobile data vs Wi-Fi assumptions. Guide: [Remote CCTV viewing explained](/blog/remote-cctv-viewing-explained).

## Power and PoE faults

Random reboots, cameras that die at night when IR loads rise, or whole PoE switches browning out are power problems wearing a video costume. Undersized adapters and daisy-chained extensions are frequent villains.

Industrial dust and heat accelerate PSU failure — another reason dusty sites need maintenance, not only repair heroics.

## When repair service helps

Call for structured diagnosis when you lack tools, when multiple channels fail together, or when the recorder shows alarming disk/SMART behaviour. Patchwork without a root cause grows expensive.

If the platform is old across the board — obsolete cameras, unsupported recorder, brittle coax — compare repair spend with a planned upgrade using [Repair vs replace](/blog/repair-vs-replace-cctv-system). Scheduled health visits: [CCTV AMC and maintenance](/services/cctv-amc-maintenance).`,
});
