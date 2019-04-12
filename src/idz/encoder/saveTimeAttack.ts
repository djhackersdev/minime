import { SaveTimeAttackResponse } from "../response/saveTimeAttack";

export function saveTimeAttack(res: SaveTimeAttackResponse): Buffer {
  const buf = Buffer.alloc(0x00b0);

  buf.writeUInt16LE(0x00ce, 0x0000);

  return buf;
}
