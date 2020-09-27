import { _fixupPrevTeam } from "./_team";
import { UpdateTeamMemberRequest } from "../request/updateTeamMember";
import { UpdateTeamMemberResponse } from "../response/updateTeamMember";
import { Repositories } from "../repo";

export async function updateTeamMember(
  w: Repositories,
  req: UpdateTeamMemberRequest
): Promise<UpdateTeamMemberResponse> {
  const now = new Date();
  const profileId = await w.profile().find(req.aimeId, req.version);
  const teamId = await w.teams().find(req.teamExtId, req.version);

  switch (req.action) {
    case "add":
      const prevTeamId = await w.teamMembers().findTeam(profileId);

      await w.teamMembers().join(teamId, profileId, now);
      await _fixupPrevTeam(w, prevTeamId);

      break;

    case "remove":
      // TODO store expulsion flag in db
      await w.teamMembers().leave(teamId, profileId);

      break;

    default:
      throw new Error("???");
  }

  return {
    type: "update_team_member_res",
    status: 0,
  };
}
