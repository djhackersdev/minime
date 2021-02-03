import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../../model";

export interface Load2on2InfoRequest {
  type: "load_2on2_info_req";
  field_0002: number;
  aimeId: AimeId;
  teamId: ExtId<Team>;
}

export interface Load2on2RankingPointsRequest {
  type: "load_2on2_ranking_points_req";
  field_0002: number;
  aimeId: AimeId;
  teamId: ExtId<Team>;
}
