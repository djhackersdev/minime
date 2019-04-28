import { CarSelector } from "../model/car";

export interface LoadTopTenResponseRow {
  field_00: number;
  totalMsec: number;
  timestamp: Date;
  car: CarSelector;
  field_0E: boolean;
  field_0F: boolean;
  field_10: number;
  driverName: string;
  teamName: string;
  shopName: string;
  field_74: number;
  field_78: number;
  field_7C: number;
  field_7D: number;
}

export interface LoadTopTenResponseCourse {
  courseId: number; // Multiplied by 2! Includes day/night i guess
  field_02: number;
  wrStageMsec: number[]; // Sent OOB, for first-place only
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
  totalSelected: number;
  courses: LoadTopTenResponseCourse[];
  trailers: LoadTopTenResponseTrailer[];
}
