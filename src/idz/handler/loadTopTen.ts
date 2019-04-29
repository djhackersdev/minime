import { LoadTopTenRequest } from "../request/loadTopTen";
import { LoadTopTenResponse } from "../response/loadTopTen";
import { Repositories } from "../repo";

export function loadTopTen(
  w: Repositories,
  req: LoadTopTenRequest
): LoadTopTenResponse {
  return {
    type: "load_top_ten_res",
    totalSelected: 0,
    courses: [],
    trailers: [],
  };
}
