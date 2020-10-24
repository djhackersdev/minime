import { UpdateProvisionalStoreRankRequest } from "../request/updateProvisionalStoreRank";

updateProvisionalStoreRank1.msgCode = 0x0082;
updateProvisionalStoreRank1.msgLen = 0x0010;

export function updateProvisionalStoreRank1(
  buf: Buffer
): UpdateProvisionalStoreRankRequest {
  return {
    type: "update_provisional_store_rank_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
}

updateProvisionalStoreRank2.msgCode = 0x007c;
updateProvisionalStoreRank2.msgLen = 0x0010;

export function updateProvisionalStoreRank2(
  buf: Buffer
): UpdateProvisionalStoreRankRequest {
  return {
    type: "update_provisional_store_rank_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
}
