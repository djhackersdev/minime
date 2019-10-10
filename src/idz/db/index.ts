import { SqlBackgroundsRepository } from "./backgrounds";
import { SqlCarRepository } from "./car";
import { SqlCharaRepository } from "./chara";
import { SqlCoursePlaysRepository } from "./coursePlays";
import { SqlMissionsRepository } from "./missions";
import { SqlProfileRepository } from "./profile";
import { SqlSettingsRepository } from "./settings";
import { SqlStoryRepository } from "./story";
import { SqlTeamRepository } from "./team";
import { SqlTeamAutoRepository } from "./teamAuto";
import { SqlTeamMemberRepository } from "./teamMember";
import { SqlTeamReservationRepository } from "./teamReservation";
import { SqlTicketsRepository } from "./tickets";
import { SqlTimeAttackRepository } from "./timeAttack";
import { SqlTitlesRepository } from "./titles";
import { SqlUnlocksRepository } from "./unlocks";
import * as Model from "../model";
import * as Repo from "../repo";
import { Transaction } from "../../sql";

export class SqlRepositories implements Repo.Repositories {
  constructor(private readonly _txn: Transaction) {}

  backgrounds(): Repo.FlagRepository<Model.BackgroundCode> {
    return new SqlBackgroundsRepository(this._txn);
  }

  car(): Repo.CarRepository {
    return new SqlCarRepository(this._txn);
  }

  chara(): Repo.FacetRepository<Model.Chara> {
    return new SqlCharaRepository(this._txn);
  }

  coursePlays(): Repo.CoursePlaysRepository {
    return new SqlCoursePlaysRepository(this._txn);
  }

  missions(): Repo.FacetRepository<Model.MissionState> {
    return new SqlMissionsRepository(this._txn);
  }

  profile(): Repo.ProfileRepository {
    return new SqlProfileRepository(this._txn);
  }

  settings(): Repo.FacetRepository<Model.Settings> {
    return new SqlSettingsRepository(this._txn);
  }

  story(): Repo.FacetRepository<Model.Story> {
    return new SqlStoryRepository(this._txn);
  }

  teams(): Repo.TeamRepository {
    return new SqlTeamRepository(this._txn);
  }

  teamAuto(): Repo.TeamAutoRepository {
    return new SqlTeamAutoRepository(this._txn);
  }

  teamMembers(): Repo.TeamMemberRepository {
    return new SqlTeamMemberRepository(this._txn);
  }

  teamReservations(): Repo.TeamReservationRepository {
    return new SqlTeamReservationRepository(this._txn);
  }

  tickets(): Repo.FacetRepository<Model.Tickets> {
    return new SqlTicketsRepository(this._txn);
  }

  timeAttack(): Repo.TimeAttackRepository {
    return new SqlTimeAttackRepository(this._txn);
  }

  titles(): Repo.FlagRepository<Model.TitleCode> {
    return new SqlTitlesRepository(this._txn);
  }

  unlocks(): Repo.FacetRepository<Model.Unlocks> {
    return new SqlUnlocksRepository(this._txn);
  }
}
