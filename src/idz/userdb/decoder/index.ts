import logger from "debug";

import { checkTeamName } from "./checkTeamName";
import { createProfile } from "./createProfile";
import { createTeam } from "./createTeam";
import { createAutoTeam } from "./createAutoTeam";
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
import { loadTopTen1 } from "./loadTopTen1";
import { loadTopTen2 } from "./loadTopTen2";
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
import { saveTeamBanner } from "./saveTeamBanner";
import { saveTimeAttack1, saveTimeAttack2 } from "./saveTimeAttack";
import { saveTopic } from "./saveTopic";
import { unlockProfile } from "./unlockProfile";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import { updateTeamLeader } from "./updateTeamLeader";
import { updateTeamMember } from "./updateTeamMember";
import {
  updateStoryClearNum1,
  updateStoryClearNum2,
} from "./updateStoryClearNum";
import { Request } from "../request";
import { updateResult } from "./updateResult";
import { updateTeamPoints } from "./updateTeamPoints";
import { updateUiReport } from "./updateUiReport";
import { updateUserLog } from "./updateUserLog";
import { lockProfileExtend } from "./lockProfileExtend";
import { BLOCK_SIZE } from "../../common";
import { ByteStream } from "../../../util/stream";

const debug = logger("app:idz:userdb:decoder");

export type ReaderFn = ((buf: Buffer) => Request) & {
  msgCode: number;
  msgLen: number;
};

const funcList: ReaderFn[] = [
  checkTeamName,
  createAutoTeam,
  createProfile,
  createTeam,
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
  loadTopTen1,
  loadTopTen2,
  lockGarage,
  lockProfile,
  lockProfileExtend,
  msg00AD,
  saveExpedition1,
  saveExpedition2,
  saveGarage,
  saveNewCar,
  saveProfile2,
  saveProfile3,
  saveSettings,
  saveStocker,
  saveTeamBanner,
  saveTimeAttack1,
  saveTimeAttack2,
  saveTopic,
  unlockProfile,
  updateProvisionalStoreRank,
  updateResult,
  updateStoryClearNum1,
  updateStoryClearNum2,
  updateTeamLeader,
  updateTeamMember,
  updateTeamPoints,
  updateUiReport,
  updateUserLog,
];

const readerFns = new Map<number, ReaderFn>();
const msgLengths = new Map<number, number>();

for (const fn of funcList) {
  readerFns.set(fn.msgCode, fn);
  msgLengths.set(fn.msgCode, fn.msgLen);
}

async function readRequest(stm: ByteStream): Promise<Request | undefined> {
  const head = await stm.read(BLOCK_SIZE);

  if (head.length === 0) {
    // Connection closed
    return undefined;
  }

  const msgCode = head.readUInt16LE(0x0000);
  const msgLen = msgLengths.get(msgCode);

  if (msgLen === undefined) {
    throw new Error(`Message ${msgCode.toString(16)}: Unknown command code`);
  }

  const tail = await stm.read(msgLen - BLOCK_SIZE);
  const msg = Buffer.concat([head, tail]);

  if (msg.length < msgLen) {
    throw new Error(`Message ${msgCode.toString(16)}: Truncated read`);
  }

  if (debug.enabled) {
    debug("Raw: %s", msg.toString("hex"));
  }

  const reader = readerFns.get(msgCode);

  if (reader === undefined) {
    throw new Error(`Message ${msgCode.toString(16)}: No read handler`);
  }

  const payload = reader(msg);

  debug("Payload: %j", payload);

  return payload;
}

export default async function* readRequestStream(stm: ByteStream) {
  while (true) {
    const req = await readRequest(stm);

    if (req === undefined) {
      return;
    }

    yield req;
  }
}
