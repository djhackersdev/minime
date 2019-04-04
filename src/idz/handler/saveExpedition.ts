import { SaveExpeditionRequest } from "../request/saveExpedition";
import { GenericResponse } from "../response/generic";
import { SaveExpeditionResponse } from "../response/saveExpedition";
import { World } from "../world";

export function saveExpedition(
  w: World,
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
