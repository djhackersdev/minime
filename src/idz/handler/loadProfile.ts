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
    lv: 69,
    fame: 1234,
    dpoint: 54321,
    teamId: 0x22334455,
  };
}
