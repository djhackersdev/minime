export interface TimeAttackScore {
  courseId: number;
  timestamp: string; // hack
  flags: number;
  totalMsec: number;
  stageMsec: number[];
}
