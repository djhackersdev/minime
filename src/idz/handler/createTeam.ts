import { _fixupPrevTeam } from "./_team";
import { CreateTeamRequest } from "../request/createTeam";
import { CreateTeamResponse } from "../response/createTeam";
import { Repositories } from "../repo";

export async function createTeam(
  w: Repositories,
  req: CreateTeamRequest
): Promise<CreateTeamResponse> {
  const profileId = await w.profile().find(req.aimeId);
  const prevTeamId = await w.teamMembers().findTeam(profileId);
  const now = new Date();

  // Create the new team...

  const teamSpec = {
    name: req.teamName,
    nameBg: req.nameBg,
    nameFx: 0,
    registerTime: now,
  };

  const [teamId, teamExtId] = await w.teams().create(teamSpec);

  await w.teamMembers().join(teamId, profileId, now);
  await w.teamMembers().makeLeader(teamId, profileId);
  await _fixupPrevTeam(w, prevTeamId);

  // Fix up previous team. The previous team's extid is explicitly sent in the
  // request, but why rely on it if you don't have to?

  if (prevTeamId !== undefined) {
    const remaining = await w.teamMembers().loadRoster(prevTeamId);

    if (remaining.length === 0) {
      // Last member left, GC previous team

      await w.teams().delete(prevTeamId);
    } else if (remaining.find(member => member.leader) === undefined) {
      // Leader left, appoint new leader by seniority

      remaining.sort((x, y) => x.joinTime.getTime() - y.joinTime.getTime());

      // (need to look up new leader's db id from aime id. ick)

      const newLeader = remaining[remaining.length - 1];
      const newLeaderId = await w.profile().find(newLeader.profile.aimeId);

      await w.teamMembers().makeLeader(prevTeamId, newLeaderId);
    }
  }

  return {
    type: "create_team_res",
    status: 0,
    teamExtId,
  };
}
