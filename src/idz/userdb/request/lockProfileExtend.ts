import { AimeId } from "../../../model";

export interface LockProfileExtendRequest {
  type: "lock_profile_extend_req";
  aimeId: AimeId;
  luid: string;
}
