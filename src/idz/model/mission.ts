export interface MissionGrid {
  gridNo: number;
  cells: number[];
}

export interface MissionState {
  team: MissionGrid[];
  solo: MissionGrid[];
}
