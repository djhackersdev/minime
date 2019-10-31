export interface UpsertClientSettingRequest {
  clientSetting: {
    /* Base-10 ALLNet location ID */
    placeId: string;

    /** Keychip ID */
    clientId: string;

    /** ALLNet place name */
    placeName: string;

    /** ALLNet "region0" */
    regionId: string;

    /** ALLNet "region_name0" */
    regionName: string;

    /** ALLNet "allnet_id" string */
    allNetId: string;

    /** sic. AMEX DS EEPROM ID */
    bordId: string;

    /** Data version of the form "1.30.00" */
    romVersion: string;

    /** Data version of the form "1.30.00" */
    dataVersion: string;

    /** Integer */
    dumpFileNum: string;
  };
}
