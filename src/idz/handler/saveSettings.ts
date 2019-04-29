import { SaveSettingsRequest } from "../request/saveSettings";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveSettings(
  w: Repositories,
  req: SaveSettingsRequest
): Promise<GenericResponse> {
  await w.settings().save(req.profileId, req.settings);

  return { type: "generic_res" };
}
