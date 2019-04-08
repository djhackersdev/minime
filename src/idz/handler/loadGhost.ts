import { LoadGhostRequest } from "../request/loadGhost";
import { LoadGhostResponse } from "../response/loadGhost";
import { World } from "../world";

export function loadGhost(w: World, req: LoadGhostRequest): LoadGhostResponse {
  return { type: "load_ghost_res" };
}
