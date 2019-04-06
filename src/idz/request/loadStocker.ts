import { Id } from "../model/base";
import { Profile } from "../model/profile";

export interface LoadStockerRequest {
  type: "load_stocker_req";
  profileId: Id<Profile>;
}
