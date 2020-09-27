import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../../model";

export interface UpdateTeamMemberRequest {
  type: "update_team_member_req";
  action: "add" | "remove";
  aimeId: AimeId;
  version: number;
  teamExtId: ExtId<Team>;
}
