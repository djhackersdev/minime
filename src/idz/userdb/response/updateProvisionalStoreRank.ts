export interface UpdateProvisionalStoreRankResponseRow {
  field_0000: number;
  field_0004: number;
  field_0010: string;
  field_003B: string;
}

export interface UpdateProvisionalStoreRankResponse {
  type: "update_provisional_store_rank_res";
  rows: UpdateProvisionalStoreRankResponseRow[];
}
