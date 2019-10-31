import { readAimeId } from "../proto/base";
import { writeUserGameOption } from "../proto/userGameOption";
import { Repositories } from "../repo";
import { GetUserOptionRequest } from "../request/getUserOption";
import { GetUserOptionResponse } from "../response/getUserOption";

export default async function getUserOption(
  rep: Repositories,
  req: GetUserOptionRequest
): Promise<GetUserOptionResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const userGameOption = await rep.userGameOption().load(profileId);

  return {
    userId: req.userId,
    userGameOption: writeUserGameOption(userGameOption),
  };
}
