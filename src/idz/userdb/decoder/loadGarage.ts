import { LoadGarageRequest } from "../request/loadGarage";
import { AimeId } from "../../../model";

loadGarage1.msgCode = 0x0090;
loadGarage1.msgLen = 0x0010;

export function loadGarage1(buf: Buffer): LoadGarageRequest {
  return {
    type: "load_garage_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    fetchOffset: buf.readUInt8(0x0008),
    field_000A: buf.readUInt16LE(0x000a),
  };
}

loadGarage2.msgCode = 0x0087;
loadGarage2.msgLen = 0x0010;

export function loadGarage2(buf: Buffer): LoadGarageRequest {
  return {
    type: "load_garage_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    fetchOffset: buf.readUInt8(0x0008),
    field_000A: buf.readUInt16LE(0x000a),
  };
}
