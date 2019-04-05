import iconv = require("iconv-lite");

import { car } from "./_car";
import { LoadProfileResponse2 } from "../response/loadProfile2";

export function loadProfile2(res: LoadProfileResponse2) {
  const buf = Buffer.alloc(0x0d30);

  buf.writeInt16LE(0x0065, 0x0000);
  buf.writeInt32LE(res.profileId, 0x3b8);
  buf.writeUInt16LE(res.settings.bgMusic, 0x3c8);
  buf.writeInt16LE(res.lv, 0x03cc);
  buf.writeUInt32LE(
    ((res.settings.forceQuitEn ? 1 : 0) << 0) |
      (res.settings.steeringForce << 1) |
      (res.settings.bgVolume << 5) |
      (res.settings.seVolume << 9) |
      ((res.settings.cornerGuide ? 1 : 0) << 13) |
      ((res.settings.lineGuide ? 1 : 0) << 14) |
      ((res.settings.ghostEn ? 1 : 0) << 15) |
      ((res.settings.taResultSkip ? 1 : 0) << 16),
    0x3d8
  );
  buf.writeInt32LE(res.dpoint, 0x03e8);
  buf.writeInt32LE(res.fame, 0x0404);
  iconv.encode(res.name + "\0", "shift_jis").copy(buf, 0x03ee);
  buf.writeInt32LE(res.teamId, 0x07e0);
  car(res.car).copy(buf, 0xc5c);

  return buf;
}
