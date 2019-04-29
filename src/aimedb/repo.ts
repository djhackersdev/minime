import { AimeId } from "./model";

export interface CardRepository {
  lookup(luid: string, now: Date): Promise<AimeId | undefined>;

  register(luid: string, now: Date): Promise<AimeId>;
}

export interface Repositories {
  cards(): CardRepository;
}

export interface Transaction extends Repositories {
  commit(): Promise<void>;

  rollback(): Promise<void>;
}
