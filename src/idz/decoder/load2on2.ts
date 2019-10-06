import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { Load2on2Request1, Load2on2Request2 } from "../request/load2on2";
import { AimeId } from "../../model";

load2on2_v1.msgCode = 0x00b0;
load2on2_v1.msgLen = 0x0010;

export function load2on2_v1(buf: Buffer): Load2on2Request1 {
  return {
    type: "load_2on2_req",
    format: 1,
    field_0002: buf.readUInt16LE(0x0002),
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamId: buf.readUInt32LE(0x0008) as ExtId<Team>,
  };
}

load2on2_v2.msgCode = 0x0132;
load2on2_v2.msgLen = 0x0010;

export function load2on2_v2(buf: Buffer): Load2on2Request2 {
  return {
    type: "load_2on2_req",
    format: 2,
    field_0002: buf.readUInt16LE(0x0002),
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamId: buf.readUInt32LE(0x0008) as ExtId<Team>,
  };
}
