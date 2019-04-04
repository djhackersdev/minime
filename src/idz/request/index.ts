import { UnlockProfileRequest } from "./unlockProfile";
import { CreateProfileRequest } from "./createProfile";
import { CreateTeamRequest } from "./createTeam";
import { Load2on2Request } from "./load2on2";
import { LoadConfigRequest } from "./loadConfig";
import { LoadConfigRequest2 } from "./loadConfig2";
import { DiscoverProfileRequest } from "./discoverProfile";
import { LoadGeneralRewardRequest } from "./loadGeneralReward";
import { LoadProfileRequest } from "./loadProfile";
import { LoadRewardTableRequest } from "./loadRewardTable";
import { LoadServerListRequest } from "./loadServerList";
import { LoadStockerRequest } from "./loadStocker";
import { LoadTeamRequest } from "./loadTeam";
import { LockAccountRequest } from "./lockProfile";
import { SaveExpeditionRequest } from "./saveExpedition";
import { UpdateProvisionalStoreRankRequest } from "./updateProvisionalStoreRank";
import { UpdateStoryClearNumRequest } from "./updateStoryClearNum";
import { SaveProfileRequest } from "./saveProfile";
import { SaveSettingsRequest } from "./saveSettings";
import { SaveTopicRequest } from "./saveTopic";

export type Request =
  | CreateProfileRequest
  | CreateTeamRequest
  | DiscoverProfileRequest
  | Load2on2Request
  | LoadConfigRequest
  | LoadConfigRequest2
  | LoadGeneralRewardRequest
  | LoadProfileRequest
  | LoadRewardTableRequest
  | LoadServerListRequest
  | LoadStockerRequest
  | LoadTeamRequest
  | LockAccountRequest
  | SaveExpeditionRequest
  | SaveProfileRequest
  | SaveSettingsRequest
  | SaveTopicRequest
  | UnlockProfileRequest
  | UpdateProvisionalStoreRankRequest
  | UpdateStoryClearNumRequest;
