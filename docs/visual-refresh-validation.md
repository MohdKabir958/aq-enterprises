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
