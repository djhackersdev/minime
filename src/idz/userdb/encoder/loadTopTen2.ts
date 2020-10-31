import { writeSjisStr } from "../../util/bin";
import { LoadTopTenResponse } from "../response/loadTopTen";

export function loadTopTen2(res: LoadTopTenResponse): Buffer {
  const buf = Buffer.alloc(0x1720);

  buf.writeUInt16LE(0x00ce, 0x0000);
  buf.writeUInt16LE(res.courseCount, 0x0004);

  for (let i = 0; i < 3; i++) {
    if (i >= res.courses.length) {
      break;
    }

    const course = res.courses[i];
    const outerOff = 0x0006 + 0x794 * i;

    buf.writeUInt16LE(course.routeNo << 1, outerOff + 0x0002);
    buf.writeUInt16LE(course.field_02, outerOff + 0x0004); // Bitmask-y?

    if (course.rows.length > 0) {
      // Section times for the top result (and only top result) are sent OOB
      const best = course.rows[0];

      for (let j = 0; j < 3; j++) {
        buf.writeUInt32LE(
          (best.ta.sectionTimes[j] * 1000) | 0,
          outerOff + 0x0004 + 4 * j
        );
      }
    }

    for (let j = 0; j < 10; j++) {
      if (j >= course.rows.length) {
        break;
      }

      const row = course.rows[j];
      const innerOff = outerOff + 0x0012 + 0xc0 * j;

      buf.writeUInt32LE(row.field_00, innerOff + 0x0000);
      buf.writeUInt32LE((row.ta.totalTime * 1000) | 0, innerOff + 0x0004);
      buf.writeUInt32LE(
        (row.ta.timestamp.getTime() / 1000) | 0,
        innerOff + 0x0008
      );
      buf.writeUInt16LE(row.ta.carSelector, innerOff + 0x000c); // CAR
      buf.writeUInt8(row.field_0E ? 1 : 0, innerOff + 0x000e); // Boolean
      buf.writeUInt8(row.field_0F ? 1 : 0, innerOff + 0x000f); // Boolean
      buf.writeUInt8(row.field_10, innerOff + 0x0010);
      writeSjisStr(buf, innerOff + 0x0014, innerOff + 0x0028, row.driverName);
      writeSjisStr(buf, innerOff + 0x0028, innerOff + 0x0048, row.team.name);
      writeSjisStr(buf, innerOff + 0x0048, innerOff + 0x0074, row.shopName);
      buf.writeUInt32LE(row.team.nameBg, innerOff + 0x0074);
      buf.writeUInt16LE(row.team.nameFx, innerOff + 0x0078);
      buf.writeUInt8(row.field_7C, innerOff + 0x007c);
      buf.writeUInt8(row.field_7D, innerOff + 0x007d);
      // 66 bytes of empty space at the end. Maybe a string used to live here?
    }
  }

  for (let i = 0; i < 3; i++) {
    const offset = 0x16c0 + 0x1c * i;

    if (i < res.trailers.length) {
      const trailer = res.trailers[i];

      buf.writeUInt16LE(trailer.yearMonth, offset + 0x00);
      buf.writeUInt8(trailer.courseId, offset + 0x02);
      buf.writeUInt8(trailer.isNight ? 1 : 0, offset + 0x03);
      buf.writeUInt32LE(trailer.totalMsec, offset + 0x04);
      writeSjisStr(buf, offset + 0x08, offset + 0x1c, trailer.name);
    } else {
      buf.writeUInt8(0xff, offset + 0x02);
    }
  }

  return buf;
}
