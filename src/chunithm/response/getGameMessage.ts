import { GameMessageJson } from "../proto/gameMessage";

export interface GetGameMessageResponse {
  /** Integer */
  type: string;

  /** Integer */
  length: string;

  gameMessageList: GameMessageJson[];
}
