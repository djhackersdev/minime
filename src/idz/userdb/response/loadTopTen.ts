import { RouteNo } from "../model/base";
import { TimeAttackScore } from "../model/timeAttack";

export interface LoadTopTenResponseRow {
  field_00: number;
  field_0E: boolean;
  field_0F: boolean;
  field_10: number;
  driverName: string;
  shopName: string;
  team: {
    name: string;
    nameBg: number;
    nameFx: number;
  };
  field_7C: number;
  field_7D: number;
  ta: TimeAttackScore;
}

export interface LoadTopTenResponseCourse {
  routeNo: RouteNo;
  field_02: number;
  rows: LoadTopTenResponseRow[];
}

export interface LoadTopTenResponseTrailer {
  // Something team related...
  yearMonth: number;
  courseId: number;
  isNight: boolean;
  totalMsec: number;
  name: string;
}

export interface LoadTopTenResponse {
  type: "load_top_ten_res";
  courseCount: number;
  courses: LoadTopTenResponseCourse[];
  trailers: LoadTopTenResponseTrailer[];
}
