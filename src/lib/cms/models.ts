import { z } from 'zod';

const text = z.string().trim().max(10000);
const short = z.string().trim().max(300);
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(100);
export const statusSchema = z.enum(['draft', 'published', 'archived']);
export const mediaUrlSchema = z
  .string()
  .max(2000)
  .refine((value) => {
    if (!value) return true;
    if (/^\/(?!\/)[a-zA-Z0-9/_\-.%]+$/.test(value) && !value.includes('..'))
      return true;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password;
    } catch {
      return false;
    }
  }, 'Use a local media path or a full HTTPS URL.');
const base = {
  id: slugSchema,
  slug: slugSchema,
  name: short.min(1),
  status: statusSchema,
};
export const productSchema = z
  .object({
    ...base,
    kind: z.enum(['product', 'package', 'combo']),
    description: text.min(1),
    price: z.number().min(0).max(10000000).nullable(),
    offerPrice: z.number().min(0).max(10000000).nullable(),
    image: mediaUrlSchema,
    imageAlt: short,
    features: z.array(short).max(40),
  })
  .refine(
    (p) =>
      p.offerPrice === null || (p.price !== null && p.offerPrice <= p.price),
    'Offer price must not exceed the regular price.',
  );
export type Product = z.infer<typeof productSchema>;
export const planSchema = z.object({
  ...base,
  tag: short,
  speed: short.min(1),
  subtitle: short,
  desc: text,
  highlights: z.array(short).max(40),
  featured: z.boolean(),
  price: z.number().min(0).max(10000000).nullable(),
  billing: short,
});
export type InternetPlan = z.infer<typeof planSchema>;
export const contactSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{7,14}$/),
  phoneDisplay: short.min(1),
  email: z.email().max(254),
  line1: short.min(1),
  line2: short,
  city: short.min(1),
  region: short.min(1),
  pincode: z.string().regex(/^\d{6}$/),
  hours: short.min(1),
  opens: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  closes: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  days: z
    .array(
      z.enum([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]),
    )
    .min(1)
    .max(7),
  mapsUrl: z.url().refine((v) => v.startsWith('https://')),
  justdialUrl: z.url().refine((v) => v.startsWith('https://www.justdial.com/')),
});
export type ContactSettings = z.infer<typeof contactSchema>;
export const heroSchema = z.object({
  eyebrow: short,
  title: short.min(1),
  subtitle: short,
  description: text,
  mediaType: z.enum(['default', 'image', 'video']),
  mediaUrl: mediaUrlSchema,
  mediaAlt: short,
  poster: mediaUrlSchema,
});
export type HeroSettings = z.infer<typeof heroSchema>;
const section = z.object({ heading: short, body: text });
const list = z.object({
  heading: short,
  intro: text.optional(),
  items: z.array(text).max(100),
});
const option = z.object({
  name: short,
  description: text,
  suitableFor: text.optional(),
});
const image = z.object({
  id: short,
  alt: short,
  label: short,
  src: mediaUrlSchema.optional(),
  filename: short.optional(),
  caption: text.optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});
const faq = z
  .object({
    id: short,
    question: text,
    answer: text,
    status: statusSchema.optional(),
  })
  .passthrough();
const seo = z
  .object({
    title: short.min(1),
    description: z.string().trim().max(500).min(1),
    canonical: z.string().max(200),
    keywords: z.array(short).optional(),
  })
  .passthrough();
const timestamp = z.union([
  z.literal(''),
  z.iso.date(),
  z.iso.datetime({ offset: true }),
]).optional();
const timestamps = {
  createdAt: timestamp,
  updatedAt: timestamp,
  publishedAt: timestamp,
};
const related = {
  relatedServices: z.array(slugSchema).max(100).optional(),
  relatedLocations: z.array(slugSchema).max(100).optional(),
  relatedProjects: z.array(slugSchema).max(100).optional(),
  relatedBlogs: z.array(slugSchema).max(100).optional(),
  relatedBrands: z.array(slugSchema).max(100).optional(),
  relatedIndustries: z.array(slugSchema).max(100).optional(),
};
export const blogSchema = z.object({
  ...base,
  ...timestamps,
  ...related,
  title: short.min(1),
  summary: text.min(1),
  body: z.string().max(150000).min(1),
  author: short.min(1),
  categories: z.array(short).max(40),
  tags: z.array(short).max(40).optional(),
  featuredImage: mediaUrlSchema.optional(),
  coverImage: mediaUrlSchema.optional(),
  featuredImageAlt: short.optional(),
  faq: z.array(faq).max(100).optional(),
  ctaHeading: short.optional(),
  ctaBody: text.optional(),
  seo,
});
export const serviceSchema = z.object({
  ...base,
  ...timestamps,
  ...related,
  summary: text.min(1),
  h1: short.min(1),
  hero: z.object({
    eyebrow: short.optional(),
    headline: short.min(1),
    subheadline: text,
    image: image.optional(),
  }),
  introduction: text,
  whatIs: section,
  whoNeeds: list,
  commonProblems: list,
  ourSolution: section,
  systemOptions: z.object({
    heading: short,
    intro: text.optional(),
    options: z.array(option).max(100),
  }),
  keyFeatures: list,
  benefits: list,
  recommendedConfigurations: z.object({
    heading: short,
    intro: text.optional(),
    configs: z.array(option).max(100),
  }),
  installationProcess: z.object({
    heading: short,
    intro: text.optional(),
    steps: z.array(z.object({ title: short, description: text })).max(100),
  }),
  maintenance: section,
  brands: section.optional(),
  warranty: section,
  whyChoose: list,
  hyderabadCoverage: section,
  cta: z.object({
    heading: short,
    body: text,
    primaryLabel: short.optional(),
    primaryHref: z
      .string()
      .regex(/^\/(?!\/)[a-zA-Z0-9/_#-]*$/)
      .optional(),
    secondaryLabel: short.optional(),
    secondaryHref: z
      .string()
      .regex(/^(tel:\+[0-9]+|\/(?!\/)[a-zA-Z0-9/_#-]*)$/)
      .optional(),
  }),
  faqs: z.array(faq).max(100),
  imagePlaceholders: z.array(image).max(100).optional(),
  body: text.optional(),
  image: mediaUrlSchema.optional(),
  relatedFaqs: z.array(short).optional(),
  seo,
});
export const mediaReplacementSchema = z.object({
  original: mediaUrlSchema.refine((v) => v.startsWith('/')),
  replacement: mediaUrlSchema.nullable(),
  alt: short,
});
export type MediaReplacement = z.infer<typeof mediaReplacementSchema>;
export const projectSchema = z.object({
  ...base, ...timestamps, ...related,
  sourceId: short, h1: short, summary: text.min(1), category: short.min(1),
  locationLabel: short.min(1), locationSlug: z.union([z.literal(''), slugSchema]).optional(),
  cameras: z.number().int().min(0).max(10000).nullable().optional(),
  brandLabel: short.optional(), brandSlug: z.union([z.literal(''), slugSchema]).optional(),
  duration: short.optional(), overview: text.min(1), clientRequirement: text.optional(),
  solution: text.optional(), equipment: text.optional(), installationApproach: text.optional(), results: text.optional(),
  technicalDetails: z.array(z.object({ label: short, value: short })).max(50),
  image: mediaUrlSchema, imageAlt: short, gallery: z.array(image).max(40),
  cta: serviceSchema.shape.cta.optional(), body: text.optional(), seo,
  confirmedForPublication: z.boolean(),
}).refine(p => p.status !== 'published' || p.confirmedForPublication, {
  message: 'Confirm this case study describes completed work and may be published.',
});
export const reviewSchema = z.object({
  ...base, quote: text.min(1), role: short, source: short, sourceUrl: z.union([z.literal(''), z.url().refine(v => v.startsWith('https://'))]),
  rating: z.number().int().min(1).max(5).nullable(),
  verificationStatus: z.enum(['pending', 'verified', 'unverified']),
  permissionToPublish: z.boolean(),
  projectSlug: z.union([z.literal(''), slugSchema]), serviceSlug: z.union([z.literal(''), slugSchema]),
}).refine(r => r.status !== 'published' || (r.verificationStatus === 'verified' && r.permissionToPublish && r.source.length > 0), {
  message: 'Published reviews require a verified source and permission to publish.',
});
export const faqEntrySchema = z.object({
  ...base, question: text.min(1), answer: text.min(1), showOnHomepage: z.boolean(),
  relatedServices: z.array(slugSchema).max(100), relatedLocations: z.array(slugSchema).max(100),
  relatedIndustries: z.array(slugSchema).max(100),
});
export const schemas = {
  products: productSchema,
  blogs: blogSchema,
  services: serviceSchema,
  plans: planSchema,
  contact: contactSchema,
  hero: heroSchema,
  images: mediaReplacementSchema,
  projects: projectSchema,
  reviews: reviewSchema,
  faqs: faqEntrySchema,
};
export type Collection = keyof typeof schemas;
export type EditorValue =
  | string
  | number
  | boolean
  | null
  | EditorValue[]
  | { [key: string]: EditorValue | undefined };
export type EditorRecord = { [key: string]: EditorValue | undefined };
export interface SavedRecord {
  key: string;
  value: EditorRecord;
  revision: number;
  deleted: boolean;
}
