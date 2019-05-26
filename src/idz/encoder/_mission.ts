import { MissionGrid } from "../model/mission";

export function encodeMission(grids: MissionGrid[]): Buffer {
  const buf = Buffer.alloc(0x24);

  for (let gridNo = 0; gridNo < grids.length; gridNo++) {
    const grid = grids[gridNo];
    const slices = [0, 0, 0];

    for (let cellNo = 0; cellNo < 9 && cellNo < grid.cells.length; cellNo++) {
      const value = grid.cells[cellNo];

      for (let sliceNo = 0; sliceNo < 3; sliceNo++) {
        if (value & (1 << sliceNo)) {
          slices[sliceNo] |= 1 << cellNo;
        }
      }
    }

    for (let sliceNo = 0; sliceNo < 3; sliceNo++) {
      buf.writeUInt16LE(slices[sliceNo], 0x0c * sliceNo + 0x02 * gridNo);
    }
  }

  return buf;
}
