import { Id } from "../model/base";
import { Team } from "../model/team";
import { JoinAutoTeamRequest } from "../request/joinAutoTeam";
import { LoadTeamRequest } from "../request/loadTeam";
import { JoinAutoTeamResponse } from "../response/joinAutoTeam";
import { LoadTeamResponse } from "../response/loadTeam";
import { Repositories } from "../repo";

export function _team(
  w: Repositories,
  req: JoinAutoTeamRequest | LoadTeamRequest
): JoinAutoTeamResponse | LoadTeamResponse {
  const bits = {
    team: {
      id: 2 as Id<Team>,
      name: "ＡＳＳ ＧＥＮＴＬＥＭＥＮ",
    },
    members: [],
  };

  if (req.type === "join_auto_team_req") {
    return { type: "join_auto_team_res", ...bits };
  } else {
    return { type: "load_team_res", ...bits };
  }
}
