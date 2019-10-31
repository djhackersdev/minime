import { Repositories } from "../repo";
import { GetUserDuelRequest } from "../request/getUserDuel";
import { GetUserDuelResponse } from "../response/getUserDuel";

export default async function getUserDuel(
  rep: Repositories,
  req: GetUserDuelRequest
): Promise<GetUserDuelResponse> {
  return {
    userId: req.userId,
    length: "0",
    userDuelList: [],
  };
}
