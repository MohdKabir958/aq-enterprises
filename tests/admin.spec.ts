import { test, expect, type Page } from '@playwright/test';
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
import { newProject, newReview, newFaq } from '../src/lib/cms/editor-defaults';
import { indiaToday } from '../src/lib/leads/requirements';
const base = 'http://127.0.0.1:3010';
const product = {
  id: 'test-camera-kit',
  slug: 'test-camera-kit',
  name: 'Test camera kit',
  status: 'published',
  kind: 'combo',
  description: 'Test fixture used only in a disposable database.',
  price: 10000,
  offerPrice: 9000,
  image: '',
  imageAlt: '',
  features: ['Fixture feature'],
};
async function login(page: Page) {
  await page.goto('/admin');
  await page.getByLabel('Email', { exact: true }).fill('owner@example.test');
  await page
    .getByLabel('Password', { exact: true })
    .fill('Test-password-only-123');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Manage your website' }),
  ).toBeVisible();
}
async function save(
  page: Page,
  collection: string,
  key: string,
  value: unknown,
  revision = 0,
  deleted = false,
) {
  return page.request.post(`/api/admin/${collection}`, {
    headers: { origin: base },
    data: { key, value, revision, deleted },
  });
}
test.describe.configure({ mode: 'serial' });
test.beforeEach(async () => {
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    await db.query('DELETE FROM aq_rate_limits');
  } finally {
    await db.end();
  }
});
test('service and blog photography, business email, location map and Internet navigation work across devices', async ({ page }) => {
  const assetPaths = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 1024, 1200, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/about', '/services', '/blog']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${path} at ${width}`).toBe(true);
      await expect(page.locator('.floating-basket')).toBeVisible();
      expect(await page.locator('header a[href="/cart"]').count()).toBe(0);
      if (path === '/' || path === '/services') {
        const cards = page.locator('.service-photo-grid .service-photo-card');
        expect(await cards.count()).toBeGreaterThan(0);
        expect(await cards.locator('img').count()).toBe(await cards.count());
      }
      if (path === '/blog') {
        expect(await page.locator('.blog-photo-card').count()).toBeGreaterThan(0);
        expect(await page.locator('.blog-photo-card img').count()).toBe(await page.locator('.blog-photo-card').count());
        await expect(page.locator('.blog-feature img')).toBeVisible();
      }
      for (const src of await page.locator('.service-photo-card img, .blog-photo-card img, .blog-feature img, .services-hero-photo img').evaluateAll(images => images.map(image => image.getAttribute('src') || ''))) {
        const url = new URL(src, base);
        assetPaths.add(url.searchParams.get('url') || url.pathname);
      }
    }
  }
  for (const path of assetPaths) {
    const response = await page.request.get(path);
    expect(response.ok(), path).toBe(true);
    expect(response.headers()['content-type']).toMatch(/^image\//);
  }
  await page.goto('/about');
  await expect(page.locator('.location-contact-row a[href="mailto:aqenterprises204@gmail.com"]')).toBeVisible();
  await expect(page.locator('.location-actions a').first()).toHaveAttribute('href', 'https://share.google/udMz1Wsj3KMziK1tH');
  await page.route('https://maps.google.com/**', route => route.abort());
  await page.getByRole('button', { name: 'Show interactive map', exact: true }).click();
  const map = page.locator('.location-map iframe');
  await expect(map).toBeVisible();
  expect(new URL((await map.getAttribute('src'))!).searchParams.get('q')).toContain('Mallapur');
  await expect(page.locator('footer a[href="mailto:aqenterprises204@gmail.com"]')).toHaveCount(1);
  await page.getByRole('link', { name: 'Internet', exact: true }).click();
  await expect(page).toHaveURL(/\/commercial-internet-hyderabad$/);
  await expect(page.getByRole('link', { name: 'Internet', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(errors).toEqual([]);
});
test('protects admin data, rejects cross-site writes, validates products and stale saves', async ({
  page,
  request,
}) => {
  const denied = await request.post('/api/admin/products', {
    headers: { origin: base },
    data: { key: '', value: product, revision: 0 },
  });
  expect(denied.status()).toBe(401);
  await page.goto('/admin');
  await expect(
    page.getByRole('heading', { name: 'Owner login' }),
  ).toBeVisible();
  expect(await page.getByRole('img', { name: 'AQ Enterprises logo', exact: true }).count()).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Show password', exact: true }).click();
  await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute('type', 'text');
  await page.getByRole('button', { name: 'Hide password', exact: true }).click();
  await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute('type', 'password');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  await login(page);
  const cross = await page.request.post('/api/admin/products', {
    headers: { origin: 'https://example.invalid' },
    data: { key: '', value: product, revision: 0 },
  });
  expect(cross.ok()).toBe(false);
  expect(
    (
      await save(page, 'products', '', { ...product, offerPrice: 11000 })
    ).status(),
  ).toBe(400);
  const created = await save(page, 'products', '', product);
  expect(created.ok()).toBe(true);
  expect((await created.json()).revision).toBe(1);
  expect((await save(page, 'products', '', product)).status()).toBe(409);
  expect(
    (
      await save(
        page,
        'products',
        product.slug,
        { ...product, name: 'Updated test kit' },
        1,
      )
    ).ok(),
  ).toBe(true);
  expect(
    (await save(page, 'products', product.slug, product, 1)).status(),
  ).toBe(409);
  expect((await save(page, 'products', product.slug, product, 2)).ok()).toBe(
    true,
  );
  await page.goto('/products');
  await expect(page.getByRole('heading', { name: product.name })).toBeVisible();
  const cookies = await page.context().cookies();
  const session = cookies.find((c) => c.name === 'aq_admin_session');
  expect(session?.httpOnly).toBe(true);
  expect(session?.sameSite).toBe('Strict');
});
test('owner can create products using the dashboard form and publish without a rebuild', async ({
  page,
}) => {
  await login(page);
  await page.getByRole('button', { name: 'Add new', exact: true }).click();
  await page.getByLabel('URL slug', { exact: true }).fill('owner-form-kit');
  await page.getByLabel('Name', { exact: true }).fill('Owner form kit');
  await page
    .getByLabel('Description', { exact: true })
    .fill('Created through the owner form in the test database.');
  await page.getByLabel('Status', { exact: true }).selectOption('published');
  await page
    .getByLabel('Price in ₹ (leave empty for quotation)', { exact: true })
    .fill('5000');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await page.goto('/products');
  await expect(
    page.getByRole('heading', { name: 'Owner form kit' }),
  ).toBeVisible();
});
test('cart persists, fills checkout and saves canonical items when email is unconfigured', async ({
  page,
}) => {
  await page.goto('/products/test-camera-kit');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('.floating-basket-count')).toHaveText('1');
  await page.getByRole('link', { name: 'View cart, 1 item', exact: true }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await page.getByLabel('Quantity for Test camera kit').fill('2');
  await expect(page.locator('.floating-basket-count')).toHaveText('2');
  await page.reload();
  await expect(page.getByLabel('Quantity for Test camera kit')).toHaveValue(
    '2',
  );
  await page.getByRole('link', { name: 'Proceed to checkout' }).click();
  await expect(page.getByLabel('Selected products')).toHaveValue(
    /Test camera kit × 2/,
  );
  await page.getByLabel('Full name', { exact: true }).fill('Test Customer');
  await page.getByLabel('Phone number', { exact: true }).fill('9876543210');
  await page
    .getByLabel('Site address / Hyderabad locality')
    .fill('Test location Hyderabad');
  await page
    .getByLabel('Additional requirements (optional)')
    .fill('Test enquiry.');
  await page.getByRole('button', { name: 'Send quotation request' }).click();
  await expect(
    page.getByRole('heading', { name: 'Quotation request received' }),
  ).toBeVisible();
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    const result = await db.query(
      'SELECT payload,email_status FROM aq_enquiries',
    );
    expect(result.rowCount).toBe(1);
    expect(result.rows[0].payload.orderItems).toEqual([
      { id: product.id, name: product.name, quantity: 2, unitPrice: 9000 },
    ]);
    expect(result.rows[0].email_status).toBe('failed');
  } finally {
    await db.end();
  }
  await page.goto('/cart');
  await expect(
    page.getByRole('heading', { name: 'Your cart is empty' }),
  ).toBeVisible();
  await login(page);
  await page.getByRole('button', { name: 'enquiries', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Test Customer · 9876543210' }),
  ).toBeVisible();
});
test('draft/deleted items disappear and a stale cart cannot submit them', async ({
  page,
}) => {
  await login(page);
  expect(
    (
      await save(
        page,
        'products',
        'test-camera-kit',
        { ...product, status: 'draft' },
        3,
      )
    ).ok(),
  ).toBe(true);
  await page.goto('/products/test-camera-kit');
  await expect(
    page.getByRole('heading', { name: 'This page is not available' }),
  ).toBeVisible();
  await page.evaluate(() =>
    localStorage.setItem(
      'aq_cart_v1',
      JSON.stringify([{ id: 'test-camera-kit', quantity: 1 }]),
    ),
  );
  await page.goto('/checkout');
  await expect(
    page.getByText('This item is no longer available.'),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Send quotation request' }),
  ).toHaveCount(0);
  expect(
    (await save(page, 'products', 'test-camera-kit', {}, 4, true)).ok(),
  ).toBe(true);
  const recreated = await save(page, 'products', '', {
    ...product,
    status: 'draft',
  });
  expect(recreated.ok()).toBe(true);
  expect((await recreated.json()).revision).toBe(6);
});
test('blogs, services, contact details, plans, hero and image replacements update the live site', async ({
  page,
}) => {
  await login(page);
  const blog = {
    id: 'admin-test-blog',
    slug: 'admin-test-blog',
    name: 'Admin test article',
    title: 'Admin test article',
    summary: 'Test article summary',
    body: '## Test section\n\nOwner-managed article text.',
    author: 'AQ Enterprises',
    categories: ['Testing'],
    status: 'published',
    seo: {
      title: 'Admin test article',
      description: 'Test article description',
      canonical: '',
    },
  };
  expect((await save(page, 'blogs', '', { ...blog, createdAt: 'invalid-date' })).status()).toBe(400);
  expect((await save(page, 'blogs', '', blog)).ok()).toBe(true);
  await page.goto('/blog/admin-test-blog');
  await expect(
    page.getByRole('heading', { name: 'Admin test article', exact: true }),
  ).toBeVisible();
  await page.goto('/admin');
  await page.getByRole('button', { name: 'blogs', exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('Admin test article');
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page
    .getByLabel('Featured image', { exact: true })
    .fill('/assets/aq-logo.png');
  await page
    .getByLabel('Image alternative text', { exact: true })
    .fill('Article image fixture');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await page.goto('/blog/admin-test-blog');
  await expect(
    page.getByRole('img', { name: 'Article image fixture' }),
  ).toBeVisible();
  await page.goto('/admin');
  await page.getByRole('button', { name: 'services', exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('Home CCTV');
  await page.getByRole('button', { name: 'Edit', exact: true }).first().click();
  await page
    .getByLabel('Page heading', { exact: true })
    .fill('Owner managed home CCTV');
  const editor = page.locator('form');
  await editor
    .locator('summary')
    .filter({ hasText: /^Hero$/ })
    .click();
  await editor
    .locator('summary')
    .filter({ hasText: /^Image$/ })
    .click();
  await editor
    .getByLabel('Image URL', { exact: true })
    .filter({ visible: true })
    .fill('/assets/aq-logo.png');
  await editor
    .getByLabel('Alternative text', { exact: true })
    .filter({ visible: true })
    .fill('Service hero image fixture');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await page.goto('/services/home-cctv-installation');
  await expect(
    page.getByRole('heading', { name: 'Owner managed home CCTV', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Service hero image fixture' }),
  ).toBeVisible();
  await page.goto('/admin');
  await page.getByRole('button', { name: 'contact', exact: true }).click();
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page
    .getByLabel('Phone including country code', { exact: true })
    .fill('+919876543210');
  await page
    .getByLabel('Displayed phone number', { exact: true })
    .fill('+91 98765 43210');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await page.goto('/contact');
  await expect(page.locator('footer')).toContainText('+91 98765 43210');
  expect(
    await page.locator('a[href="tel:+919876543210"]').count(),
  ).toBeGreaterThan(1);
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(schemas.join('\n')).toContain('+919876543210');
  expect(
    (
      await save(page, 'plans', '', {
        id: 'test-plan',
        slug: 'test-plan',
        name: 'Owner internet plan',
        status: 'published',
        tag: 'Test',
        speed: '50 Mbps',
        subtitle: 'Test plan',
        desc: 'Fixture only',
        highlights: ['Test feature'],
        featured: false,
        price: 1500,
        billing: 'per month',
      })
    ).ok(),
  ).toBe(true);
  await page.goto('/commercial-internet-hyderabad');
  await expect(
    page.getByRole('heading', { name: 'Owner internet plan' }),
  ).toBeVisible();
  expect(
    (
      await save(page, 'hero', 'settings', {
        eyebrow: 'Test hero',
        title: 'Owner managed hero',
        subtitle: 'Test subtitle',
        description: 'Test description',
        mediaType: 'image',
        mediaUrl: '/assets/aq-logo.png',
        mediaAlt: 'Test hero image',
        poster: '',
      })
    ).ok(),
  ).toBe(true);
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Owner managed hero' }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Test hero image' }),
  ).toBeVisible();
  const change = {
    original: '/assets/aq-logo.png',
    replacement: null,
    alt: '',
  };
  const hidden = await save(page, 'images', '', change);
  expect(hidden.ok()).toBe(true);
  const imageEntry = await hidden.json();
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Test hero image' })).toHaveCount(
    0,
  );
  expect((await save(page, 'images', imageEntry.key, {}, 1, true)).ok()).toBe(
    true,
  );
  await page.goto('/');
  await expect(
    page.getByRole('img', { name: 'Test hero image' }),
  ).toBeVisible();
  // The restored image can be changed again using its saved revision.
  expect((await save(page, 'images', '', change, 2)).ok()).toBe(true);
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Test hero image' })).toHaveCount(
    0,
  );
});
test('uploads enforce image formats, serve saved bytes and prevent deletion while referenced', async ({
  page,
}) => {
  await login(page);
  const invalid = await page.request.post('/api/admin/media', {
    headers: { origin: base },
    data: { name: 'bad.svg', base64: Buffer.from('<svg/>').toString('base64') },
  });
  expect(invalid.status()).toBe(400);
  const image = await page.screenshot();
  const upload = await page.request.post('/api/admin/media', {
    headers: { origin: base },
    data: { name: 'test.png', base64: image.toString('base64') },
  });
  expect(upload.ok()).toBe(true);
  const file = await upload.json();
  const bytes = await page.request.get(file.url);
  expect(bytes.headers()['content-type']).toBe('image/png');
  expect((await bytes.body()).equals(image)).toBe(true);
  expect(
    (
      await save(page, 'products', '', {
        ...product,
        id: 'upload-kit',
        slug: 'upload-kit',
        image: file.url,
      })
    ).ok(),
  ).toBe(true);
  const blocked = await page.request.delete('/api/admin/media', {
    headers: { origin: base },
    data: { id: file.id },
  });
  expect(blocked.status()).toBe(409);
});
test('checkout rejects a product unpublished after the checkout page was loaded', async ({
  page,
}) => {
  await login(page);
  const stale = {
    ...product,
    id: 'stale-cart-kit',
    slug: 'stale-cart-kit',
    name: 'Stale cart kit',
  };
  expect((await save(page, 'products', '', stale)).ok()).toBe(true);
  await page.evaluate(() =>
    localStorage.setItem(
      'aq_cart_v1',
      JSON.stringify([{ id: 'stale-cart-kit', quantity: 1 }]),
    ),
  );
  await page.goto('/checkout');
  await expect(page.getByLabel('Selected products')).toHaveValue(
    /Stale cart kit/,
  );
  await page.getByLabel('Full name', { exact: true }).fill('Stale Customer');
  await page.getByLabel('Phone number', { exact: true }).fill('9876543211');
  await page
    .getByLabel('Site address / Hyderabad locality')
    .fill('Hyderabad test address');
  expect(
    (
      await save(page, 'products', stale.slug, { ...stale, status: 'draft' }, 1)
    ).ok(),
  ).toBe(true);
  await page.getByRole('button', { name: 'Send quotation request' }).click();
  await expect(page.locator('main form [role="alert"]')).toContainText(
    'no longer available',
  );
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    expect(
      (
        await db.query(
          "SELECT 1 FROM aq_enquiries WHERE payload->>'name'='Stale Customer'",
        )
      ).rowCount,
    ).toBe(0);
  } finally {
    await db.end();
  }
});
test('published sitemap routes render without errors on small and large screens', async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  expect(paths.length).toBeGreaterThan(100);
  const exceptions: string[] = [];
  page.on('pageerror', (error) => exceptions.push(error.message));
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of paths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('main h1').first()).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 2,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
  expect(exceptions).toEqual([]);
});
test('new public pages and dashboard fit mobile, tablet and desktop widths', async ({
  page,
}) => {
  await login(page);
  await page.evaluate(() =>
    localStorage.setItem(
      'aq_cart_v1',
      JSON.stringify([{ id: 'owner-form-kit', quantity: 1 }]),
    ),
  );
  for (const width of [320, 390, 768, 1024, 1200, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ['/products', 'cart', 'checkout', 'admin']) {
      await page.goto(path.startsWith('/') ? path : `/${path}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 2,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
      if (width === 390 && path === 'admin')
        await page.screenshot({
          path: '/tmp/aq-admin-mobile.png',
          fullPage: true,
        });
    }
  }
});
test('admin deletions recover from network failures without losing saved records', async ({ page }) => {
  const enquiryId = randomUUID();
  const mediaId = randomUUID();
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    await db.query('INSERT INTO aq_enquiries(id,payload) VALUES($1,$2)', [
      enquiryId,
      JSON.stringify({ name: 'Deletion recovery fixture', phone: '9876543210' }),
    ]);
    await db.query('INSERT INTO aq_media(id,name,mime,bytes) VALUES($1,$2,$3,$4)', [
      mediaId, 'deletion-recovery.png', 'image/png',
      Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aOioAAAAASUVORK5CYII=', 'base64'),
    ]);
    await login(page);
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'enquiries', exact: true }).click();
    const enquiry = page.locator('article').filter({ hasText: 'Deletion recovery fixture' });
    await page.route('**/api/admin/enquiries', route => route.abort());
    await enquiry.getByRole('button', { name: 'Delete enquiry' }).click();
    await expect(page.getByRole('status')).toContainText('Unable to delete enquiry');
    await expect(enquiry.getByRole('button', { name: 'Delete enquiry' })).toBeEnabled();
    expect((await db.query('SELECT 1 FROM aq_enquiries WHERE id=$1', [enquiryId])).rowCount).toBe(1);
    await page.unroute('**/api/admin/enquiries');
    await enquiry.getByRole('button', { name: 'Delete enquiry' }).click();
    await expect(page.getByRole('status')).toContainText('Enquiry deleted.');
    await expect(enquiry).toHaveCount(0);

    await page.getByRole('button', { name: 'Media library', exact: true }).click();
    const upload = page.locator('.cms-card').filter({ has: page.getByRole('link', { name: 'deletion-recovery.png', exact: true }) });
    await page.route('**/api/admin/media', route => route.abort());
    await upload.getByRole('button', { name: 'Delete unused upload' }).click();
    await expect(page.getByRole('status')).toContainText('Unable to delete upload. Try again.');
    await expect(upload.getByRole('button', { name: 'Delete unused upload' })).toBeEnabled();
    expect((await db.query('SELECT 1 FROM aq_media WHERE id=$1', [mediaId])).rowCount).toBe(1);
    await page.unroute('**/api/admin/media');
    await upload.getByRole('button', { name: 'Delete unused upload' }).click();
    await expect(page.getByRole('status')).toContainText('Upload deleted.');
    await expect(upload).toHaveCount(0);
  } finally {
    await db.end();
  }
});
test('logout revokes the session and repeated bad logins are limited', async ({
  page,
}) => {
  await login(page);
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(
    page.getByRole('heading', { name: 'Owner login' }),
  ).toBeVisible();
  expect((await save(page, 'products', '', product)).status()).toBe(401);
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    await db.query('DELETE FROM aq_rate_limits');
  } finally {
    await db.end();
  }
  for (let i = 0; i < 6; i++) {
    const r = await page.request.post('/api/admin/login', {
      headers: { origin: base },
      data: { email: 'owner@example.test', password: 'incorrect-password' },
    });
    expect(r.status()).toBe(i < 5 ? 401 : 429);
  }
});

test('guided survey requests validate dates and persist customer preferences', async ({ page }) => {
  await page.goto('/site-survey?utm_source=google&utm_medium=organic');
  await page.getByLabel('Full name', { exact: true }).fill('Survey Customer Fixture');
  await page.getByLabel('Phone number', { exact: true }).fill('9876543212');
  await page.getByLabel('Site address / Hyderabad locality').fill('Test site address, Mallapur, Hyderabad');
  await page.getByLabel('Service needed').selectOption('networking');
  await page.getByLabel('Approximate network points').fill('12');
  await page.getByLabel('Service needed').selectOption('access-control');
  await page.getByLabel('Doors / entry points').fill('2');
  await page.getByLabel('Service needed').selectOption('cctv');
  await expect(page.getByLabel('Approximate network points')).toHaveCount(0);
  await page.getByLabel('Approximate camera count').fill('6');
  await page.getByLabel('Installation type').selectOption('new');
  await page.getByLabel('Hyderabad locality', { exact: true }).fill('Mallapur');
  await page.getByLabel('Preferred survey time').selectOption('Morning');
  await page.getByLabel('Preferred survey date').evaluate(el => el.removeAttribute('min'));
  await page.getByLabel('Preferred survey date').fill('2020-01-01');
  await page.getByRole('button', { name: 'Request site survey', exact: true }).click();
  await expect(page.locator('main form [role=alert]')).toContainText('next 90 days');
  await page.getByLabel('Preferred survey date').fill(indiaToday());
  await page.getByRole('button', { name: 'Request site survey', exact: true }).click();
  await expect(page.locator('main')).toContainText('Your survey request is received');
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    const row = (await db.query("SELECT payload,lead_status,email_status FROM aq_enquiries WHERE payload->>'name'=$1", ['Survey Customer Fixture'])).rows[0];
    expect(row.lead_status).toBe('new');
    expect(row.email_status).toBe('failed');
    expect(row.payload.formSource).toBe('site_survey');
    expect(row.payload.utmSource).toBe('google');
    expect(row.payload.requirements).toMatchObject({ service: 'cctv', cameraCount: 6, networkPoints: null, doors: null, surveyRequested: true, preferredTime: 'Morning' });
    expect(row.payload.requirementsSummary).toContain('awaiting confirmation');
  } finally { await db.end(); }
});

test('lead stages, private notes, reminders and pagination require authentication and protect revisions', async ({ page, request }) => {
  const denied = await request.post('/api/admin/leads', { headers: { origin: base }, data: { action: 'list', query: '', filter: 'all', page: 0 } });
  expect(denied.status()).toBe(401);
  await login(page);
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    const row = (await db.query("SELECT id,revision FROM aq_enquiries WHERE payload->>'name'=$1", ['Survey Customer Fixture'])).rows[0];
    const value = { ...row, lead_status: 'survey_scheduled', notes: 'Private fixture follow-up note', follow_up_at: '2020-01-01T10:00:00+05:30', appointment_at: null as string | null };
    const post = (data: unknown, origin = base) => page.request.post('/api/admin/leads', { headers: { origin }, data });
    expect((await post({ action: 'update', value }, 'https://example.invalid')).ok()).toBe(false);
    expect((await post({ action: 'update', value })).status()).toBe(400);
    value.appointment_at = `${indiaToday()}T15:00:00+05:30`;
    expect((await post({ action: 'update', value })).ok()).toBe(true);
    expect((await post({ action: 'update', value })).status()).toBe(409);
    await page.reload();
    await page.getByRole('button', { name: 'enquiries', exact: true }).click();
    await page.getByLabel('Filter enquiries').selectOption('due');
    await expect(page.locator('article').filter({ hasText: 'Survey Customer Fixture' })).toBeVisible();
    const lead = page.locator('article').filter({ hasText: 'Survey Customer Fixture' });
    await expect(lead.getByLabel('Private follow-up notes')).toHaveValue(value.notes);
    await lead.getByLabel('Lead stage').selectOption('won');
    await lead.getByRole('button', { name: 'Save lead' }).click();
    await expect(page.getByRole('status')).toContainText('Lead updated');
    await expect(lead).toHaveCount(0);
    const stored = (await db.query('SELECT lead_status,revision FROM aq_enquiries WHERE id=$1', [row.id])).rows[0];
    expect(stored).toEqual({ lead_status: 'won', revision: 3 });
    const fixtures = Array.from({ length: 25 }, (_, n) => ({ id: randomUUID(), payload: { name: `Pagination Fixture ${n}`, phone: '9876543210', propertyType: 'Office', orderItems: [] } }));
    for (const fixture of fixtures) await db.query('INSERT INTO aq_enquiries(id,payload) VALUES($1,$2)', [fixture.id, JSON.stringify(fixture.payload)]);
    const listing = await post({ action: 'list', query: 'Pagination Fixture', filter: 'all', page: 0 });
    const first = await listing.json();
    expect(first.total).toBe(25); expect(first.leads.length).toBe(20);
    const second = await (await post({ action: 'list', query: 'Pagination Fixture', filter: 'all', page: 1 })).json();
    expect(second.leads.length).toBe(5);
    expect(second.leads.some((item: { id: string }) => first.leads.some((other: { id: string }) => item.id === other.id))).toBe(false);
    await db.query("DELETE FROM aq_enquiries WHERE payload->>'name' LIKE 'Pagination Fixture %'");
  } finally { await db.end(); }
});

test('notification retries claim one attempt and retain enquiries when SMTP fails', async ({ page }) => {
  await login(page);
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    const id = (await db.query("SELECT id FROM aq_enquiries WHERE payload->>'name'=$1", ['Survey Customer Fixture'])).rows[0].id;
    await db.query("UPDATE aq_enquiries SET email_status='failed',email_attempts=1,last_email_attempt_at=now()-interval '2 minutes' WHERE id=$1", [id]);
    const retry = () => page.request.post('/api/admin/leads', { headers: { origin: base }, data: { action: 'retry_email', id } });
    const results = await Promise.all([retry(), retry()]);
    expect(results.map(r => r.status()).sort()).toEqual([200, 409]);
    const outcome = await results.find(r => r.status() === 200)!.json();
    expect(outcome.success).toBe(false); expect(outcome.message).toContain('still saved');
    expect((await db.query('SELECT email_status,email_attempts FROM aq_enquiries WHERE id=$1', [id])).rows[0]).toEqual({ email_status: 'failed', email_attempts: 2 });
    expect((await retry()).status()).toBe(409);
    await db.query("UPDATE aq_enquiries SET email_status='sent',last_email_attempt_at=now()-interval '2 minutes' WHERE id=$1", [id]);
    expect((await retry()).status()).toBe(409);
  } finally { await db.end(); }
});

test('case studies, verified reviews and scoped FAQs can be published and removed', async ({ page }) => {
  await login(page);
  const projectFixture = { ...newProject, id: 'case-study-fixture', slug: 'case-study-fixture', name: 'Case study fixture', h1: 'Case study fixture', status: 'published', category: 'Office', locationLabel: 'Mallapur', summary: 'Automated test fixture only.', overview: 'Case study overview fixture.', seo: { title: 'Case study fixture', description: 'A fixture for testing the owner editor.', canonical: '' } };
  expect((await save(page, 'projects', '', projectFixture)).status()).toBe(400);
  expect((await save(page, 'projects', '', { ...projectFixture, confirmedForPublication: true })).ok()).toBe(true);
  await page.goto('/projects/case-study-fixture');
  await expect(page.getByRole('heading', { name: 'Case study fixture', exact: true })).toBeVisible();
  await expect(page.locator('main')).toContainText('Case study overview fixture.');
  const review = { ...newReview, id: 'review-fixture', slug: 'review-fixture', name: 'Review customer fixture', status: 'published', quote: 'Review fixture; not a real customer endorsement.', source: 'Automated test fixture', projectSlug: 'case-study-fixture' };
  expect((await save(page, 'reviews', '', review)).status()).toBe(400);
  expect((await save(page, 'reviews', '', { ...review, verificationStatus: 'verified', permissionToPublish: true })).ok()).toBe(true);
  await page.goto('/');
  await expect(page.locator('main')).toContainText(review.quote);
  await page.goto('/projects/case-study-fixture');
  await expect(page.locator('main')).toContainText(review.quote);
  const faq = { ...newFaq, id: 'faq-fixture', slug: 'faq-fixture', name: 'FAQ fixture question?', question: 'FAQ fixture question?', answer: 'FAQ fixture answer.', status: 'published', relatedServices: ['home-cctv-installation'] };
  expect((await save(page, 'faqs', '', faq)).ok()).toBe(true);
  await page.goto('/');
  await page.getByRole('button', { name: faq.question, exact: true }).click();
  await expect(page.locator('main')).toContainText(faq.answer);
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schema.join('')).toContain(faq.question);
  await page.goto('/services/home-cctv-installation');
  await expect(page.locator('main')).toContainText(faq.question);
  await page.goto('/admin');
  await page.getByRole('button', { name: 'Case studies', exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('Case study fixture');
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await expect(page.getByLabel('I confirm this case study describes completed work and may be published')).toBeChecked();
  for (const [collection, key] of [['projects','case-study-fixture'], ['reviews','review-fixture'], ['faqs','faq-fixture']])
    expect((await save(page, collection, key, {}, 1, true)).ok()).toBe(true);
  expect((await page.request.get('/projects/case-study-fixture')).status()).toBe(404);
  await page.goto('/');
  await expect(page.locator('main')).not.toContainText(review.quote);
  await expect(page.getByRole('button', { name: faq.question, exact: true })).toHaveCount(0);
});

test('WhatsApp cart sharing includes selections and records anonymous activity', async ({ page }) => {
  await page.goto('/products');
  await page.evaluate(() => localStorage.setItem('aq_cart_v1', JSON.stringify([{ id: 'owner-form-kit', quantity: 2 }])));
  await page.goto('/cart');
  await page.getByLabel('Your Hyderabad locality (optional)').fill('Mallapur fixture');
  await page.getByLabel('Your requirements (optional)').fill('Installation required for an office fixture.');
  const link = page.getByRole('link', { name: 'Share cart on WhatsApp', exact: true });
  const url = new URL((await link.getAttribute('href'))!);
  expect(url.hostname).toBe('wa.me');
  const message = url.searchParams.get('text')!;
  expect(message).toContain('Owner form kit × 2'); expect(message).toContain('Mallapur fixture');
  expect(message).toContain('Installation required for an office fixture.');
  await link.evaluate(el => el.addEventListener('click', event => event.preventDefault()));
  const posted = page.waitForResponse(r => r.url().endsWith('/api/activity') && r.request().postDataJSON()?.event === 'cart_share');
  await link.click(); expect((await posted).status()).toBe(204);
  await login(page);
  const invalid = await page.request.post('/api/activity', { headers: { origin: base }, data: { event: 'page_view', path: '/admin', channel: 'Direct' } });
  expect(invalid.status()).toBe(400);
  await page.getByRole('button', { name: 'reports', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Conversion reports' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Enquiries by traffic source' }).locator('..')).toContainText('Google');
  const metric = page.locator('.report-metrics .cms-card').filter({ hasText: 'Customers marked Won' });
  await expect(metric.locator('strong')).toHaveText('1');
  await expect(page.locator('.report-metrics .cms-card').filter({ hasText: 'Cart shares' }).locator('strong')).toHaveText('1');
});

test('survey forms, lead controls and reports fit small and large devices', async ({ page }) => {
  await login(page);
  const exceptions: string[] = []; page.on('pageerror', error => exceptions.push(error.message));
  for (const width of [320,390,768,1024,1440]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/site-survey');
    await page.getByLabel('Service needed').selectOption('networking');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+2)).toBe(true);
    await page.goto('/admin');
    for (const tab of ['enquiries','reports','Case studies','reviews','FAQs']) {
      const navigation = page.getByRole('button', { name: 'Dashboard navigation', exact: true });
      if (await navigation.isVisible()) {
        await navigation.click();
        await expect(navigation).toHaveAttribute('aria-expanded', 'true');
      }
      await page.getByRole('button', { name: tab, exact: true }).click();
      if (await navigation.isVisible()) await expect(navigation).toHaveAttribute('aria-expanded', 'false');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+2), `${tab} at ${width}`).toBe(true);
    }
  }
  expect(exceptions).toEqual([]);
});

test('malformed or oversized browser attribution does not block a valid callback', async ({ page }) => {
  const exceptions: string[] = []; page.on('pageerror', error => exceptions.push(error.message));
  await page.goto('/contact');
  await page.evaluate(() => {
    localStorage.setItem('aq_first_touch_v1', JSON.stringify({ firstTouchSource: { invalid: true } }));
    sessionStorage.setItem('aq_session_landing_v1', JSON.stringify({ landingPage: '/contact?' + 'x'.repeat(2000), referrer: 42, utmSource: 'google'.repeat(100) }));
  });
  await page.getByLabel('Full name', { exact: true }).fill('Attribution Customer Fixture');
  await page.getByLabel('Phone number', { exact: true }).fill('9876543213');
  await page.getByRole('button', { name: 'Get Callback', exact: true }).click();
  await expect(page.locator('main form')).toHaveCount(0);
  const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    const payload = (await db.query("SELECT payload FROM aq_enquiries WHERE payload->>'name'=$1", ['Attribution Customer Fixture'])).rows[0].payload;
    expect(payload.firstTouchSource).toBe('direct');
    expect(payload.utmSource.length).toBe(255);
    expect(payload.landingPage.length).toBe(1024);
    expect(typeof payload.referrer).toBe('string');
  } finally { await db.end(); }
  expect(exceptions).toEqual([]);
});
