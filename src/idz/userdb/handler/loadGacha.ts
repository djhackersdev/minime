import { Repositories } from "../repo";
import { LoadGachaRequest } from "../request/loadGacha";
import { LoadGachaResponse } from "../response/loadGacha";

export function loadGacha(
  w: Repositories,
  req: LoadGachaRequest
): LoadGachaResponse {
  return {
    type: "load_gacha_res",
    awardedToday: true, // Disable for now, not even mapped out yet.
  };
}
