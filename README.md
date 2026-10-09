# AQ Enterprises website (`aq-nextjs`)

Next.js App Router site for AQ Enterprises — CCTV & security, Hyderabad.

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill SMTP_* and optional NEXT_PUBLIC_GA_MEASUREMENT_ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

See `.env.example`:

| Variable | Purpose |
|----------|---------|
| `SMTP_*` / `LEAD_DESTINATION_EMAIL` | Lead form email delivery |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 (site works without it) |

Never commit `.env.local`. Public business details start in `src/lib/business.ts` and can be updated through the owner dashboard. The owner confirmed the public email `aqenterprises204@gmail.com`.

## Production notes

- Preferred host: `https://www.aqenterprises.in`
- Owner checklist: `docs/PHASE8_PRODUCTION_MEASUREMENT.md`
- Client assets: `CLIENT_ASSETS_REQUIRED.md`

## Scripts

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Owner dashboard and enquiry catalogue

The website includes a protected `/admin` dashboard, `/products` catalogue, cart and enquiry checkout. Content and customer enquiries use Neon PostgreSQL; configure owner credentials and SMTP before deployment. See [Admin and Neon setup](docs/admin-and-neon-setup.md) for setup, media limits and validation instructions.

The dashboard also manages lead stages, follow-ups, notification retries, case studies, verified reviews and FAQs. Customers can request visits at `/site-survey`, supply service-specific requirements and share their cart on WhatsApp. Reports combine anonymous website activity with actual enquiry records and owner-marked outcomes. The production prebuild applies additive database setup automatically when `DATABASE_URL` is configured; `npm run db:setup` can also run it manually.

## Photography and navigation

Service cards and blog articles have relevant illustrations, with owner-selected images taking precedence. Generated images live in [`public/images/illustrations`](public/images/illustrations/README.md); they illustrate service applications and are not evidence of completed installations. Replace them through Admin → Media library or the individual service/blog editor.

The header links to Internet services. A floating basket above WhatsApp opens the cart and displays the current item quantity on desktop and mobile. About → How to reach us shows published contact details, the owner-provided directions link, and an interactive address map loaded on request.
