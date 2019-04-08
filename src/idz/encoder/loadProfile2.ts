import iconv = require("iconv-lite");

import { bitmap } from "./_bitmap";
import { car } from "./_car";
import { chara } from "./_chara";
import { LoadProfileResponse2 } from "../response/loadProfile2";

export function loadProfile2(res: LoadProfileResponse2) {
  const settingsPack =
    ((res.settings.forceQuitEn ? 1 : 0) << 0) |
    (res.settings.steeringForce << 1) |
    (res.settings.bgVolume << 5) |
    (res.settings.seVolume << 9) |
    ((res.settings.cornerGuide ? 1 : 0) << 13) |
    ((res.settings.lineGuide ? 1 : 0) << 14) |
    ((res.settings.ghostEn ? 1 : 0) << 15) |
    ((res.settings.taResultSkip ? 1 : 0) << 16);

  const buf = Buffer.alloc(0x0d30);

  for (let i = 0; i < 9 && i < res.story.rows.length; i++) {
    const row = res.story.rows[i];
    const rowOffset = 0x0228 + i * 0x26;

    for (let j = 0; j < 9 && j < row.cells.length; j++) {
      const cell = row.cells[j];
      const cellOffset = rowOffset + j * 4;

      buf.writeUInt16LE(cell.a, cellOffset + 0);
      buf.writeUInt16LE(cell.b, cellOffset + 2);
    }
  }

  for (let i = 0; i < 16 && i < res.coursePlays.length; i++) {
    buf.writeUInt16LE(res.coursePlays[i], 0x0460 + 2 * i);
  }

  buf.writeUInt16LE(0x0065, 0x0000);
  buf.writeUInt32LE(res.profileId, 0x03b8);
  buf.writeUInt16LE(res.settings.bgMusic, 0x03c8);
  buf.writeUInt16LE(res.lv, 0x03cc);
  buf.writeUInt32LE(res.exp, 0x03d0);
  buf.writeUInt32LE(settingsPack, 0x3d8);
  buf.writeUInt32LE(res.dpoint, 0x03e8);
  buf.writeUInt32LE(res.fame, 0x0404);
  iconv.encode(res.name + "\0", "shift_jis").copy(buf, 0x03ee);
  buf.writeUInt16LE(res.story.x, 0x06bc);
  buf.writeUInt8(res.story.y, 0x0670);
  chara(res.chara).copy(buf, 0x070c);
  bitmap(res.titles, 0xb4).copy(buf, 0x720);
  buf.writeInt32LE(res.teamId || 0, 0x07e0);
  car(res.car).copy(buf, 0x0c5c);

  return buf;
}
