import * as fs from "fs";

import { loadJson, saveJson } from "./_util";
import { TimeAttackRepository } from "../repo";
import { Id } from "../model/base";
import { Profile } from "../model/profile";
import { TimeAttackScore } from "../model/timeAttack";

interface TimeAttackJson {
  scores: TimeAttackScore[];
}

export class TimeAttackRepositoryImpl implements TimeAttackRepository {
  private readonly _path: string;

  constructor(root) {
    this._path = root + "/timeAttack.json";
  }

  async loadAll(profileId: Id<Profile>): Promise<TimeAttackScore[]> {
    if (!fs.existsSync(this._path)) {
      return [];
    }

    const json: TimeAttackJson = await loadJson(this._path);

    return json.scores;
  }

  async load(
    profileId: Id<Profile>,
    courseId: number
  ): Promise<TimeAttackScore | undefined> {
    const scores = await this.loadAll(profileId);

    return scores.find(item => item.courseId === courseId);
  }

  async save(profileId: Id<Profile>, score: TimeAttackScore): Promise<void> {
    const scores = await this.loadAll(profileId);
    const rest = scores.filter(item => item.courseId !== score.courseId);

    const updated: TimeAttackJson = { scores: [...rest, score] };

    return saveJson(this._path, updated);
  }
}
