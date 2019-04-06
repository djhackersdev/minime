import { RequestCode } from "./_defs";
import { SaveExpeditionRequest } from "../request/saveExpedition";

saveExpedition.msgCode = 0x008c as RequestCode;
saveExpedition.msgLen = 0x0010;

export function saveExpedition(buf: Buffer): SaveExpeditionRequest {
  return {
    type: "save_expedition_req",
    field_0004: buf.readUInt32LE(0x0004),
  };
}
