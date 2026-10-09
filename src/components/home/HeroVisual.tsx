'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Small pointer movement for the artwork; touch and reduced-motion stay still. */
export default function HeroVisual({
  children,
  interactive = true,
}: {
  children: ReactNode;
  interactive?: boolean;
}) {
  const motionAllowed = useRef(false);
  useEffect(() => {
    const query = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => {
      motionAllowed.current = query.matches;
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <div
      className="hero-art-interaction"
      onPointerMove={(event) => {
        if (
          !interactive ||
          !motionAllowed.current ||
          event.pointerType !== 'mouse'
        )
          return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        event.currentTarget.style.setProperty('--hero-yaw', `${x * 4}deg`);
        event.currentTarget.style.setProperty('--hero-pitch', `${-y * 3}deg`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--hero-yaw', '0deg');
        event.currentTarget.style.setProperty('--hero-pitch', '0deg');
      }}
    >
      {children}
    </div>
  );
}
