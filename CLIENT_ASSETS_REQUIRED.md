# Client assets required — AQ Enterprises website

Phase 6–8: prepare real business assets. **Do not invent photos, reviews, certifications, or stats.**

---

## Priority ladder (Phase 8)

### P0 — Confirm before trusting public NAP / ads

- [ ] **Official phone** — currently `+91 78159 15792` (status: **pending** in `business.ts`)
- [ ] **Official email** — currently personal Gmail `mohammedtalha204@gmail.com` (status: **pending**)
- [ ] **Official address** — Mallapur HQ string (status: **pending**)
- [ ] **Official business hours** — Mon–Sat 9am–7pm (status: **pending**)
- [ ] **Google Business Profile public URL**
- [ ] **Confirm website URL** — `https://www.aqenterprises.in` (www preferred)

### P1 — Trust & conversion media

- [ ] Real project photographs (8 published case studies)
- [ ] Company / workshop photographs
- [ ] Team photographs (consent required)
- [ ] Installation / on-site photographs
- [ ] Verified testimonials / GBP review quotes with permission

### P2 — Optional proof assets

- [ ] Brand / dealer certificates (only if real)
- [ ] Warranty documentation for quotations
- [ ] Additional videos
- [ ] ISO or other certificates (only if real)

---

## Business (NAP)

- [ ] Confirm official phone is the business line (not personal-only)
- [ ] Provide domain email when available — **do not guess** `info@…`
- [ ] Confirm exact address: Mallapur, Chanakyapuri Colony, Masjid-e-Ashraf, FCI Godown Road, Hyderabad, Telangana 500076
- [ ] Confirm hours and Sunday status
- [ ] Google Business Profile URL
- [ ] Social profile URLs (Facebook / Instagram / LinkedIn / YouTube) — only real accounts

---

## Company

- [ ] Logo (SVG or high-res PNG) — current: `/assets/aq-logo.png`
- [ ] Office / workshop photographs → `/public/images/company/`
- [ ] Storefront or reception photo (if applicable)

## Team

- [ ] Approved names + roles (consent)
- [ ] Headshots → `/public/images/team/`
- [ ] Installation technician photos

## Projects (8 published)

Place files under `/public/images/projects/{project-id}/` for:

1. `villa-banjara` 2. `factory-nacharam` 3. `retail-ameerpet` 4. `apartment-gachibowli`
5. `school-kompally` 6. `office-hitech` 7. `warehouse-uppal` 8. `hospital-jubilee`

Per project ideally: approach/exterior, camera mount, NVR/rack, overview — with permission and privacy-safe framing.

## Reviews / brands / warranty

- [ ] GBP reviews permission
- [ ] Confirm brands actually supplied/installed
- [ ] Dealer certificates only if real
- [ ] Workmanship / manufacturer warranty process for quotes

## Marketing claims removed until verified

`500+` installs, `8+` years, `12,000+` cameras, `18` technicians, `50+` areas, `24/7` monitoring claims, authorized-dealer language, “within the hour”, fixed package prices.

## Handover

1. Confirm P0 NAP in writing.
2. Upload P1 photos into matching `/public/images/...` folders.
3. Mark publishable reviews.
4. Attach only verified certificates.

Until then, the site uses SSOT values in `src/lib/business.ts` and avoids fabricated trust signals.
