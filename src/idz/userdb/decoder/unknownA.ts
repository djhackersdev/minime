import { UnknownRequestA } from "../request/unknownA";

unknownA.msgCode = 0x00ad;
unknownA.msgLen = 0x0620;

export function unknownA(buf: Buffer): UnknownRequestA {
  return { type: "unknown_A_req" };
}
