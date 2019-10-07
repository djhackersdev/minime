import logger from "debug";
import { Socket } from "net";

import { beginDbSession } from "./db";
import { dispatch } from "./handler";
import { setup } from "./setup";

const debug = logger("app:idz:session");

export default async function idz(socket: Socket) {
  const txn = await beginDbSession();
  const { input, output } = setup(socket);

  debug("Connection opened");

  try {
    for await (const req of input) {
      output.write(await dispatch(txn, req));
    }

    await txn.commit();
  } catch (e) {
    debug(`Error:\n${e.toString()}`);
    await txn.rollback();
  }

  debug("Connection closed");

  input.end();
}
