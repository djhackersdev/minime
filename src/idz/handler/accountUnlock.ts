import { AccountUnlockRequest } from "../request/accountUnlock";
import { AccountUnlockResponse } from "../response/accountUnlock";
import { World } from "../world";

export function accountUnlock(
  w: World,
  req: AccountUnlockRequest
): AccountUnlockResponse {
  return {
    type: "account_unlock_res",
    status: 1,
  };
}
