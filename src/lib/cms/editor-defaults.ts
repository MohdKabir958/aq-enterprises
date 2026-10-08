import type { EditorRecord } from './models';
export const newProduct: EditorRecord = {
  id: '',
  slug: '',
  name: '',
  status: 'draft',
  kind: 'product',
  description: '',
  price: null,
  offerPrice: null,
  image: '',
  imageAlt: '',
  features: [],
};
export const newPlan: EditorRecord = {
  id: '',
  slug: '',
  name: '',
  status: 'draft',
  tag: '',
  speed: '',
  subtitle: '',
  desc: '',
  highlights: [],
  featured: false,
  price: null,
  billing: 'Quotation after survey',
};
export const newBlog: EditorRecord = {
  id: '',
  slug: '',
  name: '',
  status: 'draft',
  title: '',
  summary: '',
  body: '',
  author: 'AQ Enterprises',
  categories: [],
  featuredImage: '',
  featuredImageAlt: '',
  seo: { title: '', description: '', canonical: '' },
};
const section = (heading: string) => ({ heading, body: '' });
export const newProject: EditorRecord = {
  id: '', slug: '', name: '', status: 'draft', sourceId: '', h1: '', summary: '',
  category: 'Home', locationLabel: '', locationSlug: '', cameras: null, brandLabel: '',
  duration: '', overview: '', clientRequirement: '', solution: '', equipment: '',
  installationApproach: '', results: '', technicalDetails: [], image: '', imageAlt: '', gallery: [],
  relatedServices: [], relatedProjects: [], relatedBlogs: [], relatedLocations: [],
  confirmedForPublication: false, seo: { title: '', description: '', canonical: '' },
};
export const newReview: EditorRecord = {
  id: '', slug: '', name: '', status: 'draft', quote: '', role: '', source: '', sourceUrl: '',
  rating: null, verificationStatus: 'pending', permissionToPublish: false, projectSlug: '', serviceSlug: '',
};
export const newFaq: EditorRecord = {
  id: '', slug: '', name: '', status: 'draft', question: '', answer: '', showOnHomepage: true,
  relatedServices: [], relatedLocations: [], relatedIndustries: [],
};
const list = (heading: string) => ({ heading, items: [] });
export const newService: EditorRecord = {
  id: '',
  slug: '',
  name: '',
  status: 'draft',
  summary: '',
  h1: '',
  hero: {
    eyebrow: '',
    headline: '',
    subheadline: '',
    image: { id: '', alt: '', label: '', src: '' },
  },
  introduction: '',
  whatIs: section('About this service'),
  whoNeeds: list('Who this service is for'),
  commonProblems: list('Common problems'),
  ourSolution: section('Our approach'),
  systemOptions: { heading: 'Options', options: [] },
  keyFeatures: list('Features'),
  benefits: list('Benefits'),
  recommendedConfigurations: { heading: 'Configurations', configs: [] },
  installationProcess: { heading: 'Installation process', steps: [] },
  maintenance: section('Maintenance'),
  warranty: section('Warranty terms'),
  whyChoose: list('Why choose AQ Enterprises'),
  hyderabadCoverage: section('Hyderabad service coverage'),
  cta: {
    heading: 'Request a quotation',
    body: 'Share your requirements for a site survey.',
  },
  faqs: [],
  seo: { title: '', description: '', canonical: '' },
};
