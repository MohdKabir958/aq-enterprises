import type { SVGProps } from 'react';
const paths = {
  'arrow-up-right': 'M7 17 17 7M7 7h10v10',
  'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
  pin: 'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  phone: 'M8 3H4v4c0 7 6 13 13 13h4v-4l-5-2-2 3c-3-1-5-3-6-6l3-2-3-6Z',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',
  shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6',
  cart: 'M2 3h3l3 12h11l3-9H6M8 15l-1 3h13M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
  wifi: 'M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 16a5 5 0 0 1 6 0m-3 4h.01',
  grid: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
  package: 'm12 3 9 5v9l-9 5-9-5V8l9-5Zm-9 5 9 5 9-5M12 13v9M7 6l10 5',
  file: 'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h6',
  image: 'M3 3h18v18H3V3Zm0 13 5-5 5 5 3-3 5 5M16 7h.01',
  settings: 'M4 7h16M4 17h16M9 4v6m6 4v6',
  chart: 'M4 3v18h17M8 16v-5m5 5V6m5 10v-8',
  users:
    'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3m20 0v-3a4 4 0 0 0-3-4M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4-4a4 4 0 0 1 0 8',
  briefcase: 'M3 7h18v14H3V7Zm5 0V3h8v4M3 12l9 3 9-3m-9 2v3',
  star: 'm12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z',
  help: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01',
  logout: 'M9 3H3v18h6m5-15 6 6-6 6M8 12h12',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  plus: 'M12 5v14M5 12h14',
  check: 'm5 12 4 4L19 6',
  lock: 'M5 10h14v11H5V10Zm3 0V6a4 4 0 0 1 8 0v4m-4 4v3',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  'eye-off': 'm3 3 18 18M9 5c8-2 13 7 13 7l-3 4M6 6l-4 6s4 7 10 7l4-1',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'm6 6 12 12M18 6 6 18',
  globe:
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c4 5 4 13 0 18-4-5-4-13 0-18Z',
  calendar: 'M3 5h18v16H3V5Zm0 5h18M8 3v4m8-4v4M8 14h.01M12 14h.01',
  video: 'M3 6h12v12H3V6Zm12 4 6-4v12l-6-4',
} as const;
export type IconName = keyof typeof paths;
export default function Icon({
  name,
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
