import { LockGarageRequest } from "../request/lockGarage";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function lockGarage(
  w: Repositories,
  req: LockGarageRequest
): GenericResponse {
  return { type: "generic_res" };
}
