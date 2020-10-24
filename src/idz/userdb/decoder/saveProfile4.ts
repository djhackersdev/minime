import { car } from "./_car";
import { mission } from "./_mission";
import { BackgroundCode, CourseNo, StampCode, TitleCode } from "../model/base";
import { StoryCell, StoryRow } from "../model/story";
import { SaveProfileRequest } from "../request/saveProfile";
import { bitmap } from "./_bitmap";
import { AimeId } from "../../../model";

saveProfile4.msgCode = 0x0138;
saveProfile4.msgLen = 0x0eb0;

export function saveProfile4(buf: Buffer): SaveProfileRequest {
  const storyRows = new Map<number, StoryRow>();

  // Story layout got another rework in idz2
  // First two bytes per row denote the chapter, however
  // since this is in completely linear order (in 2.12) we can
  // just skip saving/reading this for our convenience.

  for (let i = 0; i < 6; i++) {
    const cells = new Map<number, StoryCell>();
    const rowOffset = 0x026c + 0x02 + i * 0x7a;

    for (let j = 0; j < 28; j++) {
      const a = buf.readUInt8(rowOffset + 0x00 + j * 4);
      const b = buf.readUInt8(rowOffset + 0x01 + j * 4);
      const c = buf.readUInt8(rowOffset + 0x02 + j * 4);
      const cell = { a, b, c };

      cells.set(j, cell);
    }

    const row = { cells };

    storyRows.set(i, row);
  }

  const coursePlays = new Map<CourseNo, number>();

  for (let i = 0; i < 20; i++) {
    coursePlays.set(i as CourseNo, buf.readUInt16LE(0x07dc + 2 * i));
  }

  const freeCar = {
    validFrom: buf.readUInt32LE(0x01fc),
  };

  const freeContinue = {
    validFrom: buf.readUInt32LE(0x0038),
    validTo: buf.readUInt32LE(0x003c),
  };

  const weeklyReset = {
    endDate: buf.readUInt32LE(0x0c90),
  };

  return {
    type: "save_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    lv: buf.readUInt16LE(0x0026),
    exp: buf.readUInt32LE(0x0028),
    fame: buf.readUInt32LE(0x0784),
    dpoint: buf.readUInt32LE(0x0780),
    mileage: buf.readUInt32LE(0x0008),
    title: buf.readUInt16LE(0x0040) as TitleCode,
    titles: bitmap(buf.slice(0x0042, 0x01b9)),
    background: buf.readUInt8(0x0afc) as BackgroundCode,
    coursePlays,
    missions: {
      team: mission(buf.slice(0x06c0, 0x06e4)),
      solo: mission(buf.slice(0x0ad0, 0x0af2)),
    },
    car: car(buf.slice(0x0b80, 0x0be0)),
    story: {
      x: buf.readUInt16LE(0x0aa0),
      y: buf.readUInt8(0x0a84),
      rows: storyRows,
    },
    unlocks: {
      auras: buf.readUInt16LE(0x01d0),
      cup: buf.readUInt8(0x01d4),
      gauges: buf.readUInt32LE(0x01d8),
      music: buf.readUInt16LE(0x0204),
      lastMileageReward: buf.readUInt32LE(0x0200),
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
    selectedStamps: {
      stamp01: buf.readUInt16LE(0x0d74) as StampCode,
      stamp02: buf.readUInt16LE(0x0d76) as StampCode,
      stamp03: buf.readUInt16LE(0x0d78) as StampCode,
      stamp04: buf.readUInt16LE(0x0d7a) as StampCode,
    },
    stamps: bitmap(buf.slice(0x0d28, 0x0d4e)),
    settings: {
      music: buf.readUInt16LE(0x0776),
      pack: buf.readUInt32LE(0x0034),
      aura: buf.readUInt8(0x002c),
      paperCup: buf.readUInt8(0x01b9),
      gauges: buf.readUInt8(0x01ba),
      drivingStyle: buf.readUInt8(0x0dae),
    },
    weeklyMissions: {
      weeklyReset: new Date(weeklyReset.endDate * 1000),
      weeklyMissionLeft: buf.readUInt16LE(0x0c84),
      weeklyProgressLeft: buf.readUInt16LE(0x0c86),
      weeklyParamsLeft: buf.readUInt16LE(0x0c88),
      weeklyMissionRight: buf.readUInt16LE(0x0c8a),
      weeklyProgressRight: buf.readUInt16LE(0x0c8c),
      weeklyParamsRight: buf.readUInt16LE(0x0c8e),
    },
  };
}
