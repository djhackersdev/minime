import { ExtId } from "../model/base";
import { Team } from "../model/team";

export interface SaveTeamBannerRequest {
  type: "save_team_banner_req";
  teamExtId: ExtId<Team>;
  version: number;
  nameBg: number;
  nameFx: number;
}
