import { LoadTopTenRequest } from "../request/loadTopTen";
import {
  LoadTopTenResponse,
  LoadTopTenResponseCourse,
  LoadTopTenResponseRow,
} from "../response/loadTopTen";
import { Repositories, TopTenResult } from "../repo";

export async function loadTopTen(
  w: Repositories,
  req: LoadTopTenRequest
): Promise<LoadTopTenResponse> {
  const courses = new Array<LoadTopTenResponseCourse>();

  for (const selector of req.selectors) {
    if (courses.length >= 3) {
      break;
    }

    const { routeNo, minTimestamp } = selector;
    const src = await w.timeAttack().loadTop(routeNo, minTimestamp, 10);

    if (src.length === 0) {
      continue;
    }

    const dest = new Array<LoadTopTenResponseRow>();

    for (const srcItem of src) {
      dest.push({
        field_00: 0,
        field_0E: false,
        field_0F: false,
        field_10: 0,
        driverName: srcItem.driverName,
        shopName: process.env.SHOP_NAME || "",
        team: srcItem.team,
        field_7C: 0,
        field_7D: 0,
        ta: srcItem.ta,
      });
    }

    courses.push({
      routeNo,
      field_02: 0,
      rows: dest,
    });
  }

  return {
    type: "load_top_ten_res",
    courseCount: courses.length,
    courses: courses,
    trailers: [],
  };
}
