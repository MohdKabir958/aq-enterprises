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

Never commit `.env.local`. Production NAP lives in `src/lib/business.ts` (confirmation pending for phone/email/hours).

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
