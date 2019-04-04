import { Transform } from "stream";

import { createProfile } from "./createProfile";
import { createTeam } from "./createTeam";
import { discoverProfile } from "./discoverProfile";
import { load2on2 } from "./load2on2";
import { loadConfig } from "./loadConfig";
import { loadConfig2 } from "./loadConfig2";
import { loadGeneralReward } from "./loadGeneralReward";
import { loadProfile } from "./loadProfile";
import { loadRewardTable } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker } from "./loadStocker";
import { loadTeam } from "./loadTeam";
import { loadTeamRanking, loadTeamRanking2 } from "./loadTeamRanking";
import { lockProfile } from "./lockProfile";
import { saveExpedition } from "./saveExpedition";
import { saveProfile } from "./saveProfile";
import { saveSettings } from "./saveSettings";
import { saveTopic } from "./saveTopic";
import { unlockProfile } from "./unlockProfile";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import { updateStoryClearNum } from "./updateStoryClearNum";
import { RequestCode } from "../defs";
import { Request } from "../request";
import { loadTopTen } from "./loadTopTen";

export type ReaderFn = ((buf: Buffer) => Request) & {
  msgCode: RequestCode;
  msgLen: number;
};

const funcList: ReaderFn[] = [
  unlockProfile,
  createProfile,
  createTeam,
  discoverProfile,
  load2on2,
  loadConfig,
  loadConfig2,
  loadGeneralReward,
  loadProfile,
  loadRewardTable,
  loadServerList,
  loadStocker,
  loadTeam,
  loadTeamRanking,
  loadTeamRanking2,
  loadTopTen,
  lockProfile,
  saveExpedition,
  saveProfile,
  saveSettings,
  saveTopic,
  updateProvisionalStoreRank,
  updateStoryClearNum,
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
