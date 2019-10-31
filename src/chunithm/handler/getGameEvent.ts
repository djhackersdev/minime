import { Repositories } from "../repo";
import { GetGameEventRequest } from "../request/getGameEvent";
import { GetGameEventResponse } from "../response/getGameEvent";

export default async function getGameEvent(
  rep: Repositories,
  req: GetGameEventRequest
): Promise<GetGameEventResponse> {
  return {
    type: req.type,
    length: "0",
    gameEventList: [],
  };
}
