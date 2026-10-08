'use client';
import type { EditorValue, EditorRecord } from '@/lib/cms/models';
import MediaField from './MediaField';
const labels: Record<string, string> = {
  seo: 'Search appearance',
  h1: 'Page heading',
  body: 'Content (plain text; ## headings and - lists supported)',
  slug: 'URL slug',
  name: 'Name',
  desc: 'Description',
  price: 'Price in ₹ (leave empty for quotation)',
  offerPrice: 'Offer price in ₹',
  featuredImage: 'Featured image',
  featuredImageAlt: 'Image alternative text',
  src: 'Image URL',
  alt: 'Alternative text',
  mediaUrl: 'Hero image / video URL',
  poster: 'Video poster image',
  line1: 'Address line 1',
  line2: 'Address line 2',
  phoneDisplay: 'Displayed phone number',
  phone: 'Phone including country code',
  mapsUrl: 'Google Maps location link',
  justdialUrl: 'Justdial profile link',
  opens: 'Opening time (HH:MM)',
  closes: 'Closing time (HH:MM)',
  days: 'Open days',
  hours: 'Displayed opening hours',
};
const labelFor = (key: string) =>
  labels[key] ||
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
const hidden = new Set([
  'id',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'canonical',
]);
const mediaKeys = new Set([
  'image',
  'src',
  'featuredImage',
  'coverImage',
  'mediaUrl',
  'poster',
]);
const choice: Record<string, string[]> = {
  status: ['draft', 'published', 'archived'],
  kind: ['product', 'package', 'combo'],
  mediaType: ['default', 'image', 'video'],
};
const arrayDefaults: Record<string, EditorValue> = {
  faqs: { id: '', question: '', answer: '' },
  faq: { id: '', question: '', answer: '' },
  options: { name: '', description: '', suitableFor: '' },
  configs: { name: '', description: '', suitableFor: '' },
  steps: { title: '', description: '' },
  imagePlaceholders: { id: '', alt: '', label: '', src: '' },
};
export default function Fields({
  value,
  onChange,
  isExisting = false,
}: {
  value: EditorRecord;
  onChange: (value: EditorRecord) => void;
  isExisting?: boolean;
}) {
  return (
    <>
      {Object.entries(value)
        .filter(([key]) => !hidden.has(key))
        .map(([key, item]) => {
          const update = (next: EditorValue) =>
            onChange({ ...value, [key]: next });
          const label = labelFor(key);
          if (item === undefined) return null;
          if (Array.isArray(item))
            return (
              <details className="cms-group" key={key}>
                <summary>
                  {label} ({item.length})
                </summary>
                {item.map((entry, index) => (
                  <div className="cms-array-item" key={index}>
                    {typeof entry === 'object' &&
                    entry !== null &&
                    !Array.isArray(entry) ? (
                      <Fields
                        value={entry}
                        onChange={(next) =>
                          update(item.map((v, i) => (i === index ? next : v)))
                        }
                      />
                    ) : (
                      <label>
                        {label} {index + 1}
                        <textarea
                          value={String(entry ?? '')}
                          rows={2}
                          onChange={(e) =>
                            update(
                              item.map((v, i) =>
                                i === index ? e.target.value : v,
                              ),
                            )
                          }
                        />
                      </label>
                    )}
                    <button
                      type="button"
                      className="cms-secondary"
                      onClick={() => update(item.filter((_, i) => i !== index))}
                    >
                      Remove {index + 1}
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="cms-secondary"
                  onClick={() => {
                    const added = structuredClone(arrayDefaults[key] ?? '');
                    if (
                      added &&
                      typeof added === 'object' &&
                      !Array.isArray(added) &&
                      'id' in added
                    ) {
                      added.id = crypto.randomUUID();
                    }
                    update([...item, added]);
                  }}
                >
                  Add {label.toLowerCase()} item
                </button>
              </details>
            );
          if (typeof item === 'object' && item !== null)
            return (
              <details key={key} className="cms-group">
                <summary>{label}</summary>
                <Fields value={item} onChange={update} />
              </details>
            );
          if (typeof item === 'boolean')
            return (
              <label key={key} className="cms-check">
                <input
                  type="checkbox"
                  checked={item}
                  onChange={(e) => update(e.target.checked)}
                />
                {label}
              </label>
            );
          if (choice[key])
            return (
              <label key={key}>
                {label}
                <select
                  aria-label={label}
                  value={String(item)}
                  onChange={(e) => update(e.target.value)}
                >
                  {choice[key].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
            );
          if (mediaKeys.has(key) && typeof item === 'string')
            return (
              <MediaField
                key={key}
                label={label}
                value={item}
                onChange={update}
              />
            );
          if (typeof item === 'number' || item === null)
            return (
              <label key={key}>
                {label}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item ?? ''}
                  onChange={(e) =>
                    update(
                      e.target.value === '' ? null : Number(e.target.value),
                    )
                  }
                />
              </label>
            );
          const long =
            [
              'description',
              'summary',
              'body',
              'introduction',
              'subheadline',
              'answer',
            ].includes(key) || String(item).length > 200;
          return (
            <label key={key}>
              {label}
              {long ? (
                <textarea
                  rows={key === 'body' ? 12 : 4}
                  value={String(item)}
                  onChange={(e) => update(e.target.value)}
                />
              ) : (
                <input
                  value={String(item)}
                  readOnly={key === 'slug' && isExisting}
                  onChange={(e) => update(e.target.value)}
                />
              )}
            </label>
          );
        })}
    </>
  );
}
