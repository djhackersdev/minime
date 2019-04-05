import { SaveGarageRequest } from "../request/saveGarage";
import { SaveGarageResponse } from "../response/saveGarage";
import { World } from "../world";

export function saveGarage(
  w: World,
  req: SaveGarageRequest
): SaveGarageResponse {
  return {
    type: "save_garage_res",
    status: 0, // Zero means success for this particular message -.-
  };
}
