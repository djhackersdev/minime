import iconv = require("iconv-lite");

import { RequestCode } from "./_defs";
import { CreateProfileRequest } from "../request/createProfile";
import { car } from "./_car";
import { chara } from "./_chara";

createProfile.msgCode = 0x0066 as RequestCode;
createProfile.msgLen = 0x00c0;

export function createProfile(buf: Buffer): CreateProfileRequest {
  return {
    type: "create_profile_req",
    aimeId: buf.readInt32LE(0x0004),
    luid: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
    name: iconv.decode(
      buf.slice(0x001e, buf.indexOf("\0", 0x001e)),
      "shift_jis"
    ),
    field_0034: buf.readUInt32LE(0x0034),
    car: car(buf.slice(0x0040, 0x00a0)),
    chara: chara(buf.slice(0x00a0, 0x00b0)),
    field_00B0: buf.readUInt16LE(0x00b0),
    field_00B2: buf.readUInt8(0x00b2),
  };
}
