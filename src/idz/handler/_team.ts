import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { JoinAutoTeamRequest } from "../request/joinAutoTeam";
import { LoadTeamRequest } from "../request/loadTeam";
import { JoinAutoTeamResponse } from "../response/joinAutoTeam";
import { LoadTeamResponse } from "../response/loadTeam";
import { Repositories } from "../repo";

// Even if a profile does not belong to a team, a team must still be loaded
// (and then ignored by the client).

const dummy: Team = {
  extId: 0 as ExtId<Team>,
  name: "",
  nameBg: 0,
  nameFx: 0,
  registerTime: new Date(0),
};

export function _team(
  w: Repositories,
  req: JoinAutoTeamRequest | LoadTeamRequest
): JoinAutoTeamResponse | LoadTeamResponse {
  const bits = {
    team: dummy,
    members: [],
  };

  if (req.type === "join_auto_team_req") {
    return { type: "join_auto_team_res", ...bits };
  } else {
    return { type: "load_team_res", ...bits };
  }
}
