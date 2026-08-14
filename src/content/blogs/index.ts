/**
 * Blog / resource content collection — Wave A + Wave B + Wave C published.
 *
 * HOW TO ADD A POST:
 * 1. Create a file using createBlogPost from `./_factory`.
 * 2. Export it here and append to `blogs`.
 * 3. Set relatedBlogs only to published slugs.
 */

import type { BlogPost } from '@/types';
import { howCctvSystemsWork } from './how-cctv-systems-work';
import { dvrVsNvr } from './dvr-vs-nvr';
import { ipCameraVsAnalog } from './ip-camera-vs-analog-camera';
import { howManyCameras } from './how-many-cctv-cameras-do-you-need';
import { howMuchStorage } from './how-much-cctv-storage-do-you-need';
import { costFactorsHyderabad } from './cctv-installation-cost-factors-hyderabad';
import { installChecklist } from './cctv-installation-planning-checklist';
import { remoteViewing } from './remote-cctv-viewing-explained';
import { indoorVsOutdoor } from './indoor-vs-outdoor-cctv-cameras';
import { nightVision } from './night-vision-low-light-cctv';
import { maintenanceChecklist } from './cctv-maintenance-checklist';
import { commonProblems } from './common-cctv-problems';
import { repairVsReplace } from './repair-vs-replace-cctv-system';
import { apartmentPlanning } from './cctv-planning-for-apartments-housing-societies';
import { officePlanning } from './cctv-planning-for-offices-it-workplaces';
import { warehousePlanning } from './cctv-planning-for-warehouses-logistics';
import { factoryPlanning } from './cctv-planning-for-factories-industrial';
import { homeVillaPlanning } from './residential-cctv-planning-homes-vs-villas';
import { accessGuide } from './access-control-systems-buyers-guide';
import { biometricVsAccess } from './biometric-attendance-vs-door-access-control';
import { vdpGuide } from './video-door-phone-buying-guide';
import { poeNetworking } from './poe-networking-basics-for-ip-cctv';
import { hydApartments } from './cctv-considerations-hyderabad-apartments';
import { hydItOffices } from './cctv-considerations-hyderabad-it-offices';
import { ptzUseCases } from './when-ptz-cameras-help';
import { wirelessWhen } from './when-wireless-cctv-makes-sense';

export const blogs: BlogPost[] = [
  // Wave A
  howCctvSystemsWork,
  dvrVsNvr,
  ipCameraVsAnalog,
  howManyCameras,
  howMuchStorage,
  costFactorsHyderabad,
  // Wave B
  installChecklist,
  remoteViewing,
  indoorVsOutdoor,
  nightVision,
  maintenanceChecklist,
  commonProblems,
  repairVsReplace,
  // Wave C — property / system application
  apartmentPlanning,
  officePlanning,
  warehousePlanning,
  factoryPlanning,
  homeVillaPlanning,
  accessGuide,
  biometricVsAccess,
  vdpGuide,
  poeNetworking,
  hydApartments,
  hydItOffices,
  ptzUseCases,
  wirelessWhen,
];

export {
  howCctvSystemsWork,
  dvrVsNvr,
  ipCameraVsAnalog,
  howManyCameras,
  howMuchStorage,
  costFactorsHyderabad,
  installChecklist,
  remoteViewing,
  indoorVsOutdoor,
  nightVision,
  maintenanceChecklist,
  commonProblems,
  repairVsReplace,
  apartmentPlanning,
  officePlanning,
  warehousePlanning,
  factoryPlanning,
  homeVillaPlanning,
  accessGuide,
  biometricVsAccess,
  vdpGuide,
  poeNetworking,
  hydApartments,
  hydItOffices,
  ptzUseCases,
  wirelessWhen,
};
