# Phase 8 — Production SEO, Analytics & Measurement

Content expansion is **paused**. This document is the owner-facing production checklist.
Preferred host (configured): **https://www.aqenterprises.in**

---

## 1. Production domain / canonical

| Item | Status |
|------|--------|
| Configured URL | `https://www.aqenterprises.in` (`WEBSITE_URL` / `siteConfig.url`) |
| Preferred host | **www** |
| Apex → www | Next.js redirect in `next.config.ts` (permanent) |
| Trailing slash | Off (Next default) — no trailing slash |
| HTTPS | Required at host/CDN (owner configures certificate) |
| metadataBase / OG | Absolute URLs via `siteConfig.url` |
| Robots | `/robots.txt` → sitemap `https://www.aqenterprises.in/sitemap.xml` |
| Sitemap | `/sitemap.xml` |

**Owner action:** Point DNS for both `aqenterprises.in` and `www` to the host; confirm HTTPS; verify apex redirects to www in a browser.

---

## 2. Google Search Console readiness (owner checklist)

Do **not** claim verification is done until the owner completes it.

1. [ ] Create/open Search Console property for `https://www.aqenterprises.in`
2. [ ] Prefer **URL-prefix** property on the www host (or Domain property covering both)
3. [ ] Verify via DNS TXT, HTML file, or Google Analytics (once GA is live)
4. [ ] Submit sitemap: `https://www.aqenterprises.in/sitemap.xml`
5. [ ] Confirm robots allows crawling (`Allow: /`, Disallow `/api/` only)
6. [ ] Spot-check sample URLs: home, 1 service, 1 location, 1 S×L, 1 project, 1 blog
7. [ ] Request indexing for homepage + top 5 commercial pages after go-live
8. [ ] Set preferred domain consistency (www) if using legacy settings

---

## 3. Analytics

| Item | Status |
|------|--------|
| GA4 in code | Ready — loads only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set |
| Hardcoded ID | None |
| IP anonymization | Enabled in gtag config |
| PII in events | Forbidden by design |

**Owner action:** Create a GA4 property → copy Measurement ID → set env var on host → redeploy.

---

## 4. Conversion events (when GA4 is configured)

| Event | When |
|-------|------|
| `quote_form_open` | Floating quote modal opens |
| `quote_form_submit` | Form passes client validation |
| `quote_form_success` | Server Action succeeds |
| `quote_form_error` | Server Action fails |
| `site_survey_request` | Successful lead (alias intent) |
| `phone_click` | Any `tel:` link |
| `whatsapp_click` | WhatsApp links |
| `email_click` | `mailto:` links |

No per-button noise tracking.

---

## 5. Lead attribution

Captured client-side and attached to lead email (not GA as PII):

- Landing page (session first hit)
- Referrer
- UTM source / medium / campaign / content / term
- First-touch source (localStorage)
- Current page path
- Form source (`bottom_form` | `quote_modal`)

---

## 6. Form / Server Action

| Check | Status |
|-------|--------|
| Validation | Client + server |
| Honeypot | Yes (`website` field) |
| Rate limit | ~60s per phone (in-memory; single instance) |
| SMTP missing | Returns error; **does not log PII** |
| Attribution in email | Yes |
| Secrets | Env only |

Env names: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEAD_DESTINATION_EMAIL`.

---

## 7. Google Business Profile readiness (owner — do not claim verification)

**NAP (must match website after client confirmation):**

- Name: AQ Enterprises
- Phone: +91 78159 15792 (**pending confirmation**)
- Address: Mallapur, Chanakyapuri Colony, Masjid-e-Ashraf, FCI Godown Road, Hyderabad, Telangana 500076 (**pending**)
- Hours: Mon–Sat 09:00–19:00 (**pending**)
- Website: https://www.aqenterprises.in
- Email: pending official domain email

**Category suggestions (owner chooses):**

- Primary: Security system installation service / CCTV installation (exact GBP taxonomy may vary)
- Secondary: Home security system store (if retail); Locksmith only if accurate — prefer access-control related categories only if true

**Services to list:** Home/Office/Apartment/Villa CCTV, IP cameras, Access control, Biometric attendance, Video door phone, AMC, Repair, Warehouse/Factory, etc. (match published `/services`)

**Service areas:** Hyderabad neighborhoods already on `/locations` (do not invent branches)

**Photo checklist:** logo, storefront/workshop, team (consent), before/after installs (permission), NVR cabinets

**Review checklist:** ask real customers; never buy reviews; respond to every review

---

## 8. Measurement baselines (record after GSC + GA connect — do not invent)

### Search Console (first 28 days)

Indexed pages · Clicks · Impressions · CTR · Avg position · Top queries · Top pages · Country · Device · Search appearance

### Leads

Organic sessions · CTA clicks · Phone clicks · WhatsApp clicks · Quote submissions · Successful leads · Lead conversion rate

---

## 9. Monthly SEO dashboard (recommended)

Organic clicks · Impressions · CTR · Avg position · Indexed pages · Top landing pages · Top queries · Leads · Phone / WhatsApp clicks · Form submissions · Top services · Top locations · Top S×L · Top blogs

Sources: Search Console + GA4 + lead emails.

---

## 10. P2 decision framework (content remains paused)

Create a new page/article **only when** at least one is true:

1. Search Console shows sustained query demand with no matching page
2. Analytics shows high exit / confusion on a commercial path
3. Lead emails repeatedly ask the same unanswered question
4. Verified business facts / projects unlock a claim previously blocked
5. Clear search-intent gap that does **not** cannibalize an existing service, location, or S×L page

Otherwise keep the current 110-page inventory.

---

## 11. Indexability snapshot

| Class | Count (approx) | Index? |
|-------|----------------|--------|
| Home, About, Services/Locations/Projects/Blog indexes | 6 static | Yes |
| Services | 22 | Yes |
| Locations | 19 | Yes |
| Service × Location | 24 | Yes |
| Projects | 8 | Yes |
| Blogs | 26 | Yes |
| Brands / Industries | 0 published | N/A |
| Drafts | Excluded by getters | No |

---

## 12. Core Web Vitals — known bottlenecks (not blind optimization)

1. **Home Three.js camera scene** — heaviest JS; loaded client-only on home
2. **Three.js importmap on every page** via root layout `<head>` (even non-home)
3. **`images.unoptimized: true`** — no Next image optimizer
4. **Global FloatingCTA** client component
5. Missing real OG / project images increase layout risk when placeholders land later

Recommended next performance work (post-approval): load Three importmap only on home; supply compressed project images; consider enabling image optimization when CDN ready.

---

## 13. Image acquisition priority

| Priority | Pages |
|----------|--------|
| P0 | Homepage OG, About, 8 projects |
| P1 | Top services (home/office/apartment/villa/IP), top S×L (Hitech office, Gachibowli apartment, etc.) |
| P2 | Wave B night-vision editorial illustration; other blogs as needed |

Never invent AQ project photography.

---

## Business confirmation still pending

Phone · Email · Address · Hours · GBP URL · Socials — all flagged in `src/lib/business.ts`.
