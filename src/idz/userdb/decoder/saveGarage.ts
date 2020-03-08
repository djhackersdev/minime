import { car } from "./_car";
import { SaveGarageRequest } from "../request/saveGarage";

saveGarage.msgCode = 0x008e;
saveGarage.msgLen = 0x0090;

export function saveGarage(buf: Buffer): SaveGarageRequest {
  const field_0068: number[] = [];

  for (let offset = 0x0068; offset < 0x007c; offset += 2) {
    field_0068.push(buf.readUInt16LE(offset));
  }

  return {
    type: "save_garage_req",
    aimeId: buf.readUInt32LE(0x0004),
    payload: car(buf.slice(0x0008, 0x0068)),
    field_0068,
    field_0080: buf.readUInt8(0x0080),
    field_0081: buf.readUInt8(0x0081) !== 0,
  };
}
