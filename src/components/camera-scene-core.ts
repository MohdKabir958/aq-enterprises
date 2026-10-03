/**
 * @file camera-scene-core.ts
 * @description Typed, bundled Three.js realistic bullet camera scene for the Homepage hero.
 *
 * Scoped strictly to homepage hero via dynamic import in CameraSceneLoader.
 * Eliminates need for global importmap scripts or external CDN dependencies.
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function makeRoughnessMap(): THREE.CanvasTexture {
  const w = 256;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#8a8a8a';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 4000; i++) {
      const y = Math.random() * h;
      const v = 120 + Math.random() * 80;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, w, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 4);
  return tex;
}

function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

function buildBodyBox(material: THREE.Material, w: number, h: number, depth: number): THREE.Mesh {
  const shape = roundedRectShape(w, h, Math.min(w, h) * 0.16);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, material);
  mesh.name = 'body_box';
  mesh.rotation.y = Math.PI / 2;
  mesh.position.x = -depth / 2;
  return mesh;
}

function buildBulletCamera(accentHex: number): THREE.Group {
  const group = new THREE.Group();
  group.name = 'bulletCamera';

  const roughMap = makeRoughnessMap();

  const housing = new THREE.MeshPhysicalMaterial({
    color: 0xeceef0,
    metalness: 0.04,
    roughness: 0.42,
    roughnessMap: roughMap,
    clearcoat: 0.45,
    clearcoatRoughness: 0.28,
  });
  housing.name = 'housing_plastic';

  const dark = new THREE.MeshStandardMaterial({ color: 0x101216, metalness: 0.15, roughness: 0.5 });
  dark.name = 'housing_dark';

  const trim = new THREE.MeshPhysicalMaterial({ color: 0xc9cdd2, metalness: 0.5, roughness: 0.25, clearcoat: 0.5 });
  trim.name = 'trim_metal';

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0a1826,
    metalness: 0.1,
    roughness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMapIntensity: 2.4,
    ior: 1.5,
    reflectivity: 0.7,
  });
  glass.name = 'lens_glass';

  const accent = new THREE.MeshStandardMaterial({
    color: accentHex,
    metalness: 0.2,
    roughness: 0.35,
    emissive: accentHex,
    emissiveIntensity: 1.1,
  });
  accent.name = 'status_accent';

  const rubber = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, metalness: 0.02, roughness: 0.85 });
  rubber.name = 'seal_rubber';

  const bodyW = 0.092;
  const bodyH = 0.08;
  const bodyLen = 0.165;

  const body = buildBodyBox(housing, bodyW, bodyH, bodyLen);
  group.add(body);

  const panel = new THREE.Mesh(new THREE.CylinderGeometry(bodyH * 0.48, bodyH * 0.48, 0.012, 32), dark);
  panel.name = 'front_panel';
  panel.rotation.z = Math.PI / 2;
  panel.position.x = bodyLen / 2 + 0.012;
  group.add(panel);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(bodyH * 0.33, 0.004, 12, 40), trim);
  ring.name = 'lens_ring';
  ring.rotation.y = Math.PI / 2;
  ring.position.x = bodyLen / 2 + 0.02;
  group.add(ring);

  const barrelOuter = new THREE.Mesh(new THREE.CylinderGeometry(bodyH * 0.32, bodyH * 0.34, 0.05, 40), dark);
  barrelOuter.name = 'lens_barrel_outer';
  barrelOuter.rotation.z = Math.PI / 2;
  barrelOuter.position.x = bodyLen / 2 + 0.045;
  barrelOuter.rotation.y = 0.05;
  group.add(barrelOuter);

  const barrelInner = new THREE.Mesh(new THREE.CylinderGeometry(bodyH * 0.24, bodyH * 0.27, 0.028, 40), trim);
  barrelInner.name = 'lens_barrel_inner';
  barrelInner.rotation.z = Math.PI / 2;
  barrelInner.position.set(bodyLen / 2 + 0.072, 0.001, 0);
  group.add(barrelInner);

  const lensGlass = new THREE.Mesh(new THREE.CylinderGeometry(bodyH * 0.22, bodyH * 0.22, 0.006, 40), glass);
  lensGlass.name = 'lens';
  lensGlass.rotation.z = Math.PI / 2;
  lensGlass.position.set(bodyLen / 2 + 0.086, 0.001, 0);
  group.add(lensGlass);

  const statusLed = new THREE.Mesh(new THREE.SphereGeometry(0.0035, 12, 12), accent);
  statusLed.name = 'status_led';
  statusLed.position.set(-bodyLen / 2 + 0.02, bodyH * 0.42, bodyW * 0.3);
  group.add(statusLed);

  const rearCap = new THREE.Mesh(new THREE.CylinderGeometry(bodyH * 0.46, bodyH * 0.46, 0.006, 32), trim);
  rearCap.name = 'rear_cap';
  rearCap.rotation.z = Math.PI / 2;
  rearCap.position.x = -bodyLen / 2 - 0.003;
  group.add(rearCap);

  const gland = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.011, 0.03, 20), rubber);
  gland.name = 'cable_gland';
  gland.rotation.x = Math.PI / 2;
  gland.position.set(-bodyLen / 2 + 0.015, -bodyH * 0.5, 0);
  group.add(gland);

  const bracketGroup = new THREE.Group();
  bracketGroup.name = 'bracket_group';
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.052, 0.058), housing);
  plate.name = 'bracket_plate';
  bracketGroup.add(plate);

  const screwGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.005, 24);
  const screwHeadMat = trim;
  const screw1 = new THREE.Mesh(screwGeo, screwHeadMat);
  screw1.rotation.z = Math.PI / 2;
  screw1.position.set(0.006, 0.014, 0.014);
  bracketGroup.add(screw1);
  const slot1 = new THREE.Mesh(new THREE.BoxGeometry(0.001, 0.009, 0.001), dark);
  slot1.position.set(0.009, 0.014, 0.014);
  bracketGroup.add(slot1);

  const screw2 = new THREE.Mesh(screwGeo, screwHeadMat);
  screw2.rotation.z = Math.PI / 2;
  screw2.position.set(0.006, 0.014, -0.014);
  bracketGroup.add(screw2);
  const slot2 = new THREE.Mesh(new THREE.BoxGeometry(0.001, 0.009, 0.001), dark);
  slot2.position.set(0.009, 0.014, -0.014);
  bracketGroup.add(slot2);

  bracketGroup.position.set(-bodyLen * 0.28, bodyH * 0.48, 0);
  bracketGroup.rotation.z = -0.22;
  group.add(bracketGroup);

  group.rotation.y = Math.PI * 0.16;
  group.rotation.x = -0.04;
  return group;
}

function makeShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(0,0,0,0.5)');
    grad.addColorStop(0.6, 'rgba(0,0,0,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export interface CameraSceneInstance {
  dispose: () => void;
  resize: () => void;
}

export function mountCameraScene(
  canvas: HTMLCanvasElement,
  opts?: { accentHex?: number },
): CameraSceneInstance {
  const accentHex = opts?.accentHex ?? 0x3fa9f5;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 10);
  camera.position.set(0.6, 0.3, 0.82);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'grab';

  const origRelease = canvas.releasePointerCapture.bind(canvas);
  canvas.releasePointerCapture = (id: number) => {
    try {
      origRelease(id);
    } catch {
      // Ignored: stray pointer id
    }
  };

  const origSet = canvas.setPointerCapture.bind(canvas);
  canvas.setPointerCapture = (id: number) => {
    try {
      origSet(id);
    } catch {
      // Ignored: stray pointer id
    }
  };

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const key = new THREE.DirectionalLight(0xfff2e0, 2.3);
  key.position.set(1.2, 1.4, 0.8);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x8fb8ff, 0.7);
  fill.position.set(-1.2, 0.4, -0.6);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xbfe0ff, 1.2);
  rim.position.set(-0.4, 0.6, -1.3);
  scene.add(rim);

  scene.add(new THREE.AmbientLight(0x404550, 0.5));

  const model = buildBulletCamera(accentHex);
  scene.add(model);

  const shadowMat = new THREE.MeshBasicMaterial({
    map: makeShadowTexture(),
    transparent: true,
    depthWrite: false,
  });
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), shadowMat);
  shadowPlane.name = 'contact_shadow';
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.09;
  scene.add(shadowPlane);

  const target = new THREE.Vector3(0, -0.01, 0);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 0.5;
  controls.maxDistance = 1.3;
  controls.minPolarAngle = Math.PI * 0.18;
  controls.maxPolarAngle = Math.PI * 0.82;
  controls.rotateSpeed = 0.7;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.4;
  controls.update();

  const onPointerDown = () => {
    canvas.style.cursor = 'grabbing';
    controls.autoRotate = false;
  };
  const onPointerUp = () => {
    canvas.style.cursor = 'grab';
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUp);

  let idleTimer: ReturnType<typeof setTimeout> | null = null;
  const onControlsEnd = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      controls.autoRotate = true;
    }, 3500);
  };
  controls.addEventListener('end', onControlsEnd);

  let raf: number | null = null;
  let t = 0;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = canvas.clientWidth || parent.clientWidth;
    const h = canvas.clientHeight || parent.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  let ro: ResizeObserver | null = null;
  if (canvas.parentElement && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
  }
  resize();

  function loop() {
    raf = requestAnimationFrame(loop);
    t += 0.016;
    model.position.y = Math.sin(t * 0.6) * 0.005;
    controls.update();
    renderer.render(scene, camera);
  }
  loop();

  function dispose() {
    if (raf !== null) cancelAnimationFrame(raf);
    if (idleTimer) clearTimeout(idleTimer);
    if (ro) ro.disconnect();
    canvas.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointerup', onPointerUp);
    controls.removeEventListener('end', onControlsEnd);
    controls.dispose();

    scene.traverse((obj: THREE.Object3D) => {
      if ('geometry' in obj && obj.geometry instanceof THREE.BufferGeometry) {
        obj.geometry.dispose();
      }
      if ('material' in obj) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else if (mat) {
          mat.dispose();
        }
      }
    });

    if (scene.environment) {
      scene.environment.dispose();
    }
    pmrem.dispose();
    renderer.dispose();
  }

  return { dispose, resize };
}
