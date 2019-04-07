import { RequestCode } from "./_defs";
import { CheckRankRequest } from "../request/checkRank";

checkRank.msgCode = 0x00cd as RequestCode;
checkRank.msgLen = 0x0080;

export function checkRank(buf: Buffer): CheckRankRequest {
  return {
    type: "check_rank_req",
    field_0002: buf.readUInt16LE(0x0002),
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt16LE(0x000c),
    field_0012: buf.readUInt8(0x0012),
    field_0015: buf.readUInt8(0x0015),
    field_0018: buf.readUInt32LE(0x0018),
    field_0024: buf.readUInt32LE(0x0024),
    field_0028: buf.readUInt32LE(0x0028),
    field_002C: buf.readUInt32LE(0x002c),
    field_0054: buf.readUInt8(0x0054),
    field_0058: buf.readUInt32LE(0x0058),
    field_005C: buf.readUInt8(0x005c),
    field_005D: buf.readUInt8(0x005d),
    field_005E: buf.readUInt16LE(0x005e),
    field_0060: buf.readUInt16LE(0x0060),
    field_0062: buf.readUInt8(0x0062),
  };
}
