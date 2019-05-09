import { Transform } from "stream";

import { checkTeamName } from "./checkTeamName";
import { createProfile } from "./createProfile";
import { createTeam } from "./createTeam";
import { joinAutoTeam } from "./joinAutoTeam";
import { discoverProfile } from "./discoverProfile";
import { load2on2_v1, load2on2_v2 } from "./load2on2";
import { loadConfig } from "./loadConfig";
import { loadConfig2 } from "./loadConfig2";
import { loadEventInfo } from "./loadEventInfo";
import { loadGacha } from "./loadGacha";
import { loadGarage } from "./loadGarage";
import { loadGeneralReward1, loadGeneralReward2 } from "./loadGeneralReward";
import { loadGhost } from "./loadGhost";
import { loadProfile2, loadProfile3 } from "./loadProfile";
import { loadRewardTable } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker } from "./loadStocker";
import { loadTeam } from "./loadTeam";
import { loadTeamRanking, loadTeamRanking2 } from "./loadTeamRanking";
import { lockGarage } from "./lockGarage";
import { lockProfile } from "./lockProfile";
import { msg00AD } from "./msg00AD";
import { saveExpedition1, saveExpedition2 } from "./saveExpedition";
import { saveGarage } from "./saveGarage";
import { saveNewCar } from "./saveNewCar";
import { saveProfile2 } from "./saveProfile2";
import { saveProfile3 } from "./saveProfile3";
import { saveSettings } from "./saveSettings";
import { saveStocker } from "./saveStocker";
import { saveTimeAttack1, saveTimeAttack2 } from "./saveTimeAttack";
import { saveTopic } from "./saveTopic";
import { unlockProfile } from "./unlockProfile";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import { updateStoryClearNum } from "./updateStoryClearNum";
import { RequestCode } from "./_defs";
import { Request } from "../request";
import { loadTopTen } from "./loadTopTen";
import { updateResult } from "./updateResult";
import { updateTeamPoints } from "./updateTeamPoints";
import { updateUiReport } from "./updateUiReport";
import { updateUserLog } from "./updateUserLog";

export type ReaderFn = ((buf: Buffer) => Request) & {
  msgCode: RequestCode;
  msgLen: number;
};

const funcList: ReaderFn[] = [
  checkTeamName,
  createProfile,
  createTeam,
  joinAutoTeam,
  discoverProfile,
  load2on2_v1,
  load2on2_v2,
  loadConfig,
  loadConfig2,
  loadEventInfo,
  loadGacha,
  loadGarage,
  loadGeneralReward1,
  loadGeneralReward2,
  loadGhost,
  loadProfile2,
  loadProfile3,
  loadRewardTable,
  loadServerList,
  loadStocker,
  loadTeam,
  loadTeamRanking,
  loadTeamRanking2,
  loadTopTen,
  lockGarage,
  lockProfile,
  msg00AD,
  saveExpedition1,
  saveExpedition2,
  saveGarage,
  saveNewCar,
  saveProfile2,
  saveProfile3,
  saveSettings,
  saveStocker,
  saveTimeAttack1,
  saveTimeAttack2,
  saveTopic,
  unlockProfile,
  updateProvisionalStoreRank,
  updateResult,
  updateStoryClearNum,
  updateTeamPoints,
  updateUiReport,
  updateUserLog,
];

const readerFns = new Map<RequestCode, ReaderFn>();
const msgLengths = new Map<RequestCode, number>();

for (const fn of funcList) {
  readerFns.set(fn.msgCode, fn);
  msgLengths.set(fn.msgCode, fn.msgLen);
}

function readHeader(buf: Buffer) {
  return {
    blah: "blah",
  };
}

export class Decoder extends Transform {
  state: Buffer;

  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    });

    this.state = Buffer.alloc(0);
  }

  _transform(chunk: Buffer, encoding, callback) {
    this.state = Buffer.concat([this.state, chunk]);

    // Read header

    if (this.state.length < 0x04) {
      return callback(null);
    }

    const magic = this.state.readUInt32LE(0);

    if (magic !== 0x01020304) {
      return callback(
        new Error(
          "Invalid magic number, cryptographic processing probably incorrect."
        )
      );
    }

    if (this.state.length < 0x30) {
      return callback(null);
    }

    const header = readHeader(this.state);

    if (this.state.length < 0x32) {
      return callback(null);
    }

    const msgCode = this.state.readUInt16LE(0x30) as RequestCode;
    const msgLen = msgLengths.get(msgCode);

    if (msgLen === undefined) {
      return callback(
        new Error(
          `Unknown command code ${msgCode.toString(16)}, cannot continue`
        )
      );
    }

    if (this.state.length < 0x30 + msgLen) {
      return callback(null);
    }

    const reqBuf = this.state.slice(0, 0x30 + msgLen);
    const payloadBuf = reqBuf.slice(0x30);

    console.log("Idz: Req: Raw:", reqBuf.toString("hex"));
    console.log("Idz: Req: Header:", header);

    const reader = readerFns.get(msgCode);

    if (reader === undefined) {
      return callback(
        new Error(`No reader for command code ${msgCode.toString(16)}`)
      );
    }

    const payload = reader(payloadBuf);

    console.log("Idz: Req: Payload:", payload);

    return callback(null, payload);
  }
}
