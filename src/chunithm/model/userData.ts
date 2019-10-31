export interface UserDataItem {
  /** NFC LUID */
  accessCode: string;

  /** Uses wide latin chars */
  userName: string;

  isWebJoin: boolean;
  webLimitDate: Date;
  level: number;
  reincarnationNum: number;
  exp: number;
  point: number;
  totalPoint: bigint;
  playCount: number;
  multiPlayCount: number;
  multiWinCount: number;
  requestResCount: number;
  acceptResCount: number;
  successResCount: number;
  playerRating: number;
  highestRating: number;
  nameplateId: number;
  frameId: number;
  characterId: number;
  trophyId: number;
  playedTutorialBit: number;
  firstTutorialCancelNum: number;
  masterTutorialCancelNum: number;
  totalRepertoireCount: number;
  totalMapNum: number;
  totalHiScore: bigint;
  totalBasicHighScore: bigint;
  totalAdvancedHighScore: bigint;
  totalExpertHighScore: bigint;
  totalMasterHighScore: bigint;
  eventWatchedDate: Date;
  friendCount: number;
  isMaimai: boolean;
  firstGameId: string;
  firstRomVersion: string;
  firstDataVersion: string;
  firstPlayDate: Date;
  lastGameId: string;
  lastRomVersion: string;
  lastDataVersion: string;
  lastPlayDate: Date;

  /** ALLNet place ID */
  lastPlaceId: number;

  /** ALLNet place name */
  lastPlaceName: string;

  /** ALLNet "region0" */
  lastRegionId: string;

  /** ALLNet "region_name0" */
  lastRegionName: string;

  /** ALLNet "allnet_id" string */
  lastAllNetId: string;

  /** Keychip ID */
  lastClientId: string;
}
