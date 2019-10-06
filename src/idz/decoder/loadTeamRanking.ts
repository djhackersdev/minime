import { LoadTeamRankingRequest } from "../request/loadTeamRanking";

loadTeamRanking.msgCode = 0x00b9;
loadTeamRanking.msgLen = 0x0010;

export function loadTeamRanking(buf: Buffer): LoadTeamRankingRequest {
  return {
    type: "load_team_ranking_req",
  };
}

// not sure what the difference is...

loadTeamRanking2.msgCode = 0x00bb;
loadTeamRanking2.msgLen = 0x0010;

export function loadTeamRanking2(buf: Buffer): LoadTeamRankingRequest {
  return {
    type: "load_team_ranking_req",
  };
}
