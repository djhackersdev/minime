import { CreateTeamRequest } from "../request/createTeam";
import { LoadTeamRequest } from "../request/loadTeam";
import { CreateTeamResponse } from "../response/createTeam";
import { LoadTeamResponse } from "../response/loadTeam";
import { World } from "../world";

export function _team(
  w: World,
  req: CreateTeamRequest | LoadTeamRequest
): CreateTeamResponse | LoadTeamResponse {
  const bits = {
    name: "ＡＳＳ ＧＥＮＴＬＥＭＥＮ",
    members: [],
  };

  if (req.type === "create_team_req") {
    return { type: "create_team_res", ...bits };
  } else {
    return { type: "load_team_res", ...bits };
  }
}
