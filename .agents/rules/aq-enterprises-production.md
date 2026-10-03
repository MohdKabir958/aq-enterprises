# AQ Enterprises — Production Engineering Rules & Guardrails

This is the single full rulebook for all developers and AI agents working on the `aq-enterprises` codebase.

## 1. Code Quality
- Zero `any`. Use `unknown` and narrow it. Any `as` cast needs a one-line WHY comment.
- No @ts-ignore, @ts-expect-error, @ts-nocheck, eslint-disable.
- No console.log. Allowed: console.error / console.warn with a fixed message and an error code only.
- Files: new files max 300 lines. Existing files over 400 lines may not grow (they are listed in scripts/guardrails-allowlist.json and must only shrink).
- Do not copy-paste a helper a third time: move it to a shared module.
- No speculative code: no unused exports, interfaces, parameters or "future" layers. An interface needs two real implementations or a written reason.
- No new npm dependency without the owner's written approval in the task.
- Comments explain WHY, not what.

## 2. Next.js
- Server Components by default; "use client" only for state, events, browser APIs.
- Server-only code and env vars stay server-only. Never import them into client files.
- Public content routes use generateStaticParams(); keep metadata via generateMetadata.
- Read the matching doc in node_modules/next/dist/docs/ before using any Next API.

## 3. Business Truth
- Never invent: counts, years, clients, reviews, certificates, awards, prices, coverage, response times.
- Banned claim words in public text: 24/7, 24x7, SLA, uptime, 99.9, MTTR, NOC, BGP, ASN, IRINN, Fluke, leased line, carrier-grade, financial-backed, "within 24 hours", certified, authorized dealer, lifetime, same day. Exceptions only via scripts/guardrails-allowlist.json with a written reason approved by the owner.
- Every number or claim in public text must trace to a verified source (business.ts verified field or owner-approved content).
- Project case-study text may use only verified fields: category, location, brand, camera count, duration. Never fill gaps with invented detail.
- Client or business names in case studies need owner-confirmed permission; otherwise use a plain description.
- Brands: only "commonly install and support". Testimonials: only verified and published.
- Stock or AI images must never be shown as our work. Every file under public/images must be listed in public/images/provenance.json with source: "client" or "illustration". Folders projects, company, team accept only source "client". Illustrations must show a visible "Illustrative image" caption.
- Internet service: connectivity comes from a licensed ISP partner. Never name the partner. Never say AQ is an ISP or owns fiber, backbone, ASN, IP blocks or a NOC. SLA/uptime/repair-time text is allowed only when INTERNET_SLA_PUBLISHED is true in business.ts.

## 4. Contact Details Single Source
- Phone, WhatsApp, email, address, hours, social links come only from src/lib/business.ts (or constants.ts re-exports). Never typed into components or pages.

## 5. SEO
- Every indexable page: unique title (50-60 chars), unique description (140-160 chars), canonical, Open Graph, one H1, right JSON-LD.
- Never add review/rating schema without real verified reviews. sameAs only for verified profiles.
- No doorway pages. Sitemap lists only real indexable URLs with real dates or no date.

## 6. Security and Privacy
- Validate every input on the server with length limits; client validation is only for UX.
- Select/dropdown fields are checked against an allowlist on the server. Nothing user-typed goes into an email subject or header.
- Keep honeypot, rate limiting and HTML escaping. Document honestly: the in-memory limiter is best-effort only; real protection on serverless needs a shared store.
- No PII (name, phone, email, IP, message) in logs, analytics or error output.
- Secrets only in env, never in git or client code. Every env var used in src must be listed in .env.example.
- Security headers stay in next.config.ts. Never weaken them.

## 7. Accessibility
- Full keyboard use, visible focus, 4.5:1 text contrast, 44px tap targets, one H1 per page, real alt text, respect prefers-reduced-motion, dialogs trap focus and restore it.

## 8. Performance
- Mobile targets: LCP under 2.5s, CLS under 0.1, INP under 200ms.
- Each image under 200 KB; whole public/ under 5 MB. next/image optimisation stays on.
- Three.js loads only on the home hero, only on screens 900px or wider, only without reduced motion, only when visible.

## 9. Reliability
- error.tsx, global-error.tsx, not-found.tsx stay in place.
- Every external call has a timeout and a bounded retry. Failures never claim success and never leak stack traces.

## 10. Docs Honesty
- Docs and comments must describe what the code really does. Audits are dated. No local paths.

## 11. Agent Conduct
- No infrastructure work: no deploys, SSH, VM, DNS, Vercel/GitHub settings, secrets.
- Never edit rule files, scripts/guardrails-allowlist.json, public/images/provenance.json, .github/CODEOWNERS or workflows unless the task explicitly says so.
- Never weaken an existing safeguard (validation, limits, headers, checks) to make a task easier.
- If a rule conflicts with a task, stop and ask. Do not break the rule.
- If a fact is unknown, leave it out or write "confirmed in your written quotation".
- No unrelated refactors. Keep diffs small.

## 12. Change Management
- Dedicated branch, never main. Small commits with clear messages. No force push.
- Run `npm run verify` before every push. Paste its real output in the final report. Never say "done" if anything fails.
- Final report lists: files changed, what and why, and verify output.
