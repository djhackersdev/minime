import { GameSaleJson } from "../proto/gameSale";

export interface GetGameSaleResponse {
  /** Integer */
  type: string;

  /** Integer */
  length: string;

  gameSaleList: GameSaleJson[];
}
