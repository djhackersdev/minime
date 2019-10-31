export interface UpsertClientTestmodeRequest {
  clientTestmode: {
    /* Base-10 ALLNet location ID */
    placeId: string;

    /** Keychip ID */
    clientId: string;

    /** Date "YYYY-MM-DD hh:mm:ss" */
    updateDate: string;

    /** Boolean */
    isDelivery: string;

    /** Integer */
    groupId: string;

    /** Integer */
    groupRole: string;

    /** Integer */
    continueMode: string;

    /** Integer */
    selectMusicTime: string;

    /** Integer */
    advertiseVolume: string;

    /** Integer */
    eventMode: string;

    /** Integer */
    eventMusicNum: string;
  };
}
