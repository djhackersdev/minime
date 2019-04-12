export interface TimeAttackCourse {
  courseId: number;
  timestamp: string; // hack
  flags: number;
  totalMsec: number;
  stageMsec: number[];
}

export interface TimeAttackState {
  courses: TimeAttackCourse[];
}
