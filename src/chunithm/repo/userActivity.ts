import { UserActivityItem } from "../model/userActivity";
import { UserDataItem } from "../model/userData";
import { Id } from "../../model";

export interface UserActivityRepository {
  load(profileId: Id<UserDataItem>, kind: number): Promise<UserActivityItem[]>;

  save(profileId: Id<UserDataItem>, obj: UserActivityItem): Promise<void>;
}
