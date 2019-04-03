import { SaveTopicResponse } from "../response/saveTopic";

export function saveTopic(res: SaveTopicResponse) {
  const buf = Buffer.alloc(0x05d0);

  buf.writeInt16LE(0x009b, 0x0000);

  return buf;
}
