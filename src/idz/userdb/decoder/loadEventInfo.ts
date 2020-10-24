import { LoadEventInfoRequest } from "../request/loadEventInfo";
import { AimeId } from "../../../model";

loadEventInfo1.msgCode = 0x00be;
loadEventInfo1.msgLen = 0x0010;

export function loadEventInfo1(buf: Buffer): LoadEventInfoRequest {
  return {
    type: "load_event_info_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}

loadEventInfo2.msgCode = 0x00ac;
loadEventInfo2.msgLen = 0x0010;

export function loadEventInfo2(buf: Buffer): LoadEventInfoRequest {
  return {
    type: "load_event_info_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
