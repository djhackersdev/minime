import { UnknownRequestA } from "../request/unknownA";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function unknownA(
  w: Repositories,
  req: UnknownRequestA
): GenericResponse {
  return { type: "generic_res" };
}
