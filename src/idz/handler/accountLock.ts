import { AccountLockRequest } from "../request/accountLock";
import { AccountLockResponse } from "../response/accountLock";
import { World } from "../world";

export function accountLock(
  w: World,
  req: AccountLockRequest
): AccountLockResponse {
  return {
    type: "account_lock_res",
    field_0018: 1,
    field_001A: -1,
    field_001C: new Date(Date.now() + 3600000),
  };
}
