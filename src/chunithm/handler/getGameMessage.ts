import { Repositories } from "../repo";
import { GetGameMessageRequest } from "../request/getGameMessage";
import { GetGameMessageResponse } from "../response/getGameMessage";

export default async function getGameMessage(
  rep: Repositories,
  req: GetGameMessageRequest
): Promise<GetGameMessageResponse> {
  return {
    type: req.type,
    length: "0",
    gameMessageList: [],
  };
}
