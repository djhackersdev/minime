import { loadNumberList, saveNumberList } from "./_util";
import { CoursePlaysRepository } from "./defs";
import { Id } from "../model/base";
import { Profile } from "../model/profile";

export class CoursePlaysRepositoryImpl implements CoursePlaysRepository {
  private readonly _path;

  constructor(root) {
    this._path = root + "/coursePlays.txt";
  }

  async loadAll(profileId: Id<Profile>): Promise<Map<number, number>> {
    const lines = await loadNumberList(this._path);
    const map = new Map<number, number>();

    for (let i = 0; i < lines.length; i++) {
      map.set(i, lines[i]);
    }

    return map;
  }

  saveAll(profileId: Id<Profile>, counts: Map<number, number>): Promise<void> {
    let max = 0;

    for (const key of counts.keys()) {
      if (max < key) {
        max = key;
      }
    }

    const array = new Array(max + 1);

    array.fill(0);

    for (const [k, v] of counts) {
      array[k] = v;
    }

    return saveNumberList(this._path, array);
  }
}
