import { RouteNo } from "./base";
import { CarSelector } from "./car";

export interface TimeAttackScore {
  routeNo: RouteNo;
  timestamp: Date;
  flags: number;
  totalTime: number;
  sectionTimes: number[];
  grade: number;
  carSelector: CarSelector;
}
