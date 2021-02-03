import { ExtId, RouteNo } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../../model";

export interface LoadTopTenRequestSelector {
  routeNo: RouteNo;
  minTimestamp: Date;
}

export interface LoadTopTenRequest {
  type: "load_top_ten_req";
  version: number;
  field_2: number;
  selectors: LoadTopTenRequestSelector[];
  field_C4: number;
  field_C5: number;
  field_C6: number;
  aimeId?: AimeId;
  teamId?: ExtId<Team>;
}
