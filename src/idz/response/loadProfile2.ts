import { Settings } from "../model/settings";
import { Car } from "../model/car";

export interface LoadProfileResponse2 {
  type: "load_profile_v2_res";
  name: string;
  profileId: number;
  lv: number;
  fame: number;
  dpoint: number;
  teamId: number;
  settings: Settings;
  car: Car;
  // giga TODO
}
