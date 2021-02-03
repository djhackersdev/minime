import { CheckTeamNameResponse } from "./checkTeamName";
import { CreateAutoTeamResponse } from "./createAutoTeam";
import { CreateProfileResponse } from "./createProfile";
import { CreateTeamResponse } from "./createTeam";
import { DiscoverProfileResponse } from "./discoverProfile";
import { GenericResponse } from "./generic";
import {
  Load2on2InfoResponse,
  Load2on2RankingPointsResponse,
} from "./load2on2";
import { LoadConfigResponseA, LoadConfigResponseB } from "./loadConfig";
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
  | CreateProfileResponse
  | CreateTeamResponse
  | DiscoverProfileResponse
  | GenericResponse
  | Load2on2InfoResponse
  | Load2on2RankingPointsResponse
  | LoadConfigResponseA
  | LoadConfigResponseB
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
