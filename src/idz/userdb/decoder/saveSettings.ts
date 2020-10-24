import { SaveSettingsRequest } from "../request/saveSettings";
import { AimeId } from "../../../model";

saveSettings1.msgCode = 0x00a5;
saveSettings1.msgLen = 0x0020;

export function saveSettings1(buf: Buffer): SaveSettingsRequest {
  return {
    type: "save_settings_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    dpoint: buf.readUInt32LE(0x0008),
    settings: {
      music: buf.readUInt16LE(0x0002),
      pack: buf.readUInt32LE(0x000c),
      paperCup: buf.readUInt8(0x0011),
      gauges: buf.readUInt8(0x0012),
      aura: buf.readUInt8(0x0013),
      drivingStyle: 0, // Not supported until idz2
    },
    field_0010: buf.readUInt8(0x0010),
  };
}

saveSettings2.msgCode = 0x009a;
saveSettings2.msgLen = 0x0020;

export function saveSettings2(buf: Buffer): SaveSettingsRequest {
  return {
    type: "save_settings_req",
    aimeId: buf.readUInt32LE(0x0008) as AimeId,
    version: 2,
    dpoint: buf.readUInt32LE(0x000c),
    settings: {
      music: buf.readUInt16LE(0x0004),
      pack: buf.readUInt32LE(0x0010),
      paperCup: buf.readUInt8(0x0015),
      gauges: buf.readUInt8(0x0016),
      aura: buf.readUInt8(0x0017),
      drivingStyle: buf.readUInt8(0x0018),
    },
    field_0010: buf.readUInt32LE(0x0014),
  };
}
