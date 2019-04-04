import { UpdateStoryClearNumRequest } from "../request/updateStoryClearNum";
import { UpdateStoryClearNumResponse } from "../response/updateStoryClearNum";
import { World } from "../world";

export function updateStoryClearNum(
  w: World,
  req: UpdateStoryClearNumRequest
): UpdateStoryClearNumResponse {
  return {
    type: "update_story_clear_num_res",
  };
}
