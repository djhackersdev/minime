import { _fixupPrevTeam } from "./_team";
import { CreateTeamRequest } from "../request/createTeam";
import { CreateTeamResponse } from "../response/createTeam";
import { Repositories } from "../repo";

export async function createTeam(
  w: Repositories,
  req: CreateTeamRequest
): Promise<CreateTeamResponse> {
  const profileId = await w.profile().find(req.aimeId, req.version);
  const prevTeamId = await w.teamMembers().findTeam(profileId);
  const now = new Date();

  // Create the new team...

  const teamSpec = {
    name: req.teamName,
    version: req.version,
    nameBg: req.nameBg,
    nameFx: 0,
    registerTime: now,
  };

  const [teamId, teamExtId] = await w.teams().create(teamSpec);

  await w.teamMembers().join(teamId, profileId, now);
  await w.teamMembers().makeLeader(teamId, profileId);
  await _fixupPrevTeam(w, prevTeamId);

  return {
    type: "create_team_res",
    status: 0,
    teamExtId,
  };
}
