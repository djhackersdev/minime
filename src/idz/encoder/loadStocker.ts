import { LoadStockerResponse } from "../response/loadStocker";

export function loadStocker(res: LoadStockerResponse) {
  const buf = Buffer.alloc(0x00a0);

  buf.writeInt16LE(0x00a8, 0x0000);
  buf.writeUInt8(res.status, 0x0002);
  //buf.fill(0xff, 0x0003, 0x000a);
  buf.writeUInt8(0x08, 0x0008);

  return buf;
}
