import { UpdateProvisionalStoreRankRequest } from "../request/updateProvisionalStoreRank";

updateProvisionalStoreRank.msgCode = 0x0082;
updateProvisionalStoreRank.msgLen = 0x0010;

export function updateProvisionalStoreRank(
  buf: Buffer
): UpdateProvisionalStoreRankRequest {
  return {
    type: "update_provisional_store_rank_req",
    aimeId: buf.readUInt32LE(0x0004),
  };
}
