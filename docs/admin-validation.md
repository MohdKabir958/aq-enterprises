# Admin and catalogue validation

Validated on 2026-10-08 in the cloud workspace using Next.js 16.4.0, Node.js 24, Chromium and a disposable local PostgreSQL database. No production Neon database, owner account or SMTP credentials were supplied, and no deployment was performed.

## Checks passed

- TypeScript: `npx tsc --noEmit`.
- ESLint: `npm run lint` — zero errors and zero warnings.
- Existing content: `npm run validate:content` — 22 services, 19 locations, 24 service/location pages, 8 projects, 26 blogs and 8 editable homepage FAQs.
- Production build: `npm run build`.
- Integration suite: all 19 tests passed on the final code in 55.3 seconds — 18 browser tests in `tests/admin.spec.ts` and one local SMTP delivery test in `tests/notifications.spec.ts`.
- Diff whitespace: `git diff --check`.
- Runtime dependency audit: zero known vulnerabilities after updating Next.js, Nodemailer and affected runtime dependencies. Compatible dependency fixes were applied during the final review. The full audit still reports five high-severity affected development packages (`braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next`, `eslint-config-next`); its suggested eslint-config-next downgrade to version 14 was not applied to this Next.js 16 project.

The browser suite checks unauthenticated access, cross-origin writes, price validation, duplicate slugs, stale revision conflicts, owner-form product publishing, cart persistence, checkout pre-filled selections, canonical server product snapshots and durable enquiries when SMTP is absent. It also checks draft/deleted products, recreation after deletion, optional blog/service image editing, contact/structured-data changes, internet plan/hero publishing, image hide/restore/reapply, valid image uploads, reference-protected deletion, a product unpublished between page load and submission, responsive layouts and session revocation/login throttling.

All published sitemap routes in the test database were visited at 320px and 1440px with no browser exceptions or horizontal page overflow. Products, populated cart/checkout and authenticated admin were checked at 320, 390, 768, 1024, 1200 and 1440px. These are Chromium viewport checks, not certification of every physical device or browser.

The final code retains the client-side PostgreSQL query timeout without sending an extra server startup parameter to Neon's pooled connection. Production build, TypeScript, lint, content validation and all 19 integration tests passed after the final review fixes.

## Final quality review

- Explicitly enforce Secure login/logout cookies on Vercel, including when Next.js uses an internal request URL.
- Catch failed enquiry/upload deletion requests, restore the controls and retain saved records until deletion succeeds. Browser coverage simulates network failures and verifies a subsequent successful deletion.
- Validate editable content timestamps as dates or ISO timestamps before saving; malformed dates are rejected by the API.
- Index session and rate-limit expiry fields used by cleanup queries.
- Replace unsupported commercial-page uptime, latency, backbone, continuous monitoring and restoration promises with survey/quotation wording, including the structured-data description.
- Scan all 105 changed/new files for common credential patterns before staging; no matches were found. Production credentials were not supplied or committed.

## Lead-generation update validation

The suite additionally verifies guided CCTV/network/access-control controls, server rejection of an outdated survey date, persisted locality/visit preferences, and the awaiting-confirmation state. It verifies authenticated lead search across all records with 20-row pagination, status changes, private notes, due filters, required confirmed appointments and stale-revision conflicts.

Notification tests verify concurrent retries claim one attempt, failed email leaves the enquiry saved, cooldowns and sent-state protections work, and a successful SMTP delivery reaches a local test inbox with escaped requirements text. This local inbox test does not verify delivery through the owner's actual SMTP provider.

Case-study, review and FAQ tests cover publication requirements, owner-confirmed case studies, verified review permission/source requirements, project-linked feedback, homepage and service-scoped questions, structured data and deletion. Cart-sharing checks verify encoded item/locality/requirement text and anonymous click counts; reporting verifies enquiry channels and owner-marked outcomes. Malformed/oversized browser attribution is sanitized so it cannot block a valid customer request.

Survey forms and the Enquiries, Reports, Case studies, Reviews and FAQs tabs were checked at 320, 390, 768, 1024 and 1440px with no page exceptions or horizontal overflow. Original photos and production content were not replaced with test fixtures. Production fixtures were not created.

## Deployment checks still required

Follow `docs/admin-and-neon-setup.md`: configure the actual Neon pooled connection, set owner credentials and SMTP, then deploy with `npm run build` to apply the additive schema automatically. `npm run db:setup` remains available for manual setup. Test the deployed login, an admin edit, an uploaded image and a checkout enquiry; confirm the notification arrives in the intended inbox. Hosted video URLs and actual Vercel/Neon quotas must be checked on the chosen accounts.

Production catalogue entries remain empty until the owner adds actual products and prices. Fixtures used by automated tests are isolated to the disposable test database. Repository photos were not replaced.

## Vercel first-database build repair — 9 October 2026

The reported production build reached Neon but failed while collecting `/blog/[slug]` data because `aq_content` did not exist. `npm run build` now runs the additive schema setup first when `DATABASE_URL` is configured. Setup uses a direct Neon endpoint, preserves TLS options, serializes concurrent builds and rolls back failed migrations.

Validation against disposable local PostgreSQL passed all **5 database-setup tests**: fresh schema and concurrent reruns preserve content/enquiries; existing enquiry records receive workflow fields; a failed schema change rolls back; direct connection overrides work; absent optional configuration skips and manual setup fails clearly; error logs omit fixture credentials. A full build with `DATABASE_URL` and `VERCEL=1` successfully initialized the public schema and generated all 110 pages. TypeScript, zero-warning lint and content validation passed. The production server returned HTTP 200 and rendered page content for the homepage, blog index, a blog article, products and site survey. No production Neon migration or live Vercel deployment was executed from this workspace; the next Vercel `npm run build` performs setup using its configured database connection.
