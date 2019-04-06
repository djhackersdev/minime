import { Id } from "../model/base";
import { Profile } from "../model/profile";
import { Team } from "../model/team";
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
    fame: 0,
    dpoint: 0,
  };

  const settings = {
    bgMusic: 15,
    forceQuitEn: false,
    steeringForce: 4,
    bgVolume: 10,
    seVolume: 10,
    cornerGuide: true,
    lineGuide: false,
    ghostEn: false,
    taResultSkip: false,
  };

  await Promise.all([
    w.profile().save(profile.id, profile),
    w.chara().save(profile.id, req.chara),
    w.car().save(profile.id, req.car),
    w.settings().save(profile.id, settings),
  ]);

  return {
    type: "generic_res",
    status: 1,
  };
}
