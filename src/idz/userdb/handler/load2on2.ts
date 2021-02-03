import {
  Load2on2InfoRequest,
  Load2on2RankingPointsRequest,
} from "../request/load2on2";
import {
  Load2on2InfoResponse,
  Load2on2RankingPointsResponse,
} from "../response/load2on2";
import { Repositories } from "../repo";

export function load2on2Info(
  w: Repositories,
  req: Load2on2InfoRequest
): Load2on2InfoResponse {
  return {
    type: "load_2on2_info_res",
  };
}

export function load2on2RankingPoints(
  w: Repositories,
  req: Load2on2RankingPointsRequest
): Load2on2RankingPointsResponse {
  return {
    type: "load_2on2_ranking_points_res",
  };
}
