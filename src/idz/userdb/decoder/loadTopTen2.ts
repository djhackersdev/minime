import { ExtId, RouteNo } from "../model/base";
import { Team } from "../model/team";
import {
  LoadTopTenRequest,
  LoadTopTenRequestSelector,
} from "../request/loadTopTen";
import { AimeId } from "../../../model";

loadTopTen2.msgCode = 0x012c;
loadTopTen2.msgLen = 0x0110;

export function loadTopTen2(buf: Buffer): LoadTopTenRequest {
  const selectors = new Array<LoadTopTenRequestSelector>();

  for (let i = 0; i < 40; i++) {
    selectors.push({
      routeNo: (buf.readUInt16LE(0x0004 + 2 * i) >> 1) as RouteNo,
      minTimestamp: new Date(buf.readUInt32LE(0x0054 + 4 * i) * 1000 + 1000),
    });
  }

  const profileId = buf.readUInt32LE(0x00f8);
  const teamId = buf.readUInt32LE(0x00fc);

  return {
    type: "load_top_ten_req",
    version: 1,
    field_2: buf.readUInt16LE(0x0002), // Bitmask selector
    selectors,
    field_C4: buf.readUInt8(0x00f4), // Boolean, true if profile ID is set
    field_C5: buf.readUInt8(0x00f5), // Always zero
    field_C6: buf.readUInt16LE(0x00f6),
    aimeId: profileId !== 0 ? (profileId as AimeId) : undefined,
    teamId: teamId !== 0xffffffff ? (teamId as ExtId<Team>) : undefined,
  };
}

loadTopTen3.msgCode = 0x012c;
loadTopTen3.msgLen = 0x0110;

export function loadTopTen3(buf: Buffer): LoadTopTenRequest {
  const selectors = new Array<LoadTopTenRequestSelector>();

  for (let i = 0; i < 40; i++) {
    selectors.push({
      routeNo: (buf.readUInt16LE(0x0004 + 2 + 2 * i) >> 1) as RouteNo,
      minTimestamp: new Date(
        buf.readUInt32LE(0x0054 + 4 + 4 * i) * 1000 + 1000
      ),
    });
  }

  const profileId = buf.readUInt32LE(0x00fc);
  const teamId = buf.readUInt32LE(0x0100);

  return {
    type: "load_top_ten_req",
    version: 2,
    field_2: buf.readUInt16LE(0x0004), // Bitmask selector
    selectors,
    field_C4: buf.readUInt8(0x00f8), // Boolean, true if profile ID is set
    field_C5: buf.readUInt8(0x00f9), // Always zero
    field_C6: buf.readUInt16LE(0x00fa),
    aimeId: profileId !== 0 ? (profileId as AimeId) : undefined,
    teamId: teamId !== 0xffffffff ? (teamId as ExtId<Team>) : undefined,
  };
}
