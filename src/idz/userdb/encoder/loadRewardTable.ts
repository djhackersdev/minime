import { LoadRewardTableResponse } from "../response/loadRewardTable";

export function loadRewardTable1(res: LoadRewardTableResponse) {
  const buf = Buffer.alloc(0x01c0);

  buf.writeInt16LE(0x0087, 0x0000);

  return buf;
}

export function loadRewardTable2(res: LoadRewardTableResponse) {
  const buf = Buffer.alloc(0x01c0);

  buf.writeInt16LE(0x0080, 0x0000);

  return buf;
}
