import logger from "debug";

import { createAutoTeam, loadTeam } from "./_team";
import { checkTeamName } from "./checkTeamName";
import { createProfile } from "./createProfile";
import { createTeam } from "./createTeam";
import { discoverProfile } from "./discoverProfile";
import { generic } from "./generic";
import { lockProfile } from "./lockProfile";
import { lockProfileExtend } from "./lockProfileExtend";
import { load2on2_v1, load2on2_v2 } from "./load2on2";
import { loadConfig1, loadConfig2 } from "./loadConfig";
import { loadEventInfo } from "./loadEventInfo";
import { loadGacha } from "./loadGacha";
import { loadGarage } from "./loadGarage";
import { loadGeneralReward } from "./loadGeneralReward";
import { loadGhost } from "./loadGhost";
import { loadProfile2 } from "./loadProfile2";
import { loadProfile3 } from "./loadProfile3";
import { loadRewardTable } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker } from "./loadStocker";
import { loadTeamRanking } from "./loadTeamRanking";
import { loadTopTen } from "./loadTopTen";
import { saveExpedition1, saveExpedition2 } from "./saveExpedition";
import { saveGarage } from "./saveGarage";
import { saveNewCar } from "./saveNewCar";
import { saveTimeAttack } from "./saveTimeAttack";
import { saveTopic } from "./saveTopic";
import { unlockProfile } from "./unlockProfile";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import {
  updateStoryClearNum1,
  updateStoryClearNum2,
} from "./updateStoryClearNum";
import { updateTeamLeader } from "./updateTeamLeader";
import { updateTeamMember } from "./updateTeamMember";
import { Response } from "../response";
import { ClientHello } from "../../common";

const debug = logger("app:idz:userdb:encoder");

function encode110(res: Response): Buffer {
  switch (res.type) {
    case "check_team_name_res":
      return checkTeamName(res);

    case "create_auto_team_res":
      return createAutoTeam(res);

    case "create_profile_res":
      return createProfile(res);

    case "create_team_res":
      return createTeam(res);

    case "discover_profile_res":
      return discoverProfile(res);

    case "generic_res":
      return generic(res);

    case "load_2on2_res":
      return load2on2_v1(res);

    case "load_config_res":
      return loadConfig1(res);

    case "load_event_info_res":
      return loadEventInfo(res);

    case "load_gacha_res":
      return loadGacha(res);

    case "load_garage_res":
      return loadGarage(res);

    case "load_general_reward_res":
      return loadGeneralReward(res);

    case "load_ghost_res":
      return loadGhost(res);

    case "load_profile_res":
      return loadProfile2(res);

    case "load_reward_table_res":
      return loadRewardTable(res);

    case "load_server_list_res":
      return loadServerList(res);

    case "load_stocker_res":
      return loadStocker(res);

    case "load_team_res":
      return loadTeam(res);

    case "load_team_ranking_res":
      return loadTeamRanking(res);

    case "load_top_ten_res":
      return loadTopTen(res);

    case "lock_profile_extend_res":
      return lockProfileExtend(res);

    case "lock_profile_res":
      return lockProfile(res);

    case "save_expedition_res":
      return saveExpedition1(res);

    case "save_garage_res":
      return saveGarage(res);

    case "save_new_car_res":
      return saveNewCar(res);

    case "save_time_attack_res":
      return saveTimeAttack(res);

    case "unlock_profile_res":
      return unlockProfile(res);

    case "update_provisional_store_rank_res":
      return updateProvisionalStoreRank(res);

    case "update_story_clear_num_res":
      return updateStoryClearNum1(res);

    case "update_team_leader_res":
      return updateTeamLeader(res);

    case "update_team_member_res":
      return updateTeamMember(res);

    case "save_topic_res":
      return saveTopic(res);

    default:
      const exhaustCheck: never = res;

      throw new Error(`No writer fn for ${res["type"]}`);
  }
}

function encode130(res: Response): Buffer {
  switch (res.type) {
    case "check_team_name_res":
      return checkTeamName(res);

    case "create_auto_team_res":
      return createAutoTeam(res);

    case "create_profile_res":
      return createProfile(res);

    case "create_team_res":
      return createTeam(res);

    case "discover_profile_res":
      return discoverProfile(res);

    case "generic_res":
      return generic(res);

    case "load_2on2_res":
      return load2on2_v2(res);

    case "load_config_res":
      return loadConfig2(res);

    case "load_event_info_res":
      return loadEventInfo(res);

    case "load_gacha_res":
      return loadGacha(res);

    case "load_garage_res":
      return loadGarage(res);

    case "load_general_reward_res":
      return loadGeneralReward(res);

    case "load_ghost_res":
      return loadGhost(res);

    case "load_profile_res":
      return loadProfile3(res);

    case "load_reward_table_res":
      return loadRewardTable(res);

    case "load_server_list_res":
      return loadServerList(res);

    case "load_stocker_res":
      return loadStocker(res);

    case "load_team_res":
      return loadTeam(res);

    case "load_team_ranking_res":
      return loadTeamRanking(res);

    case "load_top_ten_res":
      return loadTopTen(res);

    case "lock_profile_extend_res":
      return lockProfileExtend(res);

    case "lock_profile_res":
      return lockProfile(res);

    case "save_expedition_res":
      return saveExpedition2(res);

    case "save_garage_res":
      return saveGarage(res);

    case "save_new_car_res":
      return saveNewCar(res);

    case "save_time_attack_res":
      return saveTimeAttack(res);

    case "unlock_profile_res":
      return unlockProfile(res);

    case "update_provisional_store_rank_res":
      return updateProvisionalStoreRank(res);

    case "update_story_clear_num_res":
      return updateStoryClearNum2(res);

    case "update_team_leader_res":
      return updateTeamLeader(res);

    case "update_team_member_res":
      return updateTeamMember(res);

    case "save_topic_res":
      return saveTopic(res);

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
