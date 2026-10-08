import { test, expect, type Page } from '@playwright/test';
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
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
  await page.goto('/cart');
  await page.getByLabel('Quantity for Test camera kit').fill('2');
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
    await expect(enquiry.getByRole('button')).toBeEnabled();
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
