import { encodeBitmap } from "./_bitmap";
import { encodeCar } from "./_car";
import { encodeChara1 } from "./_chara";
import { encodeMission } from "./_mission";
import { LoadProfileResponse } from "../response/loadProfile";
import { writeSjisStr } from "../../util/bin";

export function loadProfile2(res: LoadProfileResponse) {
  const buf = Buffer.alloc(0x0d30);

  // FLAMETHROWER ANALYSIS (watch out for C strings)
  //buf.fill(0xff, 0x0000, 0x08f4);
  //buf.fill(0xff, 0x0c20, 0x0c2a);

  // Initialize all TA grades to Bronze
  buf.fill(4, 0x0680, 0x06a0);

  for (const score of res.timeAttack) {
    const { routeNo } = score;

    buf.writeUInt32LE(
      (new Date(score.timestamp).getTime() / 1000) | 0, // Date ctor hack
      0x00e4 + routeNo * 4
    );

    buf.writeUInt16LE(0, 0x0560 + 2 * routeNo); // ???
    buf.writeUInt16LE(0xffff, 0x0164 + 2 * routeNo); // National rank
    buf.writeUInt32LE((score.totalTime * 1000) | 0, 0x04e0 + 4 * routeNo);
    buf.writeUInt8(score.flags, 0x05a0 + routeNo);
    buf.writeUInt8(score.grade, 0x0680 + routeNo);

    for (let i = 0; i < 3; i++) {
      buf.writeUInt16LE(
        (score.sectionTimes[i] * 1000) >> 2,
        0x05c0 + 6 * routeNo + 2 * i
      );
    }
  }

  for (let i = 0; i < 9; i++) {
    const row = res.story.rows.get(i);
    const rowOffset = 0x0228 + i * 0x26;

    if (row === undefined) {
      continue;
    }

    for (let j = 0; j < 9; j++) {
      const cell = row.cells.get(j);
      const cellOffset = rowOffset + j * 4;

      if (cell === undefined) {
        continue;
      }

      buf.writeUInt16LE(cell.a, cellOffset + 0);
      buf.writeUInt16LE(cell.b, cellOffset + 2);
    }
  }

  for (const [courseId, playCount] of res.coursePlays.entries()) {
    if (courseId < 0 || courseId >= 16) {
      continue;
    }

    buf.writeUInt16LE(playCount, 0x0460 + 2 * courseId);
  }

  const { freeCar, freeContinue } = res.tickets;

  if (freeCar) {
    buf.writeUInt32LE((freeCar.validFrom.getTime() / 1000) | 0, 0x01e4);
  }

  if (freeContinue) {
    buf.writeUInt32LE((freeContinue.validFrom.getTime() / 1000) | 0, 0x03dc);
    buf.writeUInt32LE((freeContinue.validTo.getTime() / 1000) | 0, 0x03e0);
  }

  buf.writeUInt16LE(0x0065, 0x0000);
  buf.writeUInt16LE(res.unlocks.auras, 0x00b0);
  buf.writeUInt8(res.unlocks.cup, 0x00b4);
  buf.writeUInt16LE(res.unlocks.gauges, 0x00b8);
  buf.writeUInt32LE(res.unlocks.lastMileageReward, 0x01e8);
  buf.writeUInt16LE(res.unlocks.music, 0x01ec);
  buf.writeUInt16LE(res.teamLeader ? 1 : 0, 0x037c);
  encodeMission(res.missions.team).copy(buf, 0x038a);
  buf.writeUInt16LE(0xffff, 0x0388); // [1]
  buf.writeUInt32LE(res.aimeId, 0x03b8);
  buf.writeUInt32LE(res.mileage, 0x03bc);
  buf.writeUInt16LE(res.settings.music, 0x03c8);
  buf.writeUInt16LE(res.lv, 0x03cc);
  buf.writeUInt32LE(res.exp, 0x03d0);
  buf.writeUInt32LE(res.settings.pack, 0x03d8);
  buf.writeUInt32LE(res.dpoint, 0x03e8);
  buf.writeUInt32LE(res.fame, 0x0404);
  writeSjisStr(buf, 0x03ee, 0x40e, res.name);
  buf.writeUInt8(res.story.y, 0x0670);
  buf.writeUInt16LE(res.story.x, 0x06bc);
  encodeMission(res.missions.solo).copy(buf, 0x06e4);
  encodeChara1(res.chara).copy(buf, 0x070c);
  encodeBitmap(res.titles, 0xb4).copy(buf, 0x720);
  buf.writeUInt8(res.settings.aura, 0x07d6);
  buf.writeUInt8(res.settings.paperCup, 0x07d9);
  buf.writeUInt8(res.settings.gauges, 0x07da);
  buf.writeUInt32LE(res.teamId || 0xffffffff, 0x07e0);
  encodeCar(res.car).copy(buf, 0x0c5c);
  buf.writeUInt32LE(res.carCount, 0x0c58);

  // [1] Currently unknown, but if this field is zero then the player will have
  //     a "model record" emblem in their profile card.

  return buf;
}
