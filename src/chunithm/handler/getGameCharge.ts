import { Repositories } from "../repo";
import { GetGameChargeRequest } from "../request/getGameCharge";
import { GetGameChargeResponse } from "../response/getGameCharge";

export default async function getGameCharge(
  rep: Repositories,
  req: GetGameChargeRequest
): Promise<GetGameChargeResponse> {
  return {
    length: "0",
    gameChargeList: [],
  };
}
