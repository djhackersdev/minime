export interface GetUserItemRequest {
  /** Integer, AiMe ID */
  userId: string;

  /**
   * Long.
   *
   * This is an odd amalgam of what ought to be two separate `kind` and
   * `nextIndex` parameters. Divide by 10 billion to separate them out.
   * The quotient is the `kind` that the client wants you to return, the
   * remainder is the effective `nextIndex` pagination cookie which comes into
   * play if more than `maxCount` items of this type are available. Presumably
   * returning a result set of size `maxCount` will cause another request to
   * be issued in order to retrieve the next page. See response documentation
   * for further details.
   *
   * @see GetUserItemResponse
   */
  nextIndex: string;

  /** Integer, max page size. Taken from GetGameSettingResponse. */
  maxCount: string;
}
