import { ExtId } from "../model/base";
import { MissionState } from "../model/mission";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { Team } from "../model/team";
import { Unlocks } from "../model/unlocks";
import { CreateProfileRequest } from "../request/createProfile";
import { GenericResponse } from "../response/generic";
import { ProfileSpec, Repositories } from "../repo";

export async function createProfile(
  w: Repositories,
  req: CreateProfileRequest
): Promise<GenericResponse> {
  const now = new Date();
  const profile: ProfileSpec = {
    teamId: 2 as ExtId<Team>, // TODO
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

  const profileId = await w.profile().create(req.aimeId, profile, now);

  await w.chara().save(profileId, req.chara);
  await w.car().saveCar(profileId, req.car);
  await w.car().saveSelection(profileId, req.car.selector);
  await w.missions().save(profileId, missions);
  await w.settings().save(profileId, settings);
  await w.story().save(profileId, story);
  await w.unlocks().save(profileId, unlocks);
  await w.tickets().save(profileId, {});

  return {
    type: "generic_res",
    status: profileId, // "Generic response" my fucking *ass*
  };
}
