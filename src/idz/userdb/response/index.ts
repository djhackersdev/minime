import { CheckTeamNameResponse } from "./checkTeamName";
import { CreateAutoTeamResponse } from "./createAutoTeam";
import { CreateTeamResponse } from "./createTeam";
import { DiscoverProfileResponse } from "./discoverProfile";
import { GenericResponse } from "./generic";
import { Load2on2Response } from "./load2on2";
import { LoadConfigResponse } from "./loadConfig";
import { LoadConfigResponse2 } from "./loadConfig2";
import { LoadEventInfoResponse } from "./loadEventInfo";
import { LoadGachaResponse } from "./loadGacha";
import { LoadGarageResponse } from "./loadGarage";
import { LoadGeneralRewardResponse } from "./loadGeneralReward";
import { LoadGhostResponse } from "./loadGhost";
import { LoadProfileResponse } from "./loadProfile";
import { LoadRewardTableResponse } from "./loadRewardTable";
import { LoadServerListResponse } from "./loadServerList";
import { LoadStockerResponse } from "./loadStocker";
import { LoadTeamResponse } from "./loadTeam";
import { LoadTeamRankingResponse } from "./loadTeamRanking";
import { LoadTopTenResponse } from "./loadTopTen";
import { LockProfileExtendResponse } from "./lockProfileExtend";
import { LockProfileResponse } from "./lockProfile";
import { SaveExpeditionResponse } from "./saveExpedition";
import { SaveGarageResponse } from "./saveGarage";
import { SaveNewCarResponse } from "./saveNewCar";
import { SaveTimeAttackResponse } from "./saveTimeAttack";
import { SaveTopicResponse } from "./saveTopic";
import { UpdateProvisionalStoreRankResponse } from "./updateProvisionalStoreRank";
import { UpdateStoryClearNumResponse } from "./updateStoryClearNum";
import { UpdateTeamLeaderResponse } from "./updateTeamLeader";
import { UpdateTeamMemberResponse } from "./updateTeamMember";
import { UnlockProfileResponse } from "./unlockProfile";

export type Response =
  | CheckTeamNameResponse
  | CreateAutoTeamResponse
  | CreateTeamResponse
  | DiscoverProfileResponse
  | GenericResponse
  | Load2on2Response
  | LoadConfigResponse
  | LoadConfigResponse2
  | LoadEventInfoResponse
  | LoadGachaResponse
  | LoadGarageResponse
  | LoadGeneralRewardResponse
  | LoadGhostResponse
  | LoadProfileResponse
  | LoadRewardTableResponse
  | LoadServerListResponse
  | LoadStockerResponse
  | LoadTeamResponse
  | LoadTeamRankingResponse
  | LockProfileExtendResponse
  | LockProfileResponse
  | LoadTopTenResponse
  | UnlockProfileResponse
  | UpdateProvisionalStoreRankResponse
  | UpdateStoryClearNumResponse
  | UpdateTeamLeaderResponse
  | UpdateTeamMemberResponse
  | SaveExpeditionResponse
  | SaveGarageResponse
  | SaveNewCarResponse
  | SaveTimeAttackResponse
  | SaveTopicResponse;
