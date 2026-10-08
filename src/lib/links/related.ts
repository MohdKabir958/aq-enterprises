/** Resolve published related content from the live content layer. */
import {
  getAllBlogs,
  getAllBrands,
  getAllIndustries,
  getAllLocations,
  getAllProjects,
  getAllServices,
} from '@/lib/content/getters';
import type {
  BlogPost,
  Brand,
  Industry,
  Location,
  Project,
  Service,
} from '@/types';
export interface InternalLink {
  slug: string;
  name: string;
  href: string;
  summary?: string;
}
export interface RelatedLinksBundle {
  services: InternalLink[];
  locations: InternalLink[];
  projects: InternalLink[];
  blogs: InternalLink[];
  brands: InternalLink[];
  industries: InternalLink[];
}
type RelatedEntity = Service | Location | Brand | Industry | Project | BlogPost;
async function bundle(
  entity: RelatedEntity,
  kind: keyof RelatedLinksBundle,
  limit = 6,
): Promise<RelatedLinksBundle> {
  const [services, blogs] = await Promise.all([
    getAllServices(),
    getAllBlogs(),
  ]);
  const lists = {
    services,
    blogs,
    locations: getAllLocations(),
    projects: getAllProjects(),
    brands: getAllBrands(),
    industries: getAllIndustries(),
  };
  const result: RelatedLinksBundle = {
    services: [],
    blogs: [],
    locations: [],
    projects: [],
    brands: [],
    industries: [],
  };
  for (const key of Object.keys(lists) as (keyof RelatedLinksBundle)[]) {
    const field =
      `related${key[0].toUpperCase() + key.slice(1)}` as keyof RelatedEntity;
    let slugs = (entity[field] as string[] | undefined) ?? [];
    if (
      key === 'locations' &&
      kind === 'projects' &&
      'locationSlug' in entity &&
      entity.locationSlug
    )
      slugs = [entity.locationSlug, ...slugs];
    if (
      key === 'brands' &&
      kind === 'projects' &&
      'brandSlug' in entity &&
      entity.brandSlug
    )
      slugs = [entity.brandSlug, ...slugs];
    const selected = slugs
      .map((slug) => lists[key].find((item) => item.slug === slug))
      .filter(
        (item): item is NonNullable<typeof item> =>
          Boolean(item) && !(key === kind && item?.slug === entity.slug),
      );
    const fallbacks: Record<keyof RelatedLinksBundle, string[]> = {
      services: ['services'],
      locations: [],
      brands: ['services', 'projects', 'blogs'],
      industries: ['services', 'locations', 'projects', 'blogs'],
      projects: ['projects'],
      blogs: ['services', 'locations', 'projects', 'blogs'],
    };
    const fallback = fallbacks[kind].includes(key);
    const items = fallback
      ? [
          ...selected,
          ...lists[key].filter(
            (item) =>
              !selected.some((s) => s.slug === item.slug) &&
              !(key === kind && item.slug === entity.slug),
          ),
        ]
      : selected;
    result[key] = items.slice(0, limit).map((item) => ({
      slug: item.slug,
      name: 'title' in item ? String(item.title) : item.name,
      href: `/${key === 'blogs' ? 'blog' : key}/${item.slug}`,
      summary: item.summary,
    }));
  }
  return result;
}
export const getRelatedForService = (item: Service, limit = 6) =>
  bundle(item, 'services', limit);
export const getRelatedForLocation = (item: Location, limit = 6) =>
  bundle(item, 'locations', limit);
export const getRelatedForBrand = (item: Brand, limit = 6) =>
  bundle(item, 'brands', limit);
export const getRelatedForIndustry = (item: Industry, limit = 6) =>
  bundle(item, 'industries', limit);
export const getRelatedForProject = (item: Project, limit = 6) =>
  bundle(item, 'projects', limit);
export const getRelatedForBlog = (item: BlogPost, limit = 6) =>
  bundle(item, 'blogs', limit);
