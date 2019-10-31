import { Repositories } from "../repo";
import { GetUserCourseRequest } from "../request/getUserCourse";
import { GetUserCourseResponse } from "../response/getUserCourse";

export default async function getUserCourse(
  rep: Repositories,
  req: GetUserCourseRequest
): Promise<GetUserCourseResponse> {
  return {
    userId: req.userId,
    length: "0",
    nextIndex: "-1",
    userCourseList: [
      // This will get saved at some point I think
    ],
  };
}
