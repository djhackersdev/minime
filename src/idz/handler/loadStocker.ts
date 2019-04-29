import { LoadStockerRequest } from "../request/loadStocker";
import { LoadStockerResponse } from "../response/loadStocker";
import { Repositories } from "../repo";

export async function loadStocker(
  w: Repositories,
  req: LoadStockerRequest
): Promise<LoadStockerResponse> {
  const backgrounds = await w.backgrounds().loadAll(req.profileId);

  return {
    type: "load_stocker_res",
    status: 1,
    backgrounds,
  };
}
