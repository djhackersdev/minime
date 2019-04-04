import { SaveSettingsRequest } from "../request/saveSettings";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export function saveSettings(
  w: World,
  req: SaveSettingsRequest
): GenericResponse {
  return {
    type: "generic_res",
    status: 1, // ignored but whatever
  };
}
