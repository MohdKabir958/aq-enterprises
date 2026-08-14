# Google Business Profile checklist — AQ Enterprises

Use this when creating or editing the Google Business Profile. **The website does not claim GBP is verified.** There is **no GBP URL in the codebase** until you send the public listing link.

Website to enter on GBP: `https://www.aqenterprises.in`

NAP on the website (must match GBP exactly once you confirm it): see [CLIENT_INFORMATION_CONFIRMATION.md](./CLIENT_INFORMATION_CONFIRMATION.md) and `src/lib/business.ts`.

---

## 1. Primary category (recommendation)

**Recommended primary category:** `Security system installer`

This matches the live business: CCTV installation and related electronic security for homes, businesses, and institutions in Hyderabad.

If Google’s picker in your market uses slightly different wording, choose the closest installer / security-system installation category — **not** a generic “security guard company,” “software company,” or “CCTV camera store” unless that is actually the main activity.

## 2. Secondary categories (suggestions)

Add only what you actually do. Suggested extras:

- CCTV installation service (if listed separately from the primary)
- Access control system supplier / installer
- Fire alarm system installer (only if you actively sell/install fire alarm work)
- Computer networking service (only if commercial LAN/cabling is a real offer)

Do **not** add categories for work you do not perform.

## 3. Business description (requirements)

Write in your own words. Do **not** paste invented stats. Must include:

- Legal / trading name: **AQ Enterprises**
- What you do: CCTV, and the security systems you actually install (access control, biometric, video door phone, AMC — only if true)
- Where: **Hyderabad**, based in **Mallapur**
- How you work: site survey before quote
- What you are **not**: a chain of neighbourhood branch offices; not a 24/7 monitoring centre unless that is a real paid service you run

**Do not write:** 500+ customers, 8+ years, authorized dealer, ISO, 24/7 monitoring, response-within-an-hour, fake branches, or star ratings you do not have.

Keep it within Google’s current character limit. No keyword stuffing of every Hyderabad locality.

## 4. Services to list on GBP

List services you actually offer, aligned with the website (do not invent new ones):

- Home / villa CCTV installation
- Apartment / society CCTV
- Office CCTV
- Factory and warehouse CCTV
- Retail CCTV
- IP camera installation
- Wireless CCTV (where suitable)
- Access control
- Biometric attendance
- Video door phones / intercom
- CCTV AMC and repair
- Commercial LAN / cabling (if you do this)

## 5. Service areas

GBP should describe a **service-area business with one address** (Mallapur HQ), not a pin in every neighbourhood.

Service area: **Hyderabad, Telangana** (and listed localities you actually survey — Gachibowli, Hitech City, Banjara Hills, Uppal, Kukatpally, etc.).

Neighborhood pages on [aqenterprises.in/locations](https://www.aqenterprises.in/locations) are **service areas, not branches**. Do not create extra GBP locations for those areas.

## 6. Hours

Currently published on the website (pending your confirmation):

- Monday–Saturday **09:00–19:00**
- Sunday: treat as **closed** until you confirm otherwise

GBP hours must match the website after you confirm.

## 7. NAP (must match the website)

| Field | Current website value | GBP |
| --- | --- | --- |
| Name | AQ Enterprises | Same |
| Phone | +91 78159 15792 | Same after you confirm this is the official line |
| Address | Mallapur string in `business.ts` (see confirmation file) | Same — do not use a different pin |
| Website | https://www.aqenterprises.in | Same (www) |
| Email | mohammedtalha204@gmail.com until a domain mailbox exists | Optional on GBP; do not invent info@ |

**Conflict to resolve:** the Phase 9 brief listed address as “Mallapur, Hyderabad” only. The website already has a longer Mallapur / Chanakyapuri Colony / FCI Godown Road / 500076 string. Confirm one official address and use **that same string** on GBP, invoices, and the website. Do not publish two different addresses.

## 8. Photos (upload to GBP and send copies for the website)

Priority GBP photos:

1. Logo (existing `/assets/aq-logo.png` or a cleaner version)
2. Cover: Mallapur exterior or a real install (not stock)
3. Team / installers (consent)
4. Real camera mounts, NVR racks, cabling
5. At least one photo per major service you list

See [CLIENT_ASSETS_REQUIRED.md](./CLIENT_ASSETS_REQUIRED.md) for filenames the website expects.

## 9. Review strategy (honest)

- Ask **real** customers after handover to leave a Google review.
- Never buy reviews, never write them yourself, never display fake stars on the website.
- Three draft handover quotes in the codebase stay unpublished until you confirm names + permission.
- When a Google review exists and the customer agrees, send us: reviewer name as shown, text, date, and the public review URL. We can then mark it `verified` + `published` (rating only if it is the real Google score).

## 10. Website URL and tracking

- Website: `https://www.aqenterprises.in`
- After go-live: add the GBP URL into `SOCIAL_PROFILES.googleBusinessProfile` in `src/lib/business.ts` and set `status: 'verified'` **only** when the listing is actually yours and live.
- Optional: Search Console + GBP insights. Measurement notes live in `docs/PHASE8_PRODUCTION_MEASUREMENT.md`.

## 11. What we will not do in code

- Invent a GBP URL
- Claim “Google-verified” or “5-star rated”
- Add fake map coordinates
- Create extra location entities for service areas
