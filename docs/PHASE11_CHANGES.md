# Phase 11: Trust, SEO, and Internet Enhancements

## Phase 1: Trust Fixes & Anti-Fabrication

- **Rulebook Establishment**: Created `.agents/rules/aq-enterprises-production.md` as the single source of truth for engineering guardrails. Linked in `GEMINI.md` and `AGENTS.md`.
- **Stock Photo Removal**: Deleted all stock/illustrative images from `public/images/*` (company, projects, team) and `public/assets/og-image.jpg`. Removed `scripts/download-images.js`.
- **Project Anonymisation**: Updated `src/content/projects/*` and `src/content/service-locations/*` to use generic, honest descriptions instead of fabricated names/locations (e.g., "Hospital, Jubilee Hills" instead of "Apollo").
- **Asset Handling**: Updated `VerifiedImage.tsx` to handle `provisional_illustration` and auto-append "(Illustrative image)" to captions.
- **Banned Claims Removal**: 
  - Reworded "reply within 24 hours" and "2-3 working days" on `src/app/contact/page.tsx` to honest callback promises.
  - Stripped fabricated metrics from `src/app/commercial-internet-hyderabad/page.tsx` (99.99% SLA, 100+ Gbps backbone, 24/7 NOC, 4-Hour MTTR, BGP/ASN, Carrier-Grade, Financial-Backed SLA). Replaced with honest local descriptions (1:1 symmetrical, static IP, dedicated fiber).
- **Verification Documentation**: Created `docs/PROJECT_VERIFICATION.md` for the business owner to confirm real project photos and details.

## Phase 2: Legal Pages (Privacy & Terms)

- **Privacy Policy**: Created `src/app/privacy/page.tsx` as a static server component. Focuses on honest, minimal legal text for a small local business.
- **Terms & Conditions**: Created `src/app/terms/page.tsx` as a static server component. Explicitly states that website content is not a binding contract and brand mentions do not imply authorized dealership.
- **Footer Updates**: Replaced placeholder spans with real `next/link` elements to `/privacy` and `/terms`.
- **Sitemap**: Added `/privacy` and `/terms` to `src/app/sitemap.ts`.

## Phase 3: Linting, TypeScript, & Performance Fixes

- **TypeScript Fixes**: Added file-level `eslint-disable` for `any` in `src/types/three.d.ts` (vendor stub) and typed the traverse callback in `src/components/camera-scene-core.ts` to `THREE.Object3D`. Fixed missing props in Header on privacy/terms pages.
- **React Hooks**: Fixed `exhaustive-deps` warning in `src/components/FloatingCTA.tsx` by capturing `triggerRef.current` in a local effect variable.
- **Unused Imports**: Cleaned up unused imports in `src/app/commercial-internet-hyderabad/page.tsx`.

## Next Steps

- Proceed with further lead form enhancements, business internet optimizations, and remaining phases.
