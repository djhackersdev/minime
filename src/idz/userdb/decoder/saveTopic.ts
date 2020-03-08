import { SaveTopicRequest } from "../request/saveTopic";

saveTopic.msgCode = 0x009a;
saveTopic.msgLen = 0x0010;

export function saveTopic(buf: Buffer): SaveTopicRequest {
  const aimeId = buf.readUInt32LE(0x0004);

  return {
    type: "save_topic_req",
    aimeId: aimeId !== 0xffffffff ? aimeId : undefined,
  };
}
