import { SaveProfileRequest } from "../request/saveProfile";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export async function saveProfile(
  w: World,
  req: SaveProfileRequest
): Promise<GenericResponse> {
  const profile = await w.profile().load(req.profileId);
  const chara = await w.chara().load(req.profileId);

  await Promise.all([
    w.profile().save(req.profileId, {
      ...profile,
      lv: req.lv,
      exp: req.exp,
      fame: req.fame,
      dpoint: req.dpoint,
      mileage: req.mileage,
    }),
    w.chara().save(req.profileId, {
      ...chara,
      title: req.title,
      background: req.background,
    }),
    w.car().save(req.profileId, req.car),
    w.coursePlays().save(req.profileId, req.coursePlays),
    w.missions().save(req.profileId, req.missions),
    w.story().save(req.profileId, req.story),
    w.titles().save(req.profileId, req.titles),
    w.unlocks().save(req.profileId, req.unlocks),
    w.settings().save(req.profileId, req.settings),
  ]);

  return {
    type: "generic_res",
    status: 1,
  };
}
