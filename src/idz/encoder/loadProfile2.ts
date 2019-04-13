import iconv = require("iconv-lite");

import { bitmap } from "./_bitmap";
import { car } from "./_car";
import { chara } from "./_chara";
import { mission } from "./_mission";
import { LoadProfileResponse2 } from "../response/loadProfile2";

export function loadProfile2(res: LoadProfileResponse2) {
  const buf = Buffer.alloc(0x0d30);

  // FLAMETHROWER ANALYSIS (watch out for C strings)
  //buf.fill(0xff, 0x0000, 0x08f4);
  //buf.fill(0xff, 0x0c20, 0x0c2a);

  // Lake Akina CCW
  /*
  buf.writeUInt32LE(1555012398, 0x00e4); // Epoch sec?
  buf.writeUInt16LE(5678, 0x0164); // National rank
  buf.writeUInt32LE(146570, 0x04e0); // Time (msec)
  buf.writeUInt8(5, 0x05a0); // Flags (Meaning unknown)
  buf.writeUInt16LE(16010, 0x05c0); // Checkpoint msec 0 (div by 4)
  buf.writeUInt16LE(16020, 0x05c2); // Checkpoint msec 1 (div by 4)
  buf.writeUInt16LE(16030, 0x05c4); // Checkpoint msec 1 (div by 4)

  // Lake Akina CW
  buf.writeUInt32LE(1555012398, 0x00e4 + 4); // Epoch sec?
  buf.writeUInt16LE(5678, 0x0164 + 2); // National rank
  buf.writeUInt32LE(145072, 0x04e0 + 4); // Time (msec)
  buf.writeUInt8(5, 0x05a0 + 1); // Flags (Meaning unknown)

  // Akina DH
  buf.writeUInt32LE(1555012398, 0x00e4 + 24); // Epoch sec?
  buf.writeUInt16LE(5678, 0x0164 + 12); // National rank
  buf.writeUInt32LE(222736, 0x04e0 + 24); // Time (msec)
  buf.writeUInt8(5, 0x05a0 + 6); // Flags (Meaning unknown)
  */

  for (const course of res.timeAttack.courses) {
    const { courseId } = course;

    buf.writeUInt32LE(
      (new Date(course.timestamp).getTime() / 1000) | 0, // Date ctor hack
      0x00e4 + courseId * 4
    );

    buf.writeUInt16LE(0xffff, 0x0164 + 2 * courseId); // National rank
    buf.writeUInt32LE(course.totalMsec, 0x04e0 + 4 * courseId);
    buf.writeUInt8(course.flags, 0x05a0 + courseId);

    for (let i = 0; i < 3; i++) {
      buf.writeUInt16LE(
        course.stageMsec[i] >> 2,
        0x05c0 + 6 * courseId + 2 * i
      );
    }
  }

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
  buf.writeUInt8(res.unlocks.cup, 0x00b4);
  buf.writeUInt16LE(res.unlocks.gauges, 0x00b8);
  buf.writeUInt16LE(res.unlocks.music, 0x01ec);
  mission(res.missions.team).copy(buf, 0x038a);
  buf.writeUInt16LE(0xffff, 0x0388); // [1]
  buf.writeUInt32LE(res.profileId, 0x03b8);
  buf.writeUInt16LE(res.settings.music, 0x03c8);
  buf.writeUInt16LE(res.lv, 0x03cc);
  buf.writeUInt32LE(res.exp, 0x03d0);
  buf.writeUInt32LE(res.settings.pack, 0x3d8);
  buf.writeUInt32LE(res.dpoint, 0x03e8);
  buf.writeUInt32LE(res.fame, 0x0404);
  iconv.encode(res.name + "\0", "shift_jis").copy(buf, 0x03ee);
  buf.writeUInt16LE(res.story.x, 0x06bc);
  buf.writeUInt8(res.story.y, 0x0670);
  mission(res.missions.solo).copy(buf, 0x06e4);
  chara(res.chara).copy(buf, 0x070c);
  bitmap(res.titles, 0xb4).copy(buf, 0x720);
  buf.writeUInt8(res.settings.paperCup, 0x07d9);
  buf.writeUInt8(res.settings.gauges, 0x07da);
  buf.writeUInt32LE(res.teamId || 0xffffffff, 0x07e0);
  car(res.car).copy(buf, 0x0c5c);

  // [1] Currently unknown, but if this field is zero then the player will have
  //     a "model record" emblem in their profile card.

  return buf;
}
