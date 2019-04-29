import { Socket } from "net";

import { dispatch } from "./handler";
import { AimeRequest } from "./request";
import { setup } from "./pipeline";
import { beginDbSession } from "./db";

export default async function aimedb(socket: Socket) {
  console.log("Aimedb: Connection opened");

  const { input, output } = setup(socket);
  const txn = await beginDbSession();

  try {
    for await (const obj of input) {
      console.log("Aimedb: Decode", obj);

      const now = new Date();
      const req = obj as AimeRequest;
      const res = await dispatch(txn, req, now);

      if (res !== undefined) {
        output.write(res);
      }
    }

    txn.commit();
  } catch (e) {
    console.log("Aimedb: Connection error:\n", e);
    txn.rollback();
  }

  console.log("Aimedb: Connection closed\n");
  socket.end();
}
