import { Repositories } from "../repo";
import { GetGameSaleRequest } from "../request/getGameSale";
import { GetGameSaleResponse } from "../response/getGameSale";

export default async function getGameSale(
  rep: Repositories,
  req: GetGameSaleRequest
): Promise<GetGameSaleResponse> {
  return {
    type: req.type,
    length: "0",
    gameSaleList: [],
  };
}
