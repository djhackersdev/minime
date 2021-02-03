import { CheckTeamNameRequest } from "./checkTeamName";
import { CreateProfileRequest } from "./createProfile";
import { CreateTeamRequest } from "./createTeam";
import { DiscoverProfileRequest } from "./discoverProfile";
import { CreateAutoTeamRequest } from "./createAutoTeam";
import { Load2on2InfoRequest, Load2on2RankingPointsRequest } from "./load2on2";
import { LoadConfigRequestA, LoadConfigRequestB } from "./loadConfig";
import { LoadEventInfoRequest } from "./loadEventInfo";
import { LoadGachaRequest } from "./loadGacha";
import { LoadGarageRequest } from "./loadGarage";
import { LoadGeneralRewardRequest } from "./loadGeneralReward";
import { LoadGhostRequest } from "./loadGhost";
import { LoadProfileRequest } from "./loadProfile";
import { LoadRewardTableRequest } from "./loadRewardTable";
import { LoadServerListRequest } from "./loadServerList";
import { LoadStockerRequest } from "./loadStocker";
import { LoadTeamRequest } from "./loadTeam";
import { LoadTeamRankingRequest } from "./loadTeamRanking";
import { LoadTopTenRequest } from "./loadTopTen";
import { LockProfileRequest } from "./lockProfile";
import { LockProfileExtendRequest } from "./lockProfileExtend";
import { LockGarageRequest } from "./lockGarage";
import { SaveExpeditionRequest } from "./saveExpedition";
import { SaveGarageRequest } from "./saveGarage";
import { SaveNewCarRequest } from "./saveNewCar";
import { SaveProfileRequest } from "./saveProfile";
import { SaveSettingsRequest } from "./saveSettings";
import { SaveStockerRequest } from "./saveStocker";
import { SaveTeamBannerRequest } from "./saveTeamBanner";
import { SaveTimeAttackRequest } from "./saveTimeAttack";
import { SaveTopicRequest } from "./saveTopic";
import { UnknownRequestA } from "./unknownA";
import { UnlockProfileRequest } from "./unlockProfile";
import { UpdateProvisionalStoreRankRequest } from "./updateProvisionalStoreRank";
import { UpdateResultRequest } from "./updateResult";
import { UpdateStoryClearNumRequest } from "./updateStoryClearNum";
import { UpdateTeamLeaderRequest } from "./updateTeamLeader";
import { UpdateTeamMemberRequest } from "./updateTeamMember";
import { UpdateTeamPointsRequest } from "./updateTeamPoints";
import { UpdateUiReportRequest } from "./updateUiReport";
import { UpdateUserLogRequest } from "./updateUserLog";

export type Request =
  | CheckTeamNameRequest
  | CreateAutoTeamRequest
  | CreateProfileRequest
  | CreateTeamRequest
  | DiscoverProfileRequest
  | Load2on2InfoRequest
  | Load2on2RankingPointsRequest
  | LoadConfigRequestA
  | LoadConfigRequestB
  | LoadEventInfoRequest
  | LoadGachaRequest
  | LoadGarageRequest
  | LoadGeneralRewardRequest
  | LoadGhostRequest
  | LoadProfileRequest
  | LoadRewardTableRequest
  | LoadServerListRequest
  | LoadStockerRequest
  | LoadTeamRequest
  | LoadTeamRankingRequest
  | LoadTopTenRequest
  | LockProfileRequest
  | LockProfileExtendRequest
  | LockGarageRequest
  | SaveExpeditionRequest
  | SaveGarageRequest
  | SaveNewCarRequest
  | SaveProfileRequest
  | SaveSettingsRequest
  | SaveStockerRequest
  | SaveTeamBannerRequest
  | SaveTimeAttackRequest
  | SaveTopicRequest
  | UnknownRequestA
  | UnlockProfileRequest
  | UpdateProvisionalStoreRankRequest
  | UpdateResultRequest
  | UpdateStoryClearNumRequest
  | UpdateTeamLeaderRequest
  | UpdateTeamMemberRequest
  | UpdateTeamPointsRequest
  | UpdateUiReportRequest
  | UpdateUserLogRequest;
