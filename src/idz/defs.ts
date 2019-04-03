// Quasi-nominative typing "brands".
// The double-underscore properties never actually exist at runtime, we just
// pretend they do.

export type RequestId = number & { __requestId: null };
export type ResponseId = number & { __responseId: null };

const _MSG = {
  GENERIC_RES: 0x0001 as ResponseId,
  LOAD_CONFIG_REQ: 0x0004 as RequestId,
  LOAD_CONFIG_RES: 0x0005 as ResponseId,
  LOAD_SERVER_LIST_REQ: 0x0006 as RequestId,
  LOAD_SERVER_LIST_RES: 0x0007 as ResponseId,
  LOAD_PROFILE_V1_RES: 0x0064 as ResponseId,
  LOAD_PROFILE_V2_RES: 0x0065 as ResponseId,
  CREATE_PROFILE_REQ: 0x0066 as RequestId,
  LOAD_PROFILE_REQ: 0x0067 as RequestId,
  SAVE_RECORD_REQ: 0x0068 as RequestId,
  ACCOUNT_LOCK_REQ: 0x0069 as RequestId,
  ACCOUNT_LOCK_RES: 0x006a as ResponseId,
  DISCOVER_PROFILE_REQ: 0x006b as RequestId,
  DISCOVER_PROFILE_RES: 0x006c as ResponseId,
  ACCOUNT_UNLOCK_REQ: 0x006f as RequestId,
  ACCOUNT_UNLOCK_RES: 0x0070 as ResponseId,
  LOAD_TEAM_REQ: 0x0077 as RequestId,
  LOAD_TEAM_RES: 0x0078 as ResponseId,
  CREATE_TEAM_REQ: 0x007b as RequestId,
  CREATE_TEAM_RES: 0x007c as ResponseId,
  UPDATE_STORY_CLEAR_NUM_REQ: 0x007f as RequestId,
  UPDATE_STORY_CLEAR_NUM_RES: 0x0080 as ResponseId,
  UPDATE_PROVISIONAL_STORE_RANK_REQ: 0x0082 as RequestId,
  UPDATE_PROVISIONAL_STORE_RANK_RES: 0x0083 as ResponseId,
  LOAD_REWARD_TABLE_REQ: 0x0086 as RequestId,
  LOAD_REWARD_TABLE_RES: 0x0087 as ResponseId,
  SAVE_EXPEDITION_REQ: 0x008c as RequestId,
  SAVE_EXPEDITION_RES: 0x008d as ResponseId,
  SAVE_TOPIC_REQ: 0x009a as RequestId,
  SAVE_TOPIC_RES: 0x009b as ResponseId,
  LOAD_GENERAL_REWARD_REQ: 0x009c as RequestId,
  LOAD_GENERAL_REWARD_RES: 0x009d as ResponseId,
  SAVE_SETTINGS_REQ: 0x00a5 as RequestId,
  LOAD_CONFIG_V2_REQ: 0x00ab as RequestId,
  LOAD_CONFIG_V2_RES: 0x00ac as ResponseId,
  LOAD_STOCKER_REQ: 0x00a7 as RequestId,
  LOAD_STOCKER_RES: 0x00a8 as ResponseId,
  LOAD_2ON2_REQ: 0x00b0 as RequestId,
  LOAD_2ON2_RES: 0x00b1 as ResponseId,
};

export const MSG = _MSG as Readonly<typeof _MSG>;
const RL = new Map<RequestId, number>();

RL.set(MSG.ACCOUNT_LOCK_REQ, 0x0020);
RL.set(MSG.ACCOUNT_UNLOCK_REQ, 0x0020);
RL.set(MSG.CREATE_PROFILE_REQ, 0x00c0);
RL.set(MSG.CREATE_TEAM_REQ, 0x0010);
RL.set(MSG.LOAD_2ON2_REQ, 0x0010);
RL.set(MSG.LOAD_CONFIG_REQ, 0x0050);
RL.set(MSG.LOAD_CONFIG_V2_REQ, 0x0010);
RL.set(MSG.DISCOVER_PROFILE_REQ, 0x0010);
RL.set(MSG.LOAD_GENERAL_REWARD_REQ, 0x0010);
RL.set(MSG.LOAD_PROFILE_REQ, 0x0020);
RL.set(MSG.LOAD_REWARD_TABLE_REQ, 0x0010);
RL.set(MSG.LOAD_SERVER_LIST_REQ, 0x0020);
RL.set(MSG.LOAD_STOCKER_REQ, 0x0010);
RL.set(MSG.LOAD_TEAM_REQ, 0x0010);
RL.set(MSG.SAVE_EXPEDITION_REQ, 0x0010);
RL.set(MSG.SAVE_RECORD_REQ, 0x0940);
RL.set(MSG.SAVE_SETTINGS_REQ, 0x0020);
RL.set(MSG.SAVE_TOPIC_REQ, 0x0010);
RL.set(MSG.UPDATE_PROVISIONAL_STORE_RANK_REQ, 0x0010);
RL.set(MSG.UPDATE_STORY_CLEAR_NUM_REQ, 0x0010);

export function getRequestLength(id: RequestId): number | undefined {
  return RL.get(id);
}
