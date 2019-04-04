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
  };
}
