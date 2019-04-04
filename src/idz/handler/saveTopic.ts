import { SaveTopicRequest } from "../request/saveTopic";
import { SaveTopicResponse } from "../response/saveTopic";
import { World } from "../world";

export function saveTopic(w: World, req: SaveTopicRequest): SaveTopicResponse {
  return {
    type: "save_topic_res",
  };
}
