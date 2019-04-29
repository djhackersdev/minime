import { RouteNo } from "./base";

export interface TimeAttackScore {
  routeNo: RouteNo;
  timestamp: Date;
  flags: number;
  totalTime: number;
  sectionTimes: number[];
  grade: number;
}
