import * as fs from "fs";
import { promisify } from "util";

import { loadJson, saveJson } from "./_util";
import { ProfileRepository } from "../repo";
import { Id } from "../model/base";
import { Profile } from "../model/profile";
import { AimeId } from "../../model";

const exists = promisify(fs.exists);

export class ProfileRepositoryImpl implements ProfileRepository {
  private readonly _path: string;

  constructor(root) {
    this._path = root + "/profile.json";
  }

  async generateId(): Promise<Id<Profile>> {
    return 1 as Id<Profile>;
  }

  discoverByAimeId(id: AimeId): Promise<boolean> {
    return exists(this._path);
  }

  loadByAimeId(id: AimeId): Promise<Profile> {
    return loadJson(this._path);
  }

  load(id: Id<Profile>): Promise<Profile> {
    return loadJson(this._path);
  }

  save(id: Id<Profile>, profile: Profile): Promise<void> {
    return saveJson(this._path, profile);
  }
}
