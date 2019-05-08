import {
  Load2on2Response,
  Load2on2Response1,
  Load2on2Response2,
} from "../response/load2on2";

export function load2on2(res: Load2on2Response): Buffer {
  switch (res.format) {
    case 1:
      return load2on2_v1(res);

    case 2:
      return load2on2_v2(res);

    default:
      const exhaust: never = res;

      throw new Error(`Unsupported 2on2 response format ${res["format"]}`);
  }
}

function load2on2_v1(res: Load2on2Response1): Buffer {
  const buf = Buffer.alloc(0x04c0);

  buf.writeInt16LE(0x00b1, 0x0000);

  return buf;
}

// Same size but presumably incompatible somehow
function load2on2_v2(res: Load2on2Response2): Buffer {
  const buf = Buffer.alloc(0x04c0);

  buf.writeInt16LE(0x0133, 0x0000);

  return buf;
}
