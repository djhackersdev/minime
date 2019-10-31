import { Crush, writeObject } from "./base";
import { GameMessageItem } from "../model/gameMessage";

export type GameMessageJson = Crush<GameMessageItem>;

export function writeGameMessage(obj: GameMessageItem): GameMessageJson {
  return writeObject(obj);
}
