import { LockGarageRequest } from "../request/lockGarage";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function lockGarage(w: World, req: LockGarageRequest): GenericResponse {
  return {
    type: "generic_res",
    status: 1, // ignored
  };
}
