import { RequestCode } from "./_defs";
import { LoadTopTenRequest } from "../request/loadTopTen";

loadTopTen.msgCode = 0x00b5 as RequestCode;
loadTopTen.msgLen = 0x00e0;

export function loadTopTen(buf: Buffer): LoadTopTenRequest {
  return {
    type: "load_top_ten_req",
  };
}
