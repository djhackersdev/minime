import { BackgroundCode, Id, TitleCode } from "../model/base";
import { Car } from "../model/car";
import { MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { Unlocks } from "../model/unlocks";

export interface SaveProfileRequest {
  type: "save_profile_req";
  profileId: Id<Profile>;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  title: TitleCode;
  titles: TitleCode[];
  background: BackgroundCode;
  coursePlays: number[];
  missions: MissionState;
  car: Car;
  story: Story;
  unlocks: Unlocks;
  settings: Settings;
}
