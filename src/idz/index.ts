import logger from "debug";
import { Socket } from "net";

import { dispatch } from "./handler";
import { setup } from "./setup";
import { DataSource } from "../sql";

const debug = logger("app:idz:session");

export default function idz(db: DataSource) {
  return async function(socket: Socket) {
    const { input, output } = setup(socket);

    debug("Connection opened");

    try {
      for await (const req of input) {
        output.write(await db.transaction(txn => dispatch(txn, req)));
      }
    } catch (e) {
      if (debug.enabled) {
        debug("Error: %s", e.stack);
      }
    }

    debug("Connection closed");

    input.end();
  };
}
