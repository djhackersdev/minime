import * as Model from "../model";

export interface CarRepository {
  countCars(profileId: Model.Id<Model.Profile>): Promise<number>;

  loadAllCars(profileId: Model.Id<Model.Profile>): Promise<Model.Car[]>;

  loadSelectedCar(profileId: Model.Id<Model.Profile>): Promise<Model.Car>;

  saveCar(profileId: Model.Id<Model.Profile>, car: Model.Car): Promise<void>;

  saveSelection(
    profileId: Model.Id<Model.Profile>,
    selector: Model.CarSelector
  ): Promise<void>;
}

export interface CoursePlaysRepository {
  loadAll(profileId: Model.Id<Model.Profile>): Promise<Map<number, number>>;

  saveAll(
    profileId: Model.Id<Model.Profile>,
    counts: Map<number, number>
  ): Promise<void>;
}

export interface FacetRepository<T> {
  load(profileId: Model.Id<Model.Profile>): Promise<T>;

  save(profileId: Model.Id<Model.Profile>, facet: T): Promise<void>;
}

export interface FlagRepository<T extends number> {
  loadAll(profileId: Model.Id<Model.Profile>): Promise<T[]>;

  saveAll(profileId: Model.Id<Model.Profile>, items: T[]): Promise<void>;
}

export interface ProfileRepository {
  // Might want to come up with something better here
  generateId(): Promise<Model.Id<Model.Profile>>;

  discoverByAimeId(id: Model.AimeId): Promise<boolean>;

  loadByAimeId(id: Model.AimeId): Promise<Model.Profile>;

  load(id: Model.Id<Model.Profile>): Promise<Model.Profile>;

  save(id: Model.Id<Model.Profile>, profile: Model.Profile): Promise<void>;
}

export interface TimeAttackRepository {
  loadAll(
    profileId: Model.Id<Model.Profile>
  ): Promise<Model.TimeAttackScore[]>;

  load(
    profileId: Model.Id<Model.Profile>,
    courseId: number
  ): Promise<Model.TimeAttackScore | undefined>;

  save(
    profileId: Model.Id<Model.Profile>,
    score: Model.TimeAttackScore
  ): Promise<void>;
}

export interface World {
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

  timeAttack(): TimeAttackRepository;

  titles(): FlagRepository<Model.TitleCode>;

  unlocks(): FacetRepository<Model.Unlocks>;
}
