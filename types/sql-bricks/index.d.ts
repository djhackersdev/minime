// Type definitions for sql-bricks 2.0
// Project: http://csnw.github.io/sql-bricks
// Definitions by: Narcisse Assogba <https://github.com/adn05>
//                 Paleo <https://github.com/paleo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "sql-bricks" {
  /**
   * Statement is an abstract base class for all statements (SELECT, INSERT, UPDATE, DELETE)
   * and should never be instantiated directly. It is exposed because it can be used with the
   * instanceof operator to easily determine whether something is a SQL Bricks statement: my_var instanceof Statement.
   */
  export interface Statement {
    /**
     * Clones a statement so that subsequent modifications do not affect the original statement.
     */
    clone(): this;

    /**
     * Returns the non-parameterized SQL for the statement. This is called implicitly by Javascript when using a Statement anywhere that a string is expected (string concatenation, Array.join(), etc).
     * While toString() is easy to use, it is not recommended in most cases because:
     *    It doesn't provide robust protection against SQL injection attacks (it just does basic escaping)
     *    It doesn't provide as much support for complex data types (objects, arrays, etc, are "stringified" before being passed to your database driver, which then has to interpret them correctly)
     *    It does not provide the same level of detail in error messages (see this issue)
     * For the above reasons, it is usually better to use toParams().
     */
    toString(): string;

    /**
     * Returns an object with two properties: a parameterized text string and a values array. The values are populated with anything on the right-hand side
     * of a WHERE criteria,as well as any values passed into an insert() or update() (they can be passed explicitly with val() or opted out of with sql())
     * @param options A placeholder option of '?%d' can be passed to generate placeholders compatible with node-sqlite3 (%d is replaced with the parameter #):
     * @example
     * update('person', {'first_name': 'Fred'}).where({'last_name': 'Flintstone'}).toParams({placeholder: '?%d'});
     *    // {"text": "UPDATE person SET first_name = ?1 WHERE last_name = ?2", "values": ["Fred", "Flintstone"]}
     */
    toParams(options?: { placeholder: string }): SqlBricksParam;
  }

  interface SqlBricksParam {
    text: string;
    values: any[];
  }

  type TableName = string | SelectStatement;

  interface OnCriteria {
    [column: string]: string;
  }

  interface WhereObject {
    [column: string]: any;
  }

  interface WhereGroup {
    op?: string;
    expressions: WhereExpression[];
  }

  interface WhereBinary {
    op: string;
    col: string | SelectStatement;
    val: any;
    quantifier: string;
  }

  /**
   * When a non-expression object is passed somewhere a whereExpression is expected,
   * each key/value pair will be ANDed together:
   */
  type WhereExpression = WhereGroup | WhereBinary | WhereObject | string;

  /**
   * A SELECT statement
   */
  export interface SelectStatement extends Statement {
    /**
     * Appends additional columns to an existing query.
     * @param columns can be passed as multiple arguments, a comma-delimited string or an array.
     */
    select(...columns: Array<string | SelectStatement>): this;
    /**
     * Appends additional columns to an existing query.
     * @param columns can be passed as multiple arguments, a comma-delimited string or an array.
     */
    select(columns: string[] | SelectStatement[]): this;

    as(alias: string): this;

    distinct(...columns: Array<string | SelectStatement>): this;
    distinct(columns: string[] | SelectStatement[]): this;

    /**
     * Makes the query a SELECT ... INTO query (which creates a new table with the results of the query).
     * @alias intoTable
     * @param tbl new table to create
     */
    into(tbl: TableName): this;
    /**
     * Makes the query a SELECT ... INTO query (which creates a new table with the results of the query).
     * @alias into
     * @param tbl new table to create
     */
    intoTable(tbl: TableName): this;

    intoTemp(tbl: TableName): this;
    intoTempTable(tbl: TableName): this;

    /**
     * Table names can be passed in as multiple string arguments, a comma-delimited string or an array.
     * @param tbls table names
     */
    from(...tbls: TableName[]): this;
    /**
     * Table names can be passed in as multiple string arguments, a comma-delimited string or an array.
     * @param tbls array of table names
     */
    from(tbls: TableName[]): this;

    /**
     * Adds the specified join to the query.
     * @alias innerJoin
     * @param tbl can include an alias after a space or after the 'AS' keyword ('my_table my_alias').
     * @param onCriteria is optional if a joinCriteria function has been supplied.
     */
    join(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    join(tbl: string, onCol1: string, onCol2: string): this;
    join(firstTbl: string, ...otherTbls: string[]): this;

    leftJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    leftJoin(tbl: string, onCol1: string, onCol2: string): this;
    leftJoin(firstTbl: string, ...otherTbls: string[]): this;
    rightJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    rightJoin(tbl: string, onCol1: string, onCol2: string): this;
    rightJoin(firstTbl: string, ...otherTbls: string[]): this;
    fullJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    fullJoin(tbl: string, onCol1: string, onCol2: string): this;
    fullJoin(firstTbl: string, ...otherTbls: string[]): this;
    crossJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    crossJoin(tbl: string, onCol1: string, onCol2: string): this;
    crossJoin(firstTbl: string, ...otherTbls: string[]): this;
    innerJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    innerJoin(tbl: string, onCol1: string, onCol2: string): this;
    innerJoin(firstTbl: string, ...otherTbls: string[]): this;
    leftOuterJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    leftOuterJoin(tbl: string, onCol1: string, onCol2: string): this;
    leftOuterJoin(firstTbl: string, ...otherTbls: string[]): this;
    rightOuterJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    rightOuterJoin(tbl: string, onCol1: string, onCol2: string): this;
    rightOuterJoin(firstTbl: string, ...otherTbls: string[]): this;
    fullOuterJoin(
      tbl: string,
      criteria?: OnCriteria | string[] | WhereExpression
    ): this;
    fullOuterJoin(tbl: string, onCol1: string, onCol2: string): this;
    fullOuterJoin(firstTbl: string, ...otherTbls: string[]): this;

    on(onCriteria: OnCriteria | WhereExpression): this;
    on(onCol1: string, onCol2: string): this;

    /**
     * Joins using USING instead of ON.
     * @param columnList columnList can be passed in as one or more string arguments, a comma-delimited string, or an array.
     * @example
     * select('*').from('person').join('address').using('address_id', 'country_id');
     * // SELECT * FROM person INNER JOIN address USING (address_id, country_id)
     */
    using(...columnList: string[]): this;
    using(columnList: string[]): this;

    /**
     * Adds the specified natural join to the query.
     * @param tbl can include an alias after a space or after the 'AS' keyword ('my_table my_alias').
     */
    naturalJoin(tbl: string): this;
    naturalLeftJoin(tbl: string): this;
    naturalRightJoin(tbl: string): this;
    naturalFullJoin(tbl: string): this;

    naturalInnerJoin(tbl: string): this;
    naturalLeftOuterJoin(tbl: string): this;
    naturalRightOuterJoin(tbl: string): this;
    naturalFullOuterJoin(tbl: string): this;

    where(column?: string | null, value?: any): this;
    where(...whereExpr: WhereExpression[]): this;

    and(...options: any[]): this;

    /**
     * Sets or extends the GROUP BY columns.
     * @param columns can take multiple arguments, a single comma-delimited string or an array.
     */
    groupBy(...columns: string[]): this;
    groupBy(columns: string[]): this;

    having(column: string, value: string): this;
    having(whereExpr: WhereExpression): this;

    /**
     * Sets or extends the list of columns in the ORDER BY clause.
     * @param columns can be passed as multiple arguments, a single comma-delimited string or an array.
     */
    orderBy(...columns: string[]): this;
    orderBy(columns: string[]): this;
    order(...columns: string[]): this;
    order(columns: string[]): this;

    forUpdate(...tbls: string[]): this;
    of(tlb: string): this;
    noWait(): this;

    union(...stmt: Statement[]): this;
    intersect(...stmt: Statement[]): this;
    minus(...stmt: Statement[]): this;
    except(...stmt: Statement[]): this;
  }

  /**
   * An INSERT statement
   */
  export interface InsertStatement extends Statement {
    into(tbl: TableName, ...columns: any[]): InsertStatement;
    intoTable(tbl: TableName, ...columns: any[]): InsertStatement;
    select(...columns: Array<string | SelectStatement>): SelectStatement;
    select(columns: string[] | SelectStatement[]): SelectStatement;
    values(...values: any[]): InsertStatement;
  }

  /**
   * An UPDATE statement
   */
  export interface UpdateStatement extends Statement {
    values(...values: any[]): UpdateStatement;
    set(...values: any[]): UpdateStatement;
    where(column?: string | null, value?: any): UpdateStatement;
    where(...whereExpr: WhereExpression[]): UpdateStatement;
    and(column?: string | null, value?: any): UpdateStatement;
    and(...whereExpr: WhereExpression[]): UpdateStatement;
  }

  /**
   * A DELETE statement
   */
  export interface DeleteStatement extends Statement {
    from(...tbls: string[]): DeleteStatement;
    using(...columnList: string[]): SelectStatement;
    using(columnList: string[]): SelectStatement;
    where(column?: string | null, value?: any): SelectStatement;
    where(...whereExpr: WhereExpression[]): SelectStatement;
    and(column?: string | null, value?: any): SelectStatement;
    and(...whereExpr: WhereExpression[]): SelectStatement;
  }

  export interface SqlBricksFn {
    (...params: any[]): any;
    /**
     * Wraps a value (user-supplied string, number, boolean, etc) so that it can be passed into SQL Bricks
     * anywhere that a column is expected (the left-hand side of WHERE criteria and many other SQL Bricks APIs)
     * @param value value to be wraped
     */
    val(value: any): any;

    /**
     * Returns a new INSERT statement. It can be used with or without the new operator.
     * @alias insertInto
     * @param tbl table name
     * @param values a values object or a columns list. Passing a set of columns (as multiple arguments, a comma-delimited string or an array)
     * will put the statement into split keys/values mode, where a matching array of values is expected in values()
     * @example
     * insert('person', {'first_name': 'Fred', 'last_name': 'Flintstone'});
     * // INSERT INTO person (first_name, last_name) VALUES ('Fred', 'Flintstone')
     */
    insert(tbl?: string, ...values: any[]): InsertStatement;

    /**
     * Returns a new INSERT statement. It can be used with or without the new operator.
     * @alias insert
     * @param tbl table name
     * @param values a values object or a columns list. Passing a set of columns (as multiple arguments, a comma-delimited string or an array)
     * will put the statement into split keys/values mode, where a matching array of values is expected in values()
     * @example
     * insert('person', {'first_name': 'Fred', 'last_name': 'Flintstone'});
     * // INSERT INTO person (first_name, last_name) VALUES ('Fred', 'Flintstone')
     */
    insertInto(tbl?: string, ...values: any[]): InsertStatement;

    /**
     * Returns a new select statement, seeded with a set of columns. It can be used with or without the new keyword.
     * @param columns it can be passed in here (or appended later via sel.select() or sel.distinct()) via multiple arguments
     * or a comma-delimited string or an array. If no columns are specified, toString() will default to SELECT *.
     */
    select(...columns: Array<string | SelectStatement>): SelectStatement;
    select(columns: string[] | SelectStatement[]): SelectStatement;

    /**
     * Returns a new UPDATE statement. It can be used with or without the new operator.
     * @param tbl table name
     * @param values
     */
    update(tbl: string, ...values: any[]): UpdateStatement;

    /**
     * Returns a new DELETE statement. It can be used with or without the new operator.
     * @alias deleteFrom
     * @param tbl table name
     */
    delete(tbl?: string): DeleteStatement;
    /**
     * Returns a new DELETE statement. It can be used with or without the new operator.
     * @alias delete
     * @param tbl table name
     */
    deleteFrom(tbl?: string): DeleteStatement;

    /**
     * Registers a set of frequently-used table aliases with SQL Bricks.
     * These table aliases can then be used by themselves in from(), join(), etc
     * and SQL Bricks will automatically expand them to include the table name as well as the alias.
     * @param expansions
     * @example
     * sql.aliasExpansions({'psn': 'person', 'addr': 'address', 'zip': 'zipcode', 'usr': 'user'});
     * select().from('psn').join('addr', {'psn.addr_id': 'addr.id'});
     * // SELECT * FROM person psn INNER JOIN address addr ON psn.addr_id = addr.id
     */
    aliasExpansions(expansions: { [tbl: string]: string }): void;

    /**
     * Sets a user-supplied function to automatically generate the .on() criteria for joins whenever it is not supplied explicitly.
     * @param func
     */
    joinCriteria(func?: (...args: any[]) => OnCriteria): any;

    _extension(): any;
    prop: number;
    conversions: any;

    //////////////////////////////////////////
    //////  Where Expression functions  //////
    //////////////////////////////////////////

    /**
     * Joins the passed expressions with AND
     * @param whereExprs
     */
    and(...whereExprs: WhereExpression[]): WhereGroup;

    /**
     * Joins the passed expressions with OR:
     * @param whereExprs
     */
    or(...whereExprs: WhereExpression[]): WhereGroup;

    /**
     * Negates the expression by wrapping it in NOT (...)
     * (if it is at the top level, the parentheses are unnecessary and will be omitted)
     * @param whereExpr
     */
    not(whereExpr: WhereExpression): WhereGroup;

    /**
     * Generates a BETWEEN
     * @param column
     * @param value1
     * @param value2
     */
    between(column: string, value1: any, value2: any): WhereExpression;
    isNull(column: string): WhereExpression;
    isNotNull(column: string): WhereExpression;
    like(column: string, value: any, escapeStr?: string): WhereExpression;
    exists(stmt: any): WhereExpression;
    in(column: string, stmt: SelectStatement): WhereExpression;
    in(column: string, ...values: any[]): WhereExpression;

    /**
     * Generates the appropriate relational operator (=, <>, <, <=, > or >=).
     * @param column column name or query result
     * @param value column value
     */
    eq(column: string | SelectStatement, value?: any): WhereBinary;
    equal(column: string | SelectStatement, value?: any): WhereBinary;
    notEq(column: string | SelectStatement, value?: any): WhereBinary;
    lt(column: string | SelectStatement, value?: any): WhereBinary;
    lte(column: string | SelectStatement, value?: any): WhereBinary;
    gt(column: string | SelectStatement, value?: any): WhereBinary;
    gte(column: string | SelectStatement, value?: any): WhereBinary;

    eqAll(column: string | SelectStatement, value?: any): WhereBinary;
    notEqAll(column: string | SelectStatement, value?: any): WhereBinary;
    ltAll(column: string | SelectStatement, value?: any): WhereBinary;
    lteAll(column: string | SelectStatement, value?: any): WhereBinary;
    gtAll(column: string | SelectStatement, value?: any): WhereBinary;
    gteAll(column: string | SelectStatement, value?: any): WhereBinary;

    eqAny(column: string | SelectStatement, value?: any): WhereBinary;
    notEqAny(column: string | SelectStatement, value?: any): WhereBinary;
    ltAny(column: string | SelectStatement, value?: any): WhereBinary;
    lteAny(column: string | SelectStatement, value?: any): WhereBinary;
    gtAny(column: string | SelectStatement, value?: any): WhereBinary;
    gteAny(column: string | SelectStatement, value?: any): WhereBinary;

    eqSome(column: string | SelectStatement, value?: any): WhereBinary;
    notEqSome(column: string | SelectStatement, value?: any): WhereBinary;
    ltSome(column: string | SelectStatement, value?: any): WhereBinary;
    lteSome(column: string | SelectStatement, value?: any): WhereBinary;
    gtSome(column: string | SelectStatement, value?: any): WhereBinary;
    gteSome(column: string | SelectStatement, value?: any): WhereBinary;
  }

  const SqlBricks: SqlBricksFn;
  export default SqlBricks;
}
