import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from '@/components/ManagedImage';
import Icon from '@/components/Icon';
import { getAllBlogs } from '@/lib/content/getters';
import { getBlogVisual, formatArticleDate } from '@/lib/blog/visuals';
import { JsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Blog — CCTV, Security & Networking Guides',
  description:
    'Practical guides to CCTV cameras, video storage, installation planning, access control and networking from AQ Enterprises in Hyderabad.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'CCTV & Security Guides — AQ Enterprises',
    images: ['/images/illustrations/home-security.webp'],
  },
};

export default async function BlogIndexPage() {
  const posts = [...(await getAllBlogs())].sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  );
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.categories ?? [])),
  ).sort();
  const featureImage = featured ? getBlogVisual(featured) : null;
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <Header active="blog" />
      <div
        style={{ height: 'calc(76px + env(safe-area-inset-top))' }}
        aria-hidden="true"
      />
      <main>
        <JsonLd
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'AQ Enterprises security and networking guides',
            url: `${siteConfig.url}/blog`,
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `${siteConfig.url}/blog/${post.slug}`,
              image: getBlogVisual(post).src.startsWith('/')
                ? `${siteConfig.url}${getBlogVisual(post).src}`
                : getBlogVisual(post).src,
            })),
          }}
        />
        <div className="visual-breadcrumb">
          <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />
        </div>
        <section className="visual-section blog-intro">
          <span className="visual-eyebrow">The AQ field notes</span>
          <h1>
            Know your system.
            <br />
            <span>Make the right choice.</span>
          </h1>
          <p>
            Practical answers about cameras, coverage, storage and connectivity.
            Start with the details that matter for your property.
          </p>
          <div className="blog-topics" aria-label="Topics covered">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </section>
        {featured && featureImage && (
          <section
            className="visual-section"
            aria-labelledby="featured-heading"
          >
            <h2 id="featured-heading" className="blog-section-label">
              Featured guide
            </h2>
            <Link href={`/blog/${featured.slug}`} className="blog-feature">
              <div
                className="blog-feature-image"
                data-provenance="provisional_illustration"
              >
                <Image
                  src={featureImage.src}
                  alt={featureImage.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                  preload
                />
                <span className="blog-feature-badge">
                  <Icon name="file" size={14} /> Featured guide
                </span>
              </div>
              <div className="blog-feature-copy">
                <span className="visual-eyebrow">
                  {featured.categories?.[0] || 'Security guide'}
                </span>
                <h3>{featured.title}</h3>
                <p>{featured.summary}</p>
                <div className="blog-byline">
                  <span className="blog-author-mark">AQ</span>
                  <span>
                    {featured.author || 'AQ Enterprises'}
                    <small>{formatArticleDate(featured.publishedAt)}</small>
                  </span>
                </div>
                <span className="blog-read-link">
                  Read the guide <Icon name="arrow-right" size={19} />
                </span>
              </div>
            </Link>
          </section>
        )}
        <section
          className="visual-section"
          aria-labelledby="all-articles-heading"
        >
          <div className="visual-section-heading">
            <div>
              <span className="visual-eyebrow">Learn before you install</span>
              <h2 id="all-articles-heading">All articles</h2>
            </div>
          </div>
          {!posts.length ? (
            <div className="blog-empty">
              <Icon name="file" size={32} />
              <h3>More guides are on the way.</h3>
              <p>Talk to our team if you need help planning a system.</p>
              <Link href="/contact" className="visual-button">
                Ask a question <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          ) : (
            <div className="blog-photo-grid">
              {rest.map((post) => {
                const photo = getBlogVisual(post);
                return (
                  <article key={post.slug} className="blog-photo-card">
                    <Link href={`/blog/${post.slug}`}>
                      <div
                        className="blog-photo-image"
                        data-provenance="provisional_illustration"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px"
                        />
                      </div>
                      <div className="blog-photo-body">
                        <span className="blog-card-category">
                          {post.categories?.[0] || 'Security guide'}
                        </span>
                        <h3>{post.title}</h3>
                        <p>{post.summary}</p>
                        <div className="blog-card-footer">
                          <time dateTime={post.publishedAt}>
                            {formatArticleDate(post.publishedAt)}
                          </time>
                          <span>
                            Read article{' '}
                            <Icon name="arrow-up-right" size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
          <p className="visual-image-note">
            Photography illustrates the topics covered in these guides.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
