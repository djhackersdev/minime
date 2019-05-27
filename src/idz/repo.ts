import { Subtract } from "utility-types";

import * as Model from "./model";
import { AimeId } from "../model";
import { Id } from "../db";

export type ProfileSpec = Subtract<Model.Profile, { aimeId: AimeId }>;

export interface CarRepository {
  countCars(profileId: Id<Model.Profile>): Promise<number>;

  loadAllCars(profileId: Id<Model.Profile>): Promise<Model.Car[]>;

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
  find(aimeId: AimeId): Promise<Id<Model.Profile>>;

  peek(aimeId: AimeId): Promise<Id<Model.Profile> | undefined>;

  load(id: Id<Model.Profile>): Promise<Model.Profile>;

  save(profile: Model.Profile, timestamp: Date): Promise<void>;

  create(
    aimeId: AimeId,
    profile: ProfileSpec,
    timestamp: Date
  ): Promise<Id<Model.Profile>>;
}

// TODO extend and factorize
export interface TopTenResult {
  driverName: string;
  ta: Model.TimeAttackScore;
}

export interface TimeAttackRepository {
  loadTopTen(
    routeNo: Model.RouteNo,
    minTimestamp: Date
  ): Promise<TopTenResult[]>;

  loadAll(profileId: Id<Model.Profile>): Promise<Model.TimeAttackScore[]>;

  save(
    profileId: Id<Model.Profile>,
    score: Model.TimeAttackScore
  ): Promise<void>;
}

export interface Repositories {
  backgrounds(): FlagRepository<Model.BackgroundCode>;

  car(): CarRepository;

  chara(): FacetRepository<Model.Chara>;

  coursePlays(): CoursePlaysRepository;

  // not really a facet tbh
  missions(): FacetRepository<Model.MissionState>;

  profile(): ProfileRepository;

  settings(): FacetRepository<Model.Settings>;

  // Also not a facet. w/e one step at a time.
  story(): FacetRepository<Model.Story>;

  tickets(): FacetRepository<Model.Tickets>;

  timeAttack(): TimeAttackRepository;

  titles(): FlagRepository<Model.TitleCode>;

  unlocks(): FacetRepository<Model.Unlocks>;
}

export interface Transaction extends Repositories {
  commit(): Promise<void>;

  rollback(): Promise<void>;
}
