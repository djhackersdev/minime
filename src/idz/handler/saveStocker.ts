import { SaveStockerRequest } from "../request/saveStocker";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveStocker(
  w: Repositories,
  req: SaveStockerRequest
): Promise<GenericResponse> {
  await Promise.all([
    w.backgrounds().saveAll(req.profileId, req.backgrounds),
    w.chara().save(req.profileId, req.chara),
    w.car().saveSelection(req.profileId, req.selectedCar),
  ]);

  return { type: "generic_res" };
}
