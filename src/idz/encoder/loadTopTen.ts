import { LoadTopTenResponse } from "../response/loadTopTen";

export function loadTopTen(res: LoadTopTenResponse): Buffer {
  const buf = Buffer.alloc(0x1720);

  buf.writeUInt16LE(0x00b6, 0x0000);
  // in awe of the size of this lad too

  for (let i = 0x0002; i < 0x1720; i += 2) {
    buf.writeUInt16LE(i & 0xff, i);
  }

  return buf;
}
