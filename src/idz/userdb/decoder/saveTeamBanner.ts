import { SaveTeamBannerRequest } from "../request/saveTeamBanner";
import { ExtId } from "../model/base";
import { Team } from "../model/team";

saveTeamBanner1.msgCode = 0x0089;
saveTeamBanner1.msgLen = 0x0010;

export function saveTeamBanner1(buf: Buffer): SaveTeamBannerRequest {
  return {
    type: "save_team_banner_req",
    teamExtId: buf.readUInt32LE(0x0004) as ExtId<Team>,
    version: 1,
    nameBg: buf.readUInt32LE(0x0008),
    nameFx: buf.readUInt32LE(0x000c),
  };
}

saveTeamBanner2.msgCode = 0x0082;
saveTeamBanner2.msgLen = 0x0010;

export function saveTeamBanner2(buf: Buffer): SaveTeamBannerRequest {
  return {
    type: "save_team_banner_req",
    teamExtId: buf.readUInt32LE(0x0004) as ExtId<Team>,
    version: 2,
    nameBg: buf.readUInt32LE(0x0008),
    nameFx: buf.readUInt32LE(0x000c),
  };
}
