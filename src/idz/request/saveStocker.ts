import { BackgroundCode, Id } from "../model/base";
import { CarSelector } from "../model/car";
import { Chara } from "../model/chara";
import { Profile } from "../model/profile";

export interface SaveStockerRequest {
  type: "save_stocker_req";
  profileId: Id<Profile>;
  selectedCar: CarSelector;
  backgrounds: BackgroundCode[];
  chara: Chara;
}
