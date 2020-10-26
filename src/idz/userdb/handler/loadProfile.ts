import { LoadProfileRequest } from "../request/loadProfile";
import { LoadProfileResponse } from "../response/loadProfile";
import { Repositories } from "../repo";

export async function loadProfile(
  w: Repositories,
  req: LoadProfileRequest
): Promise<LoadProfileResponse> {
  const { aimeId, version } = req;

  const profileId = await w.profile().find(aimeId, version);
  const teamId = await w.teamMembers().findTeam(profileId);
  const leaderId = teamId && (await w.teamMembers().findLeader(teamId));

  // Promise.all would be messy here, who cares anyway this isn't supposed to
  // be a high-performance server.

  const profile = await w.profile().load(profileId);
  const settings = await w.settings().load(profileId);
  const chara = await w.chara().load(profileId);
  const titles = await w.titles().loadAll(profileId);
  const coursePlays = await w.coursePlays().loadAll(profileId);
  const missions = await w.missions().load(profileId);
  const car = await w.car().loadSelectedCar(profileId);
  const carCount = await w.car().countCars(profileId);
  const story = await w.story().load(profileId);
  const timeAttack = await w.timeAttack().loadAll(profileId);
  const unlocks = await w.unlocks().load(profileId);
  const tickets = await w.tickets().load(profileId);
  const team = teamId && (await w.teams().load(teamId));
  const stamps = await w.stamps().loadAll(profileId);
  const selectedStamps = await w.stamps().loadSelection(profileId);
  const weeklyMissions = await w.weeklyMissions().load(profileId);

  return {
    type: "load_profile_res",
    name: profile.name,
    aimeId,
    lv: profile.lv,
    exp: profile.exp,
    fame: profile.fame,
    dpoint: profile.dpoint,
    mileage: profile.mileage,
    teamId: team && team.extId,
    teamLeader: profileId === leaderId,
    settings,
    chara,
    titles,
    coursePlays,
    missions,
    timeAttack,
    car,
    carCount,
    story,
    unlocks,
    tickets,
    stamps,
    selectedStamps,
    weeklyMissions,
  };
}
