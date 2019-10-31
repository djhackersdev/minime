import { Crush, writeObject } from "./base";
import { GameEventItem } from "../model/gameEvent";

export type GameEventJson = Crush<GameEventItem>;

export function writeGameEvent(obj: GameEventItem): GameEventJson {
  return writeObject(obj);
}
