import { ExtId } from "../model/base";
import { Profile } from "../model/profile";

export interface LoadGarageRequest {
  type: "load_garage_req";
  profileId: ExtId<Profile>;
  fetchOffset: number;
  field_000A: number;
}
