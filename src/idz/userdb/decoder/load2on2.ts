import { ExtId } from "../model/base";
import { Team } from "../model/team";
import {
  Load2on2InfoRequest,
  Load2on2RankingPointsRequest,
} from "../request/load2on2";
import { AimeId } from "../../../model";

load2on2RankingPoints1.msgCode = 0x00b0;
load2on2RankingPoints1.msgLen = 0x0010;

export function load2on2RankingPoints1(
  buf: Buffer
): Load2on2RankingPointsRequest {
  return {
    type: "load_2on2_ranking_points_req",
    field_0002: buf.readUInt16LE(0x0002),
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamId: buf.readUInt32LE(0x0008) as ExtId<Team>,
  };
}

load2on2RankingPoints2.msgCode = 0x00a3;
load2on2RankingPoints2.msgLen = 0x0010;

export function load2on2RankingPoints2(
  buf: Buffer
): Load2on2RankingPointsRequest {
  return {
    type: "load_2on2_ranking_points_req",
    field_0002: buf.readUInt16LE(0x0002),
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamId: buf.readUInt32LE(0x0008) as ExtId<Team>,
  };
}

load2on2Info.msgCode = 0x0132;
load2on2Info.msgLen = 0x0010;

export function load2on2Info(buf: Buffer): Load2on2InfoRequest {
  return {
    type: "load_2on2_info_req",
    field_0002: buf.readUInt16LE(0x0002),
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    teamId: buf.readUInt32LE(0x0008) as ExtId<Team>,
  };
}
