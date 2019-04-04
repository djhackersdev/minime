export interface SaveSettingsRequest {
  type: "save_settings_req";
  bgMusic: number;
  profileId: number;
  dpoint: number; // ?? why
  forceQuitEn: boolean;
  steeringForce: number;
  bgVolume: number;
  seVolume: number;
  cornerGuide: boolean;
  lineGuide: boolean;
  ghostEn: boolean;
  taResultSkip: boolean; // TA = Time Attack presumably
  field_0010: number;
  field_0011: number;
  field_0012: number;
  field_0013: number;
}
