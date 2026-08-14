import type { ReactNode } from 'react';
import Link from 'next/link';

export type ParsedSection = {
  id: string;
  heading: string;
  blocks: ParsedBlock[];
};

export type ParsedBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export type ParsedArticle = {
  lead: ParsedBlock[];
  sections: ParsedSection[];
};

function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function splitBlocks(text: string): ParsedBlock[] {
  const chunks = text
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter(Boolean);
  const blocks: ParsedBlock[] = [];

  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((l) => l.trim());
    if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ type: 'list', items: lines.map((l) => l.replace(/^- /, '')) });
    } else {
      blocks.push({ type: 'paragraph', text: lines.join(' ') });
    }
  }
  return blocks;
}

/** Parse lightweight article markup into lead + H2 sections. */
export function parseArticleBody(body: string): ParsedArticle {
  const parts = body.split(/\n(?=## )/);
  const leadRaw = parts[0]?.startsWith('## ') ? '' : parts[0] ?? '';
  const sectionParts = parts[0]?.startsWith('## ') ? parts : parts.slice(1);

  const sections: ParsedSection[] = [];
  const usedIds = new Set<string>();

  for (const part of sectionParts) {
    const match = part.match(/^##\s+(.+)\n([\s\S]*)$/);
    if (!match) continue;
    const heading = match[1].trim();
    let id = slugify(heading);
    if (usedIds.has(id)) id = `${id}-${usedIds.size}`;
    usedIds.add(id);
    sections.push({
      id,
      heading,
      blocks: splitBlocks(match[2] ?? ''),
    });
  }

  return {
    lead: leadRaw ? splitBlocks(leadRaw) : [],
    sections,
  };
}

const linkRe = /\[([^\]]+)\]\((\/[^)]+)\)/g;

/** Render inline markdown-style links to Next.js Links. */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(linkRe.source, 'g');
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        style={{ color: '#3fa9f5', textDecoration: 'underline', textUnderlineOffset: 3 }}
      >
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
