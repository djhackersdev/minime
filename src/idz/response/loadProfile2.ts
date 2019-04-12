import { Id, TitleCode } from "../model/base";
import { Car } from "../model/car";
import { Chara } from "../model/chara";
import { MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { TimeAttackState } from "../model/timeAttack";
import { Unlocks } from "../model/unlocks";

export interface LoadProfileResponse2 {
  type: "load_profile_v2_res";
  name: string;
  profileId: Id<Profile>;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  teamId?: number;
  settings: Settings;
  chara: Chara;
  titles: TitleCode[];
  coursePlays: number[];
  missions: MissionState;
  timeAttack: TimeAttackState;
  car: Car;
  story: Story;
  unlocks: Unlocks;
  // giga TODO
}
