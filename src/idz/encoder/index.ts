import logger from "debug";
import { Transform } from "stream";

import { _team } from "./_team";
import { checkTeamName } from "./checkTeamName";
import { createTeam } from "./createTeam";
import { discoverProfile } from "./discoverProfile";
import { generic } from "./generic";
import { lockProfile } from "./lockProfile";
import { lockProfileExtend } from "./lockProfileExtend";
import { load2on2 } from "./load2on2";
import { loadConfig } from "./loadConfig";
import { loadConfig2 } from "./loadConfig2";
import { loadEventInfo } from "./loadEventInfo";
import { loadGacha } from "./loadGacha";
import { loadGarage } from "./loadGarage";
import { loadGeneralReward } from "./loadGeneralReward";
import { loadGhost } from "./loadGhost";
import { loadProfile } from "./loadProfile";
import { loadRewardTable } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker } from "./loadStocker";
import { loadTeamRanking } from "./loadTeamRanking";
import { loadTopTen } from "./loadTopTen";
import { saveExpedition } from "./saveExpedition";
import { saveGarage } from "./saveGarage";
import { saveNewCar } from "./saveNewCar";
import { saveTimeAttack } from "./saveTimeAttack";
import { saveTopic } from "./saveTopic";
import { unlockProfile } from "./unlockProfile";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import { updateStoryClearNum } from "./updateStoryClearNum";
import { updateTeamLeader } from "./updateTeamLeader";
import { updateTeamMember } from "./updateTeamMember";
import { Response } from "../response";

const debug = logger("app:idz:encoder");

function encode(res: Response): Buffer {
  switch (res.type) {
    case "check_team_name_res":
      return checkTeamName(res);

    case "create_auto_team_res":
      return _team(res);

    case "create_team_res":
      return createTeam(res);

    case "discover_profile_res":
      return discoverProfile(res);

    case "generic_res":
      return generic(res);

    case "load_2on2_res":
      return load2on2(res);

    case "load_config_res":
      return loadConfig(res);

    case "load_config_v2_res":
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
      return loadProfile(res);

    case "load_reward_table_res":
      return loadRewardTable(res);

    case "load_server_list_res":
      return loadServerList(res);

    case "load_stocker_res":
      return loadStocker(res);

    case "load_team_res":
      return _team(res);

    case "load_team_ranking_res":
      return loadTeamRanking(res);

    case "load_top_ten_res":
      return loadTopTen(res);

    case "lock_profile_extend_res":
      return lockProfileExtend(res);

    case "lock_profile_res":
      return lockProfile(res);

    case "save_expedition_res":
      return saveExpedition(res);

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
      return updateStoryClearNum(res);

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

export class Encoder extends Transform {
  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    });
  }

  _transform(res: Response, encoding, callback) {
    debug("Object: %j", res);

    const buf = encode(res);

    if (debug.enabled) {
      debug("Encoded: %s", buf.toString("hex"));
    }

    if (buf.readInt16LE(0) === 0) {
      throw new Error("Missing message type code");
    }

    return callback(null, buf);
  }
}
