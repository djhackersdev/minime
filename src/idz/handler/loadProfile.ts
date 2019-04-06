import { LoadProfileRequest } from "../request/loadProfile";
import { LoadProfileResponse2 } from "../response/loadProfile2";
import { World } from "../world";

export function loadProfile(
  w: World,
  req: LoadProfileRequest
): LoadProfileResponse2 {
  return {
    type: "load_profile_v2_res",
    name: "てすと",
    profileId: 0x11223344,
    lv: 99,
    fame: 1234,
    dpoint: 54321,
    teamId: 0x22334455,
    settings: {
      bgMusic: 15,
      forceQuitEn: false,
      steeringForce: 4,
      bgVolume: 10,
      seVolume: 10,
      cornerGuide: true,
      lineGuide: false,
      ghostEn: false,
      taResultSkip: false,
    },
    chara: {
      gender: "male",
      clothing: 0,
      mouth: 0,
      field_06: 0,
      field_08: 0,
      field_0A: 0,
      field_0C: 0,
      field_0E: 0,
    },
    background: 0,
    title: 0,
    titles: [],
    car: {
      field_00: 0,
      field_02: 0,
      field_04: [],
      model: 0,
      color: 0,
      transmission: 0,
      field_4A: 0,
      field_4C: 21527,
      field_50_lo: 3674393,
      field_50_hi: 6407,
      field_58: 0,
      field_5A: 0,
      field_5B: 0,
      field_5C: 1,
      field_5E: 0,
    },
  };
}
