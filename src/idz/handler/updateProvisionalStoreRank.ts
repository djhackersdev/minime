import { UpdateProvisionalStoreRankRequest } from "../request/updateProvisionalStoreRank";
import { UpdateProvisionalStoreRankResponse } from "../response/updateProvisionalStoreRank";
import { World } from "../world";

export function updateProvisionalStoreRank(
  w: World,
  req: UpdateProvisionalStoreRankRequest
): UpdateProvisionalStoreRankResponse {
  return {
    type: "update_provisional_store_rank_res",
    rows: [],
  };
}
