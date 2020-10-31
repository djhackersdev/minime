import { car } from "./_car";
import { mission } from "./_mission";
import { BackgroundCode, CourseNo, TitleCode } from "../model/base";
import { StoryCell, StoryRow } from "../model/story";
import { SaveProfileRequest } from "../request/saveProfile";
import { bitmap } from "./_bitmap";
import { AimeId } from "../../../model";

saveProfile2.msgCode = 0x0068;
saveProfile2.msgLen = 0x0940;

export function saveProfile2(buf: Buffer): SaveProfileRequest {
  const storyRows = new Map<number, StoryRow>();

  for (let i = 0; i < 9; i++) {
    const cells = new Map<number, StoryCell>();
    const rowOffset = 0x01a8 + i * 0x3c;

    for (let j = 0; j < 9; j++) {
      const a = buf.readUInt32LE(rowOffset + 0x04 + j * 4);
      const b = buf.readUInt16LE(rowOffset + 0x28 + j * 2);
      const c = 0; // Added in idz2
      const cell = { a, b, c };

      cells.set(j, cell);
    }

    const row = { cells };

    storyRows.set(i, row);
  }

  const coursePlays = new Map<CourseNo, number>();

  for (let i = 0; i < 16; i++) {
    coursePlays.set(i as CourseNo, buf.readUInt16LE(0x04c0 + 2 * i));
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
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    lv: buf.readUInt16LE(0x0026),
    exp: buf.readUInt32LE(0x0028),
    fame: buf.readUInt32LE(0x0468),
    dpoint: buf.readUInt32LE(0x0464),
    mileage: buf.readUInt32LE(0x0008),
    title: buf.readUInt16LE(0x0040) as TitleCode,
    titles: bitmap(buf.slice(0x0042, 0x00f6)),
    background: buf.readUInt8(0x0750) as BackgroundCode,
    coursePlays,
    missions: {
      team: mission(buf.slice(0x03c4, 0x03e6)),
      solo: mission(buf.slice(0x0724, 0x0746)),
    },
    car: car(buf.slice(0x0834, 0x0894)),
    story: {
      x: buf.readUInt16LE(0x06fc),
      y: buf.readUInt8(0x06e0),
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
      music: buf.readUInt16LE(0x045a),
      pack: buf.readUInt32LE(0x0034),
      aura: buf.readUInt8(0x002c),
      paperCup: buf.readUInt8(0x00f6),
      gauges: buf.readUInt8(0x00f7),
      drivingStyle: 0, // Not supported until idz2
    },
  };
}
