import { LoadGeneralRewardResponse } from "../response/loadGeneralReward";
import { writeSjisStr } from "../../util/bin";

export function loadGeneralReward(res: LoadGeneralRewardResponse) {
  const buf = Buffer.alloc(0x0330);

  buf.writeInt16LE(0x009d, 0x0000);

  // Traversal code shat out by MSVC uses shifted pointers and neither the
  // beginning nor the end of each entry in this array gets read, so the true
  // start of the array and offsets of each item's fields are still uncertain.

  for (let i = 0; i < 10 && i < res.items.length; i++) {
    const item = res.items[i];
    const base = 0x04 + 0x50 * i;

    writeSjisStr(buf, base + 0x04, base + 0x2c, item.field_04);
    buf.writeUInt32LE(item.field_2C, base + 0x2c);
    buf.writeUInt8(item.field_38, base + 0x38);
    buf.writeUInt8(item.field_39, base + 0x39);

    for (let j = 0; j < 4 && j < item.field_3C.length; j++) {
      buf.writeUInt32LE(item.field_3C[j], base + 0x3c + 4 * j);
    }
  }

  return buf;
}
