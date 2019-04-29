import { ExtId } from "../model/base";
import { Profile } from "../model/profile";
import { Settings } from "../model/settings";

export interface SaveSettingsRequest {
  type: "save_settings_req";
  profileId: ExtId<Profile>;
  dpoint: number; // ?? why
  settings: Settings;
  field_0010: number;
  field_0013: number;
}
