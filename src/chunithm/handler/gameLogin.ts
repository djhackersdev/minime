import { Repositories } from "../repo";
import { GameLoginRequest } from "../request/gameLogin";
import { GameLoginResponse } from "../response/gameLogin";

export default async function gameLogin(
  rep: Repositories,
  req: GameLoginRequest
): Promise<GameLoginResponse> {
  return { returnCode: "1" };
}
