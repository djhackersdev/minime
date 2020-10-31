import { UpdateExpeditionRequest } from "../request/updateExpedition";
import { UpdateExpeditionResponse } from "../response/updateExpedition";
import { Repositories } from "../repo";

export async function updateExpedition(
  w: Repositories,
  req: UpdateExpeditionRequest
): Promise<UpdateExpeditionResponse> {

  return {
    type: "update_expedition_res",
    expeditionType: req.expeditionRequestType,
  };
}
