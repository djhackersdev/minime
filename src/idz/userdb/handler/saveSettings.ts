import { SaveSettingsRequest } from "../request/saveSettings";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export async function saveSettings(
  w: Repositories,
  req: SaveSettingsRequest
): Promise<GenericResponse> {
  const profileId = await w.profile().find(req.aimeId, req.version);

  await w.settings().save(profileId, req.settings);

  return { type: "generic_res" };
}
