import * as Model from "../model";

export interface Repository<T, K = T> {
  discover(id: Model.Id<K>): Promise<boolean>;

  load(id: Model.Id<K>): Promise<T>;

  save(id: Model.Id<K>, obj: T): Promise<void>;
}

export interface ProfileRepository extends Repository<Model.Profile> {
  discoverByAimeId(id: Model.AimeId): Promise<boolean>;

  loadByAimeId(id: Model.AimeId): Promise<Model.Profile>;
}

export interface World {
  backgrounds(): Repository<Model.BackgroundCode[], Model.Profile>;

  car(): Repository<Model.Car, Model.Profile>;

  chara(): Repository<Model.Chara, Model.Profile>;

  coursePlays(): Repository<number[], Model.Profile>;

  missions(): Repository<Model.MissionState, Model.Profile>;

  profile(): ProfileRepository;

  settings(): Repository<Model.Settings, Model.Profile>;

  story(): Repository<Model.Story, Model.Profile>;

  // this is godawful do a real repo layer already jfc
  timeAttack(): Repository<Model.TimeAttackState, Model.Profile>;

  titles(): Repository<Model.TitleCode[], Model.Profile>;

  unlocks(): Repository<Model.Unlocks, Model.Profile>;
}
