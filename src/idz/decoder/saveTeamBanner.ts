import { SaveTeamBannerRequest } from "../request/saveTeamBanner";
import { ExtId } from "../model/base";
import { Team } from "../model/team";

saveTeamBanner.msgCode = 0x0089;
saveTeamBanner.msgLen = 0x0010;

export function saveTeamBanner(buf: Buffer): SaveTeamBannerRequest {
  return {
    type: "save_team_banner_req",
    teamExtId: buf.readUInt32LE(0x0004) as ExtId<Team>,
    nameBg: buf.readUInt32LE(0x0008),
    nameFx: buf.readUInt32LE(0x000c),
  };
}
