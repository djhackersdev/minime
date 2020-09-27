import { AimeId } from "../../../model";

export interface LoadStockerRequest {
  type: "load_stocker_req";
  aimeId: AimeId;
  version: number;
}
