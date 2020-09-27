import { Repositories } from "../repo";
import { SaveTeamBannerRequest } from "../request/saveTeamBanner";
import { GenericResponse } from "../response/generic";

export async function saveTeamBanner(
  w: Repositories,
  req: SaveTeamBannerRequest
): Promise<GenericResponse> {
  const teamId = await w.teams().find(req.teamExtId, req.version);
  const orig = await w.teams().load(teamId);

  await w.teams().save(teamId, {
    ...orig,
    nameBg: req.nameBg,
    nameFx: req.nameFx,
  });

  return {
    type: "generic_res",
    status: 0, // ignored
  };
}
