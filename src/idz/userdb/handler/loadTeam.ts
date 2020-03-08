import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { LoadTeamRequest } from "../request/loadTeam";
import { LoadTeamResponse } from "../response/loadTeam";
import { Repositories } from "../repo";

// Even if a profile does not belong to a team, a team must still be loaded
// (and then ignored by the client).

const dummyResp: LoadTeamResponse = {
  type: "load_team_res",
  team: {
    extId: 0 as ExtId<Team>,
    name: "",
    nameBg: 0,
    nameFx: 0,
    registerTime: new Date(0),
  },
  members: [],
};

export async function loadTeam(
  w: Repositories,
  req: LoadTeamRequest
): Promise<LoadTeamResponse> {
  if (req.teamExtId === undefined) {
    return dummyResp;
  }

  const teamId = await w.teams().find(req.teamExtId);

  return {
    type: "load_team_res",
    team: await w.teams().load(teamId),
    members: await w.teamMembers().loadRoster(teamId),
  };
}
