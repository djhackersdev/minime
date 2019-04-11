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
  const profile: Profile = {
    id: 1 as Id<Profile>,
    teamId: 2 as Id<Team>,
    name: req.name,
    lv: 1,
    exp: 0,
    fame: 0,
    dpoint: 0,
  };

  const missions: MissionState = {
    team: [],
    solo: [],
  };

  const settings: Settings = {
    bgMusic: 0,
    forceQuitEn: false,
    steeringForce: 4,
    bgVolume: 10,
    seVolume: 10,
    cornerGuide: true,
    lineGuide: false,
    ghostEn: false,
    taResultSkip: false,
  };

  const story: Story = { x: 0, y: 0, rows: [] };

  const unlocks: Unlocks = { cup: 0, gauges: 0, music: 0 };

  await Promise.all([
    w.profile().save(profile.id, profile),
    w.chara().save(profile.id, req.chara),
    w.car().save(profile.id, req.car),
    w.missions().save(profile.id, missions),
    w.settings().save(profile.id, settings),
    w.unlocks().save(profile.id, unlocks),
  ]);

  return {
    type: "generic_res",
    status: 1,
  };
}
