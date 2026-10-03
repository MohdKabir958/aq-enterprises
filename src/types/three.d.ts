/**
 * Type declarations for Three.js modules when @types/three is not installed.
 */

declare module 'three' {
  export const CanvasTexture: any;
  export const Shape: any;
  export const ExtrudeGeometry: any;
  export const Mesh: any;
  export const Group: any;
  export const MeshPhysicalMaterial: any;
  export const MeshStandardMaterial: any;
  export const CylinderGeometry: any;
  export const TorusGeometry: any;
  export const SphereGeometry: any;
  export const BoxGeometry: any;
  export const SRGBColorSpace: any;
  export const Scene: any;
  export const PerspectiveCamera: any;
  export const WebGLRenderer: any;
  export const ACESFilmicToneMapping: any;
  export const PMREMGenerator: any;
  export const DirectionalLight: any;
  export const AmbientLight: any;
  export const MeshBasicMaterial: any;
  export const PlaneGeometry: any;
  export const Vector3: any;
  export const RepeatWrapping: any;
  export const BufferGeometry: any;

  export type CanvasTexture = any;
  export type Shape = any;
  export type Material = any;
  export type Mesh = any;
  export type Group = any;
  export type Object3D = any;
  export type BufferGeometry = any;
  export type Scene = any;
  export type Camera = any;
}

declare module 'three/examples/jsm/environments/RoomEnvironment.js' {
  export class RoomEnvironment {
    constructor();
  }
}

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  export class OrbitControls {
    constructor(object: any, domElement?: HTMLElement);
    target: any;
    enableDamping: boolean;
    dampingFactor: number;
    enablePan: boolean;
    minDistance: number;
    maxDistance: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    rotateSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    update(): void;
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
    dispose(): void;
  }
}
