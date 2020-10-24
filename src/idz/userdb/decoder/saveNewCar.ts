import { car } from "./_car";
import { SaveNewCarRequest } from "../request/saveNewCar";
import { readAsciiStr } from "../../util/bin";
import { AimeId } from "../../../model";

saveNewCar1.msgCode = 0x0079;
saveNewCar1.msgLen = 0x0090;

export function saveNewCar1(buf: Buffer): SaveNewCarRequest {
  return {
    type: "save_new_car_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    luid: readAsciiStr(buf, 0x0008, 0x001e),
    car: car(buf.slice(0x0020, 0x0080)),
    field_0080: buf.readUInt32LE(0x0080),
  };
}

saveNewCar2.msgCode = 0x0075;
saveNewCar2.msgLen = 0x0090;

export function saveNewCar2(buf: Buffer): SaveNewCarRequest {
  return {
    type: "save_new_car_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    luid: readAsciiStr(buf, 0x0008, 0x001e),
    car: car(buf.slice(0x0020, 0x0080)),
    field_0080: buf.readUInt32LE(0x0080),
  };
}
