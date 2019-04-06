import { RequestCode } from "./_defs";
import { Load2on2Request } from "../request/load2on2";

load2on2.msgCode = 0x00b0 as RequestCode;
load2on2.msgLen = 0x0010;

export function load2on2(buf: Buffer): Load2on2Request {
  return {
    type: "load_2on2_req",
    field_0002: buf.readUInt16LE(0x0002),
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
}
