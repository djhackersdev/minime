import { UpdateResultRequest } from "../request/updateResult";
import { GenericResponse } from "../response/generic";

export function updateResult(req: UpdateResultRequest): GenericResponse {
  // Apparently field_000C in this supposedly-generic response matters here?!
  return { type: "generic_res" };
}
