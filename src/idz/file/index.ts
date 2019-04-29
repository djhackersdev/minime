import * as fs from "fs";

import { FacetRepositoryImpl } from "./_facet";
import { FlagRepositoryImpl } from "./_flag";
import { CarRepositoryImpl } from "./car";
import { CoursePlaysRepositoryImpl } from "./coursePlays";
import { Repositories } from "../repo";
import { ProfileRepositoryImpl } from "./profile";
import { TicketsRepositoryImpl } from "./tickets";
import { TimeAttackRepositoryImpl } from "./timeAttack";
import * as Model from "../model";

export { Repositories as World };

class WorldImpl implements Repositories {
  constructor(private readonly _root: string) {}

  backgrounds() {
    return new FlagRepositoryImpl<Model.BackgroundCode>(
      this._root,
      "backgrounds"
    );
  }

  car() {
    return new CarRepositoryImpl(this._root);
  }

  chara() {
    return new FacetRepositoryImpl<Model.Chara>(this._root, "chara");
  }

  coursePlays() {
    return new CoursePlaysRepositoryImpl(this._root);
  }

  missions() {
    return new FacetRepositoryImpl<Model.MissionState>(this._root, "missions");
  }

  profile() {
    return new ProfileRepositoryImpl(this._root);
  }

  settings() {
    return new FacetRepositoryImpl<Model.Settings>(this._root, "settings");
  }

  story() {
    return new FacetRepositoryImpl<Model.Story>(this._root, "story");
  }

  tickets() {
    return new TicketsRepositoryImpl(this._root);
  }

  timeAttack() {
    return new TimeAttackRepositoryImpl(this._root);
  }

  titles() {
    return new FlagRepositoryImpl<Model.TitleCode>(this._root, "titles");
  }

  unlocks() {
    return new FacetRepositoryImpl<Model.Unlocks>(this._root, "unlocks");
  }
}

export async function beginFilesystemSession(
  root: string
): Promise<Repositories> {
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  return new WorldImpl(root);
}
