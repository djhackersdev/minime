import iconv = require("iconv-lite");
import { CreateTeamResponse } from "../response/createTeam";
import { LoadTeamResponse } from "../response/loadTeam";

export function _team(res: CreateTeamResponse | LoadTeamResponse) {
  const buf = Buffer.alloc(0x0ca0);

  iconv.encode(res.name, "shift_jis").copy(buf, 0x0024);

  for (let i = 0; i < 6; i++) {
    const base = 0x011c + i * 0x004c;
    const member = res.members[i];

    if (member === undefined) {
      break;
    }

    buf.writeInt32LE(1, base + 0x0000); // Presence
    iconv.encode(member.name + "\0", "shift_jis").copy(buf, base + 0x0004);
    buf.writeInt32LE(member.lv, base + 0x0018);
    buf.writeInt32LE(member.monthPoints, base + 0x0024);
  }

  // xM

  /*
  buf.writeInt16LE(0x00001, 0x0344 + 0x0000);
  buf.writeInt8(0x02, 0x0344 + 0x0003);
  buf.writeInt32LE(0x00000003, 0x0344 + 0x0004);
  iconv.encode("str\0", sjis).copy(buf, 0x0344 + 0x0008);
  buf.writeInt32LE(0x00000004, 0x0344 + 0x001c);
  */

  if (res.type === "create_team_res") {
    buf.writeInt16LE(0x007c, 0x0000);
  } else {
    buf.writeInt16LE(0x0078, 0x0000);
  }

  return buf;
}
