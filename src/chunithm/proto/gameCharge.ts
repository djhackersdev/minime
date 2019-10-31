import { Crush, writeObject } from "./base";
import { GameChargeItem } from "../model/gameCharge";

export type GameChargeJson = Crush<GameChargeItem>;

export function writeGameCharge(obj: GameChargeItem): GameChargeJson {
  return writeObject(obj);
}
