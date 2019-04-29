import { Message00AD } from "../request/msg00AD";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function msg00AD(w: Repositories, req: Message00AD): GenericResponse {
  return { type: "generic_res" };
}
