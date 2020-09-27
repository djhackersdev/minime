import { Team } from "../model/team";
import { Repositories } from "../repo";
import { Id } from "../../../model";

// Bleh. This factorization is kind of messy.

export async function _fixupPrevTeam(
  w: Repositories,
  prevTeamId: Id<Team> | undefined
): Promise<void> {
  if (prevTeamId === undefined) {
    return;
  }

  const remaining = await w.teamMembers().loadRoster(prevTeamId);

  if (remaining.length === 0) {
    // Last member left, GC previous team

    await w.teams().delete(prevTeamId);
  } else if (remaining.find(member => member.leader) === undefined) {
    // Leader left, appoint new leader by seniority

    remaining.sort((x, y) => x.joinTime.getTime() - y.joinTime.getTime());

    // (need to look up new leader's db id from aime id. ick)

    const newLeader = remaining[remaining.length - 1];
    const newLeaderId = await w
      .profile()
      .find(newLeader.profile.aimeId, newLeader.profile.version);

    await w.teamMembers().makeLeader(prevTeamId, newLeaderId);
  }
}
