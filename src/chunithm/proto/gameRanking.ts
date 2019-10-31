import { Crush, writeObject } from "./base";
import { GameRankingItem } from "../model/gameRanking";

export type GameRankingJson = Crush<GameRankingItem>;

export function writeGameRanking(obj: GameRankingItem): GameRankingJson {
  return writeObject(obj);
}
