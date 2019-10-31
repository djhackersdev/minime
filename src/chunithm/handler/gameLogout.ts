import { Repositories } from "../repo";
import { GameLogoutRequest } from "../request/gameLogout";
import { GameLogoutResponse } from "../response/gameLogout";

export default async function gameLogout(
  rep: Repositories,
  req: GameLogoutRequest
): Promise<GameLogoutResponse> {
  return { returnCode: "1" };
}
