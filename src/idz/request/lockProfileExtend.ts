import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

export interface LockProfileExtendRequest {
  type: "lock_profile_extend_req";
  profileId: ExtId<Profile>;
  luid: string;
}
