import { CreateProfileRequest } from "../request/createProfile";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function createProfile(
  w: World,
  req: CreateProfileRequest
): GenericResponse {
  return {
    type: "generic_res",
    status: 1,
  };
}
