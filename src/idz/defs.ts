// Quasi-nominative typing "brands".
// The double-underscore properties never actually exist at runtime, we just
// pretend they do.

export type RequestCode = number & { __requestId: null };
export type ResponseCode = number & { __responseId: null };

const _MSG = {
  GENERIC_RES: 0x0001 as ResponseCode,
  LOAD_CONFIG_REQ: 0x0004 as RequestCode,
  LOAD_CONFIG_RES: 0x0005 as ResponseCode,
  LOAD_SERVER_LIST_REQ: 0x0006 as RequestCode,
  LOAD_SERVER_LIST_RES: 0x0007 as ResponseCode,
  LOAD_PROFILE_V1_RES: 0x0064 as ResponseCode,
  LOAD_PROFILE_V2_RES: 0x0065 as ResponseCode,
  CREATE_PROFILE_REQ: 0x0066 as RequestCode,
  LOAD_PROFILE_REQ: 0x0067 as RequestCode,
  SAVE_RECORD_REQ: 0x0068 as RequestCode,
  ACCOUNT_LOCK_REQ: 0x0069 as RequestCode,
  ACCOUNT_LOCK_RES: 0x006a as ResponseCode,
  DISCOVER_PROFILE_REQ: 0x006b as RequestCode,
  DISCOVER_PROFILE_RES: 0x006c as ResponseCode,
  ACCOUNT_UNLOCK_REQ: 0x006f as RequestCode,
  ACCOUNT_UNLOCK_RES: 0x0070 as ResponseCode,
  LOAD_TEAM_REQ: 0x0077 as RequestCode,
  LOAD_TEAM_RES: 0x0078 as ResponseCode,
  CREATE_TEAM_REQ: 0x007b as RequestCode,
  CREATE_TEAM_RES: 0x007c as ResponseCode,
  UPDATE_STORY_CLEAR_NUM_REQ: 0x007f as RequestCode,
  UPDATE_STORY_CLEAR_NUM_RES: 0x0080 as ResponseCode,
  UPDATE_PROVISIONAL_STORE_RANK_REQ: 0x0082 as RequestCode,
  UPDATE_PROVISIONAL_STORE_RANK_RES: 0x0083 as ResponseCode,
  LOAD_REWARD_TABLE_REQ: 0x0086 as RequestCode,
  LOAD_REWARD_TABLE_RES: 0x0087 as ResponseCode,
  SAVE_EXPEDITION_REQ: 0x008c as RequestCode,
  SAVE_EXPEDITION_RES: 0x008d as ResponseCode,
  SAVE_TOPIC_REQ: 0x009a as RequestCode,
  SAVE_TOPIC_RES: 0x009b as ResponseCode,
  LOAD_GENERAL_REWARD_REQ: 0x009c as RequestCode,
  LOAD_GENERAL_REWARD_RES: 0x009d as ResponseCode,
  SAVE_SETTINGS_REQ: 0x00a5 as RequestCode,
  LOAD_CONFIG_V2_REQ: 0x00ab as RequestCode,
  LOAD_CONFIG_V2_RES: 0x00ac as ResponseCode,
  LOAD_STOCKER_REQ: 0x00a7 as RequestCode,
  LOAD_STOCKER_RES: 0x00a8 as ResponseCode,
  LOAD_2ON2_REQ: 0x00b0 as RequestCode,
  LOAD_2ON2_RES: 0x00b1 as ResponseCode,
};

export const MSG = _MSG as Readonly<typeof _MSG>;
const RL = new Map<RequestCode, number>();

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

export function getRequestLength(id: RequestCode): number | undefined {
  return RL.get(id);
}
