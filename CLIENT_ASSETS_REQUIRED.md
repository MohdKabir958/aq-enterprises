# Client assets required — AQ Enterprises website

This list is what the business must supply before the site can look like a fully evidenced Hyderabad CCTV company. **Do not send stock photos, AI-generated “installs,” or other people’s work.**

Single source of truth for name, phone, email, address, and hours: `src/lib/business.ts`.

Related checklists:

- [CLIENT_INFORMATION_CONFIRMATION.md](./CLIENT_INFORMATION_CONFIRMATION.md) — facts to confirm in writing
- [CLIENT_GBP_CHECKLIST.md](./CLIENT_GBP_CHECKLIST.md) — Google Business Profile setup

---

## How to send files

1. Use the **exact filenames** below (`.webp` preferred; `.jpg` / `.png` also work if you tell us).
2. No faces of customers, children, patients, or readable number plates unless you have written permission.
3. No confidential screens, till contents, or clinical records.
4. We will wire each file with `next/image` (width, height, ALT, `sizes`, lazy-load except heroes) once it exists under `/public/images/…`. Empty folders today are intentional.

---

## P0 — Must have (trust + NAP)

### Business identity (confirm in writing)

- [ ] Official phone — currently `+91 78159 15792` (pending)
- [ ] Official email — currently `mohammedtalha204@gmail.com` (pending). Provide a domain mailbox when you have one; **do not ask us to guess** `info@aqenterprises.in`
- [ ] Exact official address — see confirmation file (longer Mallapur string is on the site today)
- [ ] Hours — currently Monday–Saturday 09:00–19:00; confirm Sunday
- [ ] Google Business Profile **public URL** (do not invent one)
- [ ] Website URL confirm — `https://www.aqenterprises.in`

### Company photographs → `/public/images/company/`

| Filename | What to shoot | Suggested ALT |
| --- | --- | --- |
| `office-exterior.webp` | Mallapur office / workshop / storefront from the street | AQ Enterprises office or workshop exterior in Mallapur, Hyderabad |
| `office-interior.webp` | Reception, counter, or workshop interior | Interior of the AQ Enterprises Mallapur office or workshop |
| `installation-team.webp` | Team on a real job (consent) | AQ Enterprises installation team at a Hyderabad CCTV job |

### Team photographs → `/public/images/team/` (consent required)

| Filename | What to shoot | Suggested ALT |
| --- | --- | --- |
| `lead.webp` | Founder or installation lead, with approved name + role | AQ Enterprises founder or installation lead (name as confirmed) |
| `technicians.webp` | Installation technicians, group or on-site | AQ Enterprises CCTV installation technicians |

### Real CCTV installations (minimum)

At least **one** complete set from the project table below (exterior + camera mount + NVR/rack + overview) so the homepage and a case study can show real work.

---

## P1 — Project, equipment, and conversion photos

### All 8 published project pages

Place files in `/public/images/projects/{project-id}/`.

Shared shot list per project (1600×1067 or similar landscape):

| Filename | Shot | Notes |
| --- | --- | --- |
| `exterior.webp` | Approach / gate / shopfront / campus entry | Privacy-safe |
| `camera-mount.webp` | Close-up of a real camera mount | Weather housing visible if outdoor |
| `nvr-rack.webp` | Recorder / rack / labelled cabling | No customer data on screens |
| `overview.webp` | One working coverage view after handover | Used as the case-study hero when present |

#### 1. `villa-banjara` — Residential Villa, Banjara Hills

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Approach to a residential villa CCTV installation in Banjara Hills, Hyderabad — compound and gate, no faces or number plates | Villa approach and compound edge after install. Privacy-safe framing only. |
| `camera-mount.webp` | Outdoor CCTV camera mount at a villa gate or porch in Banjara Hills, Hyderabad | Close-up of a weather-safe outdoor mount at the gate or porch. |
| `nvr-rack.webp` | NVR or DVR recorder installed for a Banjara Hills villa CCTV system | Indoor recorder / rack location used for this villa system. |
| `overview.webp` | Installed villa CCTV coverage of a driveway or garden in Banjara Hills, Hyderabad | One working outdoor view after handover — no identifiable people. |

Current on-site state: **placeholder only** (no photograph on disk).

#### 2. `factory-nacharam` — Manufacturing Unit, Nacharam

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Factory gate and yard at a Nacharam, Hyderabad manufacturing CCTV installation | Industrial approach / material gate after install. No confidential process close-ups. |
| `camera-mount.webp` | High-mount industrial CCTV camera at a Nacharam factory in Hyderabad | Durable outdoor or high indoor mount used on the production or yard edge. |
| `nvr-rack.webp` | NVR rack in a security or control room at a Nacharam factory CCTV install | Recorder rack and labelled cabling in the plant security room. |
| `overview.webp` | Factory floor or yard CCTV coverage at a Nacharam manufacturing unit, Hyderabad | Wide operational view showing coverage intent — no secret processes or faces. |

Current on-site state: **placeholder only**.

#### 3. `retail-ameerpet` — Retail Chain, Ameerpet & Kukatpally

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Retail shopfront CCTV installation in Ameerpet or Kukatpally, Hyderabad | Shopfront or shutter line after install. No customer faces or till contents. |
| `camera-mount.webp` | Indoor dome or turret camera covering a retail counter in Hyderabad | Counter or aisle camera mount used in the multi-outlet rollout. |
| `nvr-rack.webp` | Recorder and switch for a Hyderabad retail CCTV outlet | Back-office recorder placement for one of the six outlets. |
| `overview.webp` | Sales floor CCTV coverage in a Hyderabad retail outlet after installation | Wide floor view showing counter-to-shutter coverage intent. |

Current on-site state: **placeholder only**. Confirm the six-outlet story before using photos publicly.

#### 4. `apartment-gachibowli` — Lakeview Apartments, Gachibowli

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Apartment society gate CCTV installation in Gachibowli, Hyderabad | Common-area gate or podium approach. No resident faces or flat interiors. |
| `camera-mount.webp` | Lobby or parking CCTV camera mount at a Gachibowli apartment complex | Approved common-area mount in lobby, lift lobby, or parking. |
| `nvr-rack.webp` | Society NVR room or rack at Lakeview Apartments, Gachibowli | Association recorder room with labelled camera channels. |
| `overview.webp` | Apartment parking or lobby CCTV coverage in Gachibowli, Hyderabad | Common-area overview after handover — no private dwellings. |

Current on-site state: **placeholder only**. Confirm the society name may be published.

#### 5. `school-kompally` — Greenfield Public School, Kompally

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | School campus gate CCTV installation in Kompally, Hyderabad | Campus gate or drop-off edge. **No children in frame.** |
| `camera-mount.webp` | Corridor or gate CCTV camera mount at a Kompally school campus | Corridor or perimeter mount used for campus coverage. |
| `nvr-rack.webp` | School admin NVR rack for a Kompally campus CCTV system | Admin or security-office recorder with restricted access. |
| `overview.webp` | School campus CCTV coverage in Kompally, Hyderabad — no students visible | Empty corridor, gate, or playground edge after hours. Never photograph minors. |

Current on-site state: **placeholder only**. Confirm the school name may be published.

#### 6. `office-hitech` — Tech Park Office Tower, Hitech City

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Tech park office tower CCTV installation in Hitech City, Hyderabad | Office floor or tower approach after install. Follow landlord photo rules. |
| `camera-mount.webp` | Office lobby or floor CCTV camera mount in Hitech City, Hyderabad | Lobby, lift bank, or floor corridor mount. |
| `nvr-rack.webp` | Office NVR and network rack for a Hitech City CCTV installation | Server / IDF rack showing recorder and PoE switch, labels visible. |
| `overview.webp` | Office floor CCTV coverage at a Hitech City tech park, Hyderabad | Workplace overview after install — no screens with confidential data. |

Current on-site state: **placeholder only**.

#### 7. `warehouse-uppal` — Cold Storage Warehouse, Uppal

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Cold storage warehouse exterior CCTV installation in Uppal, Hyderabad | Dock or yard approach after install. No number plates or faces. |
| `camera-mount.webp` | Dock or aisle CCTV camera mount at an Uppal warehouse | High dock or racking-aisle mount used for warehouse coverage. |
| `nvr-rack.webp` | Warehouse NVR rack at a cold storage facility in Uppal, Hyderabad | Recorder placement in a dry, accessible plant room. |
| `overview.webp` | Warehouse dock or aisle CCTV coverage in Uppal, Hyderabad | Wide dock or aisle view showing coverage intent. |

Current on-site state: **placeholder only**.

#### 8. `hospital-jubilee` — City Care Hospital, Jubilee Hills

| File | Suggested ALT | Caption |
| --- | --- | --- |
| `exterior.webp` | Hospital entry CCTV installation in Jubilee Hills, Hyderabad | Public entry or ambulance approach. **No patients, charts, or clinical rooms.** |
| `camera-mount.webp` | Hospital corridor CCTV camera mount in Jubilee Hills, Hyderabad | Corridor or reception mount in a non-clinical public zone. |
| `nvr-rack.webp` | Hospital security NVR rack in Jubilee Hills, Hyderabad | Security-office recorder. No patient data on screens. |
| `overview.webp` | Hospital public-area CCTV coverage in Jubilee Hills, Hyderabad | Empty public corridor or entry after hours — never photograph patients. |

Current on-site state: **placeholder only**. Confirm the hospital name may be published.

### Other P1 equipment photos → `/public/images/services/` (optional but useful)

Suggested filenames (use real Hyderabad installs only):

- `cctv-camera-install.webp`
- `nvr-dvr-rack.webp`
- `cabling.webp`
- `access-control.webp`
- `biometric.webp`
- `video-door-phone.webp`
- `fire-alarm.webp`

---

## P2 — Optional

- [ ] Brand / product photos → `/public/images/brands/` (only if you actually supply that brand)
- [ ] Additional site videos (workshop, install walkthrough) — no fake testimonials on audio
- [ ] Dealer / partner / installer certificates (PDF or photo of the real certificate)
- [ ] Dedicated favicon / app icon set if you want something other than the existing logo
- [ ] 1200×630 Open Graph image (currently the logo is reused)

---

## Reviews

Three **draft** handover quotes exist in code (villa / factory / retail). They are **not published**.

To publish a review we need **all** of:

- [ ] Permission from the named person (or permission to use initials / company only)
- [ ] Confirmation the quote is accurate
- [ ] Source (Google Business Profile, written email, handover form)
- [ ] Optional: star rating **only** if it is a real platform rating
- [ ] Optional: public URL of the Google review

Do not send us invented five-star copy.

---

## Marketing claims that stay off the site until proved

`500+` installs, `8+` years, `12,000+` cameras, `18` technicians, `50+` areas, `24/7` monitoring, authorized dealer / official partner / certified installer, ISO, “within the hour,” same-day SLA, fixed package prices, fake branch offices.

---

## Handover order

1. Confirm P0 NAP in writing ([CLIENT_INFORMATION_CONFIRMATION.md](./CLIENT_INFORMATION_CONFIRMATION.md)).
2. Upload P0 company/team photos and at least one real project set.
3. Complete GBP using [CLIENT_GBP_CHECKLIST.md](./CLIENT_GBP_CHECKLIST.md) and send the public URL.
4. Mark which reviews may be published.
5. Attach only real certificates.

Until then, the live site uses `src/lib/business.ts` and labeled photo slots — not fabricated trust signals.
