interface UpdateStoryClearNumResponseBase {
  type: "update_story_clear_num_res";
  // TODO, looks like a table of 9 * 10 u32 fields
}

export interface UpdateStoryClearNumResponse1
  extends UpdateStoryClearNumResponseBase {
  format: 1;
}

export interface UpdateStoryClearNumResponse2
  extends UpdateStoryClearNumResponseBase {
  format: 2;
}

export type UpdateStoryClearNumResponse =
  | UpdateStoryClearNumResponse1
  | UpdateStoryClearNumResponse2;
