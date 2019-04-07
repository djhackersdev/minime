import { CheckRankResponse } from "../response/checkRank";

export function checkRank(res: CheckRankResponse): Buffer {
  const buf = Buffer.alloc(0x00b0);

  buf.writeUInt16LE(0x00ce, 0x0000);

  return buf;
}
