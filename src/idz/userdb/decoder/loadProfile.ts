import {
  LoadProfileRequest2,
  LoadProfileRequest3,
} from "../request/loadProfile";
import { AimeId } from "../../../model";
import { readAsciiStr } from "../../util/bin";

loadProfile2.msgCode = 0x0067;
loadProfile2.msgLen = 0x0020;

export function loadProfile2(buf: Buffer): LoadProfileRequest2 {
  return {
    type: "load_profile_req",
    format: 2,
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}

loadProfile3.msgCode = 0x0012f;
loadProfile3.msgLen = 0x0020;

export function loadProfile3(buf: Buffer): LoadProfileRequest3 {
  return {
    type: "load_profile_req",
    format: 3,
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: readAsciiStr(buf, 0x0008, 0x0020),
  };
}
