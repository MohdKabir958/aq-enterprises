<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AQ Enterprises — Engineering Guardrails (Short Summary)

Full rules: .agents/rules/aq-enterprises-production.md - read it before any task.

## The 12 Non-Negotiables

1. Code quality: Zero `any`, no @ts-ignore/@ts-expect-error/@ts-nocheck/eslint-disable, no console.log, new files max 300 lines, no new npm dependencies without written owner approval.
2. Next.js: Server Components by default; "use client" only for state, events, browser APIs; server secrets stay isolated; public content routes use generateStaticParams().
3. Business truth: Never invent counts, years, clients, or awards; banned claim words enforced; images require verified provenance; no fake ISP claims.
4. Contact details single source: Phone, WhatsApp, email, address, hours, and social links come strictly from src/lib/business.ts.
5. SEO: Unique title/description, canonical, Open Graph, one H1, valid JSON-LD, no doorway pages, and honest sitemaps without fake dates.
6. Security and privacy: Server-side validation with length limits, select allowlist checks, no PII in logs, env vars listed in .env.example, security headers preserved.
7. Accessibility: Full keyboard use, visible focus, 4.5:1 text contrast, 44px tap targets, alt text, dialog focus trap and restoration.
8. Performance: Mobile targets (LCP < 2.5s, CLS < 0.1, INP < 200ms), images under 200 KB, next/image optimization on, Three.js isolated to home hero.
9. Reliability: error.tsx, global-error.tsx, and not-found.tsx stay in place; external calls require timeouts and bounded retries.
10. Docs honesty: Docs and comments reflect actual code; dated audits; no absolute local paths.
11. Agent conduct: No infrastructure or deployment tasks; no weakening safeguards; no unapproved rule edits; minimal clean diffs.
12. Change management: Dedicated feature branches only (never main), no force push, run npm run verify before push, report exact verify outputs.
