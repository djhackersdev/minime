import { encodeBitmap } from "./_bitmap";
import { LoadStockerResponse } from "../response/loadStocker";

export function loadStocker1(res: LoadStockerResponse) {
  const buf = Buffer.alloc(0x00a0);

  buf.writeInt16LE(0x00a8, 0x0000);
  buf.writeUInt8(res.status, 0x0002);
  encodeBitmap(res.backgrounds, 0x24).copy(buf, 0x0003);

  return buf;
}

export function loadStocker2(res: LoadStockerResponse) {
  const buf = Buffer.alloc(0x00a0);

  buf.writeInt16LE(0x009d, 0x0000);
  buf.writeUInt8(res.status, 0x0004);
  encodeBitmap(res.backgrounds, 0x2c).copy(buf, 0x0005);
  encodeBitmap(res.myChara, 0x98).copy(buf, 0x0031);

  return buf;
}
