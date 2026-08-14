'use client';

/**
 * @file CameraScene.tsx
 * @description Renders a 3D interactive CCTV camera using Three.js.
 *
 * This component acts as a bridge between React and the vanilla Three.js
 * implementation located in `/public/camera-scene.js`.
 *
 * ARCHITECTURE:
 * We cannot bundle the vanilla Three.js script directly via Next.js imports
 * because it is written as a browser ES Module relying on CDN import maps.
 * Instead, we dynamically inject a <script type="module"> tag on mount,
 * wait for it to expose its `mountCameraScene` function to the window,
 * and then invoke it, passing the React canvas ref.
 *
 * ACCESSIBILITY:
 * The canvas is marked as presentation/decorative. A screen-reader only
 * description is added to explain what the visual represents.
 */

import { useEffect, useRef } from 'react';

export default function CameraScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Using 'any' for apiRef as the external script doesn't provide TypeScript types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    // Dynamically load camera-scene.js from the public directory
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import('/camera-scene.js').then((mod) => {
        window.__cameraSceneMount = mod.mountCameraScene;
        window.dispatchEvent(new CustomEvent('cameraSceneReady'));
      }).catch(err => console.error("Failed to load 3D scene:", err));
    `;
    document.head.appendChild(script);

    const onReady = () => {
      if (!mounted || !canvasRef.current) return;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mountFn = (window as any).__cameraSceneMount;
      
      if (typeof mountFn === 'function') {
        // Pass the canvas element and the accent color (cyan)
        mountFn(canvasRef.current, { accentHex: 0x3fa9f5 })
          .then((api: { dispose: () => void }) => {
            if (mounted) {
              apiRef.current = api;
            } else {
              api.dispose();
            }
          })
          .catch((err: Error) => console.error('Error mounting 3D scene:', err));
      }
    };

    window.addEventListener('cameraSceneReady', onReady);

    // Cleanup: remove listeners and dispose of the WebGL context to prevent memory leaks
    return () => {
      mounted = false;
      window.removeEventListener('cameraSceneReady', onReady);
      apiRef.current?.dispose();
    };
  }, []);

  return (
    <div
      style={{ position: 'relative', height: 440 }}
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
