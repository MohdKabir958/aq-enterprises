/**
 * Planned photography slots for the eight published project case studies.
 *
 * These are requirements for real client photographs — not generated images.
 * Place files under /public/images/projects/{projectId}/{filename}.
 * Templates render next/image only after resolvePublicSrc() finds the file.
 */

import type { ImagePlaceholder } from '@/types';
import { ASSET_DIRS } from './assets';

export const PROJECT_PHOTO_WIDTH = 1600;
export const PROJECT_PHOTO_HEIGHT = 1067;

export type ProjectPhotoSlotId = 'exterior' | 'camera-mount' | 'nvr-rack' | 'overview';

export type ProjectPhotoSlot = {
  slot: ProjectPhotoSlotId;
  filename: string;
  alt: string;
  caption: string;
  label: string;
  width: number;
  height: number;
};

const SIZE = { width: PROJECT_PHOTO_WIDTH, height: PROJECT_PHOTO_HEIGHT };

function slot(
  id: ProjectPhotoSlotId,
  alt: string,
  caption: string,
  label: string,
): Omit<ProjectPhotoSlot, 'filename'> & { filename: string } {
  return {
    slot: id,
    filename: `${id}.webp`,
    alt,
    caption,
    label,
    ...SIZE,
  };
}

export const PROJECT_PHOTO_SPECS: Record<string, ProjectPhotoSlot[]> = {
  'villa-banjara': [
    slot(
      'exterior',
      'Approach to a residential villa CCTV installation in Banjara Hills, Hyderabad — compound and gate, no faces or number plates',
      'Villa approach and compound edge after install. Privacy-safe framing only.',
      'Villa approach photograph pending',
    ),
    slot(
      'camera-mount',
      'Outdoor CCTV camera mount at a villa gate or porch in Banjara Hills, Hyderabad',
      'Close-up of a weather-safe outdoor mount at the gate or porch.',
      'Camera mount photograph pending',
    ),
    slot(
      'nvr-rack',
      'NVR or DVR recorder installed for a Banjara Hills villa CCTV system',
      'Indoor recorder / rack location used for this villa system.',
      'Recorder photograph pending',
    ),
    slot(
      'overview',
      'Installed villa CCTV coverage of a driveway or garden in Banjara Hills, Hyderabad',
      'One working outdoor view after handover — no identifiable people.',
      'Coverage overview photograph pending',
    ),
  ],
  'factory-nacharam': [
    slot(
      'exterior',
      'Factory gate and yard at a Nacharam, Hyderabad manufacturing CCTV installation',
      'Industrial approach / material gate after install. No confidential process close-ups.',
      'Factory exterior photograph pending',
    ),
    slot(
      'camera-mount',
      'High-mount industrial CCTV camera at a Nacharam factory in Hyderabad',
      'Durable outdoor or high indoor mount used on the production or yard edge.',
      'Industrial camera mount pending',
    ),
    slot(
      'nvr-rack',
      'NVR rack in a security or control room at a Nacharam factory CCTV install',
      'Recorder rack and labelled cabling in the plant security room.',
      'NVR rack photograph pending',
    ),
    slot(
      'overview',
      'Factory floor or yard CCTV coverage at a Nacharam manufacturing unit, Hyderabad',
      'Wide operational view showing coverage intent — no secret processes or faces.',
      'Factory coverage photograph pending',
    ),
  ],
  'retail-ameerpet': [
    slot(
      'exterior',
      'Retail shopfront CCTV installation in Ameerpet or Kukatpally, Hyderabad',
      'Shopfront or shutter line after install. No customer faces or till contents.',
      'Shopfront photograph pending',
    ),
    slot(
      'camera-mount',
      'Indoor dome or turret camera covering a retail counter in Hyderabad',
      'Counter or aisle camera mount used in the multi-outlet rollout.',
      'Retail camera mount pending',
    ),
    slot(
      'nvr-rack',
      'Recorder and switch for a Hyderabad retail CCTV outlet',
      'Back-office recorder placement for one of the six outlets.',
      'Retail recorder photograph pending',
    ),
    slot(
      'overview',
      'Sales floor CCTV coverage in a Hyderabad retail outlet after installation',
      'Wide floor view showing counter-to-shutter coverage intent.',
      'Retail coverage photograph pending',
    ),
  ],
  'apartment-gachibowli': [
    slot(
      'exterior',
      'Apartment society gate CCTV installation in Gachibowli, Hyderabad',
      'Common-area gate or podium approach. No resident faces or flat interiors.',
      'Society gate photograph pending',
    ),
    slot(
      'camera-mount',
      'Lobby or parking CCTV camera mount at a Gachibowli apartment complex',
      'Approved common-area mount in lobby, lift lobby, or parking.',
      'Apartment camera mount pending',
    ),
    slot(
      'nvr-rack',
      'Society NVR room or rack at Lakeview Apartments, Gachibowli',
      'Association recorder room with labelled camera channels.',
      'Society NVR photograph pending',
    ),
    slot(
      'overview',
      'Apartment parking or lobby CCTV coverage in Gachibowli, Hyderabad',
      'Common-area overview after handover — no private dwellings.',
      'Society coverage photograph pending',
    ),
  ],
  'school-kompally': [
    slot(
      'exterior',
      'School campus gate CCTV installation in Kompally, Hyderabad',
      'Campus gate or drop-off edge. No children in frame.',
      'Campus gate photograph pending',
    ),
    slot(
      'camera-mount',
      'Corridor or gate CCTV camera mount at a Kompally school campus',
      'Corridor or perimeter mount used for campus coverage.',
      'Campus camera mount pending',
    ),
    slot(
      'nvr-rack',
      'School admin NVR rack for a Kompally campus CCTV system',
      'Admin or security-office recorder with restricted access.',
      'Campus NVR photograph pending',
    ),
    slot(
      'overview',
      'School campus CCTV coverage in Kompally, Hyderabad — no students visible',
      'Empty corridor, gate, or playground edge after hours. Never photograph minors.',
      'Campus coverage photograph pending',
    ),
  ],
  'office-hitech': [
    slot(
      'exterior',
      'Tech park office tower CCTV installation in Hitech City, Hyderabad',
      'Office floor or tower approach after install. Follow landlord photo rules.',
      'Office exterior photograph pending',
    ),
    slot(
      'camera-mount',
      'Office lobby or floor CCTV camera mount in Hitech City, Hyderabad',
      'Lobby, lift bank, or floor corridor mount.',
      'Office camera mount pending',
    ),
    slot(
      'nvr-rack',
      'Office NVR and network rack for a Hitech City CCTV installation',
      'Server / IDF rack showing recorder and PoE switch, labels visible.',
      'Office NVR rack photograph pending',
    ),
    slot(
      'overview',
      'Office floor CCTV coverage at a Hitech City tech park, Hyderabad',
      'Workplace overview after install — no screens with confidential data.',
      'Office coverage photograph pending',
    ),
  ],
  'warehouse-uppal': [
    slot(
      'exterior',
      'Cold storage warehouse exterior CCTV installation in Uppal, Hyderabad',
      'Dock or yard approach after install. No number plates or faces.',
      'Warehouse exterior photograph pending',
    ),
    slot(
      'camera-mount',
      'Dock or aisle CCTV camera mount at an Uppal warehouse',
      'High dock or racking-aisle mount used for warehouse coverage.',
      'Warehouse camera mount pending',
    ),
    slot(
      'nvr-rack',
      'Warehouse NVR rack at a cold storage facility in Uppal, Hyderabad',
      'Recorder placement in a dry, accessible plant room — not a fake photo.',
      'Warehouse NVR photograph pending',
    ),
    slot(
      'overview',
      'Warehouse dock or aisle CCTV coverage in Uppal, Hyderabad',
      'Wide dock or aisle view showing coverage intent.',
      'Warehouse coverage photograph pending',
    ),
  ],
  'hospital-jubilee': [
    slot(
      'exterior',
      'Hospital entry CCTV installation in Jubilee Hills, Hyderabad',
      'Public entry or ambulance approach. No patients, charts, or clinical rooms.',
      'Hospital entry photograph pending',
    ),
    slot(
      'camera-mount',
      'Hospital corridor CCTV camera mount in Jubilee Hills, Hyderabad',
      'Corridor or reception mount in a non-clinical public zone.',
      'Hospital camera mount pending',
    ),
    slot(
      'nvr-rack',
      'Hospital security NVR rack in Jubilee Hills, Hyderabad',
      'Security-office recorder with restricted access. No patient data on screens.',
      'Hospital NVR photograph pending',
    ),
    slot(
      'overview',
      'Hospital public-area CCTV coverage in Jubilee Hills, Hyderabad',
      'Empty public corridor or entry after hours — never photograph patients.',
      'Hospital coverage photograph pending',
    ),
  ],
};

export function projectPhotoSrc(projectId: string, filename: string): string {
  return `${ASSET_DIRS.projects}/${projectId}/${filename}`;
}

export function buildProjectGallery(
  projectId: string,
  fallbackAlt: string,
): ImagePlaceholder[] {
  const specs = PROJECT_PHOTO_SPECS[projectId];
  if (!specs) {
    return [
      {
        id: `${projectId}-gallery-1`,
        alt: fallbackAlt,
        label: 'Project photography pending — not a completed-job photo',
        filename: 'overview.webp',
        src: projectPhotoSrc(projectId, 'overview.webp'),
        caption: 'Real installation photograph required from the client.',
        width: PROJECT_PHOTO_WIDTH,
        height: PROJECT_PHOTO_HEIGHT,
      },
    ];
  }

  return specs.map((item) => ({
    id: `${projectId}-${item.slot}`,
    alt: item.alt,
    label: item.label,
    filename: item.filename,
    src: projectPhotoSrc(projectId, item.filename),
    caption: item.caption,
    width: item.width,
    height: item.height,
  }));
}

export function plannedProjectHeroSrc(projectId: string): string {
  return projectPhotoSrc(projectId, 'overview.webp');
}
