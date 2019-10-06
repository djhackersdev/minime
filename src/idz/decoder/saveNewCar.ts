import { car } from "./_car";
import { SaveNewCarRequest } from "../request/saveNewCar";
import { AimeId } from "../../model";

saveNewCar.msgCode = 0x0079;
saveNewCar.msgLen = 0x0090;

export function saveNewCar(buf: Buffer): SaveNewCarRequest {
  return {
    type: "save_new_car_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    luid: buf.slice(0x0008, buf.indexOf(0, 0x0008)).toString("ascii"),
    car: car(buf.slice(0x0020, 0x0080)),
    field_0080: buf.readUInt32LE(0x0080),
  };
}
