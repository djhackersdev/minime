import { SaveStockerRequest } from "../request/saveStocker";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveStocker(
  w: Repositories,
  req: SaveStockerRequest
): Promise<GenericResponse> {
  const profileId = await w.profile().find(req.aimeId, req.version);

  await Promise.all([
    w.backgrounds().saveAll(profileId, req.backgrounds),
    w.chara().save(profileId, req.chara),
    w.car().saveSelection(profileId, req.selectedCar),
    req.myChara && w.myChara().saveAll(profileId, req.myChara),
    req.selectedStamps &&
      w.stamps().saveSelection(profileId, req.selectedStamps),
    req.stamps && w.stamps().saveAll(profileId, req.stamps),
  ]);

  return { type: "generic_res" };
}
