export interface GetGameSettingResponse {
  gameSetting: {
    /** ROM version string e.g. "1.30.00" */
    dataVersion: string;

    isMaintenance: string;

    requestInterval: string;

    rebootStartTime: string;

    rebootEndTime: string;

    /** Boolean */
    isBackgroundDistribute: string;

    /** Integer, pagination granularity for GetUserCharacter */
    maxCountCharacter: string;

    /** Integer, pagination granularity for GetUserJson */
    maxCountItem: string;

    /** Integer, pagination granularity for GetUserMusic */
    maxCountMusic: string;
  };

  /** Boolean */
  isDumpUpload: string;

  /** Boolean */
  isAou: string;
}
