import { UserCourseItem } from "../model/userCourse";
import { Crush, readBoolean, readDate, writeObject } from "./base";

export type UserCourseJson = Crush<UserCourseItem>;

export function readUserCourse(json: UserCourseJson): UserCourseItem {
  return {
    classId: parseInt(json.classId),
    courseId: parseInt(json.courseId),
    eventId: parseInt(json.eventId),
    isAllJustice: readBoolean(json.isAllJustice),
    isClear: readBoolean(json.isClear),
    isFullCombo: readBoolean(json.isFullCombo),
    isSuccess: readBoolean(json.isSuccess),
    lastPlayDate: readDate(json.lastPlayDate),
    param1: parseInt(json.param1),
    param2: parseInt(json.param2),
    param3: parseInt(json.param3),
    param4: parseInt(json.param4),
    playCount: parseInt(json.playCount),
    scoreMax: parseInt(json.scoreMax),
    scoreRank: parseInt(json.scoreRank)
  }
}

export function writeUserCourse(obj: UserCourseItem): UserCourseJson {
  return writeObject(obj);
}
