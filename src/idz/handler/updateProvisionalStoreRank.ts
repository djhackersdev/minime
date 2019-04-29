import { UpdateProvisionalStoreRankRequest } from "../request/updateProvisionalStoreRank";
import { UpdateProvisionalStoreRankResponse } from "../response/updateProvisionalStoreRank";
import { Repositories } from "../repo";

export function updateProvisionalStoreRank(
  w: Repositories,
  req: UpdateProvisionalStoreRankRequest
): UpdateProvisionalStoreRankResponse {
  return {
    type: "update_provisional_store_rank_res",
    rows: [],
  };
}
