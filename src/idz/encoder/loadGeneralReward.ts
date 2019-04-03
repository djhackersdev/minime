import { LoadGeneralRewardResponse } from "../response/loadGeneralReward";

// A generic response is acceptable too so why even bother with this..
export function loadGeneralReward(res: LoadGeneralRewardResponse) {
  const buf = Buffer.alloc(0x0330);

  buf.writeInt16LE(0x009d, 0x0000);

  return buf;
}
