import { Socket } from "net";

import { beginDbSession } from "./db";
import { dispatch } from "./handler";
import { setup } from "./setup";

export default async function idz(socket: Socket) {
  const world = await beginDbSession();
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const req of input) {
      output.write(await dispatch(world, req));
    }
  } catch (e) {
    console.log("Idz: Error:", e);
  }

  console.log("Idz: Connection closed\n");

  input.end();
}
