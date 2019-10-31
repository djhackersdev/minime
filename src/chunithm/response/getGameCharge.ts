import { GameChargeJson } from "../proto/gameCharge";

export interface GetGameChargeResponse {
  /** Integer */
  length: string;

  /** TBD */
  gameChargeList: GameChargeJson[];
}
