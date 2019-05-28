import { UpdateTeamLeaderRequest } from "../request/updateTeamLeader";
import { UpdateTeamLeaderResponse } from "../response/updateTeamLeader";
import { Repositories } from "../repo";

export async function updateTeamLeader(
  w: Repositories,
  req: UpdateTeamLeaderRequest
): Promise<UpdateTeamLeaderResponse> {
  const profileId = await w.profile().find(req.aimeId);
  const teamId = await w.teams().find(req.teamExtId);

  await w.teamMembers().makeLeader(teamId, profileId);

  return {
    type: "update_team_leader_res",
    status: 0,
  };
}
