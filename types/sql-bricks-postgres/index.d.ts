declare module "sql-bricks-postgres" {
  import * as sql from "sql-bricks";
  export * from "sql-bricks";

  interface OnConflictClause {
    doNothing(): sql.Statement;

    doUpdate(colNames: string[]): sql.Statement;
  }

  interface LimitClause extends sql.SelectStatement {
    offset(value: number): sql.SelectStatement;
  }

  export interface PgInsertStatement extends sql.InsertStatement {
    onConflict(...colNames: string[]): OnConflictClause;
  }

  export interface PgSelectStatement extends sql.SelectStatement {
    limit(value: number): LimitClause;
  }

  export interface PgSqlBricksFn extends sql.SqlBricksFn {
    insert(tbl?: string, ...values: any[]): PgInsertStatement;

    select(...columns: Array<string | sql.SelectStatement>): PgSelectStatement;
    select(columns: string[] | sql.SelectStatement[]): PgSelectStatement;
  }

  const PgSqlBricks: PgSqlBricksFn;
  export default PgSqlBricks;
}
