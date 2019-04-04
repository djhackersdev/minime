export type LockAccountStatus = "locked" | "unlocked" | "obsolete";

export interface LockProfileResponse {
  type: "lock_profile_res";
  status: LockAccountStatus;
  field_001A: number;
  lockExpiry: Date;
}
