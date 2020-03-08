import { UpdateResultRequest } from "../request/updateResult";

updateResult.msgCode = 0x00cc;
updateResult.msgLen = 0x0030;

export function updateResult(buf: Buffer): UpdateResultRequest {
  return {
    type: "update_result_req",
    field_0002: buf.readUInt16LE(0x0002),
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt32LE(0x000c),
    field_0010: buf.readUInt32LE(0x0010),
    field_0014: buf.readUInt16LE(0x0014),
    field_0016: buf.readUInt16LE(0x0016),
    field_0018: buf.readUInt8(0x0018),
    field_0019: buf.readUInt8(0x0019),
    field_001A: buf.readUInt8(0x001a),
    field_001C: buf.readUInt16LE(0x001c),
    field_0020: buf.readUInt32LE(0x0020),
    field_0024: buf.readUInt8(0x0024),
  };
}
