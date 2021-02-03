import logger from "debug";
import { Socket } from "net";

import readRequestStream from "./decoder";
import writeResponse from "./encoder";
import { dispatch } from "./handler";
import setup from "../common";
import { DataSource } from "../../sql";
import { SqlRepositories } from "./sql";

const debug = logger("app:idz:userdb");

export default function idz(db: DataSource) {
  return async function(socket: Socket) {
    debug("Connection established");

    try {
      const { clientHello, aesStream } = await setup(socket);

      debug("Handshake OK", clientHello);

      for await (const req of readRequestStream(clientHello, aesStream)) {
        const res = await db.transaction(txn =>
          dispatch(new SqlRepositories(txn), req, clientHello)
        );

        await aesStream.write(writeResponse(res, clientHello));
      }
    } catch (error) {
      if (debug.enabled) {
        debug("Error: %s", error.stack);
      }
    }

    debug("Connection closed");

    socket.end();
  };
}
