import { loadNumberList, saveNumberList } from "./_util";
import { FlagRepository } from "./defs";
import { Id } from "../model/base";
import { Profile } from "../model/profile";

export class FlagRepositoryImpl<T extends number>
  implements FlagRepository<T> {
  private _path: string;

  constructor(root: string, name: string) {
    this._path = `${root}/${name}.txt`;
  }

  loadAll(profileId: Id<Profile>): Promise<T[]> {
    return loadNumberList(this._path);
  }

  saveAll(profileId: Id<Profile>, codes: T[]): Promise<void> {
    return saveNumberList(this._path, codes);
  }
}
