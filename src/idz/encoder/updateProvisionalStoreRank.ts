import iconv from "iconv-lite";

import { UpdateProvisionalStoreRankResponse } from "../response/updateProvisionalStoreRank";

export function updateProvisionalStoreRank(
  res: UpdateProvisionalStoreRankResponse
) {
  const buf = Buffer.alloc(0x02b0);

  buf.writeInt16LE(0x0083, 0x0000);

  for (let i = 0; i < 10; i++) {
    const offset = 0x44 + i;
    const row = res.rows[i];

    if (row !== undefined) {
      buf.writeInt16LE(row.field_0000, offset + 0x0000);
      buf.writeInt32LE(row.field_0004, offset + 0x0004);
      iconv.encode(row.field_0010, "shift_jis").copy(buf, offset + 0x0010);
      iconv.encode(row.field_003B, "shift_jis").copy(buf, offset + 0x003b);
    }
  }

  return buf;
}
