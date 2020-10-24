import { LoadTeamRankingRequest } from "../request/loadTeamRanking";

loadTeamRanking1.msgCode = 0x00b9;
loadTeamRanking1.msgLen = 0x0010;

export function loadTeamRanking1(buf: Buffer): LoadTeamRankingRequest {
  return {
    type: "load_team_ranking_req",
  };
}

// unused? Not sure where this came from.
loadTeamRanking2.msgCode = 0x00a7;
loadTeamRanking2.msgLen = 0x0010;

export function loadTeamRanking2(buf: Buffer): LoadTeamRankingRequest {
  return {
    type: "load_team_ranking_req",
  };
}

// not sure what the difference is...

loadTeamRanking3.msgCode = 0x00bb;
loadTeamRanking3.msgLen = 0x0010;

export function loadTeamRanking3(buf: Buffer): LoadTeamRankingRequest {
  return {
    type: "load_team_ranking_req",
  };
}

loadTeamRanking4.msgCode = 0x00a9;
loadTeamRanking4.msgLen = 0x0010;

export function loadTeamRanking4(buf: Buffer): LoadTeamRankingRequest {
  return {
    type: "load_team_ranking_req",
  };
}
