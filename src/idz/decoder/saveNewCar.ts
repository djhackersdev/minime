import { car } from "./_car";
import { RequestCode } from "./_defs";
import { Id } from "../model/base";
import { Profile } from "../model/profile";
import { SaveNewCarRequest } from "../request/saveNewCar";

saveNewCar.msgCode = 0x0079 as RequestCode;
saveNewCar.msgLen = 0x0090;

export function saveNewCar(buf: Buffer): SaveNewCarRequest {
  return {
    type: "save_new_car_req",
    profileId: buf.readUInt32LE(0x0004) as Id<Profile>,
    luid: buf.slice(0x0008, buf.indexOf(0, 0x0008)).toString("ascii"),
    car: car(buf.slice(0x0020, 0x0080)),
    field_0080: buf.readUInt32LE(0x0080),
  };
}
