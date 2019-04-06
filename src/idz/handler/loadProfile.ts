import { LoadProfileRequest } from "../request/loadProfile";
import { LoadProfileResponse2 } from "../response/loadProfile2";
import { World } from "../world";

export async function loadProfile(
  w: World,
  req: LoadProfileRequest
): Promise<LoadProfileResponse2> {
  const profile = await w.profile().loadByAimeId(req.aimeId);
  const settings = await w.settings().load(profile.id);
  const chara = await w.chara().load(profile.id);
  const titles = await w.titles().load(profile.id);
  const car = await w.car().load(profile.id);

  return {
    type: "load_profile_v2_res",
    name: profile.name,
    profileId: profile.id,
    lv: profile.lv,
    fame: profile.fame,
    dpoint: profile.dpoint,
    teamId: profile.teamId,
    settings,
    chara,
    titles,
    car,
  };
}
