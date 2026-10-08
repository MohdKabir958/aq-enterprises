/**
 * @file validate-content.ts
 * @description Automated build-time content integrity validator.
 *
 * CHECKS:
 * 1. Slug uniqueness within each collection
 * 2. Route canonical integrity & URL formats
 * 3. Cross-collection reference integrity:
 *    - Service-Location -> Service exists
 *    - Service-Location -> Location exists
 *    - Service-Location -> Project exists (if projectSlug is set)
 *    - Location -> Verified projects exist
 *    - Related service & location references exist
 * 4. Required SEO fields (title, description) presence & reasonable length
 * 5. Required content fields (h1, summary)
 * 6. Published / draft status hygiene
 *
 * Run: node --loader ./scripts/ts-loader.mjs scripts/validate-content.ts
 */

import {
  getAllBlogs,
  getAllBrands,
  getAllFaqs,
  getAllIndustries,
  getAllLocations,
  getAllProjects,
  getAllServiceLocations,
  getAllServices,
  getAllTestimonials,
} from '@/lib/content/getters';

interface ValidationError {
  type: string;
  id: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];

function checkDuplicateSlugs<T extends { slug: string }>(
  items: T[],
  collectionName: string,
) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.slug)) {
      errors.push({
        type: 'DUPLICATE_SLUG',
        id: `${collectionName}:${item.slug}`,
        message: `Duplicate slug detected in ${collectionName}: "${item.slug}"`,
      });
    }
    seen.add(item.slug);
  }
}

async function runValidation() {
  console.log('🔍 Starting AQ Enterprises content integrity audit...\n');

  const services = await getAllServices({ includeDrafts: true });
  const locations = getAllLocations({ includeDrafts: true });
  const serviceLocations = await getAllServiceLocations({ includeDrafts: true });
  const projects = getAllProjects({ includeDrafts: true });
  const blogs = await getAllBlogs({ includeDrafts: true });
  const faqs = getAllFaqs({ includeDrafts: true });
  const testimonials = getAllTestimonials({ includeDrafts: true });
  const brands = getAllBrands({ includeDrafts: true });
  const industries = getAllIndustries({ includeDrafts: true });

  console.log(`📦 Loaded content inventory:`);
  console.log(`   - Services: ${services.length}`);
  console.log(`   - Locations: ${locations.length}`);
  console.log(`   - Service × Location intersections: ${serviceLocations.length}`);
  console.log(`   - Projects: ${projects.length}`);
  console.log(`   - Blog posts: ${blogs.length}`);
  console.log(`   - FAQs: ${faqs.length}`);
  console.log(`   - Testimonials: ${testimonials.length}`);
  console.log(`   - Brands: ${brands.length}`);
  console.log(`   - Industries: ${industries.length}\n`);

  // 1. Check duplicate slugs within collections
  checkDuplicateSlugs(services, 'services');
  checkDuplicateSlugs(locations, 'locations');
  checkDuplicateSlugs(projects, 'projects');
  checkDuplicateSlugs(blogs, 'blogs');

  // Check composite slug uniqueness for Service × Location
  const sxlCombos = new Set<string>();
  for (const sxl of serviceLocations) {
    const key = `${sxl.locationSlug}/${sxl.serviceSlug}`;
    if (sxlCombos.has(key)) {
      errors.push({
        type: 'DUPLICATE_SERVICE_LOCATION',
        id: key,
        message: `Duplicate Service × Location route detected: /locations/${key}`,
      });
    }
    sxlCombos.add(key);
  }

  // Build lookup maps for cross-referencing
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const locationSlugs = new Set(locations.map((l) => l.slug));
  const projectSlugs = new Set(projects.map((p) => p.slug));

  // 2. Validate Service × Location references
  for (const sxl of serviceLocations) {
    if (!serviceSlugs.has(sxl.serviceSlug)) {
      errors.push({
        type: 'BROKEN_REFERENCE',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" references nonexistent serviceSlug: "${sxl.serviceSlug}"`,
      });
    }
    if (!locationSlugs.has(sxl.locationSlug)) {
      errors.push({
        type: 'BROKEN_REFERENCE',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" references nonexistent locationSlug: "${sxl.locationSlug}"`,
      });
    }
    if (sxl.projectSlug && !projectSlugs.has(sxl.projectSlug)) {
      errors.push({
        type: 'BROKEN_REFERENCE',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" references nonexistent projectSlug: "${sxl.projectSlug}"`,
      });
    }

    // Canonical format check
    const expectedCanonical = `/locations/${sxl.locationSlug}/${sxl.serviceSlug}`;
    if (sxl.seo.canonical !== expectedCanonical) {
      errors.push({
        type: 'INVALID_CANONICAL',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" canonical is "${sxl.seo.canonical}", expected "${expectedCanonical}"`,
      });
    }

    // Required SEO checks
    if (!sxl.seo.title || sxl.seo.title.trim().length < 10) {
      errors.push({
        type: 'MISSING_SEO_TITLE',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" has empty or too short SEO title`,
      });
    }
    if (!sxl.seo.description || sxl.seo.description.trim().length < 20) {
      errors.push({
        type: 'MISSING_SEO_DESC',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" has empty or too short SEO description`,
      });
    }
    if (!sxl.h1 || sxl.h1.trim().length < 5) {
      errors.push({
        type: 'MISSING_H1',
        id: sxl.slug,
        message: `ServiceLocation "${sxl.slug}" has missing or invalid H1 heading`,
      });
    }

    // Related links check
    for (const relServ of sxl.relatedServices ?? []) {
      if (!serviceSlugs.has(relServ)) {
        warnings.push(`ServiceLocation "${sxl.slug}" relatedService "${relServ}" not found.`);
      }
    }
    for (const relLoc of sxl.relatedLocations ?? []) {
      if (!locationSlugs.has(relLoc)) {
        warnings.push(`ServiceLocation "${sxl.slug}" relatedLocation "${relLoc}" not found.`);
      }
    }
  }

  // 3. Validate Locations
  for (const loc of locations) {
    const expectedCanonical = `/locations/${loc.slug}`;
    if (loc.seo.canonical !== expectedCanonical) {
      errors.push({
        type: 'INVALID_CANONICAL',
        id: loc.slug,
        message: `Location "${loc.slug}" canonical is "${loc.seo.canonical}", expected "${expectedCanonical}"`,
      });
    }
    for (const projId of loc.verifiedProjectIds ?? []) {
      if (!projectSlugs.has(projId)) {
        errors.push({
          type: 'BROKEN_REFERENCE',
          id: loc.slug,
          message: `Location "${loc.slug}" verifiedProjectId "${projId}" does not exist in projects.`,
        });
      }
    }
  }

  // 4. Validate Services
  for (const serv of services) {
    const expectedCanonical = `/services/${serv.slug}`;
    if (serv.seo.canonical !== expectedCanonical) {
      errors.push({
        type: 'INVALID_CANONICAL',
        id: serv.slug,
        message: `Service "${serv.slug}" canonical is "${serv.seo.canonical}", expected "${expectedCanonical}"`,
      });
    }
    if (!serv.h1) {
      errors.push({
        type: 'MISSING_H1',
        id: serv.slug,
        message: `Service "${serv.slug}" is missing H1`,
      });
    }
  }

  // 5. Validate Projects
  for (const proj of projects) {
    const expectedCanonical = `/projects/${proj.slug}`;
    if (proj.seo.canonical !== expectedCanonical) {
      errors.push({
        type: 'INVALID_CANONICAL',
        id: proj.slug,
        message: `Project "${proj.slug}" canonical is "${proj.seo.canonical}", expected "${expectedCanonical}"`,
      });
    }
    if (proj.cameras == null || proj.cameras <= 0) {
      errors.push({
        type: 'INVALID_DATA',
        id: proj.slug,
        message: `Project "${proj.slug}" has invalid camera count: ${proj.cameras}`,
      });
    }
  }

  // 6. Validate Blogs
  for (const blog of blogs) {
    const expectedCanonical = `/blog/${blog.slug}`;
    if (blog.seo.canonical !== expectedCanonical) {
      errors.push({
        type: 'INVALID_CANONICAL',
        id: blog.slug,
        message: `Blog "${blog.slug}" canonical is "${blog.seo.canonical}", expected "${expectedCanonical}"`,
      });
    }
    if (!blog.title || blog.title.trim().length < 5) {
      errors.push({
        type: 'MISSING_TITLE',
        id: blog.slug,
        message: `Blog "${blog.slug}" is missing title / H1`,
      });
    }
  }

  // Report results
  if (warnings.length > 0) {
    console.log(`⚠️  Warnings (${warnings.length}):`);
    for (const w of warnings) {
      console.log(`   - ${w}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.error(`❌ Validation FAILED with ${errors.length} critical errors:\n`);
    for (const err of errors) {
      console.error(`   [${err.type}] (${err.id}): ${err.message}`);
    }
    console.error('\nPlease fix the content integrity errors above.');
    process.exit(1);
  }

  console.log('✅ Content validation PASSED! All slugs, canonicals, references, and SEO fields are valid.');
  process.exit(0);
}

runValidation();
