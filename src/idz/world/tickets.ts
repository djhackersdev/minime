import { loadJson, saveJson } from "./_util";
import { FacetRepository } from "./defs";
import { Tickets } from "../model/tickets";
import { Id, Profile } from "../model";

interface TicketsJson {
  freeCar?: {
    validFrom: string;
    // Valid To cannot be controlled, it is always 14 days after issue date.
  };
  freeContinue?: {
    validFrom: string;
    validTo: string;
  };
}

export class TicketsRepositoryImpl implements FacetRepository<Tickets> {
  private readonly _path: string;

  constructor(root: string) {
    this._path = root + "/tickets.json";
  }

  async load(profileId: Id<Profile>): Promise<Tickets> {
    const json: TicketsJson = await loadJson(this._path);

    return {
      freeCar: json.freeCar && {
        validFrom: new Date(json.freeCar.validFrom),
      },
      freeContinue: json.freeContinue && {
        validFrom: new Date(json.freeContinue.validFrom),
        validTo: new Date(json.freeContinue.validTo),
      },
    };
  }

  save(profileId: Id<Profile>, tickets: Tickets): Promise<void> {
    // Date objects stringify to ISO8601 so this does this right thing.
    return saveJson(this._path, tickets);
  }
}
