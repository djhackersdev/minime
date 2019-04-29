import { MissionGrid } from "../model/mission";

export function mission(buf: Buffer): MissionGrid[] {
  const grids = new Array();

  for (let gridNo = 0; gridNo < 5; gridNo++) {
    const grid: MissionGrid = { cells: [] };

    for (let cellNo = 0; cellNo < 9; cellNo++) {
      let cell = 0;
      let mask = 1 << cellNo;

      for (let sliceNo = 0; sliceNo < 3; sliceNo++) {
        const slice = buf.readUInt16LE(0x0c * sliceNo + 0x02 * gridNo);

        if (slice & mask) {
          cell |= 1 << sliceNo;
        }
      }

      grid.cells.push(cell);
    }

    grids.push(grid);
  }

  return grids;
}
