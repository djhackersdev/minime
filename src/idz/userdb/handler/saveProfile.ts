import { SaveProfileRequest } from "../request/saveProfile";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveProfile(
  w: Repositories,
  req: SaveProfileRequest
): Promise<GenericResponse> {
  const now = new Date();
  const profileId = await w.profile().find(req.aimeId, req.version);
  const profile = await w.profile().load(profileId);
  const chara = await w.chara().load(profileId);

  await w.profile().save(profileId, {
    ...profile,
    lv: req.lv,
    exp: req.exp,
    fame: req.fame,
    dpoint: req.dpoint,
    mileage: req.mileage,
    accessTime: now,
  });

  await w.chara().save(profileId, {
    ...chara,
    title: req.title,
    background: req.background,
  });

  await w.car().saveCar(profileId, req.car);
  await w.coursePlays().saveAll(profileId, req.coursePlays);
  await w.missions().save(profileId, req.missions);
  await w.story().save(profileId, req.story);
  await w.titles().saveAll(profileId, req.titles);
  await w.unlocks().save(profileId, req.unlocks);
  await w.settings().save(profileId, req.settings);
  await w.tickets().save(profileId, req.tickets);

  if (req.selectedStamps) {
    await w.stamps().saveSelection(profileId, req.selectedStamps);
  }

  if (req.stamps) {
    await w.stamps().saveAll(profileId, req.stamps);
  }

  if (req.weeklyMissions) {
    await w.weeklyMissions().save(profileId, req.weeklyMissions);
  }

  return {
    type: "generic_res",
    status: 1,
  };
}
