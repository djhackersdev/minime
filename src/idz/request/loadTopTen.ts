import { ExtId, RouteNo } from "../model/base";
import { Profile } from "../model/profile";
import { Team } from "../model/team";

export interface LoadTopTenRequestSelector {
  routeNo: RouteNo;
  field_44: number;
}

export interface LoadTopTenRequest {
  type: "load_top_ten_req";
  field_2: number;
  selectors: LoadTopTenRequestSelector[];
  field_C4: number;
  field_C5: number;
  field_C6: number;
  profileId?: ExtId<Profile>;
  teamId?: ExtId<Team>;
}
