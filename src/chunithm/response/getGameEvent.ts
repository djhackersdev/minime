import { GameEventJson } from "../proto/gameEvent";

export interface GetGameEventResponse {
  /** Integer */
  type: string;

  /** Integer, number of results returned */
  length: string;

  gameEventList: GameEventJson[];
}
