import { UpdateStoryClearNumRequest } from "../request/updateStoryClearNum";
import { UpdateStoryClearNumResponse } from "../response/updateStoryClearNum";
import { Repositories } from "../repo";

export function updateStoryClearNum(
  w: Repositories,
  req: UpdateStoryClearNumRequest
): UpdateStoryClearNumResponse {
  return {
    type: "update_story_clear_num_res",
  };
}
