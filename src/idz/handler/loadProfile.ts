import { LoadProfileRequest } from "../request/loadProfile";
import { LoadProfileResponse2 } from "../response/loadProfile2";
import { World } from "../world";

export async function loadProfile(
  w: World,
  req: LoadProfileRequest
): Promise<LoadProfileResponse2> {
  // Promise.all would be messy here, who cares anyway this isn't supposed to
  // be a high-performance server.

  const profile = await w.profile().loadByAimeId(req.aimeId);
  const settings = await w.settings().load(profile.id);
  const chara = await w.chara().load(profile.id);
  const titles = await w.titles().loadAll(profile.id);
  const coursePlays = await w.coursePlays().loadAll(profile.id);
  const missions = await w.missions().load(profile.id);
  const car = await w.car().loadSelectedCar(profile.id);
  const carCount = await w.car().countCars(profile.id);
  const story = await w.story().load(profile.id);
  const timeAttack = await w.timeAttack().loadAll(profile.id);
  const unlocks = await w.unlocks().load(profile.id);
  const tickets = await w.tickets().load(profile.id);

  return {
    type: "load_profile_v2_res",
    name: profile.name,
    profileId: profile.id,
    lv: profile.lv,
    exp: profile.exp,
    fame: profile.fame,
    dpoint: profile.dpoint,
    mileage: profile.mileage,
    teamId: profile.teamId,
    settings,
    chara,
    titles,
    coursePlays,
    missions,
    timeAttack,
    car,
    carCount,
    story,
    unlocks,
    tickets,
  };
}
