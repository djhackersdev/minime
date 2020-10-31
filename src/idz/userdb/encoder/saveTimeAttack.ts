import { SaveTimeAttackResponse } from "../response/saveTimeAttack";

export function saveTimeAttack1(res: SaveTimeAttackResponse): Buffer {
  const buf = Buffer.alloc(0x00b0);

  buf.writeUInt16LE(0x00ce, 0x0000);

  return buf;
}

export function saveTimeAttack2(res: SaveTimeAttackResponse): Buffer {
  const buf = Buffer.alloc(0x00f0);

  buf.writeUInt16LE(0x00cd, 0x0000);

  return buf;
}
