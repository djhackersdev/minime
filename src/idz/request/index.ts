import { UnlockProfileRequest } from "./unlockProfile";
import { CreateProfileRequest } from "./createProfile";
import { CreateTeamRequest } from "./createTeam";
import { DiscoverProfileRequest } from "./discoverProfile";
import { Load2on2Request } from "./load2on2";
import { LoadConfigRequest } from "./loadConfig";
import { LoadConfigRequest2 } from "./loadConfig2";
import { LoadGeneralRewardRequest } from "./loadGeneralReward";
import { LoadProfileRequest } from "./loadProfile";
import { LoadRewardTableRequest } from "./loadRewardTable";
import { LoadServerListRequest } from "./loadServerList";
import { LoadStockerRequest } from "./loadStocker";
import { LoadTeamRequest } from "./loadTeam";
import { LoadTeamRankingRequest } from "./loadTeamRanking";
import { LoadTopTenRequest } from "./loadTopTen";
import { LockAccountRequest } from "./lockProfile";
import { LockGarageRequest } from "./lockGarage";
import { SaveExpeditionRequest } from "./saveExpedition";
import { SaveProfileRequest } from "./saveProfile";
import { SaveSettingsRequest } from "./saveSettings";
import { SaveStockerRequest } from "./saveStocker";
import { SaveTopicRequest } from "./saveTopic";
import { UpdateProvisionalStoreRankRequest } from "./updateProvisionalStoreRank";
import { UpdateStoryClearNumRequest } from "./updateStoryClearNum";

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
  | LoadTeamRankingRequest
  | LoadTopTenRequest
  | LockAccountRequest
  | LockGarageRequest
  | SaveExpeditionRequest
  | SaveProfileRequest
  | SaveSettingsRequest
  | SaveStockerRequest
  | SaveTopicRequest
  | UnlockProfileRequest
  | UpdateProvisionalStoreRankRequest
  | UpdateStoryClearNumRequest;
