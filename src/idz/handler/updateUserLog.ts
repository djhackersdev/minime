import { UpdateUserLogRequest } from "../request/updateUserLog";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function updateUserLog(
  w: World,
  req: UpdateUserLogRequest
): GenericResponse {
  return { type: "generic_res" };
}
