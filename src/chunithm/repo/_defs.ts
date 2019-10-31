import { UserDataItem } from "../model/userData";
import { Id } from "../../model";

export interface Page {
  offset: number;
  limit: number;
}

export interface Repository<T> {
  save(profileId: Id<UserDataItem>, obj: T): Promise<void>;
}

export interface Repository1<T> extends Repository<T> {
  load(profileId: Id<UserDataItem>): Promise<T>;
}

export interface RepositoryN<T> extends Repository<T> {
  load(profileId: Id<UserDataItem>, page?: Page): Promise<T[]>;
}
