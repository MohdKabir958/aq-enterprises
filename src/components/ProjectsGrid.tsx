'use client';

/**
 * Filterable project card grid.
 * Receives published projects from the server page (content layer).
 */

import { useState } from 'react';
import Image from '@/components/ManagedImage';
import Link from 'next/link';
import type { Project } from '@/types';
import { IMAGE_SIZES } from '@/lib/assets';

type Filter = 'All' | 'Home' | 'Office' | 'Industrial';

const FILTER_CATEGORIES: Filter[] = ['All', 'Home', 'Office', 'Industrial'];

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<Filter>('All');

  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section
        aria-label="Filter projects by category"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 var(--page-gutter) 16px',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              type="button"
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={isActive}
              style={{
                background: isActive ? '#FF5A1F' : '#12151B',
                color: isActive ? '#0A0C10' : '#9BA5B4',
                border: `1px solid ${isActive ? '#FF5A1F' : '#232833'}`,
                fontSize: 13,
                fontWeight: 600,
                padding: '10px 18px',
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {cat}
            </button>
          );
        })}
      </section>

      <section
        aria-label="Project installations"
        className="grid-responsive grid-cols-3"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '24px var(--page-gutter) 96px',
        }}
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      style={{
        background: '#12151B',
        border: '1px solid #1B1F27',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt || project.name}
          width={800}
          height={500}
          sizes={IMAGE_SIZES.card}
          style={{ width: '100%', height: 200, objectFit: 'cover' }}
        />
      ) : (
      <div
        style={{
          width: '100%',
          height: 200,
          borderBottom: '1px dashed #2A3140',
          background:
            'linear-gradient(145deg, rgba(63,169,245,0.06) 0%, rgba(15,18,24,0.9) 55%, #12151c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          textAlign: 'center',
        }}
        role="img"
        aria-label={project.imageAlt || project.name}
      >
        <div>
          <p
            style={{
              color: '#6B7484',
              fontSize: 11,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: '0 0 6px',
            }}
          >
            Photo not yet available
          </p>
          <p style={{ color: '#9AA3B2', fontSize: 13, margin: 0, lineHeight: 1.4 }}>
            {project.imageAlt || 'Project photography pending'}
          </p>
        </div>
      </div>
      )}

      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span
          style={{
            color: '#3fa9f5',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </span>
        <h3
          style={{
            color: '#F2F4F7',
            fontSize: 16,
            fontWeight: 600,
            margin: '8px 0 4px',
          }}
        >
          <Link
            href={`/projects/${project.slug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {project.name}
          </Link>
        </h3>
        <p style={{ color: '#6B7484', fontSize: 13, marginBottom: 14, marginTop: 0 }}>
          {project.locationLabel}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #1B1F27',
            paddingTop: 14,
            color: '#9BA5B4',
            fontSize: 12,
            marginBottom: 14,
          }}
        >
          <span>{project.cameras != null ? `${project.cameras} Cameras` : '—'}</span>
          <span>{project.brandLabel || '—'}</span>
          <span>{project.duration || '—'}</span>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          style={{
            color: '#F2F4F7',
            fontSize: 13,
            fontWeight: 600,
            borderBottom: '2px solid #FF5A1F',
            paddingBottom: 2,
            textDecoration: 'none',
            alignSelf: 'flex-start',
            marginTop: 'auto',
          }}
        >
          View case study →
        </Link>
      </div>
    </article>
  );
}
