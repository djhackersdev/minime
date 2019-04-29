import { RequestCode } from "./_defs";
import { ExtId, RouteNo } from "../model/base";
import { Profile } from "../model/profile";
import { SaveTimeAttackRequest } from "../request/saveTimeAttack";

saveTimeAttack.msgCode = 0x00cd as RequestCode;
saveTimeAttack.msgLen = 0x0080;

export function saveTimeAttack(buf: Buffer): SaveTimeAttackRequest {
  return {
    type: "save_time_attack_req",
    profileId: buf.readUInt32LE(0x0004) as ExtId<Profile>,
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
    },
    field_0002: buf.readUInt16LE(0x0002),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt16LE(0x000c),
    field_0012: buf.readUInt8(0x0012),
    field_0015: buf.readUInt8(0x0015),
    field_005D: buf.readUInt8(0x005d),
    field_005E: buf.readUInt16LE(0x005e),
    field_0060: buf.readUInt16LE(0x0060),
  };
}
