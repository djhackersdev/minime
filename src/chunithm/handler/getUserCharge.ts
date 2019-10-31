import { Repositories } from "../repo";
import { GetUserChargeRequest } from "../request/getUserCharge";
import { GetUserChargeResponse } from "../response/getUserCharge";

export default async function getUserCharge(
  rep: Repositories,
  req: GetUserChargeRequest
): Promise<GetUserChargeResponse> {
  return {
    userId: req.userId,
    length: "0",
    userChargeList: [],
  };
}
