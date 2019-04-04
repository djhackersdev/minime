import { SaveProfileRequest } from "../request/saveProfile";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function saveProfile(
  w: World,
  req: SaveProfileRequest
): GenericResponse {
  return {
    type: "generic_res",
    status: 1,
  };
}
