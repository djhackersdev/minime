import { GameChargeJson } from "../proto/gameCharge";
import { Repositories } from "../repo";
import { GetGameChargeRequest } from "../request/getGameCharge";
import { GetGameChargeResponse } from "../response/getGameCharge";
import { CHARGE_IDS } from "../static/charge";

export default async function getGameCharge(
  rep: Repositories,
  req: GetGameChargeRequest
): Promise<GetGameChargeResponse> {
  const gameChargeList: GameChargeJson[] = [];

  for (const [i, charge] of CHARGE_IDS.entries()) {
    gameChargeList.push({
      chargeId: charge.id.toString(),
      orderId: (i+1).toString(),
      price: charge.price.toString(),
      salePrice: charge.salePrice.toString(),
      startDate: "2017-12-05 07:00:00.0",
      endDate: "2029-12-31 23:59:59.0",
      saleStartDate: "2017-12-05 07:00:00.0",
      saleEndDate: "2030-12-31 23:59:59.0"
    });
  }

  return {
    length: gameChargeList.length.toString(),
    gameChargeList,
  };
}
