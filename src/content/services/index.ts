/**
 * Service content collection — Phase 4B.
 * One file per service; this barrel feeds getters + dynamic routes.
 */

import type { Service } from '@/types';
import { homeCctvInstallation } from './home-cctv-installation';
import { officeCctvInstallation } from './office-cctv-installation';
import { apartmentCctvInstallation } from './apartment-cctv-installation';
import { villaCctvInstallation } from './villa-cctv-installation';
import { factoryCctvSurveillance } from './factory-cctv-surveillance';
import { warehouseCctvInstallation } from './warehouse-cctv-installation';
import { retailShopCctvInstallation } from './retail-shop-cctv-installation';
import { schoolCollegeCctvInstallation } from './school-college-cctv-installation';
import { hospitalCctvInstallation } from './hospital-cctv-installation';
import { hotelCctvInstallation } from './hotel-cctv-installation';
import { ipCameraInstallation } from './ip-camera-installation';
import { wirelessCctvInstallation } from './wireless-cctv-installation';
import { ptzCameraInstallation } from './ptz-camera-installation';
import { biometricAttendanceSystems } from './biometric-attendance-systems';
import { accessControlSystems } from './access-control-systems';
import { videoDoorPhoneInstallation } from './video-door-phone-installation';
import { fireAlarmSystems } from './fire-alarm-systems';
import { commercialLanCablingNetworking } from './commercial-lan-cabling-networking';
import { cctvAmcMaintenance } from './cctv-amc-maintenance';
import { cctvRepairTroubleshooting } from './cctv-repair-troubleshooting';
import { solarCctvSystems } from './solar-cctv-systems';
import { intercomSystems } from './intercom-systems';

/** Published + draft services. Getters filter by status for public routes. */
export const services: Service[] = [
  homeCctvInstallation,
  officeCctvInstallation,
  apartmentCctvInstallation,
  villaCctvInstallation,
  factoryCctvSurveillance,
  warehouseCctvInstallation,
  retailShopCctvInstallation,
  schoolCollegeCctvInstallation,
  hospitalCctvInstallation,
  hotelCctvInstallation,
  ipCameraInstallation,
  wirelessCctvInstallation,
  ptzCameraInstallation,
  biometricAttendanceSystems,
  accessControlSystems,
  videoDoorPhoneInstallation,
  fireAlarmSystems,
  commercialLanCablingNetworking,
  cctvAmcMaintenance,
  cctvRepairTroubleshooting,
  solarCctvSystems,
  intercomSystems,
];

export {
  homeCctvInstallation,
  officeCctvInstallation,
  apartmentCctvInstallation,
  villaCctvInstallation,
  factoryCctvSurveillance,
  warehouseCctvInstallation,
  retailShopCctvInstallation,
  schoolCollegeCctvInstallation,
  hospitalCctvInstallation,
  hotelCctvInstallation,
  ipCameraInstallation,
  wirelessCctvInstallation,
  ptzCameraInstallation,
  biometricAttendanceSystems,
  accessControlSystems,
  videoDoorPhoneInstallation,
  fireAlarmSystems,
  commercialLanCablingNetworking,
  cctvAmcMaintenance,
  cctvRepairTroubleshooting,
  solarCctvSystems,
  intercomSystems,
};
