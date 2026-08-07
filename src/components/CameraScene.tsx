'use client';

import { useEffect, useRef } from 'react';

export default function CameraScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;
    import('/camera-scene.js' as string).then((mod: { mountCameraScene: (canvas: HTMLCanvasElement, opts: { accentHex: number }) => Promise<{ dispose: () => void }> }) => {
      if (!mounted || !canvasRef.current) return;
      mod.mountCameraScene(canvasRef.current, { accentHex: 0x3fa9f5 }).then((api) => {
        if (mounted) apiRef.current = api;
        else api.dispose();
      });
    }).catch(err => console.error('camera scene failed to mount', err));
    return () => {
      mounted = false;
      apiRef.current?.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: 440 }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', color: '#6B7484', fontSize: 12, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8 9l-3 3 3 3M16 9l3 3-3 3" stroke="#6B7484" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Drag to rotate
      </div>
    </div>
  );
}
