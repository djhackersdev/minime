import { UpdateExpeditionRequest } from "../request/updateExpedition";

updateExpedition.msgCode = 0x013F;
updateExpedition.msgLen = 0x0010;

export function updateExpedition(
  buf: Buffer
): UpdateExpeditionRequest {
  return {
    type: "update_expedition_req",
    expeditionRequestType: buf.readUInt32LE(0x0004),
  };
}
