import { Crush, writeObject } from "./base";
import { GameSaleItem } from "../model/gameSale";

export type GameSaleJson = Crush<GameSaleItem>;

export function writeGameSale(obj: GameSaleItem): GameSaleJson {
  return writeObject(obj);
}
