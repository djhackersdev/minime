import { loadJson, saveJson } from "./_util";
import { FacetRepository } from "./defs";
import { Id } from "../model/base";
import { Profile } from "../model/profile";

export class FacetRepositoryImpl<T> implements FacetRepository<T> {
  private _path: string;

  constructor(root: string, name: string) {
    this._path = `${root}/${name}.json`;
  }

  load(id: Id<Profile>): Promise<T> {
    return loadJson(this._path);
  }

  save(id: Id<Profile>, obj: T) {
    return saveJson(this._path, obj);
  }
}
