import * as fs from "fs";
import { promisify } from "util";

import { Repository } from "./base";
import { Id } from "../model/base";

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export class SingletonJsonRepo<T, K = T> implements Repository<T, K> {
  private _path: string;

  constructor(root: string, name: string) {
    this._path = `${root}/${name}.json`;
  }

  discover(id: Id<K>): Promise<boolean> {
    return this._discoverSingleton();
  }

  load(id: Id<K>): Promise<T> {
    return this._loadSingleton();
  }

  save(id: Id<K>, obj: T) {
    console.log("Idz: Repository: Saving ", this._path);

    const json = JSON.stringify(obj, undefined, 2);

    return writeFile(this._path, json, { encoding: "utf8" });
  }

  protected _discoverSingleton(): Promise<boolean> {
    return exists(this._path);
  }

  protected async _loadSingleton(): Promise<T> {
    console.log("Idz: Repository: Loading ", this._path);

    const json = await readFile(this._path, { encoding: "utf8" });

    return JSON.parse(json);
  }
}

export class SingletonTextRepo<T extends number[], K = T>
  implements Repository<T, K> {
  private _path: string;

  constructor(root: string, name: string) {
    this._path = `${root}/${name}.txt`;
  }

  discover(id: Id<K>): Promise<boolean> {
    return exists(this._path);
  }

  async load(id: Id<K>): Promise<T> {
    console.log("Idz: Repository: Loading ", this._path);

    const existence = await exists(this._path);

    if (!existence) {
      return new Array() as T;
    }

    const text = await readFile(this._path, { encoding: "utf8" });
    const lines = text.split("\n").filter(x => x !== "");
    const codes = lines.map(x => parseInt(x)); // .map(parseInt) yields NaNs??

    return codes as T;
  }

  save(id: Id<K>, codes: T): Promise<void> {
    console.log("Idz: Repository: Saving ", this._path);

    const text = codes.map(code => code.toString()).join("\n") + "\n";

    return writeFile(this._path, text, { encoding: "utf8" });
  }
}
