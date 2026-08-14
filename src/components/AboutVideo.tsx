'use client';

/**
 * @file AboutVideo.tsx
 * @description Autoplaying background video component for the About page hero section.
 *
 * Features:
 *   - Autoplays silently on loop with fallback handling
 *   - If the video fails to load or stalls, it gracefully hides to reveal the CSS gradient background
 *   - Overlays a subtle dot grid pattern to add texture
 *
 * ACCESSIBILITY:
 *   - Video is purely decorative (background texture)
 *   - Added aria-hidden="true" to prevent screen readers from announcing it
 *   - Removed title/alt text since it provides no semantic meaning
 */

import { useRef, useEffect, useState } from 'react';

export default function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    
    // Attempt to play, catch and ignore autoplay blocking errors
    v.play().catch(() => {
      // Autoplay blocked, we can let it fail silently or show fallback
      // For a background video, if it doesn't play, we might just leave the first frame
      // or hide it. We'll hide it if we consider it "failed".
    });

    const fail = () => setVideoFailed(true);
    
    v.addEventListener('error', fail);
    v.addEventListener('stalled', fail);
    
    // If video hasn't reached HAVE_CURRENT_DATA (2) within 4 seconds, consider it failed
    const timer = setTimeout(() => {
      if (v.readyState < 2) fail();
    }, 4000);
    
    return () => {
      v.removeEventListener('error', fail);
      v.removeEventListener('stalled', fail);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #1B1F27',
        background: 'linear-gradient(160deg, #12151B, #0d0f13)',
        height: 380,
      }}
    >
      {/* ── Dot Grid Overlay ────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#1B1F27 1px, transparent 1px), linear-gradient(90deg, #1B1F27 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.5,
          zIndex: 2,
        }}
      />
      
      {/* ── Video Element ───────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/assets/about-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'relative',
          zIndex: 1,
          transition: 'opacity 0.3s',
          opacity: videoFailed ? 0 : 1,
        }}
      />
    </div>
  );
}
