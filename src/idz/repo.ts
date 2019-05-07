import { Subtract } from "utility-types";

import * as Model from "./model";
import { AimeId } from "../model";

export type ProfileSpec = Subtract<
  Model.Profile,
  { id: Model.ExtId<Model.Profile> }
>;

export interface CarRepository {
  countCars(profileId: Model.ExtId<Model.Profile>): Promise<number>;

  loadAllCars(profileId: Model.ExtId<Model.Profile>): Promise<Model.Car[]>;

  loadSelectedCar(profileId: Model.ExtId<Model.Profile>): Promise<Model.Car>;

  saveCar(
    profileId: Model.ExtId<Model.Profile>,
    car: Model.Car
  ): Promise<void>;

  saveSelection(
    profileId: Model.ExtId<Model.Profile>,
    selector: Model.CarSelector
  ): Promise<void>;
}

export interface CoursePlaysRepository {
  loadAll(
    profileId: Model.ExtId<Model.Profile>
  ): Promise<Map<Model.CourseNo, number>>;

  saveAll(
    profileId: Model.ExtId<Model.Profile>,
    counts: Map<Model.CourseNo, number>
  ): Promise<void>;
}

export interface FacetRepository<T> {
  load(profileId: Model.ExtId<Model.Profile>): Promise<T>;

  save(profileId: Model.ExtId<Model.Profile>, facet: T): Promise<void>;
}

export interface FlagRepository<T extends number> {
  loadAll(profileId: Model.ExtId<Model.Profile>): Promise<Set<T>>;

  saveAll(profileId: Model.ExtId<Model.Profile>, items: Set<T>): Promise<void>;
}

export interface ProfileRepository {
  discoverByAimeId(id: AimeId): Promise<boolean>;

  loadByAimeId(id: AimeId): Promise<Model.Profile>;

  load(id: Model.ExtId<Model.Profile>): Promise<Model.Profile>;

  save(profile: Model.Profile, timestamp: Date): Promise<void>;

  create(
    aimeId: AimeId,
    profile: ProfileSpec,
    timestamp: Date
  ): Promise<Model.ExtId<Model.Profile>>;
}

// TODO extend and factorize
export interface TopTenResult {
  driverName: string;
  ta: Model.TimeAttackScore;
}

export interface TimeAttackRepository {
  loadTopTen(routeNo: Model.RouteNo): Promise<TopTenResult[]>;

  loadAll(
    profileId: Model.ExtId<Model.Profile>
  ): Promise<Model.TimeAttackScore[]>;

  save(
    profileId: Model.ExtId<Model.Profile>,
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