import { Socket } from "net";

import { dispatch } from "./handler";
import { AimeRequest } from "./request";
import { setup } from "./pipeline";

export default async function aimedb(socket: Socket) {
  console.log("Aimedb: Connection opened");

  const { input, output } = setup(socket);

  try {
    for await (const obj of input) {
      console.log("Aimedb: Decode", obj);

      const req = obj as AimeRequest;
      const res = dispatch(req);

      if (res !== undefined) {
        output.write(res);
      }
    }
  } catch (e) {
    console.log("Aimedb: Connection error:\n", e);
  }

  console.log("Aimedb: Connection closed\n");
  socket.end();
}
