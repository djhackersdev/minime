import { Message00AD } from "../request/msg00AD";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function msg00AD(w: World, req: Message00AD): GenericResponse {
  return { type: "generic_res" };
}
