import { LoadStockerResponse } from "../response/loadStocker";

export function loadStocker(res: LoadStockerResponse) {
  const buf = Buffer.alloc(0x00a0);

  buf.writeInt16LE(0x00a8, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}
