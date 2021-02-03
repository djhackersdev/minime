import { UnknownRequestA } from "../request/unknownA";

unknownA_1.msgCode = 0x00ad;
unknownA_1.msgLen = 0x0620;

export function unknownA_1(buf: Buffer): UnknownRequestA {
  return { type: "unknown_A_req" };
}

unknownA_2.msgCode = 0x00a2;
unknownA_2.msgLen = 0x0620;

export function unknownA_2(buf: Buffer): UnknownRequestA {
  return { type: "unknown_A_req" };
}
