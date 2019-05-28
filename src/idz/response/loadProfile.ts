import { TitleCode } from "../model/base";
import { Car } from "../model/car";
import { Chara } from "../model/chara";
import { MissionState } from "../model/mission";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { Tickets } from "../model/tickets";
import { TimeAttackScore } from "../model/timeAttack";
import { Unlocks } from "../model/unlocks";
import { AimeId } from "../../model";

interface LoadProfileResponseBase {
  type: "load_profile_res";
  name: string;
  aimeId: AimeId;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
  teamId?: number;
  teamLeader: boolean;
  settings: Settings;
  chara: Chara;
  titles: Set<TitleCode>;
  coursePlays: Map<number, number>;
  missions: MissionState;
  timeAttack: TimeAttackScore[];
  car: Car;
  carCount: number;
  story: Story;
  unlocks: Unlocks;
  tickets: Tickets;
  // giga TODO
}

export interface LoadProfileResponse1 extends LoadProfileResponseBase {
  format: 1;
}

export interface LoadProfileResponse2 extends LoadProfileResponseBase {
  format: 2;
}

export interface LoadProfileResponse3 extends LoadProfileResponseBase {
  format: 3;
}

export type LoadProfileResponse =
  | LoadProfileResponse1
  | LoadProfileResponse2
  | LoadProfileResponse3;
