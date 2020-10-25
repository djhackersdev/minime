import { MissionState } from "../model/mission";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";
import { Story, StoryRow } from "../model/story";
import { Unlocks } from "../model/unlocks";
import { CreateProfileRequest } from "../request/createProfile";
import { CreateProfileResponse } from "../response/createProfile";
import { Repositories } from "../repo";

export async function createProfile(
  w: Repositories,
  req: CreateProfileRequest
): Promise<CreateProfileResponse> {
  const { aimeId, version, name } = req;
  const now = new Date();

  const profile: Profile = {
    aimeId,
    version,
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
  const settings: Settings = {
    music: 0,
    pack: 13640,
    aura: 0,
    paperCup: 0,
    gauges: 5,
    drivingStyle: 0, // Not supported until idz2
  };
  const story: Story = {
    x: 0,
    y: 0,
    rows: new Map<number, StoryRow>(),
  };
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
    type: "create_profile_res",
    aimeId: aimeId,
  };
}
