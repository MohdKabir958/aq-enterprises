# AQ Enterprises — Permanent Engineering Contract & Guardrails

This document establishes the mandatory engineering standards, architectural guardrails, security rules, and business integrity guidelines for the AQ Enterprises (`aq-nextjs`) codebase. All developers and AI agents operating in this repository must strictly adhere to these rules.

---

## 1. Enterprise Code Quality
* **Language & Typing**: Write production-grade, maintainable, readable TypeScript. Strictly avoid `any` unless absolutely unavoidable and explicitly justified. Do not suppress TypeScript errors with `@ts-ignore` or `@ts-nocheck`.
* **Simplicity & SOLID**: Prefer simple, explicit, strongly typed code over clever abstractions. Follow SOLID principles where they genuinely improve maintainability. Avoid premature generalization and speculative architecture.
* **Component Design**: Keep business logic out of presentation components. Prefer small, focused modules, functions, and components. Avoid giant monolithic files.
* **Linting & Hygiene**: Do not disable ESLint rules just to pass checks. Never leave debugging `console.log` statements in production code. Comments must explain *WHY*, not restate obvious code.
* **Minimal Dependencies**: Do not add dependencies without a clear, documented technical requirement. Leverage built-in platform and Next.js capabilities first.

---

## 2. Next.js App Router Architecture
* **Server-First Paradigm**: Respect Next.js App Router conventions. Default to Server Components (`RSC`). Use Client Components (`'use client'`) solely when browser interactivity, state, or DOM event listeners are required.
* **Server Secrets**: Keep server-only code (e.g. Nodemailer, SMTP keys) strictly isolated on the server. Never expose private credentials or server logic to client bundles.
* **Static Generation**: Preserve static generation via `generateStaticParams()` for all public content routes to ensure instant TTFB, high cacheability, and robust SEO.
* **Route Integrity**: Preserve route correctness and established canonical URLs.

---

## 3. Business Truth & Anti-Fabrication
This website represents a real, operating physical security business in Hyderabad.
* **Zero Fabrication**: NEVER invent or inflate business metrics:
  - NO invented numbers of installations (e.g., "500+", "1,000+").
  - NO invented numbers of technicians, cameras installed, or years of experience.
  - NO unverified 24/7 emergency response or response-time SLA promises.
  - NO claims of "Authorized Dealer", "Certified Partner", or manufacturer accreditations without official certificate proof.
  - NO fabricated warranties, testimonials, project case studies, customer names, or prices.
* **Approved Data Only**: Only state that AQ Enterprises "commonly installs and supports" brands like Hikvision, CP Plus, Dahua, Uniview, etc.
* **Single Physical Base**: AQ Enterprises operates from a single physical headquarters in Mallapur, Hyderabad. Never invent virtual neighborhood branches or fake office locations.
* **Isolated Unverified Claims**: Any metric without documentary proof must reside in `src/lib/business.ts` marked as unverified and MUST NOT be displayed to the public.

---

## 4. Business NAP SSOT (Single Source of Truth)
* **Centralized Identity**: All phone numbers, display formats, WhatsApp URLs, email addresses, physical addresses, working hours, and social profiles must originate from `src/lib/business.ts` (or direct re-exports in `src/lib/constants.ts`).
* **No Hardcoding**: Never hardcode `tel:`, `wa.me`, `mailto:`, address strings, or opening hours directly in arbitrary UI components or pages. Changing `src/lib/business.ts` must propagate globally.

---

## 5. SEO & Route Integrity
* **Meta Completeness**: Every indexable route must provide a unique, descriptive `<title>`, meta description, canonical URL, Open Graph metadata, semantic H1, and appropriate schema.org JSON-LD.
* **No Doorway Pages**: Never create shallow doorway pages, thin keyword stuffing, or generic repetitive location text. Local pages must provide genuine, differentiated context.
* **Truthful Sitemaps**: `src/app/sitemap.ts` must only list indexable, canonical URLs. Drafts or unpublished items must never enter the sitemap. Do not use `new Date()` as a fake `lastModified` timestamp; use real content timestamps or omit `lastModified`.

---

## 6. Security & PII Protection
* **Zero PII in Logs**: Never log customer names, phone numbers, email addresses, message bodies, or IP addresses to application logs or console streams.
* **Server-Side Validation**: All user-submitted inputs (contact forms, quote modals, query parameters) must undergo strict server-side validation, sanitization, and explicit length limits. Client validation is purely for user UX.
* **Secrets Management**: Never commit `.env.local`, API keys, SMTP passwords, or credentials to version control.
* **Abuse Protection**: Maintain honeypot fields, rate limiting, and HTML escaping for all user submissions.

---

## 7. Accessibility (a11y)
* **Keyboard Navigable**: All interactive components must be fully operable via keyboard.
* **Accessible Modals/Dialogs**: Implement proper `role="dialog"`, `aria-modal="true"`, accessible labeling, focus trapping (Tab / Shift+Tab), initial focus, focus restoration upon closing, and Escape key dismissal.
* **Semantic HTML**: Use real `<button>` and `<a>` elements; provide descriptive `alt` text for images and ARIA states where appropriate.

---

## 8. Performance & Asset Optimization
* **Asset Loading**: Utilize Next.js Image Optimization appropriately. Do not globally disable image optimization without a strong architectural reason.
* **Route-Specific Code Splitting**: Heavy client libraries (such as Three.js / WebGL scenes) must be strictly isolated to the routes requiring them (e.g., Homepage hero) and dynamically imported with `ssr: false`. Do not inject heavy scripts or import maps globally across all pages.
* **Hydration Hygiene**: Keep critical client JavaScript bundles small, eliminate unnecessary hydration, and preserve fast First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

---

## 9. Observability & Graceful Error Handling
* **Error Boundaries**: Implement Next.js error boundaries (`error.tsx`, `not-found.tsx`) to prevent broken screens on unexpected client/server errors.
* **No Leaked Stack Traces**: Never surface internal system errors, database queries, or stack traces in the user interface.
* **Resilient Integrations**: External network integrations (SMTP, analytics) must include connection timeouts, sensible retry logic, and non-blocking failure modes.

---

## 10. Change Management
* **Never Push to `main` Directly**: Always develop in dedicated feature/fix branches.
* **Verification Before Commit**: Execute `npx tsc --noEmit`, `npm run lint`, and build/content validations before committing.
* **Clean Diffs**: Avoid unrelated refactoring or whitespace noise.
