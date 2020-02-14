import { Repositories } from "../repo";
import { GetUserCourseRequest } from "../request/getUserCourse";
import { GetUserCourseResponse } from "../response/getUserCourse";
import { readAimeId } from "../proto/base";
import { paginationCookie } from "./_util";
import { writeUserCourse } from "../proto/userCourse";

export default async function getUserCourse(
  rep: Repositories,
  req: GetUserCourseRequest
): Promise<GetUserCourseResponse> {
  const aimeId = readAimeId(req.userId);
  const maxCount = parseInt(req.maxCount);
  const nextIndex = parseInt(req.nextIndex);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep
    .userCourse()
    .load(profileId, { limit: maxCount, offset: nextIndex });

  return {
    userId: req.userId,
    length: items.length.toString(),
    nextIndex: paginationCookie(items, { maxCount, nextIndex }),
    userCourseList: items.map(writeUserCourse)
  };
}
