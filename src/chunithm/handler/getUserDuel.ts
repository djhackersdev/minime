import { Repositories } from "../repo";
import { GetUserDuelRequest } from "../request/getUserDuel";
import { GetUserDuelResponse } from "../response/getUserDuel";
import { readAimeId } from "../proto/base";
import { writeUserDuelList } from "../proto/userDuelList";

export default async function getUserDuel(
  rep: Repositories,
  req: GetUserDuelRequest
): Promise<GetUserDuelResponse> {
  const aimeId = readAimeId(req.userId);
  // Get all duel entities if the client specifies to.
  const duelId = req.isAllDuel ? undefined : parseInt(req.duelId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userDuelList().load(profileId, duelId);

  return {
    userId: req.userId,
    length: items.length.toString(),
    userDuelList: items.map(writeUserDuelList),
  };
}
