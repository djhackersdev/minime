import { UserCourseJson } from "../proto/userCourse";

export interface GetUserCourseResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  /** Integer, pagination cookie */
  nextIndex: string;

  userCourseList: UserCourseJson[];
}
