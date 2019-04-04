import { Socket } from "net";

import { dispatch } from "./handler";
import setup from "./setup";
import { World } from "./world";

const world = new World();

export default async function idz(socket: Socket) {
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const req of input) {
      output.write(dispatch(world, req));
    }
  } catch (e) {
    console.log("Idz: Error", e);
  }

  console.log("Idz: Connection closed");
}
