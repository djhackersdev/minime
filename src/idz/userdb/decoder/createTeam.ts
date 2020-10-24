import { CreateTeamRequest } from "../request/createTeam";
import { AimeId } from "../../../model";
import { readAsciiStr, readSjisStr } from "../../util/bin";

createTeam1.msgCode = 0x0071;
createTeam1.msgLen = 0x0050;

export function createTeam1(buf: Buffer): CreateTeamRequest {
  return {
    type: "create_team_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    teamName: readSjisStr(buf, 0x0008, 0x0028),
    field_0028: buf.readUInt16LE(0x0028),
    field_002C: buf.readUInt32LE(0x002c),
    nameBg: buf.readUInt8(0x0030),
    field_0032: buf.readUInt16LE(0x0032),
    prevTeamId: buf.readUInt32LE(0x0034),
    pcbId: readAsciiStr(buf, 0x0038, 0x0050),
  };
}

createTeam2.msgCode = 0x006d;
createTeam2.msgLen = 0x0050;

export function createTeam2(buf: Buffer): CreateTeamRequest {
  return {
    type: "create_team_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    teamName: readSjisStr(buf, 0x0008, 0x0028),
    field_0028: buf.readUInt16LE(0x0028),
    field_002C: buf.readUInt32LE(0x002c),
    nameBg: buf.readUInt8(0x0030),
    field_0032: buf.readUInt16LE(0x0032),
    prevTeamId: buf.readUInt32LE(0x0034),
    pcbId: readAsciiStr(buf, 0x0038, 0x0050),
  };
}
