import { SaveProfileRequest } from "../request/saveProfile";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveProfile(
  w: Repositories,
  req: SaveProfileRequest
): Promise<GenericResponse> {
  const profile = await w.profile().load(req.profileId);
  const chara = await w.chara().load(req.profileId);

  await w.profile().save({
    ...profile,
    lv: req.lv,
    exp: req.exp,
    fame: req.fame,
    dpoint: req.dpoint,
    mileage: req.mileage,
  });

  await w.chara().save(req.profileId, {
    ...chara,
    title: req.title,
    background: req.background,
  });

  await w.car().saveCar(req.profileId, req.car);
  await w.coursePlays().saveAll(req.profileId, req.coursePlays);
  await w.missions().save(req.profileId, req.missions);
  await w.story().save(req.profileId, req.story);
  await w.titles().saveAll(req.profileId, req.titles);
  await w.unlocks().save(req.profileId, req.unlocks);
  await w.settings().save(req.profileId, req.settings);
  await w.tickets().save(req.profileId, req.tickets);

  return {
    type: "generic_res",
    status: 1,
  };
}
