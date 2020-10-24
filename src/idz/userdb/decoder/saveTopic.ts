import { SaveTopicRequest } from "../request/saveTopic";

saveTopic1.msgCode = 0x009a;
saveTopic1.msgLen = 0x0010;

export function saveTopic1(buf: Buffer): SaveTopicRequest {
  const aimeId = buf.readUInt32LE(0x0004);

  return {
    type: "save_topic_req",
    aimeId: aimeId !== 0xffffffff ? aimeId : undefined,
  };
}

saveTopic2.msgCode = 0x0091;
saveTopic2.msgLen = 0x0010;

export function saveTopic2(buf: Buffer): SaveTopicRequest {
  const aimeId = buf.readUInt32LE(0x0004);

  return {
    type: "save_topic_req",
    aimeId: aimeId !== 0xffffffff ? aimeId : undefined,
  };
}
