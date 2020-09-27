import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../../model";

export interface UpdateTeamLeaderRequest {
  type: "update_team_leader_req";
  aimeId: AimeId;
  version: number;
  teamExtId: ExtId<Team>;
  field_000C: string;
}
