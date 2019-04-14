import { Id } from "../model/base";
import { Profile } from "../model/profile";

export interface LoadGarageRequest {
  type: "load_garage_req";
  profileId: Id<Profile>;
  fetchOffset: number;
  field_000A: number;
}
