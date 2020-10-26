import { StampCode, TitleCode } from "../model/base";
import { Car } from "../model/car";
import { Chara } from "../model/chara";
import { MissionState } from "../model/mission";
import { Settings } from "../model/settings";
import { SelectedStamps } from "../model/stamps";
import { Story } from "../model/story";
import { Tickets } from "../model/tickets";
import { TimeAttackScore } from "../model/timeAttack";
import { Unlocks } from "../model/unlocks";
import { WeeklyMissions } from "../model/weeklyMissions";
import { AimeId } from "../../../model";

export interface LoadProfileResponse {
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
  stamps: Set<StampCode>;
  selectedStamps: SelectedStamps;
  weeklyMissions: WeeklyMissions;
  // giga TODO
}
