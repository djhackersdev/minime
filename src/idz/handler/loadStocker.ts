import { LoadStockerRequest } from "../request/loadStocker";
import { LoadStockerResponse } from "../response/loadStocker";
import { World } from "../world";

export function loadStocker(
  w: World,
  req: LoadStockerRequest
): LoadStockerResponse {
  return {
    type: "load_stocker_res",
    status: 1,
    backgrounds: [],
  };
}
