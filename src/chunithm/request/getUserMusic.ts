export interface GetUserMusicRequest {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, pagination cookie. Initially zero. */
  nextIndex: string;

  /** Integer, max page size. Taken from GetGameSettingResponse. */
  maxCount: string;
}
