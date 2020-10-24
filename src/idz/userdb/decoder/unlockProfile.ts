import { UnlockProfileRequest } from "../request/unlockProfile";

unlockProfile1.msgCode = 0x006f;
unlockProfile1.msgLen = 0x0020;

export function unlockProfile1(buf: Buffer): UnlockProfileRequest {
  return {
    type: "unlock_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
}

unlockProfile2.msgCode = 0x006b;
unlockProfile2.msgLen = 0x0020;

export function unlockProfile2(buf: Buffer): UnlockProfileRequest {
  return {
    type: "unlock_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
}
