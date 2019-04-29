import { SaveExpeditionRequest } from "../request/saveExpedition";
import { GenericResponse } from "../response/generic";
import { SaveExpeditionResponse } from "../response/saveExpedition";
import { Repositories } from "../repo";

export function saveExpedition(
  w: Repositories,
  req: SaveExpeditionRequest
): GenericResponse | SaveExpeditionResponse {
  if (req.field_0004 === 0) {
    return {
      type: "generic_res",
      status: 0,
    };
  } else {
    return {
      type: "save_expedition_res",
    };
  }
}
