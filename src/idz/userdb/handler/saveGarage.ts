import { SaveGarageRequest } from "../request/saveGarage";
import { SaveGarageResponse } from "../response/saveGarage";
import { Repositories } from "../repo";

export async function saveGarage(
  w: Repositories,
  req: SaveGarageRequest
): Promise<SaveGarageResponse> {
  const profileId = await w.profile().find(req.aimeId, req.version);

  await w.car().saveCar(profileId, req.car);

  return {
    type: "save_garage_res",
    status: 0, // Zero means success for this particular message -.-
  };
}
