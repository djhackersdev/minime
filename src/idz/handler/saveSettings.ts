import { SaveSettingsRequest } from "../request/saveSettings";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export async function saveSettings(
  w: World,
  req: SaveSettingsRequest
): Promise<GenericResponse> {
  await w.settings().save(req.profileId, req.settings);

  return {
    type: "generic_res",
    status: 1, // ignored but whatever
  };
}
