# Owner dashboard, catalogue and enquiry cart

The owner dashboard is `/admin`. Public pages are `/products`, `/products/[slug]`, `/cart` and `/checkout`.

## Vercel + Neon setup

1. In Neon, create a PostgreSQL database and copy its **pooled connection string**. Keep its SSL connection parameters (normally `sslmode=require`). Use a separate Neon branch/database for previews and testing.
2. Put the connection string in `DATABASE_URL` in `.env.local` for local setup and in Vercel's server environment variables for the desired deployment. Never commit it or use a `NEXT_PUBLIC_` prefix.
3. Run `npm run db:setup` locally with that connection configured. It creates the tables in `scripts/admin-schema.sql` without deleting existing data. Run it before the first deployment/build that uses the database. SQL can also be executed through Neon's SQL editor.
4. Choose a private owner login email and set `ADMIN_EMAIL`. Run `npm run admin:password`, enter a unique password of at least 12 characters, and copy the resulting **salted hash** into `ADMIN_PASSWORD_HASH`. Set both variables in Vercel. There is no default password and no public registration.
5. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `LEAD_DESTINATION_EMAIL` for email notifications. Changing the public contact email in the dashboard does **not** change the private lead recipient. This prevents a public content edit from unexpectedly rerouting customer information.
6. Deploy/redeploy to Vercel after setting environment variables. Visit `/admin` and log in. Add your actual products, packages, combo offers, prices and terms; publish entries when ready.
7. Submit a test enquiry on the deployed site and check both **Admin → Enquiries** and the destination inbox. Verify the Google Maps and WhatsApp links on your actual domain as well.

The application is compatible with PostgreSQL/Neon through `pg`; it does not save business data to Vercel's temporary filesystem. A configured database with missing tables is an error, rather than silently discarding admin changes. Without `DATABASE_URL`, existing content remains readable and the dashboard is disabled.

## Owner controls

- **Products:** add, edit, publish, archive or delete products, packages and combo offers. Prices are in INR. Empty prices mean quotation required. Offer prices cannot exceed the regular price.
- **Blogs:** manage title, summary, author, categories, featured image, article body and search appearance. The body supports the website's existing plain-text markup (`##` headings, lists and internal links); it does not execute arbitrary HTML.
- **Services:** edit all existing structured sections, FAQs, images and search metadata, or add a new service. Expand the section panels to edit their fields. Related service links, service-area intersections and the sitemap respect publication/deletion. Existing URL slugs remain fixed to avoid accidentally breaking indexed URLs.
- **Internet plans:** manage plan titles, bandwidth descriptions, features, pricing, billing text and featured status. Initial plans use neutral survey/quotation wording rather than unverified carrier SLA guarantees. Other existing commercial-page marketing copy is not an unrestricted page builder.
- **Homepage hero:** edit text and choose the existing 3D scene, a replacement image or a hosted video with a poster image.
- **Media library:** replace or hide existing image assets and the About hero video. Select an original asset path, supply the replacement URL and alternative text, then save. Delete the override to restore the original. Product/blog/service images can also be changed in their editors.
- **Contact:** update phone, displayed number, email, address, Maps/Justdial links and opening hours. Header, footer, WhatsApp, contact page, service CTAs and business structured data use the saved values.
- **Enquiries:** view the latest 200 customer requests and their email status, or delete an enquiry. Customer details are visible only after owner authentication. There are no fabricated customer orders/products seeded into production.

A single owner account is supported. Sessions expire after eight hours; logging out revokes the session. Changing the password hash invalidates existing sessions. Sessions use HttpOnly, SameSite Strict cookies and Secure cookies on HTTPS. API writes require authentication and a matching browser origin. Login and lead throttling are stored in PostgreSQL and work across Vercel instances. Concurrent saves use revisions: reload an entry if another browser has changed it.

## Cart and delivery behavior

The cart stores only product IDs and quantities in browser local storage. It survives reloads and synchronizes between tabs. If storage is blocked, it stays in memory for the current tab. Checkout pre-fills a read-only selection summary; the customer supplies their name, phone, site address, optional email and additional requirements.

The server validates products against the current published catalogue and constructs the names/prices itself. Deleted or draft items cannot be submitted. The cart is limited to 40 distinct products and 99 units each. Checkout is an **enquiry**, not payment processing; final installation scope, taxes, delivery and availability are confirmed in the quotation.

With Neon configured, enquiries are saved before email delivery. An email failure leaves the request visible in the dashboard with `failed` status. The existing forms use the same durable delivery flow. SMTP remains necessary for inbox notifications. There is currently no automatic email retry worker or resend button: follow up from the dashboard when a notification fails. A stable submission ID prevents duplicate requests on retries from the checkout/contact form.

## Media and free storage

Small JPEG/PNG/WebP uploads are stored as database bytes and served from `/api/media/[id]`. Each image is limited to **2 MB**, with a **50 MB total upload budget** to leave room for content and enquiries. Referenced uploads cannot be deleted until their saved content references are removed. Original repository assets remain in `public`.

Use HTTPS URLs from a suitable media host for videos or larger images; videos are not uploaded into Neon. External media URLs are rendered directly rather than fetched by the server image optimizer. Keep originals and backups of your files. The dashboard is not an image compressor or video transcoder.

Free Vercel/Neon quotas and eligibility depend on the providers' current terms. Monitor their dashboards for storage, transfer, compute and function usage. Public pages now render on the server so saved edits appear without a rebuild. The React request cache deduplicates content/settings reads within a request. This is not a full visual page builder: general page layout, projects and location copy remain code-managed.

## Validation

Routine checks: `npx tsc --noEmit`, `npm run lint`, `npm run validate:content`, `npm run build`.

Browser integration tests require a **disposable PostgreSQL database ending in `_test`**. Tests clear the application's tables in that database. Never use your production database.

```bash
npm run build
# Set TEST_DATABASE_URL securely to a disposable database (for example a Neon test branch).
npx playwright install chromium
npm run test:admin
```

`TEST_DATABASE_URL` must already be in the process environment. If using a system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. The suite starts a local production server on port 3010, creates the schema, uses test-only credentials and covers authentication, origin protection, validation, stale writes, owner form publishing, cart/checkout, content settings, media, responsive widths and logout/login throttling. Actual Vercel/Neon connectivity and SMTP inbox delivery still need the deployment smoke test in step 7.
