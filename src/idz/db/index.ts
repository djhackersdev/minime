import { PoolClient } from "pg";

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
import { connect } from "../../db";

class TransactionImpl implements Repo.Transaction {
  constructor(private readonly _conn: PoolClient) {}

  backgrounds(): Repo.FlagRepository<Model.BackgroundCode> {
    return new SqlBackgroundsRepository(this._conn);
  }

  car(): Repo.CarRepository {
    return new SqlCarRepository(this._conn);
  }

  chara(): Repo.FacetRepository<Model.Chara> {
    return new SqlCharaRepository(this._conn);
  }

  coursePlays(): Repo.CoursePlaysRepository {
    return new SqlCoursePlaysRepository(this._conn);
  }

  missions(): Repo.FacetRepository<Model.MissionState> {
    return new SqlMissionsRepository(this._conn);
  }

  profile(): Repo.ProfileRepository {
    return new SqlProfileRepository(this._conn);
  }

  settings(): Repo.FacetRepository<Model.Settings> {
    return new SqlSettingsRepository(this._conn);
  }

  story(): Repo.FacetRepository<Model.Story> {
    return new SqlStoryRepository(this._conn);
  }

  teams(): Repo.TeamRepository {
    return new SqlTeamRepository(this._conn);
  }

  teamAuto(): Repo.TeamAutoRepository {
    return new SqlTeamAutoRepository(this._conn);
  }

  teamMembers(): Repo.TeamMemberRepository {
    return new SqlTeamMemberRepository(this._conn);
  }

  teamReservations(): Repo.TeamReservationRepository {
    return new SqlTeamReservationRepository(this._conn);
  }

  tickets(): Repo.FacetRepository<Model.Tickets> {
    return new SqlTicketsRepository(this._conn);
  }

  timeAttack(): Repo.TimeAttackRepository {
    return new SqlTimeAttackRepository(this._conn);
  }

  titles(): Repo.FlagRepository<Model.TitleCode> {
    return new SqlTitlesRepository(this._conn);
  }

  unlocks(): Repo.FacetRepository<Model.Unlocks> {
    return new SqlUnlocksRepository(this._conn);
  }

  async commit(): Promise<void> {
    await this._conn.query("commit");
    await this._conn.release();
  }

  async rollback(): Promise<void> {
    await this._conn.query("rollback");
    await this._conn.release();
  }
}

export async function beginDbSession(): Promise<Repo.Transaction> {
  const conn = await connect();

  await conn.query("begin");

  return new TransactionImpl(conn);
}
