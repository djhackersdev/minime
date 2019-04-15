import * as fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export async function loadJson<T>(path: string): Promise<T> {
  console.log("Idz: Repository: Loading ", path);

  const json = await readFile(path, { encoding: "utf8" });

  return JSON.parse(json);
}

export async function saveJson<T>(path: string, obj: T): Promise<void> {
  console.log("Idz: Repository: Saving ", path);

  const json = JSON.stringify(obj, undefined, 2);

  return writeFile(path, json, { encoding: "utf8" });
}

export async function loadNumberList<T extends number[]>(
  path: string
): Promise<T> {
  console.log("Idz: Repository: Loading ", path);

  if (!fs.existsSync(path)) {
    return new Array() as T;
  }

  const text = await readFile(path, { encoding: "ascii" });
  const lines = text.split("\n").filter(x => x !== "");
  const codes = lines.map(Number); // parseInt fails due to radix arg from map

  return codes as T;
}

export async function saveNumberList<T extends number[]>(
  path: string,
  codes: T
): Promise<void> {
  console.log("Idz: Repository: Saving ", path);

  const text = codes.map(code => code.toString()).join("\n") + "\n";

  return writeFile(path, text, { encoding: "ascii" });
}
