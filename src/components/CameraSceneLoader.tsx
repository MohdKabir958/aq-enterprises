'use client';

/**
 * @file CameraSceneLoader.tsx
 * @description Dynamic import wrapper for the Three.js CameraScene component.
 *
 * WHY THIS EXISTS:
 * Next.js attempts to Server-Side Render (SSR) all components by default.
 * The CameraScene relies on the DOM (`window`, `document`, `<canvas>`), which
 * are undefined in the Node.js SSR environment.
 * By using `next/dynamic` with `ssr: false`, we instruct Next.js to completely
 * skip rendering this component on the server, only mounting it on the client.
 */

import dynamic from 'next/dynamic';

const CameraScene = dynamic(() => import('./CameraScene'), {
  ssr: false,
  loading: () => <div aria-hidden="true" style={{ height: 'clamp(260px, 55vw, 440px)' }} />,
});

export default function CameraSceneLoader() {
  return <CameraScene />;
}
