import { Id, TitleCode } from "../model/base";
import { Car } from "../model/car";
import { Chara } from "../model/chara";
import { MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { TimeAttackScore } from "../model/timeAttack";
import { Unlocks } from "../model/unlocks";

export interface LoadProfileResponse2 {
  type: "load_profile_v2_res";
  name: string;
  profileId: Id<Profile>;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
  teamId?: number;
  settings: Settings;
  chara: Chara;
  titles: TitleCode[];
  coursePlays: Map<number, number>;
  missions: MissionState;
  timeAttack: TimeAttackScore[];
  car: Car;
  carCount: number;
  story: Story;
  unlocks: Unlocks;
  // giga TODO
}
