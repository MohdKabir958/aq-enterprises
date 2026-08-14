# Client information confirmation — AQ Enterprises

Please reply in writing (email is enough) with **Confirm / Change to: … / Do not publish** for each row. Until you answer, the website keeps the current values and marks them **pending**. We will not silently replace them with guessed “more official” details.

Code source of truth: `src/lib/business.ts`.

---

## A. NAP (name, address, phone)

| # | Field | Currently on the website | Status | Your answer |
| --- | --- | --- | --- | --- |
| A1 | Business name | AQ Enterprises | Used everywhere | Confirm / Change to: |
| A2 | Phone (E.164) | +917815915792 | Pending | Confirm as official business line / Change to: |
| A3 | Phone (display) | +91 78159 15792 | Pending | Confirm / Change to: |
| A4 | WhatsApp | https://wa.me/917815915792 (same number) | Pending | Confirm this WhatsApp is the business chat / Different number: |
| A5 | Email | mohammedtalha204@gmail.com | Pending | Confirm for now / Official domain email when ready: |
| A6 | Address | Mallapur, Chanakyapuri Colony, Masjid-e-Ashraf, FCI Godown Road, Hyderabad, Telangana 500076 | Pending — **see conflict below** | Confirm this full string / Replace with exact official address: |
| A7 | Hours | Monday–Saturday 09:00–19:00 | Pending | Confirm / Change to: |
| A8 | Sunday | Not listed as open | Pending | Closed / Open (hours): |
| A9 | Website | https://www.aqenterprises.in | Preferred www host | Confirm |

### Address conflict (do not guess)

- Project brief for this phase listed: **Mallapur, Hyderabad**
- Existing website SSOT listed the **longer** Mallapur / Chanakyapuri Colony / Masjid-e-Ashraf / FCI Godown Road / 500076 string

We **kept the longer existing string** and did not invent a shorter or different address. Tell us which one is the official address for invoices, GST, and Google Business Profile. GBP, the website, and letterhead must match.

### Email rule

Do not ask us to publish `info@aqenterprises.in` (or similar) unless that mailbox exists and you monitor it.

---

## B. Google Business Profile & social

| # | Field | Currently | Your answer |
| --- | --- | --- | --- |
| B1 | GBP public URL | **None — not invented** | Paste URL when the listing is live: |
| B2 | Facebook | None | URL or “do not publish” |
| B3 | Instagram | None | URL or “do not publish” |
| B4 | LinkedIn | None | URL or “do not publish” |
| B5 | YouTube | None | URL or “do not publish” |

GBP setup steps: [CLIENT_GBP_CHECKLIST.md](./CLIENT_GBP_CHECKLIST.md).

---

## C. Photographs

See [CLIENT_ASSETS_REQUIRED.md](./CLIENT_ASSETS_REQUIRED.md). Minimum to confirm:

| # | Asset | Your answer |
| --- | --- | --- |
| C1 | Mallapur office / workshop photos | Will send / Do not have a public-facing office |
| C2 | Team photos + consent | Will send names/roles / Do not publish people |
| C3 | Real install photos for the 8 case studies | Will send per project / Some projects cannot be shown |

---

## D. Project records (already on the site — confirm accuracy)

These eight case studies are published from the existing project list. Confirm each row or tell us to unpublish / rename.

| ID | Name on site | Cameras | Brand | Duration | Confirm name may be public? |
| --- | --- | --- | --- | --- | --- |
| villa-banjara | Residential Villa, Banjara Hills | 8 | Hikvision | 2 Days | Yes / Anonymise / Remove |
| factory-nacharam | Manufacturing Unit, Nacharam | 32 | Dahua | 6 Days | Yes / Anonymise / Remove |
| retail-ameerpet | Retail Chain, 6 Outlets (Ameerpet & Kukatpally) | 48 | CP Plus | 9 Days | Yes / Anonymise / Remove |
| apartment-gachibowli | Lakeview Apartments, Gachibowli | 22 | Uniview | 4 Days | Yes / Anonymise / Remove |
| school-kompally | Greenfield Public School, Kompally | 40 | Hikvision | 7 Days | Yes / Anonymise / Remove |
| office-hitech | Tech Park Office Tower, Hitech City | 60 | Bosch | 10 Days | Yes / Anonymise / Remove |
| warehouse-uppal | Cold Storage Warehouse, Uppal | 28 | Dahua | 5 Days | Yes / Anonymise / Remove |
| hospital-jubilee | City Care Hospital, Jubilee Hills | 35 | Honeywell | 6 Days | Yes / Anonymise / Remove |

If any camera count, brand, duration, or client name is wrong, send the correction. We will not invent replacements.

---

## E. Testimonials (draft only — not on the live site)

| Name on draft | Linked project | Publish? |
| --- | --- | --- |
| Priya Nair, Villa Owner, Banjara Hills | villa-banjara | Permission + accuracy confirmed / Do not use |
| Ravi Kumar, Factory Owner, Nacharam | factory-nacharam | Permission + accuracy confirmed / Do not use |
| Arjun Mehta, Retail Operations Manager | retail-ameerpet | Permission + accuracy confirmed / Do not use |

Star ratings are added **only** if the quote is a real Google (or similar) review with a URL.

---

## F. Brands and dealer claims

Public wording today: **commonly install and support** Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, Panasonic.

| Claim | Currently | Your answer |
| --- | --- | --- |
| Authorized dealer | **Not claimed** | Names + certificate files, or leave unpublished |
| Official partner | **Not claimed** | Same |
| Certified installer | **Not claimed** | Same |
| ISO or other certs | **Not listed** | Send the certificate or leave unpublished |

---

## G. Warranty

Public wording today (no durations):

> Warranty terms depend on the selected equipment and installation package. Hardware typically carries the applicable manufacturer warranty shown on your invoice. Workmanship cover for the installation is confirmed in your quotation and handover notes.

| # | Question | Your answer |
| --- | --- | --- |
| G1 | Is that sentence accurate? | Yes / Replace with your approved paragraph (still no invented years unless documented) |
| G2 | Workmanship duration for quotes | Tell us what you actually write on quotations — we still will not put a fake number on marketing pages unless you confirm it |

---

## H. Claims that stay off the site

Do not ask us to restore these unless you can prove them:

- 500+ / 100+ customers or installs
- 8+ years, founding year
- 12,000+ cameras, 18 technicians, 50+ cities
- 24/7 monitoring or support
- Licensed installer (unless you send the licence)
- Same-day or “within one hour” response SLA
- Fake branches in neighbourhoods

---

## I. How we apply your answers

After you reply, we update **only** `src/lib/business.ts` (and GBP `sameAs` when you send a real URL). Header, footer, contact, schema, tel/WhatsApp/mailto, and metadata all read from that file.
