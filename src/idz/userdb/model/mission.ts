export interface MissionGrid {
  cells: number[];
}

export interface MissionState {
  team: MissionGrid[];
  solo: MissionGrid[];
}
