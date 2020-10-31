import { BackgroundCode, MyCharaCode } from "../model/base";

export interface LoadStockerResponse {
  type: "load_stocker_res";
  status: number;
  backgrounds: Set<BackgroundCode>;
  myChara: Set<MyCharaCode>;
}
