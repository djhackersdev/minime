import { Socket } from "net";

import { beginDbSession } from "./db";
import { dispatch } from "./handler";
import { setup } from "./setup";

export default async function idz(socket: Socket) {
  const txn = await beginDbSession();
  const { input, output } = setup(socket);

  console.log("Idz: Connection opened");

  try {
    for await (const req of input) {
      output.write(await dispatch(txn, req));
    }

    txn.commit();
  } catch (e) {
    console.log("Idz: Error:", e);
    txn.rollback();
  }

  console.log("Idz: Connection closed\n");

  input.end();
}
