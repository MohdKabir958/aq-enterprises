/**
 * SEO helper barrel — metadata, OG, canonical, breadcrumbs, schema.
 */

export { generateCanonical, toCanonicalPath } from './canonical';
export { generateOpenGraph } from './open-graph';
export {
  generateBreadcrumb,
  serviceBreadcrumbs,
  locationBreadcrumbs,
  brandBreadcrumbs,
  industryBreadcrumbs,
  projectBreadcrumbs,
  blogBreadcrumbs,
  serviceLocationBreadcrumbs,
} from './breadcrumbs';
export {
  generateSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
} from './schema';
export { generateMetadata, generateMetadataFromSEO } from './metadata';
