import { RequestCode } from "../defs";
import { SaveProfileRequest } from "../request/saveProfile";

saveProfile.msgCode = 0x0068 as RequestCode;
saveProfile.msgLen = 0x0940;

export function saveProfile(buf: Buffer): SaveProfileRequest {
  return {
    type: "save_profile_req",
    // mega TODO
  };
}
