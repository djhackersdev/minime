import { SaveTopicRequest } from "../request/saveTopic";
import { SaveTopicResponse } from "../response/saveTopic";
import { Repositories } from "../repo";

export function saveTopic(
  w: Repositories,
  req: SaveTopicRequest
): SaveTopicResponse {
  return {
    type: "save_topic_res",
  };
}
