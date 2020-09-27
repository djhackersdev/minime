import { TeamAuto } from "../model/team";
import { Repositories } from "../repo";
import { CreateAutoTeamRequest } from "../request/createAutoTeam";
import { CreateAutoTeamResponse } from "../response/createAutoTeam";

interface AutoTeamTemplate {
  prefix: string;
  nameBg: number;
}

// Hard-code these for the time being, since AFAIK there are only three.
// These are all references to teams in the Initial D manga/anime.
// If any more auto-teams are added/discovered they *MUST* be added to the
// *END* of this list. Otherwise duplicate auto-teams will be created.

const autoTeams: AutoTeamTemplate[] = [
  {
    // "Speed Stars"
    prefix: "スピードスターズ",
    nameBg: 0,
  },
  {
    // "Red Suns"
    prefix: "レッドサンズ",
    nameBg: 1,
  },
  {
    // "Night Kids" (even though it's written like "Night Keys"...)
    prefix: "ナイトキッズ",
    nameBg: 2,
  },
];

function incrementAuto(prev: TeamAuto): TeamAuto {
  if (prev.nameIdx < autoTeams.length - 1) {
    return { nameIdx: prev.nameIdx + 1, serialNo: prev.serialNo };
  } else {
    return { nameIdx: 0, serialNo: prev.serialNo + 1 };
  }
}

export async function createAutoTeam(
  w: Repositories,
  req: CreateAutoTeamRequest
): Promise<CreateAutoTeamResponse> {
  const now = new Date();
  const { aimeId, version } = req;

  const peek = await w.teamAuto().peek(version);
  let nextAuto: TeamAuto;

  //
  // Determine if we need to create a new team or not
  //

  if (peek !== undefined) {
    // Look at the highest-numbered auto team. Is it full?

    const [lastAuto, lastTeamId] = peek;
    const occupancy = await w.teamReservations().occupancyHack(lastTeamId);

    if (occupancy < 6) {
      // Team isn't full, so return this one
      await w.teamReservations().reserveHack(lastTeamId, aimeId, now);

      return {
        type: "create_auto_team_res",
        team: await w.teams().load(lastTeamId),
        members: await w.teamMembers().loadRoster(lastTeamId),
      };
    }

    // Team full, need to create a new one

    nextAuto = incrementAuto(lastAuto);
  } else {
    // No teams exist at all, seed the system with SpeedStars001.

    nextAuto = { serialNo: 1, nameIdx: 0 };
  }

  //
  // Build the new team
  //

  // Make a three-digit serial number using full-width digits

  let { serialNo, nameIdx } = nextAuto;
  let name = "";

  for (let i = 0; i < 3; i++) {
    name = String.fromCodePoint(0xff10 + (serialNo % 10)) + name;
    serialNo = (serialNo / 10) | 0;
  }

  // Prepend the name prefix

  name = autoTeams[nameIdx].prefix + name;

  // Register the new team, make the requestor its leader

  const spec = {
    version,
    name,
    nameBg: autoTeams[nameIdx].nameBg,
    nameFx: 0,
    registerTime: now,
  };

  const [newTeamId, newTeamExtId] = await w.teams().create(spec);

  await w.teamAuto().push(newTeamId, nextAuto);
  await w.teamReservations().reserveHack(newTeamId, aimeId, now, "leader");

  return {
    type: "create_auto_team_res",
    team: { ...spec, extId: newTeamExtId },
    members: [],
  };
}
