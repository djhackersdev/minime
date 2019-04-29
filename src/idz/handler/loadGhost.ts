import { LoadGhostRequest } from "../request/loadGhost";
import { LoadGhostResponse } from "../response/loadGhost";
import { Repositories } from "../repo";

export function loadGhost(
  w: Repositories,
  req: LoadGhostRequest
): LoadGhostResponse {
  return { type: "load_ghost_res" };
}
