import { UserDataItem } from "../model/userData";
import { UserPlaylogItem } from "../model/userPlaylog";
import { Id } from "../../model";

export interface UserPlaylogRepository {
  // This seems to only be used internally by SEGA for analytics, but the data
  // is nice to have.

  save(profileId: Id<UserDataItem>, obj: UserPlaylogItem): Promise<void>;
  loadLatest(profileId: Id<UserDataItem>, size: number): Promise<UserPlaylogItem[]>;
}
