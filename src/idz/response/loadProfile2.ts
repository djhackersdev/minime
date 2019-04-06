import { Id } from "../model/base";
import { Car } from "../model/car";
import { Chara } from "../model/chara";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";

export interface LoadProfileResponse2 {
  type: "load_profile_v2_res";
  name: string;
  profileId: Id<Profile>;
  lv: number;
  fame: number;
  dpoint: number;
  teamId?: number;
  settings: Settings;
  chara: Chara;
  titles: number[];
  car: Car;
  // giga TODO
}
