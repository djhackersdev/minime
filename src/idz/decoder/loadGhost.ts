import { LoadGhostRequest } from "../request/loadGhost";

loadGhost.msgCode = 0x00a0;
loadGhost.msgLen = 0x0010;

export function loadGhost(buf: Buffer): LoadGhostRequest {
  return {
    type: "load_ghost_req",
    field_0002: buf.readUInt16LE(0x0002),
    field_0004: buf.readUInt16LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
    field_000C: buf.readUInt16LE(0x000c),
    field_000E: buf.readUInt16LE(0x000e),
  };
}
