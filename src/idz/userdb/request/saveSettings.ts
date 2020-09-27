import { Settings } from "../model/settings";
import { AimeId } from "../../../model";

export interface SaveSettingsRequest {
  type: "save_settings_req";
  aimeId: AimeId;
  version: number;
  dpoint: number; // ?? why
  settings: Settings;
  field_0010: number;
}
