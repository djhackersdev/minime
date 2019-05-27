import { BackgroundCode } from "../model/base";
import { CarSelector } from "../model/car";
import { Chara } from "../model/chara";
import { AimeId } from "../../model";

export interface SaveStockerRequest {
  type: "save_stocker_req";
  aimeId: AimeId;
  selectedCar: CarSelector;
  backgrounds: Set<BackgroundCode>;
  chara: Chara;
}
