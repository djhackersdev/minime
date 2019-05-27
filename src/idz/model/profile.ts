import { ExtId } from "./base";
import { Team } from "./team";
import { AimeId } from "../../model";

export interface Profile {
  aimeId: AimeId;
  teamId?: ExtId<Team>;
  name: string;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
}
