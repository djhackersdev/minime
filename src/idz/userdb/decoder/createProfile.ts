import { car } from "./_car";
import { chara } from "./_chara";
import { CreateProfileRequest } from "../request/createProfile";
import { AimeId } from "../../../model";
import { readAsciiStr, readSjisStr } from "../../util/bin";

createProfile.msgCode = 0x0066;
createProfile.msgLen = 0x00c0;

export function createProfile(buf: Buffer): CreateProfileRequest {
  return {
    type: "create_profile_req",
    aimeId: buf.readInt32LE(0x0004) as AimeId,
    version: 1,
    luid: readAsciiStr(buf, 0x0008, 0x001e),
    name: readSjisStr(buf, 0x001e, 0x0034),
    field_0034: buf.readUInt32LE(0x0034),
    car: car(buf.slice(0x0040, 0x00a0)),
    chara: chara(buf.slice(0x00a0, 0x00b4)),
  };
}
