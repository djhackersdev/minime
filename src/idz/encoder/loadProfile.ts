import { loadProfile1 } from "./loadProfile1";
import { loadProfile2 } from "./loadProfile2";
import { LoadProfileResponse } from "../response/loadProfile";

export function loadProfile(res: LoadProfileResponse) {
  switch (res.format) {
    case 1:
      return loadProfile1(res);

    case 2:
      return loadProfile2(res);

    default:
      const exhaust: never = res;

      throw new Error(`Unsupported profile response format ${res["format"]}`);
  }
}
