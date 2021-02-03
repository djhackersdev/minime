import { Subtract } from "utility-types";

import * as Model from "./model";
import { AimeId, Id } from "../../model";

export type TeamSpec = Subtract<
  Model.Team,
  { extId: Model.ExtId<Model.Team> }
>;

export interface CarRepository {
  countCars(profileId: Id<Model.Profile>): Promise<number>;

  loadCars(
    profileId: Id<Model.Profile>,
    limit: number,
    offset: number
  ): Promise<Model.Car[]>;

  loadSelectedCar(profileId: Id<Model.Profile>): Promise<Model.Car>;

  saveCar(profileId: Id<Model.Profile>, car: Model.Car): Promise<void>;

  saveSelection(
    profileId: Id<Model.Profile>,
    selector: Model.CarSelector
  ): Promise<void>;
}

export interface CoursePlaysRepository {
  loadAll(profileId: Id<Model.Profile>): Promise<Map<Model.CourseNo, number>>;

  saveAll(
    profileId: Id<Model.Profile>,
    counts: Map<Model.CourseNo, number>
  ): Promise<void>;
}

export interface FacetRepository<T> {
  load(profileId: Id<Model.Profile>): Promise<T>;

  save(profileId: Id<Model.Profile>, facet: T): Promise<void>;
}

export interface FlagRepository<T extends number> {
  loadAll(profileId: Id<Model.Profile>): Promise<Set<T>>;

  saveAll(profileId: Id<Model.Profile>, items: Set<T>): Promise<void>;
}

export interface ProfileRepository {
  find(aimeId: AimeId, version: number): Promise<Id<Model.Profile>>;

  peek(
    aimeId: AimeId,
    version: number
  ): Promise<Id<Model.Profile> | undefined>;

  load(id: Id<Model.Profile>): Promise<Model.Profile>;

  save(id: Id<Model.Profile>, profile: Model.Profile): Promise<void>;

  create(profile: Model.Profile): Promise<Id<Model.Profile>>;
}

export interface StampsRepository {
  loadSelection(profileId: Id<Model.Profile>): Promise<Model.SelectedStamps>;

  loadAll(profileId: Id<Model.Profile>): Promise<Set<Model.StampCode>>;

  saveAll(
    profileId: Id<Model.Profile>,
    items: Set<Model.StampCode>
  ): Promise<void>;

  saveSelection(
    profileId: Id<Model.Profile>,
    selection: Model.SelectedStamps
  ): Promise<void>;
}

export interface TeamRepository {
  find(
    extId: Model.ExtId<Model.Team>,
    version: number
  ): Promise<Id<Model.Team>>;

  load(id: Id<Model.Team>): Promise<Model.Team>;

  save(id: Id<Model.Team>, team: Model.Team): Promise<void>;

  create(team: TeamSpec): Promise<[Id<Model.Team>, Model.ExtId<Model.Team>]>;

  delete(id: Id<Model.Team>): Promise<void>;
}

export interface TeamAutoRepository {
  peek(version: number): Promise<[Model.TeamAuto, Id<Model.Team>] | undefined>;

  push(teamId: Id<Model.Team>, auto: Model.TeamAuto): Promise<void>;
}

export interface TeamMemberRepository {
  findTeam(profileId: Id<Model.Profile>): Promise<Id<Model.Team> | undefined>;

  findLeader(teamId: Id<Model.Team>): Promise<Id<Model.Profile> | undefined>;

  loadRoster(id: Id<Model.Team>): Promise<Model.TeamMember[]>;

  join(
    teamId: Id<Model.Team>,
    profileId: Id<Model.Profile>,
    timestamp: Date
  ): Promise<void>;

  leave(teamId: Id<Model.Team>, profileId: Id<Model.Profile>): Promise<void>;

  makeLeader(
    team: Id<Model.Team>,
    profileId: Id<Model.Profile>
  ): Promise<void>;
}

export interface TeamReservationRepository {
  occupancyHack(teamId: Id<Model.Team>): Promise<number>;

  reserveHack(
    teamId: Id<Model.Team>,
    aimeId: AimeId,
    timestamp: Date,
    leader?: "leader"
  ): Promise<void>;

  commitHack(aimeId: AimeId): Promise<void>;
}

// TODO extend and factorize
export interface TopTenResult {
  driverName: string;
  team: Model.Team;
  ta: Model.TimeAttackScore;
}

export interface TimeAttackRepository {
  loadTop(
    version: number,
    routeNo: Model.RouteNo,
    minTimestamp: Date,
    limit: number
  ): Promise<TopTenResult[]>;

  loadAll(profileId: Id<Model.Profile>): Promise<Model.TimeAttackScore[]>;

  save(
    profileId: Id<Model.Profile>,
    score: Model.TimeAttackScore
  ): Promise<void>;
}

export interface WeeklyMissionsRepository {
  load(profileId: Id<Model.Profile>): Promise<Model.WeeklyMissions>;

  save(
    profileId: Id<Model.Profile>,
    weeklyMissions: Model.WeeklyMissions
  ): Promise<void>;
}

export interface Repositories {
  backgrounds(): FlagRepository<Model.BackgroundCode>;

  car(): CarRepository;

  chara(): FacetRepository<Model.Chara>;

  coursePlays(): CoursePlaysRepository;

  // not really a facet tbh
  missions(): FacetRepository<Model.MissionState>;

  myChara(): FlagRepository<Model.MyCharaCode>;

  profile(): ProfileRepository;

  settings(): FacetRepository<Model.Settings>;

  stamps(): StampsRepository;

  // Also not a facet. w/e one step at a time.
  story(): FacetRepository<Model.Story>;

  teams(): TeamRepository;

  teamAuto(): TeamAutoRepository;

  teamMembers(): TeamMemberRepository;

  teamReservations(): TeamReservationRepository;

  tickets(): FacetRepository<Model.Tickets>;

  timeAttack(): TimeAttackRepository;

  titles(): FlagRepository<Model.TitleCode>;

  unlocks(): FacetRepository<Model.Unlocks>;

  weeklyMissions(): WeeklyMissionsRepository;
}
