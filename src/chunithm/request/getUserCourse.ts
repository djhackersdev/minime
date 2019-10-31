export interface GetUserCourseRequest {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, pagination cookie. Initially zero. */
  nextIndex: string;

  /**
   * Integer, max page size. NOT configured from GetGameSetting as of 1.30.00,
   * but instead hardcoded to 50. Still, don't assume that will always be the
   * case.
   */
  maxCount: string;
}
