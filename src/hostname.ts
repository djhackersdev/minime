import { existsSync, readFileSync } from "fs";
import * as os from "os";

const path = "./hostname.txt";
let myHostname: string;

if (!existsSync(path)) {
  const osHostname = os.hostname();

  console.log(
    `Hostname: ${path} does not exist, sending OS hostname "${osHostname}" to clients. This may be unreliable!`
  );

  myHostname = osHostname;
} else {
  myHostname = readFileSync(path, { encoding: "ascii" }).trim();

  console.log(
    `Hostname: Sending configured hostname "${myHostname}" to clients`
  );
}

export function hostname(): string {
  return myHostname;
}
