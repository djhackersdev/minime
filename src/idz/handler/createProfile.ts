import { Id } from "../model/base";
import { MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { Team } from "../model/team";
import { Unlocks } from "../model/unlocks";
import { CreateProfileRequest } from "../request/createProfile";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export async function createProfile(
  w: World,
  req: CreateProfileRequest
): Promise<GenericResponse> {
  const profileId = await w.profile().generateId();

  const profile: Profile = {
    id: profileId,
    teamId: 2 as Id<Team>, // TODO
    name: req.name,
    lv: 1,
    exp: 0,
    fame: 0,
    dpoint: 0,
    mileage: 0,
  };

  const missions: MissionState = { team: [], solo: [] };
  const settings: Settings = { music: 0, pack: 13640, paperCup: 0, gauges: 5 };
  const story: Story = { x: 0, y: 0, rows: [] };
  const unlocks: Unlocks = {
    cup: 0,
    gauges: 1 << 5,
    music: 0,
    lastMileageReward: 0,
  };

  await Promise.all([
    w.profile().save(profile.id, profile),
    w.chara().save(profile.id, req.chara),
    w.car().saveCar(profile.id, req.car),
    w.car().saveSelection(profile.id, req.car.selector),
    w.missions().save(profile.id, missions),
    w.settings().save(profile.id, settings),
    w.story().save(profile.id, story),
    w.unlocks().save(profile.id, unlocks),
    w.tickets().save(profile.id, {}),
  ]);

  return {
    type: "generic_res",
    status: 1,
  };
}
