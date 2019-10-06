import {
  SaveExpeditionRequest1,
  SaveExpeditionRequest2,
} from "../request/saveExpedition";

saveExpedition1.msgCode = 0x008c;
saveExpedition1.msgLen = 0x0010;

export function saveExpedition1(buf: Buffer): SaveExpeditionRequest1 {
  return {
    type: "save_expedition_req",
    format: 1,
    field_0004: buf.readUInt32LE(0x0004),
  };
}

saveExpedition2.msgCode = 0x013f;
saveExpedition2.msgLen = 0x0010;

export function saveExpedition2(buf: Buffer): SaveExpeditionRequest2 {
  return {
    type: "save_expedition_req",
    format: 2,
    field_0004: buf.readUInt32LE(0x0004),
  };
}
