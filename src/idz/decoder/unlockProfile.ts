import { UnlockProfileRequest } from "../request/unlockProfile";

unlockProfile.msgCode = 0x006f;
unlockProfile.msgLen = 0x0020;

export function unlockProfile(buf: Buffer): UnlockProfileRequest {
  return {
    type: "unlock_profile_req",
    aimeId: buf.readUInt32LE(0x0004),
    pcbId: buf.slice(0x0008, buf.indexOf("\0", 0x0008)).toString("ascii"),
  };
}
