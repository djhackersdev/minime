import { UserActivityItem } from "../model/userActivity";

export interface UserActivityJson {
  // Not quite the same as our internal representation! Internally we refer to
  // the "id" field as "activityId", because the SQL table that stores these
  // values already has an "id" column that holds a synthetic primary key.

  kind: string;
  id: string;
  sortNumber: string;
  param1: string;
  param2: string;
  param3: string;
  param4: string;
}

export function readUserActivity(json: UserActivityJson): UserActivityItem {
  return {
    kind: parseInt(json.kind),
    activityId: parseInt(json.id), // <-- Look closely!
    sortNumber: parseInt(json.sortNumber),
    param1: parseInt(json.param1),
    param2: parseInt(json.param2),
    param3: parseInt(json.param3),
    param4: parseInt(json.param4),
  };
}

export function writeUserActivity(obj: UserActivityItem): UserActivityJson {
  return {
    kind: obj.kind.toString(),
    id: obj.activityId.toString(), // <-- Look closely!
    sortNumber: obj.sortNumber.toString(),
    param1: obj.param1.toString(),
    param2: obj.param2.toString(),
    param3: obj.param3.toString(),
    param4: obj.param4.toString(),
  };
}
