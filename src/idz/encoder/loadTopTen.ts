import { LoadTopTenResponse } from "../response/loadTopTen";

export function loadTopTen(res: LoadTopTenResponse): Buffer {
  const buf = Buffer.alloc(0x1720);

  buf.writeUInt16LE(0x00b6, 0x0000);
  // in awe of the size of this lad too

  return buf;
}
