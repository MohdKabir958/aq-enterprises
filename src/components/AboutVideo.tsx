'use client';

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
    v.play().catch(() => {});
    const fail = () => setVideoFailed(true);
    v.addEventListener('error', fail);
    v.addEventListener('stalled', fail);
    const timer = setTimeout(() => { if (v.readyState < 2) fail(); }, 4000);
    return () => {
      v.removeEventListener('error', fail);
      v.removeEventListener('stalled', fail);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid #1B1F27', background: 'linear-gradient(160deg,#12151B,#0d0f13)', height: 380 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#1B1F27 1px,transparent 1px),linear-gradient(90deg,#1B1F27 1px,transparent 1px)', backgroundSize: '36px 36px', opacity: 0.5 }} />
      <video
        ref={videoRef}
        src="/assets/about-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1, transition: 'opacity 0.3s', opacity: videoFailed ? 0 : 1 }}
      />
    </div>
  );
}
