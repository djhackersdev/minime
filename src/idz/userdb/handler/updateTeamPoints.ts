import { UpdateTeamPointsRequest } from "../request/updateTeamPoints";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function updateTeamPoints(
  w: Repositories,
  req: UpdateTeamPointsRequest
): GenericResponse {
  return { type: "generic_res" };
}
