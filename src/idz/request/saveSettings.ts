import { Settings } from "../model/settings";

export interface SaveSettingsRequest {
  type: "save_settings_req";
  profileId: number;
  dpoint: number; // ?? why
  settings: Settings;
  field_0010: number;
  field_0011: number;
  field_0012: number;
  field_0013: number;
}
