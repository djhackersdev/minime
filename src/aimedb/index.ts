import logger from "debug";
import { Socket } from "net";

import { dispatch } from "./handler";
import { AimeRequest } from "./request";
import { setup } from "./pipeline";
import { DataSource } from "../sql/api";

const debug = logger("app:aimedb:session");

export default function aimedb(db: DataSource) {
  return async function(socket: Socket) {
    debug("Connection opened");

    const { input, output } = setup(socket);

    for await (const obj of input) {
      try {
        const now = new Date();
        const req = obj as AimeRequest;
        const res = await db.transaction(txn => dispatch(txn, req, now));

        if (res === undefined) {
          debug("Closing connection");

          break;
        }

        output.write(res);
      } catch (e) {
        if (debug.enabled) {
          debug("Connection error: %s", e.stack);
        }

        break;
      }
    }

    debug("Connection closed");
    socket.end();
  };
}
