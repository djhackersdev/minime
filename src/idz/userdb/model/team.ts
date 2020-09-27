import { ExtId } from "./base";
import { Chara } from "./chara";
import { Profile } from "./profile";

export interface Team {
  extId: ExtId<Team>;
  version: number;
  name: string;
  nameBg: number;
  nameFx: number;
  registerTime: Date;
}

export interface TeamAuto {
  serialNo: number;
  nameIdx: number;
}

export interface TeamMember {
  profile: Profile;
  chara: Chara;
  leader: boolean;
  joinTime: Date;
}
