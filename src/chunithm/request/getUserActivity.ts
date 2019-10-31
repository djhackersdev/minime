export interface GetUserActivityRequest {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, filter on `UserActivityItem.kind`. */
  kind: string;
}
