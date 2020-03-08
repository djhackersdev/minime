import { MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { Unlocks } from "../model/unlocks";
import { CreateProfileRequest } from "../request/createProfile";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function createProfile(
  w: Repositories,
  req: CreateProfileRequest
): Promise<GenericResponse> {
  const { aimeId, name } = req;
  const now = new Date();

  const profile: Profile = {
    aimeId,
    name,
    lv: 1,
    exp: 0,
    fame: 0,
    dpoint: 0,
    mileage: 0,
    accessTime: now,
    registerTime: now,
  };

  const missions: MissionState = { team: [], solo: [] };
  const settings: Settings = { music: 0, pack: 13640, aura: 0, paperCup: 0, gauges: 5 };
  const story: Story = { x: 0, y: 0, rows: [] };
  const unlocks: Unlocks = {
    auras: 1,
    cup: 0,
    gauges: 1 << 5,
    music: 0,
    lastMileageReward: 0,
  };

  const profileId = await w.profile().create(profile);

  await w.chara().save(profileId, req.chara);
  await w.car().saveCar(profileId, req.car);
  await w.car().saveSelection(profileId, req.car.selector);
  await w.missions().save(profileId, missions);
  await w.settings().save(profileId, settings);
  await w.story().save(profileId, story);
  await w.unlocks().save(profileId, unlocks);
  await w.tickets().save(profileId, {});

  await w.teamReservations().commitHack(aimeId);

  return {
    type: "generic_res",
    status: aimeId, // "Generic response" my fucking *ass*
  };
}
