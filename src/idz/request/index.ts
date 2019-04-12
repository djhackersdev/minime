import { CreateProfileRequest } from "./createProfile";
import { CreateTeamRequest } from "./createTeam";
import { DiscoverProfileRequest } from "./discoverProfile";
import { Load2on2Request } from "./load2on2";
import { LoadConfigRequest } from "./loadConfig";
import { LoadConfigRequest2 } from "./loadConfig2";
import { LoadGeneralRewardRequest } from "./loadGeneralReward";
import { LoadGhostRequest } from "./loadGhost";
import { LoadProfileRequest } from "./loadProfile";
import { LoadRewardTableRequest } from "./loadRewardTable";
import { LoadServerListRequest } from "./loadServerList";
import { LoadStockerRequest } from "./loadStocker";
import { LoadTeamRequest } from "./loadTeam";
import { LoadTeamRankingRequest } from "./loadTeamRanking";
import { LoadTopTenRequest } from "./loadTopTen";
import { LockAccountRequest } from "./lockProfile";
import { LockGarageRequest } from "./lockGarage";
import { Message00AD } from "./msg00AD";
import { SaveExpeditionRequest } from "./saveExpedition";
import { SaveGarageRequest } from "./saveGarage";
import { SaveProfileRequest } from "./saveProfile";
import { SaveSettingsRequest } from "./saveSettings";
import { SaveStockerRequest } from "./saveStocker";
import { SaveTimeAttackRequest } from "./saveTimeAttack";
import { SaveTopicRequest } from "./saveTopic";
import { UnlockProfileRequest } from "./unlockProfile";
import { UpdateProvisionalStoreRankRequest } from "./updateProvisionalStoreRank";
import { UpdateResultRequest } from "./updateResult";
import { UpdateStoryClearNumRequest } from "./updateStoryClearNum";
import { UpdateTeamPointsRequest } from "./updateTeamPoints";
import { UpdateUiReportRequest } from "./updateUiReport";
import { UpdateUserLogRequest } from "./updateUserLog";

export type Request =
  | CreateProfileRequest
  | CreateTeamRequest
  | DiscoverProfileRequest
  | Load2on2Request
  | LoadConfigRequest
  | LoadConfigRequest2
  | LoadGeneralRewardRequest
  | LoadGhostRequest
  | LoadProfileRequest
  | LoadRewardTableRequest
  | LoadServerListRequest
  | LoadStockerRequest
  | LoadTeamRequest
  | LoadTeamRankingRequest
  | LoadTopTenRequest
  | LockAccountRequest
  | LockGarageRequest
  | Message00AD
  | SaveExpeditionRequest
  | SaveGarageRequest
  | SaveProfileRequest
  | SaveSettingsRequest
  | SaveStockerRequest
  | SaveTimeAttackRequest
  | SaveTopicRequest
  | UnlockProfileRequest
  | UpdateProvisionalStoreRankRequest
  | UpdateResultRequest
  | UpdateStoryClearNumRequest
  | UpdateTeamPointsRequest
  | UpdateUiReportRequest
  | UpdateUserLogRequest;
