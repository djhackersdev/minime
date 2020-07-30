import { readAimeId } from "../proto/base";
import { writeUserCharge } from "../proto/userCharge";
import { Repositories } from "../repo";
import { GetUserChargeRequest } from "../request/getUserCharge";
import { GetUserChargeResponse } from "../response/getUserCharge";

export default async function getUserCharge(
  rep: Repositories,
  req: GetUserChargeRequest
): Promise<GetUserChargeResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userCharge().load(profileId);

  return {
    userId: req.userId,
    length: items.length.toString(),
    userChargeList: items.map(writeUserCharge),
  };
}
