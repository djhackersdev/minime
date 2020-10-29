import { BackgroundCode, MyCharaCode, StampCode } from "../model/base";
import { CarSelector } from "../model/car";
import { Chara } from "../model/chara";
import { SelectedStamps } from "../model/stamps";
import { AimeId } from "../../../model";

export interface SaveStockerRequest {
  type: "save_stocker_req";
  aimeId: AimeId;
  version: number;
  selectedCar: CarSelector;
  backgrounds: Set<BackgroundCode>;
  chara: Chara;
  myChara?: Set<MyCharaCode>;
  selectedStamps?: SelectedStamps;
  stamps?: Set<StampCode>;
}
