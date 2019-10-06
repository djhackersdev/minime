import { LoadGarageRequest } from "../request/loadGarage";
import { AimeId } from "../../model";

loadGarage.msgCode = 0x0090;
loadGarage.msgLen = 0x0010;

export function loadGarage(buf: Buffer): LoadGarageRequest {
  return {
    type: "load_garage_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    fetchOffset: buf.readUInt8(0x0008),
    field_000A: buf.readUInt16LE(0x000a),
  };
}
