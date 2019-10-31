import { Repositories } from "../repo";
import { GetGameIdlistRequest } from "../request/getGameIdlist";
import { GetGameIdlistResponse } from "../response/getGameIdlist";

export default async function getGameIdlist(
  rep: Repositories,
  req: GetGameIdlistRequest
): Promise<GetGameIdlistResponse> {
  return {
    type: req.type,
    length: "0",
    gameIdlistList: [],
  };
}
