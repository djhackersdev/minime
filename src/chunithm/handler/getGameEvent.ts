import { GameEventJson } from "../proto/gameEvent";
import { Repositories } from "../repo";
import { GetGameEventRequest } from "../request/getGameEvent";
import { GetGameEventResponse } from "../response/getGameEvent";
import { EVENT_IDS } from "../static/event";

export default async function getGameEvent(
  rep: Repositories,
  req: GetGameEventRequest
): Promise<GetGameEventResponse> {
  const gameEventList: GameEventJson[] = [];

  for (const id of EVENT_IDS) {
    gameEventList.push({
      type: req.type,
      id: id.toString(),
      startDate: "2017-12-05 07:00:00.0",
      endDate: "2099-12-31 00:00:00.0",
    });
  }

  return {
    type: req.type,
    length: gameEventList.length.toString(),
    gameEventList,
  };
}
