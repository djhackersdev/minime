import { SaveGarageRequest } from "../request/saveGarage";
import { SaveGarageResponse } from "../response/saveGarage";
import { Repositories } from "../repo";

export function saveGarage(
  w: Repositories,
  req: SaveGarageRequest
): SaveGarageResponse {
  return {
    type: "save_garage_res",
    status: 0, // Zero means success for this particular message -.-
  };
}
