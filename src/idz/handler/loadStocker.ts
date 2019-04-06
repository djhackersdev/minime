import { LoadStockerRequest } from "../request/loadStocker";
import { LoadStockerResponse } from "../response/loadStocker";
import { World } from "../world";

export async function loadStocker(
  w: World,
  req: LoadStockerRequest
): Promise<LoadStockerResponse> {
  const backgrounds = await w.backgrounds().load(req.profileId);

  return {
    type: "load_stocker_res",
    status: 1,
    backgrounds,
  };
}
