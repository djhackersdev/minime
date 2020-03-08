import { AimeId } from "../../../model";

export interface LoadGachaRequest {
  type: "load_gacha_req";
  aimeId: AimeId;
}
