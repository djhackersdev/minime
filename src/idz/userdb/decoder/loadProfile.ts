import { LoadProfileRequest } from "../request/loadProfile";
import { AimeId } from "../../../model";
import { readAsciiStr } from "../../util/bin";

loadProfile2.msgCode = 0x0067;
loadProfile2.msgLen = 0x0020;

export function loadProfile2(buf: Buffer): LoadProfileRequest {
  return {
    type: "load_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}

loadProfile3.msgCode = 0x012f;
loadProfile3.msgLen = 0x0020;

export function loadProfile3(buf: Buffer): LoadProfileRequest {
  return {
    type: "load_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}

loadProfile4.msgCode = 0x012f;
loadProfile4.msgLen = 0x0020;

export function loadProfile4(buf: Buffer): LoadProfileRequest {
  return {
    type: "load_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}
