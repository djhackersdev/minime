import iconv from "iconv-lite";

import { car } from "./_car";
import { chara } from "./_chara";
import { CreateProfileRequest } from "../request/createProfile";
import { AimeId } from "../../model";

createProfile.msgCode = 0x0066;
createProfile.msgLen = 0x00c0;

export function createProfile(buf: Buffer): CreateProfileRequest {
  return {
    type: "create_profile_req",
    aimeId: buf.readInt32LE(0x0004) as AimeId,
    luid: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
    name: iconv.decode(
      buf.slice(0x001e, buf.indexOf("\0", 0x001e)),
      "shift_jis"
    ),
    field_0034: buf.readUInt32LE(0x0034),
    car: car(buf.slice(0x0040, 0x00a0)),
    chara: chara(buf.slice(0x00a0, 0x00b4)),
  };
}
