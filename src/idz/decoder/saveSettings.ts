import { RequestCode } from "../defs";
import { SaveSettingsRequest } from "../request/saveSettings";

saveSettings.msgCode = 0x00a5 as RequestCode;
saveSettings.msgLen = 0x0020;

export function saveSettings(buf: Buffer): SaveSettingsRequest {
  const pack = buf.readUInt32LE(0x000c);

  console.log("Idz: SETTINGS PACK", pack.toString(16));

  return {
    type: "save_settings_req",
    bgMusic: buf.readUInt16LE(0x0002),
    profileId: buf.readUInt32LE(0x0004),
    dpoint: buf.readUInt32LE(0x0008),
    forceQuitEn: ((pack >> 0) & 1) !== 0,
    steeringForce: (pack >> 1) & 15,
    bgVolume: (pack >> 5) & 15,
    seVolume: (pack >> 9) & 15,
    cornerGuide: ((pack >> 13) & 1) !== 0,
    lineGuide: ((pack >> 14) & 1) !== 0,
    ghostEn: ((pack >> 15) & 1) !== 0,
    taResultSkip: ((pack >> 16) & 1) !== 0,
    field_0010: buf.readUInt8(0x0010),
    field_0011: buf.readUInt8(0x0011),
    field_0012: buf.readUInt8(0x0012), // always 5 for some reason
    field_0013: buf.readUInt8(0x0013),
  };
}
