import { readAimeId } from "../proto/base";
import { writeUserDataEx } from "../proto/userDataEx";
import { Repositories } from "../repo";
import { GetUserDataExRequest } from "../request/getUserDataEx";
import { GetUserDataExResponse } from "../response/getUserDataEx";

export default async function getUserDataEx(
  rep: Repositories,
  req: GetUserDataExRequest
): Promise<GetUserDataExResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const userDataEx = await rep.userDataEx().load(profileId);

  return {
    userId: req.userId,
    userDataEx: writeUserDataEx(userDataEx),
  };
}
