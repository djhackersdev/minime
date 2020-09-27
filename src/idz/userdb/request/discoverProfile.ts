import { AimeId } from "../../../model";

export interface DiscoverProfileRequest {
  type: "discover_profile_req";
  aimeId: AimeId;
  version: number;
}
