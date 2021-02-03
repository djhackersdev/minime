import logger from "debug";

import {
  createAutoTeam1,
  createAutoTeam2,
  loadTeam1,
  loadTeam2,
} from "./_team";
import { checkTeamName1, checkTeamName2 } from "./checkTeamName";
import { createProfile1, createProfile2 } from "./createProfile";
import { createTeam1, createTeam2 } from "./createTeam";
import { discoverProfile1, discoverProfile2 } from "./discoverProfile";
import { generic1, generic2 } from "./generic";
import { lockProfile1, lockProfile2 } from "./lockProfile";
import { lockProfileExtend1, lockProfileExtend2 } from "./lockProfileExtend";
import {
  load2on2RankingPoints1,
  load2on2Info1,
  load2on2RankingPoints2,
  load2on2Info2,
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
import { loadGeneralReward } from "./loadGeneralReward";
import { loadGhost1, loadGhost2 } from "./loadGhost";
import { loadProfile2 } from "./loadProfile2";
import { loadProfile3 } from "./loadProfile3";
import { loadProfile4 } from "./loadProfile4";
import { loadRewardTable1, loadRewardTable2 } from "./loadRewardTable";
import { loadServerList1, loadServerList2 } from "./loadServerList";
import { loadStocker1, loadStocker2 } from "./loadStocker";
import { loadTeamRanking1, loadTeamRanking2 } from "./loadTeamRanking";
import { loadTopTen } from "./loadTopTen1";
import { loadTopTen2 } from "./loadTopTen2";
import { saveExpedition1, saveExpedition2 } from "./saveExpedition";
import { saveGarage1, saveGarage2 } from "./saveGarage";
import { saveNewCar1, saveNewCar2 } from "./saveNewCar";
import { saveTimeAttack1, saveTimeAttack2 } from "./saveTimeAttack";
import { saveTopic1, saveTopic2 } from "./saveTopic";
import { unlockProfile1, unlockProfile2 } from "./unlockProfile";
import {
  updateProvisionalStoreRank1,
  updateProvisionalStoreRank2,
} from "./updateProvisionalStoreRank";
import {
  updateStoryClearNum1,
  updateStoryClearNum2,
  updateStoryClearNum3,
} from "./updateStoryClearNum";
import { updateTeamLeader1, updateTeamLeader2 } from "./updateTeamLeader";
import { updateTeamMember1, updateTeamMember2 } from "./updateTeamMember";
import { Response } from "../response";
import { ClientHello } from "../../common";

const debug = logger("app:idz:userdb:encoder");

function encode110(res: Response): Buffer {
  switch (res.type) {
    case "check_team_name_res":
      return checkTeamName1(res);

    case "create_auto_team_res":
      return createAutoTeam1(res);

    case "create_profile_res":
      return createProfile1(res);

    case "create_team_res":
      return createTeam1(res);

    case "discover_profile_res":
      return discoverProfile1(res);

    case "generic_res":
      return generic1(res);

    case "load_2on2_ranking_points_res":
      return load2on2RankingPoints1(res);

    case "load_2on2_info_res":
      return load2on2Info1(res);

    case "load_config_A_res":
      return loadConfigA_1(res);

    case "load_config_B_res":
      return loadConfigB_1(res);

    case "load_event_info_res":
      return loadEventInfo1(res);

    case "load_gacha_res":
      return loadGacha1(res);

    case "load_garage_res":
      return loadGarage1(res);

    case "load_general_reward_res":
      return loadGeneralReward(res);

    case "load_ghost_res":
      return loadGhost1(res);

    case "load_profile_res":
      return loadProfile2(res);

    case "load_reward_table_res":
      return loadRewardTable1(res);

    case "load_server_list_res":
      return loadServerList1(res);

    case "load_stocker_res":
      return loadStocker1(res);

    case "load_team_res":
      return loadTeam1(res);

    case "load_team_ranking_res":
      return loadTeamRanking1(res);

    case "load_top_ten_res":
      return loadTopTen(res);

    case "lock_profile_extend_res":
      return lockProfileExtend1(res);

    case "lock_profile_res":
      return lockProfile1(res);

    case "save_expedition_res":
      return saveExpedition1(res);

    case "save_garage_res":
      return saveGarage1(res);

    case "save_new_car_res":
      return saveNewCar1(res);

    case "save_time_attack_res":
      return saveTimeAttack1(res);

    case "unlock_profile_res":
      return unlockProfile1(res);

    case "update_provisional_store_rank_res":
      return updateProvisionalStoreRank1(res);

    case "update_story_clear_num_res":
      return updateStoryClearNum1(res);

    case "update_team_leader_res":
      return updateTeamLeader1(res);

    case "update_team_member_res":
      return updateTeamMember1(res);

    case "save_topic_res":
      return saveTopic1(res);

    default:
      const exhaustCheck: never = res;

      throw new Error(`No writer fn for ${res["type"]}`);
  }
}

function encode130(res: Response): Buffer {
  switch (res.type) {
    case "check_team_name_res":
      return checkTeamName1(res);

    case "create_auto_team_res":
      return createAutoTeam1(res);

    case "create_profile_res":
      return createProfile1(res);

    case "create_team_res":
      return createTeam1(res);

    case "discover_profile_res":
      return discoverProfile1(res);

    case "generic_res":
      return generic1(res);

    case "load_2on2_ranking_points_res":
      return load2on2RankingPoints1(res);

    case "load_2on2_info_res":
      return load2on2Info1(res);

    case "load_config_A_res":
      return loadConfigA_1(res);

    case "load_config_B_res":
      return loadConfigB_1(res);

    case "load_event_info_res":
      return loadEventInfo1(res);

    case "load_gacha_res":
      return loadGacha1(res);

    case "load_garage_res":
      return loadGarage1(res);

    case "load_general_reward_res":
      return loadGeneralReward(res);

    case "load_ghost_res":
      return loadGhost1(res);

    case "load_profile_res":
      return loadProfile3(res);

    case "load_reward_table_res":
      return loadRewardTable1(res);

    case "load_server_list_res":
      return loadServerList1(res);

    case "load_stocker_res":
      return loadStocker1(res);

    case "load_team_res":
      return loadTeam1(res);

    case "load_team_ranking_res":
      return loadTeamRanking1(res);

    case "load_top_ten_res":
      return loadTopTen(res);

    case "lock_profile_extend_res":
      return lockProfileExtend1(res);

    case "lock_profile_res":
      return lockProfile1(res);

    case "save_expedition_res":
      return saveExpedition1(res);

    case "save_garage_res":
      return saveGarage1(res);

    case "save_new_car_res":
      return saveNewCar1(res);

    case "save_time_attack_res":
      return saveTimeAttack1(res);

    case "unlock_profile_res":
      return unlockProfile1(res);

    case "update_provisional_store_rank_res":
      return updateProvisionalStoreRank1(res);

    case "update_story_clear_num_res":
      return updateStoryClearNum2(res);

    case "update_team_leader_res":
      return updateTeamLeader1(res);

    case "update_team_member_res":
      return updateTeamMember1(res);

    case "save_topic_res":
      return saveTopic1(res);

    default:
      const exhaustCheck: never = res;

      throw new Error(`No writer fn for ${res["type"]}`);
  }
}

function encode210(res: Response): Buffer {
  switch (res.type) {
    case "check_team_name_res":
      return checkTeamName2(res);

    case "create_auto_team_res":
      return createAutoTeam2(res);

    case "create_profile_res":
      return createProfile2(res);

    case "create_team_res":
      return createTeam2(res);

    case "discover_profile_res":
      return discoverProfile2(res);

    case "generic_res":
      return generic2(res);

    case "load_2on2_ranking_points_res":
      return load2on2RankingPoints2(res);

    case "load_2on2_info_res":
      return load2on2Info2(res);

    case "load_config_A_res":
      return loadConfigA_2(res);

    case "load_config_B_res":
      return loadConfigB_2(res);

    case "load_event_info_res":
      return loadEventInfo2(res);

    case "load_gacha_res":
      return loadGacha2(res);

    case "load_garage_res":
      return loadGarage2(res);

    case "load_general_reward_res":
      return loadGeneralReward(res);

    case "load_ghost_res":
      return loadGhost2(res);

    case "load_profile_res":
      return loadProfile4(res);

    case "load_reward_table_res":
      return loadRewardTable2(res);

    case "load_server_list_res":
      return loadServerList2(res);

    case "load_stocker_res":
      return loadStocker2(res);

    case "load_team_res":
      return loadTeam2(res);

    case "load_team_ranking_res":
      return loadTeamRanking2(res);

    case "load_top_ten_res":
      return loadTopTen2(res);

    case "lock_profile_extend_res":
      return lockProfileExtend2(res);

    case "lock_profile_res":
      return lockProfile2(res);

    case "save_expedition_res":
      return saveExpedition2(res);

    case "save_garage_res":
      return saveGarage2(res);

    case "save_new_car_res":
      return saveNewCar2(res);

    case "save_time_attack_res":
      return saveTimeAttack2(res);

    case "unlock_profile_res":
      return unlockProfile2(res);

    case "update_provisional_store_rank_res":
      return updateProvisionalStoreRank2(res);

    case "update_story_clear_num_res":
      return updateStoryClearNum3(res);

    case "update_team_leader_res":
      return updateTeamLeader2(res);

    case "update_team_member_res":
      return updateTeamMember2(res);

    case "save_topic_res":
      return saveTopic2(res);

    default:
      const exhaustCheck: never = res;

      throw new Error(`No writer fn for ${res["type"]}`);
  }
}

function encode(res: Response, clientHello: ClientHello) {
  switch (clientHello.protocol) {
    case "110":
      return encode110(res);

    case "130":
      return encode130(res);

    case "210":
      return encode210(res);

    default:
      throw new Error(`Unsupported protocol version ${clientHello.protocol}`);
  }
}

export default function writeResponse(
  res: Response,
  clientHello: ClientHello
) {
  debug("Object: %j", res);

  const buf = encode(res, clientHello);

  if (debug.enabled) {
    debug("Encoded: %s", buf.toString("hex"));
  }

  if (buf.readInt16LE(0) === 0) {
    throw new Error("Programming error: missing message type code");
  }

  return buf;
}
