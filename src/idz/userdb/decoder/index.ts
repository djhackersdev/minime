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
import { loadTeamRanking1, loadTeamRanking2 } from "./loadTeamRanking";
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
import { BLOCK_SIZE, ClientHello } from "../../common";
import { ByteStream } from "../../../util/stream";

const debug = logger("app:idz:userdb:decoder");

export type ReaderFn = ((buf: Buffer) => Request) & {
  msgCode: number;
  msgLen: number;
};

function makeReaderMap(funcList: ReaderFn[]): Map<number, ReaderFn> {
  const result = new Map<number, ReaderFn>();

  for (const fn of funcList) {
    result.set(fn.msgCode, fn);
  }

  return result;
}

// TODO confirm v1.21.00 proto version
const funcList110: ReaderFn[] = [
  checkTeamName,
  createAutoTeam,
  createProfile,
  createTeam,
  discoverProfile,
  load2on2_v1,
  loadConfig,
  loadConfig2,
  loadEventInfo,
  loadGacha,
  loadGarage,
  loadGeneralReward1,
  loadGhost,
  loadProfile2,
  loadRewardTable,
  loadServerList,
  loadStocker,
  loadTeam,
  loadTeamRanking1,
  lockGarage,
  lockProfile,
  lockProfileExtend,
  loadTopTen1,
  msg00AD,
  saveExpedition1,
  saveGarage,
  saveNewCar,
  saveProfile2,
  saveSettings,
  saveStocker,
  saveTeamBanner,
  saveTimeAttack1,
  saveTopic,
  unlockProfile,
  updateProvisionalStoreRank,
  updateResult,
  updateStoryClearNum1,
  updateTeamLeader,
  updateTeamMember,
  updateTeamPoints,
  updateUiReport,
  updateUserLog,
];

const funcList130: ReaderFn[] = [
  checkTeamName,
  createAutoTeam,
  createProfile,
  createTeam,
  discoverProfile,
  load2on2_v2,
  updateStoryClearNum2,
  loadConfig,
  loadConfig2,
  loadEventInfo,
  loadGacha,
  loadGarage,
  loadGeneralReward2,
  loadGhost,
  loadProfile3,
  loadRewardTable,
  loadServerList,
  loadStocker,
  loadTeam,
  loadTeamRanking2,
  loadTopTen2,
  lockGarage,
  lockProfile,
  lockProfileExtend,
  msg00AD,
  saveExpedition2,
  saveGarage,
  saveNewCar,
  saveProfile3,
  saveSettings,
  saveStocker,
  saveTeamBanner,
  saveTimeAttack2,
  saveTopic,
  unlockProfile,
  updateProvisionalStoreRank,
  updateResult,
  updateTeamLeader,
  updateTeamMember,
  updateTeamPoints,
  updateUiReport,
  updateUserLog,
];

const protocols = new Map<string, Map<number, ReaderFn>>();

protocols.set("110", makeReaderMap(funcList110));
protocols.set("130", makeReaderMap(funcList130));

async function readRequest(
  clientHello: ClientHello,
  stm: ByteStream
): Promise<Request | undefined> {
  const protocol = protocols.get(clientHello.protocol);

  if (protocol === undefined) {
    throw new Error(`Unsupported protocol version ${clientHello.protocol}`);
  }

  const head = await stm.read(BLOCK_SIZE);

  if (head.length === 0) {
    // Connection closed
    return undefined;
  }

  const msgCode = head.readUInt16LE(0x0000);
  const readerFn = protocol.get(msgCode);

  if (readerFn === undefined) {
    throw new Error(`Message ${msgCode.toString(16)}: Unknown command code`);
  }

  const tail = await stm.read(readerFn.msgLen - BLOCK_SIZE);
  const msg = Buffer.concat([head, tail]);

  if (msg.length < readerFn.msgLen) {
    throw new Error(`Message ${msgCode.toString(16)}: Truncated read`);
  }

  if (debug.enabled) {
    debug("Raw: %s", msg.toString("hex"));
  }

  const payload = readerFn(msg);

  debug("Payload: %j", payload);

  return payload;
}

export default async function* readRequestStream(
  clientHello: ClientHello,
  stm: ByteStream
) {
  while (true) {
    const req = await readRequest(clientHello, stm);

    if (req === undefined) {
      return;
    }

    yield req;
  }
}
