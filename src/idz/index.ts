import { Socket } from "net";

import { dispatch } from "./handler";
import { setup } from "./setup";
import { createWorld } from "./world";

export default async function idz(socket: Socket) {
  const world = await createWorld("./state");
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const req of input) {
      output.write(await dispatch(world, req));
    }
  } catch (e) {
    console.log("Idz: Error", e);
  }

  console.log("Idz: Connection closed\n");
}
