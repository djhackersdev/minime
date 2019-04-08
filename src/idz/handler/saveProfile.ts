import { SaveProfileRequest } from "../request/saveProfile";
import { GenericResponse } from "../response/generic";
import { World } from "../world";

export async function saveProfile(
  w: World,
  req: SaveProfileRequest
): Promise<GenericResponse> {
  const profile = await w.profile().load(req.profileId);

  await Promise.all([
    w.profile().save(req.profileId, {
      ...profile,
      lv: req.lv,
      exp: req.exp,
      fame: req.fame,
      dpoint: req.dpoint,
    }),
    w.story().save(req.profileId, req.story),
    w.titles().save(req.profileId, req.titles),
  ]);

  return {
    type: "generic_res",
    status: 1,
  };
}
