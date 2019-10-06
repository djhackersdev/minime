import { LoadEventInfoRequest } from "../request/loadEventInfo";
import { AimeId } from "../../model";

loadEventInfo.msgCode = 0x00be;
loadEventInfo.msgLen = 0x0010;

export function loadEventInfo(buf: Buffer): LoadEventInfoRequest {
  return {
    type: "load_event_info_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
