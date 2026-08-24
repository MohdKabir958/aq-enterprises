# Final Production Audit — AQ Enterprises

**Phase:** 10 — Final production audit + launch readiness  
**Date:** 2026-08-24  
**Production host:** https://www.aqenterprises.in  
**Scope:** Audit + fix real defects only. **No** new SEO content / P2 / P3 / S×L / blogs.

---

## 1. Executive summary

The site is **launch-capable** as a Hyderabad CCTV business website with conservative trust posture, complete commercial URL inventory, lead capture, optional GA4, and Phase 9 client checklists.

**Blockers to “fully evidenced” marketing** are client-side (NAP confirmation, GBP URL, real photos, verified reviews) — not missing SEO pages.

Phase 10 fixed:

1. Double `| AQ Enterprises` document titles  
2. Location/brand pages incorrectly highlighting **Home** in nav  
3. Branded `not-found` page  
4. Unverified `hi`/`te` languages removed from Organization schema  

---

## 2. Production readiness scores (editorial judgment)

| Area | Score /10 | Notes |
| --- | ---: | --- |
| Technical | 8.5 | Build clean; apex→www redirect; branded 404 |
| SEO | 8.5 | Inventory solid; title doubling fixed; photos still thin |
| Performance | 6.5 | Bottlenecks known; LCP/CLS/INP **NOT MEASURED** in lab here |
| Accessibility | 7.5 | Labels/dialogs present; no full axe crawl in this pass |
| Security | 8.0 | Secrets env-only; form hardened; rate-limit is single-instance |
| Conversion | 8.0 | Funnel wired; SMTP/GA depend on host env |
| **Overall launch readiness** | **8.0** | Soft-launch OK; full trust launch needs client assets |

---

## 3. Inventory (actual counts)

| Page type | Expected ≈ | Actual | Indexable | Sitemap | Schema | Status |
| --- | ---: | ---: | --- | --- | --- | --- |
| Services | 22 | 22 | Yes | Yes | Service (+ FAQ) | OK |
| Locations | 19 | 19 | Yes | Yes | Service + areaServed | OK |
| Service × Location | 24 | 24 | Yes | Yes | Service + provider | OK |
| Projects | 8 | 8 | Yes | Yes | CreativeWork | OK |
| Blogs | 26 | 26 | Yes | Yes | BlogPosting (+ FAQ) | OK |
| Static (home/about/indexes) | 6 | 6 | Yes | Yes | Org / LocalBusiness on home/about | OK |
| Brands | 0 | 0 | N/A | None | Scaffold only | Empty by design |
| Industries | 0 | 0 | N/A | None | Scaffold only | Empty by design |
| Technical (icon/manifest/404) | — | present | 404 noindex | N/A | — | OK |

Approx SSG routes after Phase 9/10: **~113** (content ~105 + icons/manifest). Content freeze respected — no new commercial SEO URLs in Phase 10.

---

## 4. Canonical / host

| Check | Result |
| --- | --- |
| Configured host | `https://www.aqenterprises.in` |
| Apex → www | `next.config.ts` permanent redirect |
| Trailing slash | Off (Next default) |
| metadataBase | `siteConfig.url` |
| localhost in src | **NOT FOUND** |
| HTTPS / HTTP→HTTPS | **NOT VERIFIED** in this environment (owner/host) |

---

## 5. Robots & sitemap

| Check | Result |
| --- | --- |
| Allow `/` | Yes |
| Disallow `/api/` | Yes (no API routes; harmless) |
| Sitemap URL | `https://www.aqenterprises.in/sitemap.xml` |
| Published content included | Yes via `getAllContentPaths()` |
| Drafts excluded | Yes (`publishedList`) |

---

## 6. Structured data

Appropriate: Organization, ProfessionalService/LocalBusiness, Service, BreadcrumbList, BlogPosting, FAQPage, CreativeWork.  
No invented geo. `sameAs` only when verified (currently empty). Phone/email/address/hours from SSOT (pending confirmation status preserved).

---

## 7. Trust audit

| Pattern | Public risk |
| --- | --- |
| `500+` etc. | Held in `UNVERIFIED_STATS` — not rendered |
| Authorized dealer | Denied / empty claim ladders |
| 24/7 monitoring | Editorial denials only |
| Bangalore / Mysuru | **NOT FOUND** |
| `[PLACEHOLDER]` warranty strings | **NOT FOUND** on public warranty copy |
| Visible image placeholders | Honest labels until client photos arrive |

---

## 8. Security report

| Item | Result |
| --- | --- |
| `.env.local` committed | **NOT FOUND** (gitignored) |
| Hardcoded SMTP password / API keys in src | **NOT FOUND** |
| GA ID hardcoded | **NOT FOUND** (env only) |
| Secrets in report | Not printed |
| Form honeypot | FOUND |
| Rate limit | FOUND (in-memory — weak on multi-instance) |
| HTML escape in lead email | FOUND |
| PII console logging on lead path | **NOT FOUND** (removed earlier) |
| Requires rotation | Only if credentials were previously exposed outside env — **owner decision** |

---

## 9. Lead form / analytics / attribution

| Area | Status |
| --- | --- |
| Server Action validation | OK |
| Events (8 conversion events) | OK — no PII params |
| Attribution → lead email | OK |
| GA4 optional | OK |
| Funnel end-to-end with live SMTP | **NOT VERIFIED** here — owner must send a test lead after deploy |

---

## 10. Performance (qualitative — metrics NOT MEASURED)

| Observation | Severity |
| --- | --- |
| Three.js importmap in root layout (all pages) | High |
| Home Three.js scene | High (home only for scene; importmap global) |
| `images.unoptimized: true` | Medium |
| Global FloatingCTA client bundle | Medium |
| Fonts via `next/font` + `display: swap` | Low (good) |

**LCP / CLS / INP:** **NOT MEASURED** in this audit environment.  
Owner should measure with PageSpeed Insights / CrUX / Search Console on `https://www.aqenterprises.in` after deploy.

---

## 11. Accessibility / mobile / console

| Item | Status |
| --- | --- |
| Form labels / dialog ARIA | Present |
| Full WCAG audit | **NOT VERIFIED** (no automated axe run in this pass) |
| Multi-breakpoint visual QA | **NOT VERIFIED** in browser automation this pass — code uses responsive layouts; owner should spot-check devices |
| Production browser console | **NOT VERIFIED** against live host |

---

## 12. Issues

### Critical
None found in code.

### High (fixed in Phase 10)
- Double title brand suffix → fixed via `title.absolute` in `generateMetadata` + home metadata  
- Location/brand nav highlighting Home → fixed  

### Medium
- In-memory rate limit on serverless  
- Global Three.js importmap  
- Missing real photography (client)  
- NAP / GBP still pending (client)  

### Low
- Empty brands/industries route scaffolding  
- Visible placeholder image labels until assets arrive  

---

## 13. Client dependencies

See `CLIENT_INFORMATION_CONFIRMATION.md`, `CLIENT_GBP_CHECKLIST.md`, `CLIENT_ASSETS_REQUIRED.md`.

Must confirm: phone, email, address, hours, GBP URL, photos, review permissions, SMTP on host, GA4 ID (optional), GSC verification.

---

## 14. Files modified (Phase 10)

- `src/lib/seo/metadata.ts` — absolute titles  
- `src/app/page.tsx` — absolute home title  
- `src/components/Header.tsx` — no default active=home  
- `src/components/templates/PageShell.tsx` — no default active  
- `src/components/templates/LocationTemplate.tsx` — nav fix  
- `src/components/templates/BrandTemplate.tsx` — nav fix  
- `src/app/locations/page.tsx` — nav fix  
- `src/lib/json-ld.tsx` — availableLanguage `en` only  
- `src/app/not-found.tsx` — **created**  
- `FINAL_LAUNCH_CHECKLIST.md` — **created**  
- `FINAL_PRODUCTION_AUDIT.md` — **created** (this file)  

---

## 15. Build results

Phase 10 QA (2026-08-24):

- `npx tsc --noEmit` — pass  
- `npm run lint` — pass  
- `npm run build` — pass (**113** static routes generated)

No Critical build blockers.

---

## 16. Final launch recommendation

**GO for soft production launch** of the current codebase, provided:

1. Host env has working SMTP  
2. DNS/HTTPS/www redirect verified in a browser  
3. Owner accepts pending NAP/photos as temporary honesty (placeholders + pending confirmation)  

**HOLD on aggressive ads / “established brand” claims** until phone/email/GBP/photos/reviews are confirmed.

After launch: **MEASURE → ANALYZE → IMPROVE** only. No automatic P2/P3 content expansion.
