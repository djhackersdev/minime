import { readAimeId } from "../proto/base";
import { writeUserGameOptionEx } from "../proto/userGameOptionEx";
import { Repositories } from "../repo";
import { GetUserOptionExRequest } from "../request/getUserOptionEx";
import { GetUserOptionExResponse } from "../response/getUserOptionEx";

export default async function getUserOptionEx(
  rep: Repositories,
  req: GetUserOptionExRequest
): Promise<GetUserOptionExResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const userGameOptionEx = await rep.userGameOptionEx().load(profileId);

  return {
    userId: req.userId,
    userGameOptionEx: writeUserGameOptionEx(userGameOptionEx),
  };
}
