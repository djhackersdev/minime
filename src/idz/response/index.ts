import { AccountLockResponse } from "./accountLock";
import { AccountUnlockResponse } from "./accountUnlock";
import { CreateTeamResponse } from "./createTeam";
import { DiscoverProfileResponse } from "./discoverProfile";
import { GenericResponse } from "./generic";
import { Load2on2Response } from "./load2on2";
import { LoadConfigResponse } from "./loadConfig";
import { LoadConfigResponse2 } from "./loadConfig2";
import { LoadGeneralRewardResponse } from "./loadGeneralReward";
import { LoadProfileResponse } from "./loadProfile";
import { LoadProfileResponse2 } from "./loadProfile2";
import { LoadRewardTableResponse } from "./loadRewardTable";
import { LoadServerListResponse } from "./loadServerList";
import { LoadStockerResponse } from "./loadStocker";
import { LoadTeamResponse } from "./loadTeam";
import { UpdateProvisionalStoreRankResponse } from "./updateProvisionalStoreRank";
import { UpdateStoryClearNumResponse } from "./updateStoryClearNum";
import { SaveExpeditionResponse } from "./saveExpedition";
import { SaveTopicResponse } from "./saveTopic";

export type Response =
  | AccountLockResponse
  | AccountUnlockResponse
  | CreateTeamResponse
  | DiscoverProfileResponse
  | GenericResponse
  | Load2on2Response
  | LoadConfigResponse
  | LoadConfigResponse2
  | LoadGeneralRewardResponse
  | LoadProfileResponse
  | LoadProfileResponse2
  | LoadRewardTableResponse
  | LoadServerListResponse
  | LoadStockerResponse
  | LoadTeamResponse
  | UpdateProvisionalStoreRankResponse
  | UpdateStoryClearNumResponse
  | SaveExpeditionResponse
  | SaveTopicResponse;
