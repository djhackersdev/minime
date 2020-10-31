import { UpdateProvisionalStoreRankResponse } from "../response/updateProvisionalStoreRank";
import { writeSjisStr } from "../../util/bin";

export function updateProvisionalStoreRank1(
  res: UpdateProvisionalStoreRankResponse
) {
  const buf = Buffer.alloc(0x02b0);

  buf.writeInt16LE(0x0083, 0x0000);

  for (let i = 0; i < 10; i++) {
    const offset = 0x0008 + i * 0x44;
    const row = res.rows[i];

    if (row !== undefined) {
      buf.writeInt16LE(row.field_0000, offset + 0x0000);
      buf.writeInt32LE(row.field_0004, offset + 0x0004);
      writeSjisStr(buf, offset + 0x0010, offset + 0x003b, row.field_0010);
      writeSjisStr(buf, offset + 0x003b, offset + 0x0044, row.field_003B);
    }
  }

  return buf;
}

export function updateProvisionalStoreRank2(
  res: UpdateProvisionalStoreRankResponse
) {
  const buf = Buffer.alloc(0x02b0);

  buf.writeInt16LE(0x007d, 0x0000);

  for (let i = 0; i < 10; i++) {
    const offset = 0x44 + i;
    const row = res.rows[i];

    if (row !== undefined) {
      buf.writeInt16LE(row.field_0000, offset + 0x0000);
      buf.writeInt32LE(row.field_0004, offset + 0x0004);
      writeSjisStr(buf, offset + 0x0010, offset + 0x003b, row.field_0010);
      writeSjisStr(buf, offset + 0x003b, offset + 0x0044, row.field_003B);
    }
  }

  return buf;
}
