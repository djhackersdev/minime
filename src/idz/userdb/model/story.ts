export interface StoryCell {
  a: number;
  b: number;
  c: number;
}

export interface StoryRow {
  cells: Map<number, StoryCell>;
}

export interface Story {
  x: number;
  y: number;
  rows: Map<number, StoryRow>;
}
