import { UpdateTeamPointsRequest } from "../request/updateTeamPoints";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function updateTeamPoints(
  w: World,
  req: UpdateTeamPointsRequest
): GenericResponse {
  return { type: "generic_res" };
}
