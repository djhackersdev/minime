import { BackgroundCode, ExtId } from "../model/base";
import { CarSelector } from "../model/car";
import { Chara } from "../model/chara";
import { Profile } from "../model/profile";

export interface SaveStockerRequest {
  type: "save_stocker_req";
  profileId: ExtId<Profile>;
  selectedCar: CarSelector;
  backgrounds: Set<BackgroundCode>;
  chara: Chara;
}
