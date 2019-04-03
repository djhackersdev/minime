import { Load2on2Response } from "../response/load2on2";

export function load2on2(res: Load2on2Response) {
  const buf = Buffer.alloc(0x04c0);

  buf.writeInt16LE(0x00b1, 0x0000);

  return buf;
}
