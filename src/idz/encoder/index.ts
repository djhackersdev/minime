import { Transform } from "stream";

import { _team } from "./_team";
import { accountLock } from "./accountLock";
import { accountUnlock } from "./accountUnlock";
import { discoverProfile } from "./discoverProfile";
import { generic } from "./generic";
import { load2on2 } from "./load2on2";
import { loadConfig } from "./loadConfig";
import { loadConfig2 } from "./loadConfig2";
import { loadGeneralReward } from "./loadGeneralReward";
import { loadProfile } from "./loadProfile";
import { loadProfile2 } from "./loadProfile2";
import { loadRewardTable } from "./loadRewardTable";
import { loadServerList } from "./loadServerList";
import { loadStocker } from "./loadStocker";
import { saveExpedition } from "./saveExpedition";
import { saveTopic } from "./saveTopic";
import { updateProvisionalStoreRank } from "./updateProvisionalStoreRank";
import { updateStoryClearNum } from "./updateStoryClearNum";
import { Response } from "../response";

function encode(res: Response): Buffer {
  switch (res.type) {
    case "account_lock_res":
      return accountLock(res);

    case "account_unlock_res":
      return accountUnlock(res);

    case "create_team_res":
      return _team(res);

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

    case "load_general_reward_res":
      return loadGeneralReward(res);

    case "load_profile_v1_res":
      return loadProfile(res);

    case "load_profile_v2_res":
      return loadProfile2(res);

    case "load_reward_table_res":
      return loadRewardTable(res);

    case "load_server_list_res":
      return loadServerList(res);

    case "load_stocker_res":
      return loadStocker(res);

    case "load_team_res":
      return _team(res);

    case "save_expedition_res":
      return saveExpedition(res);

    case "update_provisional_store_rank_res":
      return updateProvisionalStoreRank(res);

    case "update_story_clear_num_res":
      return updateStoryClearNum(res);

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
    console.log("Idz: Res: Object:", res);

    const buf = encode(res);

    console.log("Idz: Res: Encoded:", buf.toString("hex"));

    if (buf.readInt16LE(0) === 0) {
      throw new Error("MESSAGE TYPE CODE YOU FUCKING IDIOT");
    }

    return callback(null, buf);
  }
}
