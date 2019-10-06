import { LoadStockerRequest } from "../request/loadStocker";
import { AimeId } from "../../model";

loadStocker.msgCode = 0x00a7;
loadStocker.msgLen = 0x0010;

export function loadStocker(buf: Buffer): LoadStockerRequest {
  return {
    type: "load_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
  };
}
