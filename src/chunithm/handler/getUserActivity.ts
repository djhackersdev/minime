import { readAimeId } from "../proto/base";
import { writeUserActivity } from "../proto/userActivity";
import { Repositories } from "../repo";
import { GetUserActivityRequest } from "../request/getUserActivity";
import { GetUserActivityResponse } from "../response/getUserActivity";

export default async function getUserActivity(
  rep: Repositories,
  req: GetUserActivityRequest
): Promise<GetUserActivityResponse> {
  const aimeId = readAimeId(req.userId);
  const kind = parseInt(req.kind);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userActivity().load(profileId, kind);

  return {
    userId: req.userId,
    length: items.length.toString(),
    kind: kind.toString(),
    userActivityList: items.map(writeUserActivity),
  };
}
