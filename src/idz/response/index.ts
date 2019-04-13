import { CheckTeamNameResponse } from "./checkTeamName";
import { CreateTeamResponse } from "./createTeam";
import { DiscoverProfileResponse } from "./discoverProfile";
import { GenericResponse } from "./generic";
import { JoinAutoTeamResponse } from "./joinAutoTeam";
import { Load2on2Response } from "./load2on2";
import { LoadConfigResponse } from "./loadConfig";
import { LoadConfigResponse2 } from "./loadConfig2";
import { LoadGeneralRewardResponse } from "./loadGeneralReward";
import { LoadGhostResponse } from "./loadGhost";
import { LoadProfileResponse } from "./loadProfile";
import { LoadProfileResponse2 } from "./loadProfile2";
import { LoadRewardTableResponse } from "./loadRewardTable";
import { LoadServerListResponse } from "./loadServerList";
import { LoadStockerResponse } from "./loadStocker";
import { LoadTeamResponse } from "./loadTeam";
import { LoadTeamRankingResponse } from "./loadTeamRanking";
import { LoadTopTenResponse } from "./loadTopTen";
import { LockProfileResponse } from "./lockProfile";
import { SaveExpeditionResponse } from "./saveExpedition";
import { SaveGarageResponse } from "./saveGarage";
import { SaveTimeAttackResponse } from "./saveTimeAttack";
import { SaveTopicResponse } from "./saveTopic";
import { UpdateProvisionalStoreRankResponse } from "./updateProvisionalStoreRank";
import { UpdateStoryClearNumResponse } from "./updateStoryClearNum";
import { UnlockProfileResponse } from "./unlockProfile";

export type Response =
  | CheckTeamNameResponse
  | CreateTeamResponse
  | DiscoverProfileResponse
  | GenericResponse
  | JoinAutoTeamResponse
  | Load2on2Response
  | LoadConfigResponse
  | LoadConfigResponse2
  | LoadGeneralRewardResponse
  | LoadGhostResponse
  | LoadProfileResponse
  | LoadProfileResponse2
  | LoadRewardTableResponse
  | LoadServerListResponse
  | LoadStockerResponse
  | LoadTeamResponse
  | LoadTeamRankingResponse
  | LockProfileResponse
  | LoadTopTenResponse
  | UnlockProfileResponse
  | UpdateProvisionalStoreRankResponse
  | UpdateStoryClearNumResponse
  | SaveExpeditionResponse
  | SaveGarageResponse
  | SaveTimeAttackResponse
  | SaveTopicResponse;
