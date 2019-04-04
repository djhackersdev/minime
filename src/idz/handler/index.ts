import { _team } from "./_team";
import { createProfile } from "./createProfile";
import { discoverProfile } from "./discoverProfile";
import { load2on2 } from "./load2on2";
import { loadConfig } from "./loadConfig";
import { loadConfig2 } from "./loadConfig2";
import { loadGeneralReward } from "./loadGeneralReward";
import { loadProfile } from "./loadProfile";
import { loadReward as loadRewardTable } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker } from "./loadStocker";
import { loadTeamRanking } from "./loadTeamRanking";
import { loadTopTen } from "./loadTopTen";
import { lockProfile } from "./lockProfile";
import { saveExpedition } from "./saveExpedition";
import { saveProfile } from "./saveProfile";
import { saveSettings } from "./saveSettings";
import { saveTopic } from "./saveTopic";
import { unlockProfile } from "./unlockProfile";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import { updateStoryClearNum } from "./updateStoryClearNum";
import { Request } from "../request";
import { Response } from "../response";
import { World } from "../world";

export function dispatch(w: World, req: Request): Response {
  switch (req.type) {
    case "create_profile_req":
      return createProfile(w, req);

    case "create_team_req":
      return _team(w, req);

    case "load_2on2_req":
      return load2on2(w, req);

    case "load_config_req":
      return loadConfig(w, req);

    case "load_config_v2_req":
      return loadConfig2(w, req);

    case "discover_profile_req":
      return discoverProfile(w, req);

    case "load_general_reward_req":
      return loadGeneralReward(w, req);

    case "load_profile_req":
      return loadProfile(w, req);

    case "load_reward_table_req":
      return loadRewardTable(w, req);

    case "load_server_list_req":
      return loadServerList(w, req);

    case "load_stocker_req":
      return loadStocker(w, req);

    case "load_team_req":
      return _team(w, req);

    case "load_top_ten_req":
      return loadTopTen(w, req);

    case "lock_profile_req":
      return lockProfile(w, req);

    case "load_team_ranking_req":
      return loadTeamRanking(w, req);

    case "save_expedition_req":
      return saveExpedition(w, req);

    case "update_provisional_store_rank_req":
      return updateProvisionalStoreRank(w, req);

    case "save_profile_req":
      return saveProfile(w, req);

    case "save_settings_req":
      return saveSettings(w, req);

    case "update_story_clear_num_req":
      return updateStoryClearNum(w, req);

    case "save_topic_req":
      return saveTopic(w, req);

    case "unlock_profile_req":
      return unlockProfile(w, req);

    default:
      const exhaustCheck: never = req;

      throw new Error(`Unhandled message ${req["type"]}`);
  }
}
