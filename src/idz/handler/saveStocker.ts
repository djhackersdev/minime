import { SaveStockerRequest } from "../request/saveStocker";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function saveStocker(
  w: World,
  req: SaveStockerRequest
): GenericResponse {
  return {
    type: "generic_res",
    status: 1, // ignored
  };
}
