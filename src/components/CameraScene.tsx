'use client';

/**
 * @file CameraScene.tsx
 * @description Renders a 3D interactive CCTV camera using Three.js.
 *
 * ARCHITECTURE:
 * Directly mounts Three.js via `camera-scene-core` inside the canvas ref.
 * Code-split automatically via `CameraSceneLoader` (ssr: false) so Three.js
 * is only downloaded on the homepage hero route.
 *
 * ACCESSIBILITY:
 * The canvas is marked as presentation/decorative with an accessible role="img"
 * and descriptive aria-label explaining what the interactive visual represents.
 */

import { useEffect, useRef } from 'react';
import { mountCameraScene, type CameraSceneInstance } from './camera-scene-core';

export default function CameraScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<CameraSceneInstance | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;

    try {
      const instance = mountCameraScene(canvas, { accentHex: 0x3fa9f5 });
      if (mounted) {
        instanceRef.current = instance;
      } else {
        instance.dispose();
      }
    } catch (err) {
      console.error('Failed to initialize 3D scene:', err);
    }

    return () => {
      mounted = false;
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div
      style={{ position: 'relative', height: 'clamp(260px, 55vw, 440px)' }}
      aria-label="3D interactive model of a security camera"
      role="img"
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'grab' }}
        aria-hidden="true"
      />

      {/* ── Drag Hint ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#6B7484',
          fontSize: 12,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 9l-3 3 3 3M16 9l3 3-3 3"
            stroke="#6B7484"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Drag to rotate
      </div>
    </div>
  );
}
