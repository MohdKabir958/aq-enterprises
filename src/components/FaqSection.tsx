'use client';

/**
 * @file FaqSection.tsx
 * @description Accordion FAQ section used on the Home page.
 *
 * Each FAQ item is a button that expands/collapses its answer.
 * Only one item can be open at a time — clicking an open item closes it.
 *
 * FAQ data is imported from constants.ts (single source of truth).
 * Previously, all FAQ content was hardcoded inline here.
 *
 * ACCESSIBILITY:
 *   - The trigger button has aria-expanded to communicate state to screen readers
 *   - The answer panel has an id referenced by aria-controls on the button
 *   - Using useId() ensures id uniqueness even if the component renders multiple times
 *   - The section uses a proper <h2> heading
 *
 * @param {number} openIdx - Index of the currently open FAQ (-1 = none open)
 */

import { useState, useId } from 'react';
import { FAQ_DATA } from '@/lib/constants';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number>(-1);
  const baseId = useId();

  /**
   * Toggles the FAQ item at the given index.
   * If the same item is clicked again, it closes (sets openIdx to -1).
   * @param {number} i - Index of the clicked FAQ item
   */
  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? -1 : i));

  return (
    <section
      aria-labelledby="faq-heading"
      style={{ maxWidth: 900, margin: '0 auto', padding: '0 var(--page-gutter) 88px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span
          style={{
            color: '#3fa9f5',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          FAQ
        </span>
        <h2
          id="faq-heading"
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 'clamp(26px,3vw,38px)',
            color: '#F2F4F7',
            margin: '10px 0 0',
          }}
        >
          Common questions
        </h2>
      </div>

      <dl>
        {FAQ_DATA.map((faq, i) => {
          const answerId = `${baseId}-faq-answer-${i}`;
          const isOpen = openIdx === i;

          return (
            <div key={i} style={{ borderBottom: '1px solid #1B1F27' }}>
              {/* dt wraps the question trigger for semantic description-list structure */}
              <dt>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '20px 4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 500 }}>
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      color: '#6B7484',
                      fontSize: 20,
                      flexShrink: 0,
                      marginLeft: 16,
                      transition: 'transform 0.2s',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
              </dt>
              {/* dd wraps the answer panel */}
              <dd id={answerId} hidden={!isOpen} style={{ margin: 0 }}>
                {isOpen && (
                  <p style={{ color: '#9BA5B4', fontSize: 14, lineHeight: 1.7, margin: '0 0 22px', padding: '0 4px' }}>
                    {faq.answer}
                  </p>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
