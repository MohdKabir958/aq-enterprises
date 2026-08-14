import type { SchemaEntityType, SchemaObject } from './seo';
import type { FAQ } from './faq';
import type { BreadcrumbItem } from './seo';

/** Input for the unified `generateSchema()` helper. */
export interface SchemaInput {
  type: SchemaEntityType;
  name: string;
  description?: string;
  url: string;
  image?: string;
  /** Extra schema.org fields merged into the root object. */
  extra?: SchemaObject;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQ[];
}
