import logger from "debug";

import { checkTeamName1, checkTeamName2 } from "./checkTeamName";
import { createProfile1, createProfile2 } from "./createProfile";
import { createTeam1, createTeam2 } from "./createTeam";
import { createAutoTeam1, createAutoTeam2 } from "./createAutoTeam";
import { discoverProfile1, discoverProfile2 } from "./discoverProfile";
import {
  load2on2RankingPoints1,
  load2on2Info,
  load2on2RankingPoints2,
} from "./load2on2";
import {
  loadConfigA_1,
  loadConfigB_1,
  loadConfigA_2,
  loadConfigB_2,
} from "./loadConfig";
import { loadEventInfo1, loadEventInfo2 } from "./loadEventInfo";
import { loadGacha1, loadGacha2 } from "./loadGacha";
import { loadGarage1, loadGarage2 } from "./loadGarage";
import {
  loadGeneralReward1,
  loadGeneralReward2,
  loadGeneralReward3,
} from "./loadGeneralReward";
import { loadGhost1, loadGhost2 } from "./loadGhost";
import { loadProfile2, loadProfile3, loadProfile4 } from "./loadProfile";
import { loadRewardTable1, loadRewardTable2 } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker1, loadStocker2 } from "./loadStocker";
import { loadTeam1, loadTeam2 } from "./loadTeam";
import {
  loadTeamRanking1,
  loadTeamRanking2,
  loadTeamRanking3,
  loadTeamRanking4,
} from "./loadTeamRanking";
import { loadTopTen1 } from "./loadTopTen1";
import { loadTopTen2, loadTopTen3 } from "./loadTopTen2";
import { lockGarage1, lockGarage2 } from "./lockGarage";
import { lockProfile1, lockProfile2 } from "./lockProfile";
import { saveExpedition1, saveExpedition2 } from "./saveExpedition";
import { saveGarage1, saveGarage2 } from "./saveGarage";
import { saveNewCar1, saveNewCar2 } from "./saveNewCar";
import { saveProfile2 } from "./saveProfile2";
import { saveProfile3 } from "./saveProfile3";
import { saveSettings1, saveSettings2 } from "./saveSettings";
import { saveStocker1, saveStocker2 } from "./saveStocker";
import { saveTeamBanner1, saveTeamBanner2 } from "./saveTeamBanner";
import {
  saveTimeAttack1,
  saveTimeAttack2,
  saveTimeAttack3,
} from "./saveTimeAttack";
import { saveTopic1, saveTopic2 } from "./saveTopic";
import { unknownA_1, unknownA_2 } from "./unknownA";
import { unlockProfile1, unlockProfile2 } from "./unlockProfile";
import {
  updateProvisionalStoreRank1,
  updateProvisionalStoreRank2,
} from "./updateProvisionalStoreRank";
import { updateTeamLeader1, updateTeamLeader2 } from "./updateTeamLeader";
import { updateTeamMember1, updateTeamMember2 } from "./updateTeamMember";
import {
  updateStoryClearNum1,
  updateStoryClearNum2,
  updateStoryClearNum3,
} from "./updateStoryClearNum";
import { Request } from "../request";
import { updateResult } from "./updateResult";
import { updateTeamPoints1, updateTeamPoints2 } from "./updateTeamPoints";
import { updateUiReport1, updateUiReport2 } from "./updateUiReport";
import { updateUserLog1, updateUserLog2 } from "./updateUserLog";
import { lockProfileExtend1, lockProfileExtend2 } from "./lockProfileExtend";
import { BLOCK_SIZE, ClientHello } from "../../common";
import { ByteStream } from "../../../util/stream";
import { saveProfile4 } from "./saveProfile4";

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
  checkTeamName1,
  createAutoTeam1,
  createProfile1,
  createTeam1,
  discoverProfile1,
  load2on2RankingPoints1,
  loadConfigA_1,
  loadConfigB_1,
  loadEventInfo1,
  loadGacha1,
  loadGarage1,
  loadGeneralReward1,
  loadGhost1,
  loadProfile2,
  loadRewardTable1,
  loadServerList,
  loadStocker1,
  loadTeam1,
  loadTeamRanking1,
  lockGarage1,
  lockProfile1,
  lockProfileExtend1,
  loadTopTen1,
  saveExpedition1,
  saveGarage1,
  saveNewCar1,
  saveProfile2,
  saveSettings1,
  saveStocker1,
  saveTeamBanner1,
  saveTimeAttack1,
  saveTopic1,
  unknownA_1,
  unlockProfile1,
  updateProvisionalStoreRank1,
  updateResult,
  updateStoryClearNum1,
  updateTeamLeader1,
  updateTeamMember1,
  updateTeamPoints1,
  updateUiReport1,
  updateUserLog1,
];

const funcList130: ReaderFn[] = [
  checkTeamName1,
  createAutoTeam1,
  createProfile1,
  createTeam1,
  discoverProfile1,
  load2on2Info,
  updateStoryClearNum2,
  updateStoryClearNum3,
  loadConfigA_1,
  loadConfigB_1,
  loadEventInfo1,
  loadGacha1,
  loadGarage1,
  loadGeneralReward3,
  loadGhost1,
  loadProfile3,
  loadRewardTable1,
  loadServerList,
  loadStocker1,
  loadTeam1,
  loadTeamRanking1,
  loadTeamRanking3,
  loadTopTen2,
  lockGarage1,
  lockProfile1,
  lockProfileExtend1,
  saveExpedition2,
  saveGarage1,
  saveNewCar1,
  saveProfile3,
  saveSettings1,
  saveStocker1,
  saveTeamBanner1,
  saveTimeAttack2,
  saveTopic1,
  unknownA_1,
  unlockProfile1,
  updateProvisionalStoreRank1,
  updateResult,
  updateTeamLeader1,
  updateTeamMember1,
  updateTeamPoints1,
  updateUiReport1,
  updateUserLog1,
];

const funcList210: ReaderFn[] = [
  checkTeamName2,
  createAutoTeam2,
  createProfile2,
  createTeam2,
  discoverProfile2,
  load2on2Info,
  load2on2RankingPoints2,
  updateStoryClearNum3,
  loadConfigA_2,
  loadConfigB_2,
  loadEventInfo2,
  loadGacha2,
  loadGarage2,
  loadGeneralReward3,
  loadGhost2,
  loadProfile4,
  loadRewardTable2,
  loadServerList,
  loadStocker2,
  loadTeam2,
  loadTeamRanking2,
  loadTeamRanking4,
  loadTopTen3,
  lockGarage2,
  lockProfile2,
  lockProfileExtend2,
  saveExpedition2,
  saveGarage2,
  saveNewCar2,
  saveProfile4,
  saveSettings2,
  saveStocker2,
  saveTeamBanner2,
  saveTimeAttack3,
  saveTopic2,
  unknownA_2,
  unlockProfile2,
  updateProvisionalStoreRank2,
  updateResult,
  updateTeamLeader2,
  updateTeamMember2,
  updateTeamPoints2,
  updateUiReport2,
  updateUserLog2,
];

const protocols = new Map<string, Map<number, ReaderFn>>();

protocols.set("110", makeReaderMap(funcList110));
protocols.set("130", makeReaderMap(funcList130));
protocols.set("210", makeReaderMap(funcList210));

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
