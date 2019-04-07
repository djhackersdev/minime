import { SaveStockerRequest } from "../request/saveStocker";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export async function saveStocker(
  w: World,
  req: SaveStockerRequest
): Promise<GenericResponse> {
  await w.backgrounds().save(req.profileId, req.backgrounds);
  await w.chara().save(req.profileId, req.chara);

  return { type: "generic_res" };
}
