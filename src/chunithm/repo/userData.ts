import { UserDataItem } from "../model/userData";
import { AimeId, Id } from "../../model";

export interface UserDataRepository {
  load(profileId: Id<UserDataItem>): Promise<UserDataItem>;

  lookup(aimeId: AimeId): Promise<Id<UserDataItem>>;

  save(aimeId: AimeId, obj: UserDataItem): Promise<Id<UserDataItem>>;

  tryLookup(aimeId: AimeId): Promise<Id<UserDataItem> | undefined>;
}
