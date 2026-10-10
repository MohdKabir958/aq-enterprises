# Website and owner workspace refresh — 9 October 2026

## Implemented

- Photos on all 22 default service cards, with published owner-selected images taking precedence. Reusable cards appear on the homepage and services index.
- Public business email changed to `aqenterprises204@gmail.com`. An atomic, one-time migration updates only the previous saved default; later owner edits and other contact fields are preserved.
- About contact section redesigned with address, hours, contact links, directions to the owner-provided Google location, and an address-based map that loads on request.
- Services hero photography and a separate section for commercial internet, LAN cabling and network infrastructure.
- Photography on all 26 default blog entries and article pages, with relevant topic-based fallbacks and owner-selected image overrides.
- Internet replaces Cart in the header. The floating basket above WhatsApp opens `/cart`, displays the total selected quantity and updates when the cart changes. Mobile keeps Call/Quote in the bottom bar.
- Branded owner login with logo, password visibility control and sign-in feedback. Admin has grouped navigation, live totals, publishing-status badges, search/empty states, improved forms, responsive navigation, and distinct primary/secondary/destructive actions.

Seven generated illustrations are compressed local WebP files. They depict equipment and service applications, not actual installations, company premises or customers. Asset provenance is recorded in `public/images/illustrations/README.md`. Existing illustrative property photographs remain available. No dependencies were added to the repository.

## Verification

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed, zero errors and warnings.
- `npm run validate:content`: passed for 22 services, 19 locations, 24 service/location pages, 8 projects, 26 blogs and 8 FAQs.
- `npm run build`: passed; all 110 generated pages completed. Final production build also passed after adjusting admin text contrast and mobile page spacing.
- `npm run test:admin`: all 20 integration tests passed using Chromium and a disposable local PostgreSQL database. Coverage includes authenticated publishing, image uploads/overrides, checkout, lead workflows, revision/origin protection, reporting, login throttling and a local SMTP inbox.
- After the final contrast and mobile-spacing adjustments, all 4 relevant photography/responsive/SMTP checks passed again against the final production build.
- `npm run test:db-setup`: all 6 tests passed, including the new email migration and preservation of subsequent owner edits.
- New public-photo tests cover homepage, About, Services and Blog at 320, 390, 768, 1024, 1200 and 1440px. Every service/article card contains an image, referenced photo files return image content, directions retain the owner URL, the requested map appears, and Internet has the correct active navigation state.
- Cart coverage now uses the floating basket to reach `/cart` and verifies quantity badges before/after changes. Responsive admin coverage opens and closes the new navigation menu while switching sections.
- All published sitemap routes render at 320px and 1440px without browser exceptions or horizontal overflow. Additional populated shop/admin and lead/report layouts are covered at intermediate widths.
- Desktop and mobile login/dashboard, forms, service cards, services hero, blog feature and location panel were visually reviewed.

These are Chromium viewport and local integration checks, not certification of every browser or physical device. No production database credentials, owner credentials or SMTP account were used in the tests. Actual Vercel deployment, Google Maps rendering on the public network and Gmail inbox delivery remain deployment checks.

## Homepage hero follow-up

The default hero now uses a photorealistic, AI-generated camera-and-router composition instead of the procedural Three.js camera. Its local WebP is about 70 KB; the default homepage no longer imports or renders the 3D canvas. The shorter headline gives CCTV and internet equal prominence, with a primary site-survey link, WhatsApp, published phone details and links to both service sections. The separate Internet section remains after the property-type security section.

Artwork tilts subtly with a desktop mouse, stays still on touch/mobile and respects reduced-motion preferences. Owner-supplied video stays still and retains playback controls. The floating quote button is hidden while the homepage hero is visible and returns after scrolling or navigating away; cart and WhatsApp stay available. Admin text/image/video controls and the global image replacement/hide system are retained. A one-time migration refreshes only the exact previous default text, preserving custom copy, media fields and later owner edits.

- TypeScript, lint, content validation and production build passed.
- All 7 database setup tests passed, including default-copy migration and owner-edit preservation.
- All 21 browser/integration tests passed. After the final heading whitespace adjustment, the hero and owner publishing/image-control tests passed again against a fresh production build.
- The hero regression covers 320, 390, 768, 1024, 1200, 1440 and 1920px, loaded artwork, no horizontal overflow, no default canvas, section order, mouse movement, reduced motion, floating quote state across client navigation and the site-survey destination.
- Production screenshots were visually reviewed at 1440 × 900, 1440 × 768 and touch-enabled 390 × 844. Desktop survey actions remain within the viewport at both tested heights.

This update was validated locally, not against a completed Vercel deployment. The generated artwork is an illustration, not proof of an actual AQ Enterprises installation.
