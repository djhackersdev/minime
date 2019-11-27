import { car } from "./_car";
import { mission } from "./_mission";
import { BackgroundCode, CourseNo, TitleCode } from "../model/base";
import { SaveProfileRequest2 } from "../request/saveProfile";
import { bitmap } from "./_bitmap";
import { AimeId } from "../../model";

saveProfile3.msgCode = 0x0138;
saveProfile3.msgLen = 0x0a70;

export function saveProfile3(buf: Buffer): SaveProfileRequest2 {
  const storyRows = new Array();

  // Story layout has changed somewhat...

  for (let i = 0; i < 27; i++) {
    const cells = new Array();
    const rowOffset = 0x01ac + i * 0x18;

    for (let j = 0; j < 9; j++) {
      const a = buf.readUInt8(rowOffset + 0x00 + j);
      const b = buf.readUInt8(rowOffset + 0x09 + j);
      const cell = { a, b };

      cells.push(cell);
    }

    const row = { cells };

    storyRows.push(row);
  }

  const coursePlays = new Map<CourseNo, number>();

  for (let i = 0; i < 20; i++) {
    coursePlays.set(i as CourseNo, buf.readUInt16LE(0x0554 + 2 * i));
  }

  const freeCar = {
    validFrom: buf.readUInt32LE(0x0138),
  };

  const freeContinue = {
    validFrom: buf.readUInt32LE(0x0038),
    validTo: buf.readUInt32LE(0x003c),
  };

  return {
    type: "save_profile_req",
    format: 2,
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    lv: buf.readUInt16LE(0x0026),
    exp: buf.readUInt32LE(0x0028),
    fame: buf.readUInt32LE(0x04fc),
    dpoint: buf.readUInt32LE(0x04f8),
    mileage: buf.readUInt32LE(0x0008),
    title: buf.readUInt16LE(0x0040) as TitleCode,
    titles: bitmap(buf.slice(0x0042, 0x00f6)),
    background: buf.readUInt8(0x0874) as BackgroundCode,
    coursePlays,
    missions: {
      team: mission(buf.slice(0x0430, 0x0452)),
      solo: mission(buf.slice(0x0848, 0x086a)),
    },
    car: car(buf.slice(0x0958, 0x09b8)),
    story: {
      x: buf.readUInt16LE(0x0818),
      y: buf.readUInt8(0x07fc),
      rows: storyRows,
    },
    unlocks: {
      auras: buf.readUInt16LE(0x010c),
      cup: buf.readUInt8(0x0110),
      gauges: buf.readUInt16LE(0x0114),
      music: buf.readUInt16LE(0x0140),
      lastMileageReward: buf.readUInt32LE(0x013c),
    },
    tickets: {
      freeCar:
        freeCar.validFrom !== 0
          ? {
              validFrom: new Date(freeCar.validFrom * 1000),
            }
          : undefined,
      freeContinue:
        freeContinue.validFrom !== 0 && freeContinue.validTo !== 0
          ? {
              validFrom: new Date(freeContinue.validFrom * 1000),
              validTo: new Date(freeContinue.validTo * 1000),
            }
          : undefined,
    },
    settings: {
      music: buf.readUInt16LE(0x04ee),
      pack: buf.readUInt32LE(0x0034),
      aura: buf.readUInt8(0x002c),
      paperCup: buf.readUInt8(0x00f6),
      gauges: buf.readUInt8(0x00f7),
    },
  };
}
