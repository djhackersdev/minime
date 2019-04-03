import { RequestCode } from "../defs";
import { SaveSettingsRequest } from "../request/saveSettings";

saveSettings.msgCode = 0x00a5 as RequestCode;
saveSettings.msgLen = 0x0020;

export function saveSettings(buf: Buffer): SaveSettingsRequest {
  return {
    type: "save_settings_req",
    field_0002: buf.readUInt16LE(0x0002),
    profileId: buf.readUInt32LE(0x0004),
    dpoint: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt32LE(0x000c),
    field_0010: buf.readUInt8(0x0010),
    field_0011: buf.readUInt8(0x0011),
    field_0012: buf.readUInt8(0x0012),
    field_0013: buf.readUInt8(0x0013),
  };
}
