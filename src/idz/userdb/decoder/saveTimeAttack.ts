import { RouteNo } from "../model/base";
import { CarSelector } from "../model/car";
import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { AimeId } from "../../../model";

function saveTimeAttack(buf: Buffer): SaveTimeAttackRequest {
  return {
    type: "save_time_attack_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    dayNight: buf.readUInt8(0x0054) & 1,
    payload: {
      routeNo: (buf.readUInt8(0x0054) >> 1) as RouteNo,
      timestamp: new Date(buf.readUInt32LE(0x0058) * 1000),
      flags: buf.readUInt8(0x005c),
      totalTime: buf.readUInt32LE(0x0018) / 1000,
      sectionTimes: [
        buf.readUInt32LE(0x0024) / 1000,
        buf.readUInt32LE(0x0028) / 1000,
        buf.readUInt32LE(0x002c) / 1000,
      ],
      grade: buf.readUInt8(0x0062),
      carSelector: buf.readUInt16LE(0x000c) as CarSelector,
    },
    field_0002: buf.readUInt16LE(0x0002),
    field_0008: buf.readUInt32LE(0x0008),
    field_0012: buf.readUInt8(0x0012),
    field_0015: buf.readUInt8(0x0015),
    field_005D: buf.readUInt8(0x005d),
    field_005E: buf.readUInt16LE(0x005e),
    field_0060: buf.readUInt16LE(0x0060),
  };
}

// There is ... literally no difference between these messages other than their
// request code..? Even the response uses the same response code, despite
// the request codes differing.

saveTimeAttack1.msgCode = 0x00cd;
saveTimeAttack1.msgLen = 0x0080;

export function saveTimeAttack1(buf: Buffer): SaveTimeAttackRequest {
  return saveTimeAttack(buf);
}

saveTimeAttack2.msgCode = 0x0136;
saveTimeAttack2.msgLen = 0x0080;

export function saveTimeAttack2(buf: Buffer): SaveTimeAttackRequest {
  return saveTimeAttack(buf);
}

saveTimeAttack3.msgCode = 0x0136;
saveTimeAttack3.msgLen = 0x0080;

export function saveTimeAttack3(buf: Buffer): SaveTimeAttackRequest {
  return {
    type: "save_time_attack_req",
    aimeId: buf.readUInt32LE(0x0008) as AimeId,
    version: 2,
    dayNight: buf.readUInt8(0x0058) & 1,
    payload: {
      routeNo: (buf.readUInt8(0x0058) >> 1) as RouteNo,
      timestamp: new Date(buf.readUInt32LE(0x005c) * 1000),
      flags: buf.readUInt8(0x0060),
      totalTime: buf.readUInt32LE(0x001c) / 1000,
      sectionTimes: [
        buf.readUInt32LE(0x0028) / 1000,
        buf.readUInt32LE(0x002c) / 1000,
        buf.readUInt32LE(0x0030) / 1000,
      ],
      grade: buf.readUInt8(0x0066),
      carSelector: buf.readUInt16LE(0x0010) as CarSelector,
    },
    field_0002: buf.readUInt16LE(0x0004),
    field_0008: buf.readUInt32LE(0x000c),
    field_0012: buf.readUInt8(0x0016),
    field_0015: buf.readUInt8(0x0019),
    field_005D: buf.readUInt8(0x0061),
    field_005E: buf.readUInt16LE(0x0062),
    field_0060: buf.readUInt16LE(0x0064),
  };
}
