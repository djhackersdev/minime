import { SaveSettingsRequest } from "../request/saveSettings";
import { AimeId } from "../../model";

saveSettings.msgCode = 0x00a5;
saveSettings.msgLen = 0x0020;

export function saveSettings(buf: Buffer): SaveSettingsRequest {
  const pack = buf.readUInt32LE(0x000c);

  return {
    type: "save_settings_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    dpoint: buf.readUInt32LE(0x0008),
    settings: {
      music: buf.readUInt16LE(0x0002),
      pack: buf.readUInt32LE(0x000c),
      paperCup: buf.readUInt8(0x0011),
      gauges: buf.readUInt8(0x0012),
      aura: buf.readUInt8(0x0013),
    },
    field_0010: buf.readUInt8(0x0010),
  };
}
