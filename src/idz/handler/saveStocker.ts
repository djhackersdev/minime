import { SaveStockerRequest } from "../request/saveStocker";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveStocker(
  w: Repositories,
  req: SaveStockerRequest
): Promise<GenericResponse> {
  const profileId = await w.profile().find(req.aimeId);

  await Promise.all([
    w.backgrounds().saveAll(profileId, req.backgrounds),
    w.chara().save(profileId, req.chara),
    w.car().saveSelection(profileId, req.selectedCar),
  ]);

  return { type: "generic_res" };
}
