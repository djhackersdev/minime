import { readAimeId } from "../proto/base";
import { writeUserData } from "../proto/userData";
import { Repositories } from "../repo";
import { GetUserDataRequest } from "../request/getUserData";
import { GetUserDataResponse } from "../response/getUserData";

export default async function getUserData(
  rep: Repositories,
  req: GetUserDataRequest
): Promise<GetUserDataResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const userData = await rep.userData().load(profileId);

  return {
    userId: req.userId,
    userData: writeUserData(userData),
  };
}
