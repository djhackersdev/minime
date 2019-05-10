interface UpdateStoryClearNumRequestBase {
  type: "update_story_clear_num_req";
}

export interface UpdateStoryClearNumRequest1
  extends UpdateStoryClearNumRequestBase {
  format: 1;
}

export interface UpdateStoryClearNumRequest2
  extends UpdateStoryClearNumRequestBase {
  format: 2;
}

export type UpdateStoryClearNumRequest =
  | UpdateStoryClearNumRequest1
  | UpdateStoryClearNumRequest2;
