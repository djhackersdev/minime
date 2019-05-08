import { RequestCode } from "./_defs";
import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { LoadEventInfoRequest } from "../request/loadEventInfo";

loadEventInfo.msgCode = 0x00be as RequestCode;
loadEventInfo.msgLen = 0x0010;

export function loadEventInfo(buf: Buffer): LoadEventInfoRequest {
  return {
    type: "load_event_info_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
  };
}
