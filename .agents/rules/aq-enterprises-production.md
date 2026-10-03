# AQ Enterprises — Production Engineering Rules & Guardrails

This rule document governs all agent and developer operations for the `aq-enterprises` Next.js codebase.

## 1. Enterprise Code Quality
- Production-grade, maintainable, readable TypeScript.
- Prefer simple, explicit, strongly typed code over clever abstractions.
- Follow SOLID principles where they genuinely improve maintainability.
- No `any` unless absolutely unavoidable and explicitly justified.
- No `@ts-ignore` or `@ts-nocheck`.
- No disabling ESLint rules to bypass checks.
- Never leave debugging `console.log` statements in production code.
- Minimal dependency footprint; reuse existing utilities.

## 2. Next.js App Router Architecture
- Default to Server Components (`RSC`).
- Client Components (`'use client'`) only for state, browser events, or browser APIs.
- Keep server-only code (Nodemailer, secrets) server-only.
- Preserve static generation with `generateStaticParams()`.
- Preserve existing routing structure and URLs.

## 3. Business Truth & Anti-Fabrication
- Real Hyderabad security business operating strictly from Mallapur HQ.
- NEVER invent stats: installations (no "500+"), cameras ("12k+"), technicians, years, customer counts.
- NEVER invent dealer claims: Only state "commonly install and support" (Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, Panasonic).
- NEVER claim 24/7 monitoring, emergency response SLAs, or fabricated testimonials.
- Unverified data must stay isolated in `src/lib/business.ts` and never render publicly.

## 4. Business NAP SSOT
- All phone numbers, display formats, WhatsApp URLs, email addresses, physical addresses, and opening hours must be imported from `src/lib/business.ts` (or `src/lib/constants.ts`).
- Never hardcode `tel:`, `wa.me`, `mailto:`, address strings, or opening hours directly inside UI components or page files.

## 5. SEO & Content Integrity
- Every indexable route requires descriptive title, meta description, canonical URL, Open Graph tags, semantic H1, and appropriate JSON-LD schema.
- No thin doorway pages or keyword stuffing.
- Sitemap (`src/app/sitemap.ts`) must only list published, canonical URLs.
- Never use `new Date()` as a fake `lastModified` timestamp; use real content timestamps or omit `lastModified`.

## 6. Security & PII Protection
- Zero PII in logs: Never log customer names, phones, emails, or messages.
- Server-side input validation and maximum length limits on every field.
- Secrets (`SMTP_*`, API keys) must only exist in `.env.local` or host environment, never in git or client bundles.
- Maintain honeypot, rate-limiting, and HTML sanitization.

## 7. Accessibility
- Full keyboard operability for interactive components.
- Modals/dialogs must implement `role="dialog"`, `aria-modal="true"`, focus trapping, initial focus, Escape closing, and focus restoration.
- Semantic HTML and descriptive alt text for visual assets.

## 8. Performance
- Use `next/image` with proper optimization enabled; do not globally disable image optimization.
- Three.js and heavy 3D canvas assets must be route-scoped (homepage hero only) and loaded dynamically with `ssr: false`. Do not inject import maps or 3D scripts globally across all pages.
- Keep client bundles minimal and optimize Core Web Vitals (LCP, CLS, INP).

## 9. Observability & Error Handling
- Use Next.js error boundaries (`error.tsx`, `not-found.tsx`) to guard user-facing routes.
- Never leak stack traces or internal implementation details to users.
- External integrations (SMTP, analytics) must feature timeouts, bounded retries, and graceful degradation.

## 10. Change Management
- Work strictly in dedicated Git branches; never push directly to `main`.
- Validate with `npx tsc --noEmit`, `npm run lint`, and build/content validations before committing.
