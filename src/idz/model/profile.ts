import { ExtId } from "./base";
import { Team } from "./team";

export interface Profile {
  id: ExtId<Profile>;
  teamId?: ExtId<Team>;
  name: string;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
}
