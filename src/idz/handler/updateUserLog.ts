import { UpdateUserLogRequest } from "../request/updateUserLog";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function updateUserLog(
  w: Repositories,
  req: UpdateUserLogRequest
): GenericResponse {
  return { type: "generic_res" };
}
