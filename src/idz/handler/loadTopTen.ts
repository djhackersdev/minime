import { LoadTopTenRequest } from "../request/loadTopTen";
import { LoadTopTenResponse } from "../response/loadTopTen";
import { World } from "../world";

export function loadTopTen(
  w: World,
  req: LoadTopTenRequest
): LoadTopTenResponse {
  return {
    type: "load_top_ten_res",
  };
}
