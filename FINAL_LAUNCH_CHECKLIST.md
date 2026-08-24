# Final Launch Checklist — AQ Enterprises

Production host: **https://www.aqenterprises.in**

Use this before / during go-live. Do not invent missing business facts.

---

## A. Technical

- [ ] Production deploy from `main` (includes Phase 9 + Phase 10 fixes)
- [ ] `npm run build` passes in CI / locally
- [ ] HTTPS certificate valid on www
- [ ] Apex `aqenterprises.in` redirects to `https://www.aqenterprises.in`
- [ ] HTTP redirects to HTTPS (host/CDN)
- [ ] Trailing-slash behavior consistent (site uses no trailing slash)
- [ ] `/robots.txt` reachable
- [ ] `/sitemap.xml` reachable
- [ ] Custom `/not-found` (404) branded page loads for bad URLs
- [ ] No localhost / staging URLs in public HTML or canonicals

## B. Environment variables (host)

- [ ] `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` set
- [ ] `LEAD_DESTINATION_EMAIL` set to monitored inbox
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` set **or** intentionally left empty
- [ ] Secrets not committed to git (`.env*` ignored; only `.env.example` tracked)
- [ ] Rotate any credentials that were ever shared in chat/screenshots

## C. SEO

- [ ] Preferred host is www in Search Console / DNS
- [ ] Sample titles do **not** show double `| AQ Enterprises`
- [ ] Spot-check canonicals on home, 1 service, 1 location, 1 S×L, 1 project, 1 blog
- [ ] Sitemap submitted in Google Search Console (owner action)
- [ ] No accidental `noindex` on published commercial pages

## D. Analytics & conversion

- [ ] GA4 Realtime shows pageviews after deploy (if ID configured)
- [ ] Test events (no real customer PII): quote open/submit, phone, WhatsApp, email
- [ ] Lead email arrives with UTM / landing / referrer fields when present
- [ ] Form honeypot not visible to users
- [ ] Form success and SMTP-failure messaging both verified with test data

## E. Security

- [ ] SMTP credentials only in host env
- [ ] No secrets in client bundles (GA ID is public by design)
- [ ] Lead action does not console-log phone/name/email
- [ ] Rate limiting noted: in-memory only (acceptable MVP; upgrade later if abused)

## F. Accessibility & mobile

- [ ] Header / floating CTA usable on 375px and 768px
- [ ] Form labels / errors announced
- [ ] Primary buttons large enough for touch
- [ ] No obvious horizontal overflow on key templates

## G. Business information (client)

- [ ] Confirm phone (`CLIENT_INFORMATION_CONFIRMATION.md`)
- [ ] Confirm email
- [ ] Confirm address string (brief vs long Mallapur string conflict)
- [ ] Confirm hours / Sunday
- [ ] Provide GBP public URL when ready
- [ ] Provide real photos per `CLIENT_ASSETS_REQUIRED.md`
- [ ] Confirm or withhold pending testimonials

## H. Google Search Console (owner)

- [ ] Verify property for `https://www.aqenterprises.in`
- [ ] Submit `https://www.aqenterprises.in/sitemap.xml`
- [ ] Inspect homepage + top service URLs
- [ ] Monitor Coverage / Experience / Manual actions after launch
- [ ] Do **not** claim verification until completed

## I. Google Business Profile (owner)

- [ ] Follow `CLIENT_GBP_CHECKLIST.md`
- [ ] NAP matches website after confirmation
- [ ] Website field = `https://www.aqenterprises.in`
- [ ] Photos / services / areas filled honestly
- [ ] Do **not** claim GBP verification from the website

## J. Backup & rollback

- [ ] Know how to redeploy previous build
- [ ] Git tag or note of production commit SHA
- [ ] SMTP provider account recovery path documented privately

## K. Monitoring (first 14 days)

- [ ] Lead emails arrive daily check
- [ ] GA4 / GSC anomalies
- [ ] 404 spikes in host logs or GSC
- [ ] WhatsApp / phone reachability

---

## Post-launch mode

**MEASURE → ANALYZE → IMPROVE**

Do not add P2/P3 SEO pages until Search Console, GA4, and lead data justify them.
