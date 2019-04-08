import { RequestCode } from "./_defs";
import { Id, TitleCode } from "../model/base";
import { Profile } from "../model/profile";
import { SaveProfileRequest } from "../request/saveProfile";
import { bitmap } from "./_bitmap";

saveProfile.msgCode = 0x0068 as RequestCode;
saveProfile.msgLen = 0x0940;

export function saveProfile(buf: Buffer): SaveProfileRequest {
  const storyRows = new Array();

  for (let i = 0; i < 9; i++) {
    const cells = new Array();
    const rowOffset = 0x01a8 + i * 0x3c;

    for (let j = 0; j < 9; j++) {
      const a = buf.readUInt32LE(rowOffset + 0x04 + j * 4);
      const b = buf.readUInt16LE(rowOffset + 0x28 + j * 2);
      const cell = { a, b };

      cells.push(cell);
    }

    const row = { cells };

    storyRows.push(row);
  }

  return {
    type: "save_profile_req",
    profileId: buf.readUInt32LE(0x0004) as Id<Profile>,
    lv: buf.readUInt16LE(0x0026),
    exp: buf.readUInt32LE(0x0028),
    fame: buf.readUInt32LE(0x0468),
    dpoint: buf.readUInt32LE(0x0464),
    titles: bitmap(buf.slice(0x0042, 0x00f6)) as TitleCode[],
    story: {
      x: buf.readUInt16LE(0x06fc),
      y: buf.readUInt8(0x06e0),
      rows: storyRows,
    },
  };
}
