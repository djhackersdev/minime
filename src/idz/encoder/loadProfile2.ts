import iconv = require("iconv-lite");

import { LoadProfileResponse2 } from "../response/loadProfile2";

export function loadProfile2(res: LoadProfileResponse2) {
  const buf = Buffer.alloc(0x0d30);

  buf.writeInt16LE(0x0065, 0x0000);
  buf.writeInt32LE(res.profileId, 4 + 0x3b4);
  buf.writeInt16LE(res.lv, 4 + 0x03c8);
  buf.writeInt32LE(res.dpoint, 4 + 0x03e4);
  buf.writeInt32LE(res.fame, 4 + 0x0400);
  iconv.encode(res.name + "\0", "shift_jis").copy(buf, 4 + 0x03ea);
  buf.writeInt32LE(res.teamId, 0x07e0);

  return buf;
}
