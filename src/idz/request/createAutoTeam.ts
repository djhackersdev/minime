import { AimeId } from "../../model";

export interface CreateAutoTeamRequest {
  type: "create_auto_team_req";
  aimeId: AimeId;
  field_0008: number;
  field_000C: number;
}
