import { encodeBitmap } from "./_bitmap";
import { encodeCar } from "./_car";
import { encodeChara2 } from "./_chara";
import { encodeMission } from "./_mission";
import { LoadProfileResponse } from "../response/loadProfile";
import { writeSjisStr } from "../../util/bin";

export function loadProfile4(res: LoadProfileResponse) {
  const buf = Buffer.alloc(0x1360);

  buf.writeUInt16LE(0x012e, 0x0000);
  buf.writeUInt16LE(res.lv, 0x06f0);
  buf.writeUInt32LE(res.exp, 0x06f4);
  buf.writeUInt32LE(res.dpoint, 0x070c);
  buf.writeUInt32LE(res.fame, 0x0728);
  buf.writeUInt32LE(res.aimeId, 0x06dc);
  buf.writeUInt32LE(res.teamId || 0xffffffff, 0x0c60);
  buf.writeUInt32LE(res.mileage, 0x06e0);
  encodeMission(res.missions.solo).copy(buf, 0x0aa0);
  encodeChara2(res.chara).copy(buf, 0x0ac8);
  encodeBitmap(res.titles, 0xb4).copy(buf, 0x0ade);
  buf.writeUInt32LE(res.settings.pack, 0x06fc);
  buf.writeUInt8(res.settings.aura, 0x0c57);
  buf.writeUInt8(res.settings.paperCup, 0x0c5a);
  buf.writeUInt8(res.settings.gauges, 0x0c5b);
  buf.writeUInt8(res.settings.drivingStyle, 0x1184);
  buf.writeUInt16LE(res.settings.music, 0x06ec);
  writeSjisStr(buf, 0x0712, 0x0732, res.name);
  encodeCar(res.car).copy(buf, 0x1290);
  buf.writeUInt32LE(res.carCount, 0x1288);
  buf.writeUInt16LE(res.unlocks.auras, 0x00b0);
  buf.writeUInt8(res.unlocks.cup, 0x00b4);
  buf.writeUInt32LE(res.unlocks.gauges, 0x00b8);
  buf.writeUInt32LE(res.unlocks.lastMileageReward, 0x0218);
  buf.writeUInt16LE(res.unlocks.music, 0x021c);
  buf.writeUInt16LE(res.teamLeader ? 1 : 0, 0x06a0);

  // Weekly Missions
  buf.writeUInt32LE(
    (new Date(res.weeklyMissions.weeklyReset).getTime() / 1000) | 0,
    0x1068
  );
  buf.writeUInt16LE(res.weeklyMissions.weeklyMissionLeft, 0x105a);
  buf.writeUInt16LE(res.weeklyMissions.weeklyProgressLeft, 0x105c);
  buf.writeUInt16LE(res.weeklyMissions.weeklyParamsLeft, 0x105e);
  buf.writeUInt16LE(res.weeklyMissions.weeklyMissionRight, 0x1060);
  buf.writeUInt16LE(res.weeklyMissions.weeklyProgressRight, 0x1062);
  buf.writeUInt16LE(res.weeklyMissions.weeklyParamsRight, 0x1064);

  // send twice, once as new stamps, once as old stamps,
  // because we don't keep track of the "new!" state.
  encodeBitmap(res.stamps, 0x26).copy(buf, 0x10f8);
  encodeBitmap(res.stamps, 0x26).copy(buf, 0x111e);

  // Selected Stamps
  const selectedStamps = res.selectedStamps;
  buf.writeUInt16LE(selectedStamps.stamp01, 0x1144);
  buf.writeUInt16LE(selectedStamps.stamp02, 0x1146);
  buf.writeUInt16LE(selectedStamps.stamp03, 0x1148);
  buf.writeUInt16LE(selectedStamps.stamp04, 0x114a);

  const { freeCar, freeContinue } = res.tickets;

  if (freeCar) {
    buf.writeUInt32LE((freeCar.validFrom.getTime() / 1000) | 0, 0x0214);
  }

  if (freeContinue) {
    buf.writeUInt32LE((freeContinue.validFrom.getTime() / 1000) | 0, 0x0700);
    buf.writeUInt32LE((freeContinue.validTo.getTime() / 1000) | 0, 0x0704);
  }

  // Course plays
  for (const [courseId, playCount] of res.coursePlays.entries()) {
    if (courseId < 0 || courseId >= 20) {
      throw new Error(`Course id out of range: ${courseId}`);
    }

    buf.writeUInt16LE(playCount, 0x0784 + 2 * courseId);
  }

  for (const score of res.timeAttack) {
    const { routeNo } = score;

    buf.writeUInt32LE(
      (new Date(score.timestamp).getTime() / 1000) | 0, // Date ctor hack
      0x00e4 + routeNo * 4
    );

    buf.writeUInt16LE(0xffff, 0x0184 + 2 * routeNo); // National rank
    buf.writeUInt32LE((score.totalTime * 1000) | 0, 0x0824 + 4 * routeNo); // Total Time in MSEC // DONE
    buf.writeUInt8(score.flags, 0x0914 + routeNo); // FLAGS
    buf.writeUInt8(score.grade, 0x0a2c + routeNo); // MEDALS

    for (let i = 0; i < 3; i++) {
      buf.writeUInt16LE(
        (score.sectionTimes[i] * 1000) >> 2,
        0x093c + 6 * routeNo + 2 * i // SECTION TIMES DONE
      );
    }
  }

  // the format has changed quite a bit in v2
  // seems like it's just split into the big chapters now
  // with more cells of course, enough space for 30ish
  // the biggest chapter is chapter 1 with a total of 22 races
  // but for "security" let's go with up to 28
  // first two bytes at the start seem to declare the chapter number

  for (let i = 0; i < 6; i++) {
    const row = res.story.rows.get(i);
    const rowOffset = 0x0258 + i * 0x7a;

    if (row === undefined) {
      continue;
    }

    for (let j = 0; j < 28; j++) {
      const cell = row.cells.get(j);
      // Four bytes per column
      const cellOffset = rowOffset + j * 4;

      if (cell === undefined) {
        continue;
      }

      buf.writeUInt8(cell.a, cellOffset + 0);
      buf.writeUInt8(cell.b, cellOffset + 1);
      buf.writeUInt16LE(cell.c, cellOffset + 2);
    }
  }

  buf.writeUInt8(res.story.y, 0x0a54);
  buf.writeUInt16LE(res.story.x, 0x0a70);

  return buf;
}
