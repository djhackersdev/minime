import { Crush, readBoolean, readDate, readWtf8, writeObject } from "./base";
import { UserDataItem } from "../model/userData";

export type UserDataJson = Crush<UserDataItem>;

export function readUserData(json: UserDataJson): UserDataItem {
  return {
    accessCode: json.accessCode,
    userName: readWtf8(json.userName), // <--
    isWebJoin: readBoolean(json.isWebJoin),
    webLimitDate: readDate(json.webLimitDate),
    level: parseInt(json.level),
    reincarnationNum: parseInt(json.reincarnationNum),
    exp: parseInt(json.exp),
    point: parseInt(json.point),
    totalPoint: BigInt(json.totalPoint),
    playCount: parseInt(json.playCount),
    multiPlayCount: parseInt(json.multiPlayCount),
    multiWinCount: parseInt(json.multiWinCount),
    requestResCount: parseInt(json.requestResCount),
    acceptResCount: parseInt(json.acceptResCount),
    successResCount: parseInt(json.successResCount),
    playerRating: parseInt(json.playerRating),
    highestRating: parseInt(json.highestRating),
    nameplateId: parseInt(json.nameplateId),
    frameId: parseInt(json.frameId),
    characterId: parseInt(json.characterId),
    trophyId: parseInt(json.trophyId),
    playedTutorialBit: parseInt(json.playedTutorialBit),
    firstTutorialCancelNum: parseInt(json.firstTutorialCancelNum),
    masterTutorialCancelNum: parseInt(json.masterTutorialCancelNum),
    totalRepertoireCount: parseInt(json.totalRepertoireCount),
    totalMapNum: parseInt(json.totalMapNum),
    totalHiScore: BigInt(json.totalHiScore),
    totalBasicHighScore: BigInt(json.totalBasicHighScore),
    totalAdvancedHighScore: BigInt(json.totalAdvancedHighScore),
    totalExpertHighScore: BigInt(json.totalExpertHighScore),
    totalMasterHighScore: BigInt(json.totalMasterHighScore),
    eventWatchedDate: readDate(json.eventWatchedDate),
    friendCount: parseInt(json.friendCount),
    isMaimai: readBoolean(json.isMaimai),
    firstGameId: json.firstGameId,
    firstRomVersion: json.firstRomVersion,
    firstDataVersion: json.firstDataVersion,
    firstPlayDate: readDate(json.firstPlayDate),
    lastGameId: json.lastGameId,
    lastRomVersion: json.lastRomVersion,
    lastDataVersion: json.lastDataVersion,
    lastPlayDate: readDate(json.lastPlayDate),
    lastPlaceId: parseInt(json.lastPlaceId),
    lastPlaceName: json.lastPlaceName,
    lastRegionId: json.lastRegionId,
    lastRegionName: json.lastRegionName,
    lastAllNetId: json.lastAllNetId,
    lastClientId: json.lastClientId,
  };
}

export function writeUserData(obj: UserDataItem): UserDataJson {
  // Note: no need for a writeWtf8() for the user name.

  // Seems like something went very horribly wrong with their use of the
  // boost::property_page JSON codec, but C++ and especially Boost is a hot
  // mess at the best of times, so the Chunithm dev team has my sympathies
  // nonetheless.

  return writeObject(obj);
}
