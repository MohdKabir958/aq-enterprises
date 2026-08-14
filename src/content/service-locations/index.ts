/**
 * P1 Service × Location allowlist — Phase 5B.
 * Only the 24 combinations approved in the Phase 5 matrix.
 */

import type { ServiceLocationPage } from '@/types';
import { hitechCityOfficeCctv } from './hitech-city__office-cctv-installation';
import { nacharamFactoryCctv } from './nacharam__factory-cctv-surveillance';
import { uppalWarehouseCctv } from './uppal__warehouse-cctv-installation';
import { banjaraHillsVillaCctv } from './banjara-hills__villa-cctv-installation';
import { gachibowliApartmentCctv } from './gachibowli__apartment-cctv-installation';
import { jubileeHillsHospitalCctv } from './jubilee-hills__hospital-cctv-installation';
import { kompallySchoolCctv } from './kompally__school-college-cctv-installation';
import { ameerpetRetailCctv } from './ameerpet__retail-shop-cctv-installation';
import { kukatpallyRetailCctv } from './kukatpally__retail-shop-cctv-installation';
import { financialDistrictOfficeCctv } from './financial-district__office-cctv-installation';
import { dlfCyberCityOfficeCctv } from './dlf-cyber-city__office-cctv-installation';
import { gachibowliOfficeCctv } from './gachibowli__office-cctv-installation';
import { hitechCityAccessControl } from './hitech-city__access-control-systems';
import { jubileeHillsVillaCctv } from './jubilee-hills__villa-cctv-installation';
import { banjaraHillsHomeCctv } from './banjara-hills__home-cctv-installation';
import { kondapurApartmentCctv } from './kondapur__apartment-cctv-installation';
import { begumpetHotelCctv } from './begumpet__hotel-cctv-installation';
import { kukatpallyHomeCctv } from './kukatpally__home-cctv-installation';
import { nanakramgudaApartmentCctv } from './nanakramguda__apartment-cctv-installation';
import { financialDistrictAccessControl } from './financial-district__access-control-systems';
import { banjaraHillsVideoDoorPhone } from './banjara-hills__video-door-phone-installation';
import { nacharamWarehouseCctv } from './nacharam__warehouse-cctv-installation';
import { uppalFactoryCctv } from './uppal__factory-cctv-surveillance';
import { madhapurOfficeCctv } from './madhapur__office-cctv-installation';

export const serviceLocations: ServiceLocationPage[] = [
  hitechCityOfficeCctv,
  nacharamFactoryCctv,
  uppalWarehouseCctv,
  banjaraHillsVillaCctv,
  gachibowliApartmentCctv,
  jubileeHillsHospitalCctv,
  kompallySchoolCctv,
  ameerpetRetailCctv,
  kukatpallyRetailCctv,
  financialDistrictOfficeCctv,
  dlfCyberCityOfficeCctv,
  gachibowliOfficeCctv,
  hitechCityAccessControl,
  jubileeHillsVillaCctv,
  banjaraHillsHomeCctv,
  kondapurApartmentCctv,
  begumpetHotelCctv,
  kukatpallyHomeCctv,
  nanakramgudaApartmentCctv,
  financialDistrictAccessControl,
  banjaraHillsVideoDoorPhone,
  nacharamWarehouseCctv,
  uppalFactoryCctv,
  madhapurOfficeCctv,
];
