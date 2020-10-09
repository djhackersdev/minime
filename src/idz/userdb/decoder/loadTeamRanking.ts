import { LoadTeamRankingRequest } from "../request/loadTeamRanking";

loadTeamRanking1.msgCode = 0x00b9;
loadTeamRanking1.msgLen = 0x0010;

export function loadTeamRanking1(buf: Buffer): LoadTeamRankingRequest {
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
