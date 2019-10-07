import logger from "debug";
import { Socket } from "net";

import { dispatch } from "./handler";
import { AimeRequest } from "./request";
import { setup } from "./pipeline";
import { beginDbSession } from "./db";

const debug = logger("app:aimedb:session");

export default async function aimedb(socket: Socket) {
  debug("Connection opened");

  const { input, output } = setup(socket);
  const txn = await beginDbSession();

  try {
    for await (const obj of input) {
      const now = new Date();
      const req = obj as AimeRequest;
      const res = await dispatch(txn, req, now);

      if (res === undefined) {
        debug("Closing connection");

        break;
      }

      output.write(res);
    }

    await txn.commit();
  } catch (e) {
    debug(`Connection error:\n${e.toString()}\n`);
    await txn.rollback();
  }

  debug("Connection closed");
  socket.end();
}
