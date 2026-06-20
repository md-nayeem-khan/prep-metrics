
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Problem
 * 
 */
export type Problem = $Result.DefaultSelection<Prisma.$ProblemPayload>
/**
 * Model ProblemCompany
 * 
 */
export type ProblemCompany = $Result.DefaultSelection<Prisma.$ProblemCompanyPayload>
/**
 * Model ProblemTag
 * 
 */
export type ProblemTag = $Result.DefaultSelection<Prisma.$ProblemTagPayload>
/**
 * Model Pattern
 * 
 */
export type Pattern = $Result.DefaultSelection<Prisma.$PatternPayload>
/**
 * Model CompanyCard
 * 
 */
export type CompanyCard = $Result.DefaultSelection<Prisma.$CompanyCardPayload>
/**
 * Model ProblemPattern
 * 
 */
export type ProblemPattern = $Result.DefaultSelection<Prisma.$ProblemPatternPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Revision
 * 
 */
export type Revision = $Result.DefaultSelection<Prisma.$RevisionPayload>
/**
 * Model MockInterview
 * 
 */
export type MockInterview = $Result.DefaultSelection<Prisma.$MockInterviewPayload>
/**
 * Model DailyProgress
 * 
 */
export type DailyProgress = $Result.DefaultSelection<Prisma.$DailyProgressPayload>
/**
 * Model Goal
 * 
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>
/**
 * Model Milestone
 * 
 */
export type Milestone = $Result.DefaultSelection<Prisma.$MilestonePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Problems
 * const problems = await prisma.problem.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Problems
   * const problems = await prisma.problem.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.problem`: Exposes CRUD operations for the **Problem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Problems
    * const problems = await prisma.problem.findMany()
    * ```
    */
  get problem(): Prisma.ProblemDelegate<ExtArgs>;

  /**
   * `prisma.problemCompany`: Exposes CRUD operations for the **ProblemCompany** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemCompanies
    * const problemCompanies = await prisma.problemCompany.findMany()
    * ```
    */
  get problemCompany(): Prisma.ProblemCompanyDelegate<ExtArgs>;

  /**
   * `prisma.problemTag`: Exposes CRUD operations for the **ProblemTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemTags
    * const problemTags = await prisma.problemTag.findMany()
    * ```
    */
  get problemTag(): Prisma.ProblemTagDelegate<ExtArgs>;

  /**
   * `prisma.pattern`: Exposes CRUD operations for the **Pattern** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patterns
    * const patterns = await prisma.pattern.findMany()
    * ```
    */
  get pattern(): Prisma.PatternDelegate<ExtArgs>;

  /**
   * `prisma.companyCard`: Exposes CRUD operations for the **CompanyCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyCards
    * const companyCards = await prisma.companyCard.findMany()
    * ```
    */
  get companyCard(): Prisma.CompanyCardDelegate<ExtArgs>;

  /**
   * `prisma.problemPattern`: Exposes CRUD operations for the **ProblemPattern** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemPatterns
    * const problemPatterns = await prisma.problemPattern.findMany()
    * ```
    */
  get problemPattern(): Prisma.ProblemPatternDelegate<ExtArgs>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.revision`: Exposes CRUD operations for the **Revision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Revisions
    * const revisions = await prisma.revision.findMany()
    * ```
    */
  get revision(): Prisma.RevisionDelegate<ExtArgs>;

  /**
   * `prisma.mockInterview`: Exposes CRUD operations for the **MockInterview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MockInterviews
    * const mockInterviews = await prisma.mockInterview.findMany()
    * ```
    */
  get mockInterview(): Prisma.MockInterviewDelegate<ExtArgs>;

  /**
   * `prisma.dailyProgress`: Exposes CRUD operations for the **DailyProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyProgresses
    * const dailyProgresses = await prisma.dailyProgress.findMany()
    * ```
    */
  get dailyProgress(): Prisma.DailyProgressDelegate<ExtArgs>;

  /**
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs>;

  /**
   * `prisma.milestone`: Exposes CRUD operations for the **Milestone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Milestones
    * const milestones = await prisma.milestone.findMany()
    * ```
    */
  get milestone(): Prisma.MilestoneDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Problem: 'Problem',
    ProblemCompany: 'ProblemCompany',
    ProblemTag: 'ProblemTag',
    Pattern: 'Pattern',
    CompanyCard: 'CompanyCard',
    ProblemPattern: 'ProblemPattern',
    Submission: 'Submission',
    Session: 'Session',
    Revision: 'Revision',
    MockInterview: 'MockInterview',
    DailyProgress: 'DailyProgress',
    Goal: 'Goal',
    Milestone: 'Milestone'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "problem" | "problemCompany" | "problemTag" | "pattern" | "companyCard" | "problemPattern" | "submission" | "session" | "revision" | "mockInterview" | "dailyProgress" | "goal" | "milestone"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Problem: {
        payload: Prisma.$ProblemPayload<ExtArgs>
        fields: Prisma.ProblemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findFirst: {
            args: Prisma.ProblemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findMany: {
            args: Prisma.ProblemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          create: {
            args: Prisma.ProblemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          createMany: {
            args: Prisma.ProblemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          delete: {
            args: Prisma.ProblemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          update: {
            args: Prisma.ProblemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          deleteMany: {
            args: Prisma.ProblemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProblemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          aggregate: {
            args: Prisma.ProblemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblem>
          }
          groupBy: {
            args: Prisma.ProblemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemCountAggregateOutputType> | number
          }
        }
      }
      ProblemCompany: {
        payload: Prisma.$ProblemCompanyPayload<ExtArgs>
        fields: Prisma.ProblemCompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemCompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemCompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>
          }
          findFirst: {
            args: Prisma.ProblemCompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemCompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>
          }
          findMany: {
            args: Prisma.ProblemCompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>[]
          }
          create: {
            args: Prisma.ProblemCompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>
          }
          createMany: {
            args: Prisma.ProblemCompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemCompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>[]
          }
          delete: {
            args: Prisma.ProblemCompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>
          }
          update: {
            args: Prisma.ProblemCompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>
          }
          deleteMany: {
            args: Prisma.ProblemCompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemCompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProblemCompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemCompanyPayload>
          }
          aggregate: {
            args: Prisma.ProblemCompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemCompany>
          }
          groupBy: {
            args: Prisma.ProblemCompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemCompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemCompanyCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemCompanyCountAggregateOutputType> | number
          }
        }
      }
      ProblemTag: {
        payload: Prisma.$ProblemTagPayload<ExtArgs>
        fields: Prisma.ProblemTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>
          }
          findFirst: {
            args: Prisma.ProblemTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>
          }
          findMany: {
            args: Prisma.ProblemTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>[]
          }
          create: {
            args: Prisma.ProblemTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>
          }
          createMany: {
            args: Prisma.ProblemTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>[]
          }
          delete: {
            args: Prisma.ProblemTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>
          }
          update: {
            args: Prisma.ProblemTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>
          }
          deleteMany: {
            args: Prisma.ProblemTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProblemTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTagPayload>
          }
          aggregate: {
            args: Prisma.ProblemTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemTag>
          }
          groupBy: {
            args: Prisma.ProblemTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemTagCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemTagCountAggregateOutputType> | number
          }
        }
      }
      Pattern: {
        payload: Prisma.$PatternPayload<ExtArgs>
        fields: Prisma.PatternFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatternFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatternFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          findFirst: {
            args: Prisma.PatternFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatternFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          findMany: {
            args: Prisma.PatternFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>[]
          }
          create: {
            args: Prisma.PatternCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          createMany: {
            args: Prisma.PatternCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatternCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>[]
          }
          delete: {
            args: Prisma.PatternDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          update: {
            args: Prisma.PatternUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          deleteMany: {
            args: Prisma.PatternDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatternUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatternUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          aggregate: {
            args: Prisma.PatternAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePattern>
          }
          groupBy: {
            args: Prisma.PatternGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatternGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatternCountArgs<ExtArgs>
            result: $Utils.Optional<PatternCountAggregateOutputType> | number
          }
        }
      }
      CompanyCard: {
        payload: Prisma.$CompanyCardPayload<ExtArgs>
        fields: Prisma.CompanyCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>
          }
          findFirst: {
            args: Prisma.CompanyCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>
          }
          findMany: {
            args: Prisma.CompanyCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>[]
          }
          create: {
            args: Prisma.CompanyCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>
          }
          createMany: {
            args: Prisma.CompanyCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>[]
          }
          delete: {
            args: Prisma.CompanyCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>
          }
          update: {
            args: Prisma.CompanyCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>
          }
          deleteMany: {
            args: Prisma.CompanyCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCardPayload>
          }
          aggregate: {
            args: Prisma.CompanyCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyCard>
          }
          groupBy: {
            args: Prisma.CompanyCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCardCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCardCountAggregateOutputType> | number
          }
        }
      }
      ProblemPattern: {
        payload: Prisma.$ProblemPatternPayload<ExtArgs>
        fields: Prisma.ProblemPatternFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemPatternFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemPatternFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>
          }
          findFirst: {
            args: Prisma.ProblemPatternFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemPatternFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>
          }
          findMany: {
            args: Prisma.ProblemPatternFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>[]
          }
          create: {
            args: Prisma.ProblemPatternCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>
          }
          createMany: {
            args: Prisma.ProblemPatternCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemPatternCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>[]
          }
          delete: {
            args: Prisma.ProblemPatternDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>
          }
          update: {
            args: Prisma.ProblemPatternUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>
          }
          deleteMany: {
            args: Prisma.ProblemPatternDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemPatternUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProblemPatternUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPatternPayload>
          }
          aggregate: {
            args: Prisma.ProblemPatternAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemPattern>
          }
          groupBy: {
            args: Prisma.ProblemPatternGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemPatternGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemPatternCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemPatternCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Revision: {
        payload: Prisma.$RevisionPayload<ExtArgs>
        fields: Prisma.RevisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RevisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RevisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          findFirst: {
            args: Prisma.RevisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RevisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          findMany: {
            args: Prisma.RevisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>[]
          }
          create: {
            args: Prisma.RevisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          createMany: {
            args: Prisma.RevisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RevisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>[]
          }
          delete: {
            args: Prisma.RevisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          update: {
            args: Prisma.RevisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          deleteMany: {
            args: Prisma.RevisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RevisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RevisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          aggregate: {
            args: Prisma.RevisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRevision>
          }
          groupBy: {
            args: Prisma.RevisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RevisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RevisionCountArgs<ExtArgs>
            result: $Utils.Optional<RevisionCountAggregateOutputType> | number
          }
        }
      }
      MockInterview: {
        payload: Prisma.$MockInterviewPayload<ExtArgs>
        fields: Prisma.MockInterviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MockInterviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MockInterviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>
          }
          findFirst: {
            args: Prisma.MockInterviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MockInterviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>
          }
          findMany: {
            args: Prisma.MockInterviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>[]
          }
          create: {
            args: Prisma.MockInterviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>
          }
          createMany: {
            args: Prisma.MockInterviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MockInterviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>[]
          }
          delete: {
            args: Prisma.MockInterviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>
          }
          update: {
            args: Prisma.MockInterviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>
          }
          deleteMany: {
            args: Prisma.MockInterviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MockInterviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MockInterviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MockInterviewPayload>
          }
          aggregate: {
            args: Prisma.MockInterviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMockInterview>
          }
          groupBy: {
            args: Prisma.MockInterviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<MockInterviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.MockInterviewCountArgs<ExtArgs>
            result: $Utils.Optional<MockInterviewCountAggregateOutputType> | number
          }
        }
      }
      DailyProgress: {
        payload: Prisma.$DailyProgressPayload<ExtArgs>
        fields: Prisma.DailyProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          findFirst: {
            args: Prisma.DailyProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          findMany: {
            args: Prisma.DailyProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>[]
          }
          create: {
            args: Prisma.DailyProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          createMany: {
            args: Prisma.DailyProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>[]
          }
          delete: {
            args: Prisma.DailyProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          update: {
            args: Prisma.DailyProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          deleteMany: {
            args: Prisma.DailyProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          aggregate: {
            args: Prisma.DailyProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyProgress>
          }
          groupBy: {
            args: Prisma.DailyProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyProgressCountArgs<ExtArgs>
            result: $Utils.Optional<DailyProgressCountAggregateOutputType> | number
          }
        }
      }
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
      Milestone: {
        payload: Prisma.$MilestonePayload<ExtArgs>
        fields: Prisma.MilestoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MilestoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MilestoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findFirst: {
            args: Prisma.MilestoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MilestoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findMany: {
            args: Prisma.MilestoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          create: {
            args: Prisma.MilestoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          createMany: {
            args: Prisma.MilestoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MilestoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          delete: {
            args: Prisma.MilestoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          update: {
            args: Prisma.MilestoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          deleteMany: {
            args: Prisma.MilestoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MilestoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MilestoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          aggregate: {
            args: Prisma.MilestoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMilestone>
          }
          groupBy: {
            args: Prisma.MilestoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<MilestoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.MilestoneCountArgs<ExtArgs>
            result: $Utils.Optional<MilestoneCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProblemCountOutputType
   */

  export type ProblemCountOutputType = {
    tags: number
    companies: number
    patterns: number
    submissions: number
    sessions: number
    mockInterviews: number
  }

  export type ProblemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | ProblemCountOutputTypeCountTagsArgs
    companies?: boolean | ProblemCountOutputTypeCountCompaniesArgs
    patterns?: boolean | ProblemCountOutputTypeCountPatternsArgs
    submissions?: boolean | ProblemCountOutputTypeCountSubmissionsArgs
    sessions?: boolean | ProblemCountOutputTypeCountSessionsArgs
    mockInterviews?: boolean | ProblemCountOutputTypeCountMockInterviewsArgs
  }

  // Custom InputTypes
  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCountOutputType
     */
    select?: ProblemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemTagWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemCompanyWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountPatternsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemPatternWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountMockInterviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MockInterviewWhereInput
  }


  /**
   * Count Type PatternCountOutputType
   */

  export type PatternCountOutputType = {
    problems: number
  }

  export type PatternCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | PatternCountOutputTypeCountProblemsArgs
  }

  // Custom InputTypes
  /**
   * PatternCountOutputType without action
   */
  export type PatternCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternCountOutputType
     */
    select?: PatternCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatternCountOutputType without action
   */
  export type PatternCountOutputTypeCountProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemPatternWhereInput
  }


  /**
   * Count Type CompanyCardCountOutputType
   */

  export type CompanyCardCountOutputType = {
    problems: number
  }

  export type CompanyCardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | CompanyCardCountOutputTypeCountProblemsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCardCountOutputType without action
   */
  export type CompanyCardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCardCountOutputType
     */
    select?: CompanyCardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCardCountOutputType without action
   */
  export type CompanyCardCountOutputTypeCountProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemCompanyWhereInput
  }


  /**
   * Count Type SubmissionCountOutputType
   */

  export type SubmissionCountOutputType = {
    revisions: number
  }

  export type SubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    revisions?: boolean | SubmissionCountOutputTypeCountRevisionsArgs
  }

  // Custom InputTypes
  /**
   * SubmissionCountOutputType without action
   */
  export type SubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionCountOutputType
     */
    select?: SubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubmissionCountOutputType without action
   */
  export type SubmissionCountOutputTypeCountRevisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RevisionWhereInput
  }


  /**
   * Count Type GoalCountOutputType
   */

  export type GoalCountOutputType = {
    milestones: number
  }

  export type GoalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    milestones?: boolean | GoalCountOutputTypeCountMilestonesArgs
  }

  // Custom InputTypes
  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoalCountOutputType
     */
    select?: GoalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeCountMilestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Problem
   */

  export type AggregateProblem = {
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  export type ProblemAvgAggregateOutputType = {
    id: number | null
  }

  export type ProblemSumAggregateOutputType = {
    id: number | null
  }

  export type ProblemMinAggregateOutputType = {
    id: number | null
    platform: string | null
    problemId: string | null
    title: string | null
    difficulty: string | null
    url: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    source: string | null
  }

  export type ProblemMaxAggregateOutputType = {
    id: number | null
    platform: string | null
    problemId: string | null
    title: string | null
    difficulty: string | null
    url: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    source: string | null
  }

  export type ProblemCountAggregateOutputType = {
    id: number
    platform: number
    problemId: number
    title: number
    difficulty: number
    url: number
    notes: number
    createdAt: number
    updatedAt: number
    source: number
    _all: number
  }


  export type ProblemAvgAggregateInputType = {
    id?: true
  }

  export type ProblemSumAggregateInputType = {
    id?: true
  }

  export type ProblemMinAggregateInputType = {
    id?: true
    platform?: true
    problemId?: true
    title?: true
    difficulty?: true
    url?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    source?: true
  }

  export type ProblemMaxAggregateInputType = {
    id?: true
    platform?: true
    problemId?: true
    title?: true
    difficulty?: true
    url?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    source?: true
  }

  export type ProblemCountAggregateInputType = {
    id?: true
    platform?: true
    problemId?: true
    title?: true
    difficulty?: true
    url?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    source?: true
    _all?: true
  }

  export type ProblemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problem to aggregate.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Problems
    **/
    _count?: true | ProblemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemMaxAggregateInputType
  }

  export type GetProblemAggregateType<T extends ProblemAggregateArgs> = {
        [P in keyof T & keyof AggregateProblem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblem[P]>
      : GetScalarType<T[P], AggregateProblem[P]>
  }




  export type ProblemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByWithAggregationInput | ProblemOrderByWithAggregationInput[]
    by: ProblemScalarFieldEnum[] | ProblemScalarFieldEnum
    having?: ProblemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemCountAggregateInputType | true
    _avg?: ProblemAvgAggregateInputType
    _sum?: ProblemSumAggregateInputType
    _min?: ProblemMinAggregateInputType
    _max?: ProblemMaxAggregateInputType
  }

  export type ProblemGroupByOutputType = {
    id: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    source: string
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  type GetProblemGroupByPayload<T extends ProblemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemGroupByOutputType[P]>
        }
      >
    >


  export type ProblemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    problemId?: boolean
    title?: boolean
    difficulty?: boolean
    url?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean
    tags?: boolean | Problem$tagsArgs<ExtArgs>
    companies?: boolean | Problem$companiesArgs<ExtArgs>
    patterns?: boolean | Problem$patternsArgs<ExtArgs>
    submissions?: boolean | Problem$submissionsArgs<ExtArgs>
    sessions?: boolean | Problem$sessionsArgs<ExtArgs>
    mockInterviews?: boolean | Problem$mockInterviewsArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    problemId?: boolean
    title?: boolean
    difficulty?: boolean
    url?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectScalar = {
    id?: boolean
    platform?: boolean
    problemId?: boolean
    title?: boolean
    difficulty?: boolean
    url?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean
  }

  export type ProblemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Problem$tagsArgs<ExtArgs>
    companies?: boolean | Problem$companiesArgs<ExtArgs>
    patterns?: boolean | Problem$patternsArgs<ExtArgs>
    submissions?: boolean | Problem$submissionsArgs<ExtArgs>
    sessions?: boolean | Problem$sessionsArgs<ExtArgs>
    mockInterviews?: boolean | Problem$mockInterviewsArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProblemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProblemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Problem"
    objects: {
      tags: Prisma.$ProblemTagPayload<ExtArgs>[]
      companies: Prisma.$ProblemCompanyPayload<ExtArgs>[]
      patterns: Prisma.$ProblemPatternPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      mockInterviews: Prisma.$MockInterviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      platform: string
      problemId: string
      title: string
      difficulty: string
      url: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      source: string
    }, ExtArgs["result"]["problem"]>
    composites: {}
  }

  type ProblemGetPayload<S extends boolean | null | undefined | ProblemDefaultArgs> = $Result.GetResult<Prisma.$ProblemPayload, S>

  type ProblemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProblemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProblemCountAggregateInputType | true
    }

  export interface ProblemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Problem'], meta: { name: 'Problem' } }
    /**
     * Find zero or one Problem that matches the filter.
     * @param {ProblemFindUniqueArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemFindUniqueArgs>(args: SelectSubset<T, ProblemFindUniqueArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Problem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProblemFindUniqueOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Problem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemFindFirstArgs>(args?: SelectSubset<T, ProblemFindFirstArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Problem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Problems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Problems
     * const problems = await prisma.problem.findMany()
     * 
     * // Get first 10 Problems
     * const problems = await prisma.problem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemWithIdOnly = await prisma.problem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemFindManyArgs>(args?: SelectSubset<T, ProblemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Problem.
     * @param {ProblemCreateArgs} args - Arguments to create a Problem.
     * @example
     * // Create one Problem
     * const Problem = await prisma.problem.create({
     *   data: {
     *     // ... data to create a Problem
     *   }
     * })
     * 
     */
    create<T extends ProblemCreateArgs>(args: SelectSubset<T, ProblemCreateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Problems.
     * @param {ProblemCreateManyArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemCreateManyArgs>(args?: SelectSubset<T, ProblemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Problems and returns the data saved in the database.
     * @param {ProblemCreateManyAndReturnArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Problem.
     * @param {ProblemDeleteArgs} args - Arguments to delete one Problem.
     * @example
     * // Delete one Problem
     * const Problem = await prisma.problem.delete({
     *   where: {
     *     // ... filter to delete one Problem
     *   }
     * })
     * 
     */
    delete<T extends ProblemDeleteArgs>(args: SelectSubset<T, ProblemDeleteArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Problem.
     * @param {ProblemUpdateArgs} args - Arguments to update one Problem.
     * @example
     * // Update one Problem
     * const problem = await prisma.problem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemUpdateArgs>(args: SelectSubset<T, ProblemUpdateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Problems.
     * @param {ProblemDeleteManyArgs} args - Arguments to filter Problems to delete.
     * @example
     * // Delete a few Problems
     * const { count } = await prisma.problem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemDeleteManyArgs>(args?: SelectSubset<T, ProblemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemUpdateManyArgs>(args: SelectSubset<T, ProblemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Problem.
     * @param {ProblemUpsertArgs} args - Arguments to update or create a Problem.
     * @example
     * // Update or create a Problem
     * const problem = await prisma.problem.upsert({
     *   create: {
     *     // ... data to create a Problem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Problem we want to update
     *   }
     * })
     */
    upsert<T extends ProblemUpsertArgs>(args: SelectSubset<T, ProblemUpsertArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCountArgs} args - Arguments to filter Problems to count.
     * @example
     * // Count the number of Problems
     * const count = await prisma.problem.count({
     *   where: {
     *     // ... the filter for the Problems we want to count
     *   }
     * })
    **/
    count<T extends ProblemCountArgs>(
      args?: Subset<T, ProblemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemAggregateArgs>(args: Subset<T, ProblemAggregateArgs>): Prisma.PrismaPromise<GetProblemAggregateType<T>>

    /**
     * Group by Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemGroupByArgs['orderBy'] }
        : { orderBy?: ProblemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Problem model
   */
  readonly fields: ProblemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Problem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Problem$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "findMany"> | Null>
    companies<T extends Problem$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Problem$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findMany"> | Null>
    patterns<T extends Problem$patternsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$patternsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findMany"> | Null>
    submissions<T extends Problem$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends Problem$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    mockInterviews<T extends Problem$mockInterviewsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$mockInterviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Problem model
   */ 
  interface ProblemFieldRefs {
    readonly id: FieldRef<"Problem", 'Int'>
    readonly platform: FieldRef<"Problem", 'String'>
    readonly problemId: FieldRef<"Problem", 'String'>
    readonly title: FieldRef<"Problem", 'String'>
    readonly difficulty: FieldRef<"Problem", 'String'>
    readonly url: FieldRef<"Problem", 'String'>
    readonly notes: FieldRef<"Problem", 'String'>
    readonly createdAt: FieldRef<"Problem", 'DateTime'>
    readonly updatedAt: FieldRef<"Problem", 'DateTime'>
    readonly source: FieldRef<"Problem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Problem findUnique
   */
  export type ProblemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findUniqueOrThrow
   */
  export type ProblemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findFirst
   */
  export type ProblemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findFirstOrThrow
   */
  export type ProblemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findMany
   */
  export type ProblemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problems to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem create
   */
  export type ProblemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to create a Problem.
     */
    data: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
  }

  /**
   * Problem createMany
   */
  export type ProblemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
  }

  /**
   * Problem createManyAndReturn
   */
  export type ProblemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
  }

  /**
   * Problem update
   */
  export type ProblemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to update a Problem.
     */
    data: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
    /**
     * Choose, which Problem to update.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem updateMany
   */
  export type ProblemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
  }

  /**
   * Problem upsert
   */
  export type ProblemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The filter to search for the Problem to update in case it exists.
     */
    where: ProblemWhereUniqueInput
    /**
     * In case the Problem found by the `where` argument doesn't exist, create a new Problem with this data.
     */
    create: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
    /**
     * In case the Problem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
  }

  /**
   * Problem delete
   */
  export type ProblemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter which Problem to delete.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem deleteMany
   */
  export type ProblemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problems to delete
     */
    where?: ProblemWhereInput
  }

  /**
   * Problem.tags
   */
  export type Problem$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    where?: ProblemTagWhereInput
    orderBy?: ProblemTagOrderByWithRelationInput | ProblemTagOrderByWithRelationInput[]
    cursor?: ProblemTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemTagScalarFieldEnum | ProblemTagScalarFieldEnum[]
  }

  /**
   * Problem.companies
   */
  export type Problem$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    where?: ProblemCompanyWhereInput
    orderBy?: ProblemCompanyOrderByWithRelationInput | ProblemCompanyOrderByWithRelationInput[]
    cursor?: ProblemCompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemCompanyScalarFieldEnum | ProblemCompanyScalarFieldEnum[]
  }

  /**
   * Problem.patterns
   */
  export type Problem$patternsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    where?: ProblemPatternWhereInput
    orderBy?: ProblemPatternOrderByWithRelationInput | ProblemPatternOrderByWithRelationInput[]
    cursor?: ProblemPatternWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemPatternScalarFieldEnum | ProblemPatternScalarFieldEnum[]
  }

  /**
   * Problem.submissions
   */
  export type Problem$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Problem.sessions
   */
  export type Problem$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Problem.mockInterviews
   */
  export type Problem$mockInterviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    where?: MockInterviewWhereInput
    orderBy?: MockInterviewOrderByWithRelationInput | MockInterviewOrderByWithRelationInput[]
    cursor?: MockInterviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MockInterviewScalarFieldEnum | MockInterviewScalarFieldEnum[]
  }

  /**
   * Problem without action
   */
  export type ProblemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
  }


  /**
   * Model ProblemCompany
   */

  export type AggregateProblemCompany = {
    _count: ProblemCompanyCountAggregateOutputType | null
    _avg: ProblemCompanyAvgAggregateOutputType | null
    _sum: ProblemCompanySumAggregateOutputType | null
    _min: ProblemCompanyMinAggregateOutputType | null
    _max: ProblemCompanyMaxAggregateOutputType | null
  }

  export type ProblemCompanyAvgAggregateOutputType = {
    id: number | null
    problemId: number | null
    companyId: number | null
  }

  export type ProblemCompanySumAggregateOutputType = {
    id: number | null
    problemId: number | null
    companyId: number | null
  }

  export type ProblemCompanyMinAggregateOutputType = {
    id: number | null
    problemId: number | null
    companyId: number | null
  }

  export type ProblemCompanyMaxAggregateOutputType = {
    id: number | null
    problemId: number | null
    companyId: number | null
  }

  export type ProblemCompanyCountAggregateOutputType = {
    id: number
    problemId: number
    companyId: number
    _all: number
  }


  export type ProblemCompanyAvgAggregateInputType = {
    id?: true
    problemId?: true
    companyId?: true
  }

  export type ProblemCompanySumAggregateInputType = {
    id?: true
    problemId?: true
    companyId?: true
  }

  export type ProblemCompanyMinAggregateInputType = {
    id?: true
    problemId?: true
    companyId?: true
  }

  export type ProblemCompanyMaxAggregateInputType = {
    id?: true
    problemId?: true
    companyId?: true
  }

  export type ProblemCompanyCountAggregateInputType = {
    id?: true
    problemId?: true
    companyId?: true
    _all?: true
  }

  export type ProblemCompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemCompany to aggregate.
     */
    where?: ProblemCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemCompanies to fetch.
     */
    orderBy?: ProblemCompanyOrderByWithRelationInput | ProblemCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemCompanies
    **/
    _count?: true | ProblemCompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemCompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemCompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemCompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemCompanyMaxAggregateInputType
  }

  export type GetProblemCompanyAggregateType<T extends ProblemCompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemCompany[P]>
      : GetScalarType<T[P], AggregateProblemCompany[P]>
  }




  export type ProblemCompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemCompanyWhereInput
    orderBy?: ProblemCompanyOrderByWithAggregationInput | ProblemCompanyOrderByWithAggregationInput[]
    by: ProblemCompanyScalarFieldEnum[] | ProblemCompanyScalarFieldEnum
    having?: ProblemCompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemCompanyCountAggregateInputType | true
    _avg?: ProblemCompanyAvgAggregateInputType
    _sum?: ProblemCompanySumAggregateInputType
    _min?: ProblemCompanyMinAggregateInputType
    _max?: ProblemCompanyMaxAggregateInputType
  }

  export type ProblemCompanyGroupByOutputType = {
    id: number
    problemId: number
    companyId: number
    _count: ProblemCompanyCountAggregateOutputType | null
    _avg: ProblemCompanyAvgAggregateOutputType | null
    _sum: ProblemCompanySumAggregateOutputType | null
    _min: ProblemCompanyMinAggregateOutputType | null
    _max: ProblemCompanyMaxAggregateOutputType | null
  }

  type GetProblemCompanyGroupByPayload<T extends ProblemCompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemCompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemCompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemCompanyGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemCompanyGroupByOutputType[P]>
        }
      >
    >


  export type ProblemCompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    companyId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    company?: boolean | CompanyCardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemCompany"]>

  export type ProblemCompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    companyId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    company?: boolean | CompanyCardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemCompany"]>

  export type ProblemCompanySelectScalar = {
    id?: boolean
    problemId?: boolean
    companyId?: boolean
  }

  export type ProblemCompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    company?: boolean | CompanyCardDefaultArgs<ExtArgs>
  }
  export type ProblemCompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    company?: boolean | CompanyCardDefaultArgs<ExtArgs>
  }

  export type $ProblemCompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemCompany"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
      company: Prisma.$CompanyCardPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      problemId: number
      companyId: number
    }, ExtArgs["result"]["problemCompany"]>
    composites: {}
  }

  type ProblemCompanyGetPayload<S extends boolean | null | undefined | ProblemCompanyDefaultArgs> = $Result.GetResult<Prisma.$ProblemCompanyPayload, S>

  type ProblemCompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProblemCompanyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProblemCompanyCountAggregateInputType | true
    }

  export interface ProblemCompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemCompany'], meta: { name: 'ProblemCompany' } }
    /**
     * Find zero or one ProblemCompany that matches the filter.
     * @param {ProblemCompanyFindUniqueArgs} args - Arguments to find a ProblemCompany
     * @example
     * // Get one ProblemCompany
     * const problemCompany = await prisma.problemCompany.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemCompanyFindUniqueArgs>(args: SelectSubset<T, ProblemCompanyFindUniqueArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProblemCompany that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProblemCompanyFindUniqueOrThrowArgs} args - Arguments to find a ProblemCompany
     * @example
     * // Get one ProblemCompany
     * const problemCompany = await prisma.problemCompany.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemCompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemCompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProblemCompany that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyFindFirstArgs} args - Arguments to find a ProblemCompany
     * @example
     * // Get one ProblemCompany
     * const problemCompany = await prisma.problemCompany.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemCompanyFindFirstArgs>(args?: SelectSubset<T, ProblemCompanyFindFirstArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProblemCompany that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyFindFirstOrThrowArgs} args - Arguments to find a ProblemCompany
     * @example
     * // Get one ProblemCompany
     * const problemCompany = await prisma.problemCompany.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemCompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemCompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProblemCompanies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemCompanies
     * const problemCompanies = await prisma.problemCompany.findMany()
     * 
     * // Get first 10 ProblemCompanies
     * const problemCompanies = await prisma.problemCompany.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemCompanyWithIdOnly = await prisma.problemCompany.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemCompanyFindManyArgs>(args?: SelectSubset<T, ProblemCompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProblemCompany.
     * @param {ProblemCompanyCreateArgs} args - Arguments to create a ProblemCompany.
     * @example
     * // Create one ProblemCompany
     * const ProblemCompany = await prisma.problemCompany.create({
     *   data: {
     *     // ... data to create a ProblemCompany
     *   }
     * })
     * 
     */
    create<T extends ProblemCompanyCreateArgs>(args: SelectSubset<T, ProblemCompanyCreateArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProblemCompanies.
     * @param {ProblemCompanyCreateManyArgs} args - Arguments to create many ProblemCompanies.
     * @example
     * // Create many ProblemCompanies
     * const problemCompany = await prisma.problemCompany.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemCompanyCreateManyArgs>(args?: SelectSubset<T, ProblemCompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProblemCompanies and returns the data saved in the database.
     * @param {ProblemCompanyCreateManyAndReturnArgs} args - Arguments to create many ProblemCompanies.
     * @example
     * // Create many ProblemCompanies
     * const problemCompany = await prisma.problemCompany.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProblemCompanies and only return the `id`
     * const problemCompanyWithIdOnly = await prisma.problemCompany.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemCompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemCompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProblemCompany.
     * @param {ProblemCompanyDeleteArgs} args - Arguments to delete one ProblemCompany.
     * @example
     * // Delete one ProblemCompany
     * const ProblemCompany = await prisma.problemCompany.delete({
     *   where: {
     *     // ... filter to delete one ProblemCompany
     *   }
     * })
     * 
     */
    delete<T extends ProblemCompanyDeleteArgs>(args: SelectSubset<T, ProblemCompanyDeleteArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProblemCompany.
     * @param {ProblemCompanyUpdateArgs} args - Arguments to update one ProblemCompany.
     * @example
     * // Update one ProblemCompany
     * const problemCompany = await prisma.problemCompany.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemCompanyUpdateArgs>(args: SelectSubset<T, ProblemCompanyUpdateArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProblemCompanies.
     * @param {ProblemCompanyDeleteManyArgs} args - Arguments to filter ProblemCompanies to delete.
     * @example
     * // Delete a few ProblemCompanies
     * const { count } = await prisma.problemCompany.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemCompanyDeleteManyArgs>(args?: SelectSubset<T, ProblemCompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemCompanies
     * const problemCompany = await prisma.problemCompany.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemCompanyUpdateManyArgs>(args: SelectSubset<T, ProblemCompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProblemCompany.
     * @param {ProblemCompanyUpsertArgs} args - Arguments to update or create a ProblemCompany.
     * @example
     * // Update or create a ProblemCompany
     * const problemCompany = await prisma.problemCompany.upsert({
     *   create: {
     *     // ... data to create a ProblemCompany
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemCompany we want to update
     *   }
     * })
     */
    upsert<T extends ProblemCompanyUpsertArgs>(args: SelectSubset<T, ProblemCompanyUpsertArgs<ExtArgs>>): Prisma__ProblemCompanyClient<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProblemCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyCountArgs} args - Arguments to filter ProblemCompanies to count.
     * @example
     * // Count the number of ProblemCompanies
     * const count = await prisma.problemCompany.count({
     *   where: {
     *     // ... the filter for the ProblemCompanies we want to count
     *   }
     * })
    **/
    count<T extends ProblemCompanyCountArgs>(
      args?: Subset<T, ProblemCompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemCompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemCompanyAggregateArgs>(args: Subset<T, ProblemCompanyAggregateArgs>): Prisma.PrismaPromise<GetProblemCompanyAggregateType<T>>

    /**
     * Group by ProblemCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemCompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemCompanyGroupByArgs['orderBy'] }
        : { orderBy?: ProblemCompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemCompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemCompany model
   */
  readonly fields: ProblemCompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemCompany.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemCompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    company<T extends CompanyCardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyCardDefaultArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemCompany model
   */ 
  interface ProblemCompanyFieldRefs {
    readonly id: FieldRef<"ProblemCompany", 'Int'>
    readonly problemId: FieldRef<"ProblemCompany", 'Int'>
    readonly companyId: FieldRef<"ProblemCompany", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProblemCompany findUnique
   */
  export type ProblemCompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProblemCompany to fetch.
     */
    where: ProblemCompanyWhereUniqueInput
  }

  /**
   * ProblemCompany findUniqueOrThrow
   */
  export type ProblemCompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProblemCompany to fetch.
     */
    where: ProblemCompanyWhereUniqueInput
  }

  /**
   * ProblemCompany findFirst
   */
  export type ProblemCompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProblemCompany to fetch.
     */
    where?: ProblemCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemCompanies to fetch.
     */
    orderBy?: ProblemCompanyOrderByWithRelationInput | ProblemCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemCompanies.
     */
    cursor?: ProblemCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemCompanies.
     */
    distinct?: ProblemCompanyScalarFieldEnum | ProblemCompanyScalarFieldEnum[]
  }

  /**
   * ProblemCompany findFirstOrThrow
   */
  export type ProblemCompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProblemCompany to fetch.
     */
    where?: ProblemCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemCompanies to fetch.
     */
    orderBy?: ProblemCompanyOrderByWithRelationInput | ProblemCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemCompanies.
     */
    cursor?: ProblemCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemCompanies.
     */
    distinct?: ProblemCompanyScalarFieldEnum | ProblemCompanyScalarFieldEnum[]
  }

  /**
   * ProblemCompany findMany
   */
  export type ProblemCompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProblemCompanies to fetch.
     */
    where?: ProblemCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemCompanies to fetch.
     */
    orderBy?: ProblemCompanyOrderByWithRelationInput | ProblemCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemCompanies.
     */
    cursor?: ProblemCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemCompanies.
     */
    skip?: number
    distinct?: ProblemCompanyScalarFieldEnum | ProblemCompanyScalarFieldEnum[]
  }

  /**
   * ProblemCompany create
   */
  export type ProblemCompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a ProblemCompany.
     */
    data: XOR<ProblemCompanyCreateInput, ProblemCompanyUncheckedCreateInput>
  }

  /**
   * ProblemCompany createMany
   */
  export type ProblemCompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemCompanies.
     */
    data: ProblemCompanyCreateManyInput | ProblemCompanyCreateManyInput[]
  }

  /**
   * ProblemCompany createManyAndReturn
   */
  export type ProblemCompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProblemCompanies.
     */
    data: ProblemCompanyCreateManyInput | ProblemCompanyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemCompany update
   */
  export type ProblemCompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a ProblemCompany.
     */
    data: XOR<ProblemCompanyUpdateInput, ProblemCompanyUncheckedUpdateInput>
    /**
     * Choose, which ProblemCompany to update.
     */
    where: ProblemCompanyWhereUniqueInput
  }

  /**
   * ProblemCompany updateMany
   */
  export type ProblemCompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemCompanies.
     */
    data: XOR<ProblemCompanyUpdateManyMutationInput, ProblemCompanyUncheckedUpdateManyInput>
    /**
     * Filter which ProblemCompanies to update
     */
    where?: ProblemCompanyWhereInput
  }

  /**
   * ProblemCompany upsert
   */
  export type ProblemCompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the ProblemCompany to update in case it exists.
     */
    where: ProblemCompanyWhereUniqueInput
    /**
     * In case the ProblemCompany found by the `where` argument doesn't exist, create a new ProblemCompany with this data.
     */
    create: XOR<ProblemCompanyCreateInput, ProblemCompanyUncheckedCreateInput>
    /**
     * In case the ProblemCompany was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemCompanyUpdateInput, ProblemCompanyUncheckedUpdateInput>
  }

  /**
   * ProblemCompany delete
   */
  export type ProblemCompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    /**
     * Filter which ProblemCompany to delete.
     */
    where: ProblemCompanyWhereUniqueInput
  }

  /**
   * ProblemCompany deleteMany
   */
  export type ProblemCompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemCompanies to delete
     */
    where?: ProblemCompanyWhereInput
  }

  /**
   * ProblemCompany without action
   */
  export type ProblemCompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
  }


  /**
   * Model ProblemTag
   */

  export type AggregateProblemTag = {
    _count: ProblemTagCountAggregateOutputType | null
    _avg: ProblemTagAvgAggregateOutputType | null
    _sum: ProblemTagSumAggregateOutputType | null
    _min: ProblemTagMinAggregateOutputType | null
    _max: ProblemTagMaxAggregateOutputType | null
  }

  export type ProblemTagAvgAggregateOutputType = {
    id: number | null
    problemId: number | null
  }

  export type ProblemTagSumAggregateOutputType = {
    id: number | null
    problemId: number | null
  }

  export type ProblemTagMinAggregateOutputType = {
    id: number | null
    problemId: number | null
    tag: string | null
  }

  export type ProblemTagMaxAggregateOutputType = {
    id: number | null
    problemId: number | null
    tag: string | null
  }

  export type ProblemTagCountAggregateOutputType = {
    id: number
    problemId: number
    tag: number
    _all: number
  }


  export type ProblemTagAvgAggregateInputType = {
    id?: true
    problemId?: true
  }

  export type ProblemTagSumAggregateInputType = {
    id?: true
    problemId?: true
  }

  export type ProblemTagMinAggregateInputType = {
    id?: true
    problemId?: true
    tag?: true
  }

  export type ProblemTagMaxAggregateInputType = {
    id?: true
    problemId?: true
    tag?: true
  }

  export type ProblemTagCountAggregateInputType = {
    id?: true
    problemId?: true
    tag?: true
    _all?: true
  }

  export type ProblemTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemTag to aggregate.
     */
    where?: ProblemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTags to fetch.
     */
    orderBy?: ProblemTagOrderByWithRelationInput | ProblemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemTags
    **/
    _count?: true | ProblemTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemTagMaxAggregateInputType
  }

  export type GetProblemTagAggregateType<T extends ProblemTagAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemTag[P]>
      : GetScalarType<T[P], AggregateProblemTag[P]>
  }




  export type ProblemTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemTagWhereInput
    orderBy?: ProblemTagOrderByWithAggregationInput | ProblemTagOrderByWithAggregationInput[]
    by: ProblemTagScalarFieldEnum[] | ProblemTagScalarFieldEnum
    having?: ProblemTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemTagCountAggregateInputType | true
    _avg?: ProblemTagAvgAggregateInputType
    _sum?: ProblemTagSumAggregateInputType
    _min?: ProblemTagMinAggregateInputType
    _max?: ProblemTagMaxAggregateInputType
  }

  export type ProblemTagGroupByOutputType = {
    id: number
    problemId: number
    tag: string
    _count: ProblemTagCountAggregateOutputType | null
    _avg: ProblemTagAvgAggregateOutputType | null
    _sum: ProblemTagSumAggregateOutputType | null
    _min: ProblemTagMinAggregateOutputType | null
    _max: ProblemTagMaxAggregateOutputType | null
  }

  type GetProblemTagGroupByPayload<T extends ProblemTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemTagGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemTagGroupByOutputType[P]>
        }
      >
    >


  export type ProblemTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    tag?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemTag"]>

  export type ProblemTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    tag?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemTag"]>

  export type ProblemTagSelectScalar = {
    id?: boolean
    problemId?: boolean
    tag?: boolean
  }

  export type ProblemTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type ProblemTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $ProblemTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemTag"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      problemId: number
      tag: string
    }, ExtArgs["result"]["problemTag"]>
    composites: {}
  }

  type ProblemTagGetPayload<S extends boolean | null | undefined | ProblemTagDefaultArgs> = $Result.GetResult<Prisma.$ProblemTagPayload, S>

  type ProblemTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProblemTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProblemTagCountAggregateInputType | true
    }

  export interface ProblemTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemTag'], meta: { name: 'ProblemTag' } }
    /**
     * Find zero or one ProblemTag that matches the filter.
     * @param {ProblemTagFindUniqueArgs} args - Arguments to find a ProblemTag
     * @example
     * // Get one ProblemTag
     * const problemTag = await prisma.problemTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemTagFindUniqueArgs>(args: SelectSubset<T, ProblemTagFindUniqueArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProblemTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProblemTagFindUniqueOrThrowArgs} args - Arguments to find a ProblemTag
     * @example
     * // Get one ProblemTag
     * const problemTag = await prisma.problemTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProblemTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagFindFirstArgs} args - Arguments to find a ProblemTag
     * @example
     * // Get one ProblemTag
     * const problemTag = await prisma.problemTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemTagFindFirstArgs>(args?: SelectSubset<T, ProblemTagFindFirstArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProblemTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagFindFirstOrThrowArgs} args - Arguments to find a ProblemTag
     * @example
     * // Get one ProblemTag
     * const problemTag = await prisma.problemTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProblemTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemTags
     * const problemTags = await prisma.problemTag.findMany()
     * 
     * // Get first 10 ProblemTags
     * const problemTags = await prisma.problemTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemTagWithIdOnly = await prisma.problemTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemTagFindManyArgs>(args?: SelectSubset<T, ProblemTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProblemTag.
     * @param {ProblemTagCreateArgs} args - Arguments to create a ProblemTag.
     * @example
     * // Create one ProblemTag
     * const ProblemTag = await prisma.problemTag.create({
     *   data: {
     *     // ... data to create a ProblemTag
     *   }
     * })
     * 
     */
    create<T extends ProblemTagCreateArgs>(args: SelectSubset<T, ProblemTagCreateArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProblemTags.
     * @param {ProblemTagCreateManyArgs} args - Arguments to create many ProblemTags.
     * @example
     * // Create many ProblemTags
     * const problemTag = await prisma.problemTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemTagCreateManyArgs>(args?: SelectSubset<T, ProblemTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProblemTags and returns the data saved in the database.
     * @param {ProblemTagCreateManyAndReturnArgs} args - Arguments to create many ProblemTags.
     * @example
     * // Create many ProblemTags
     * const problemTag = await prisma.problemTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProblemTags and only return the `id`
     * const problemTagWithIdOnly = await prisma.problemTag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemTagCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProblemTag.
     * @param {ProblemTagDeleteArgs} args - Arguments to delete one ProblemTag.
     * @example
     * // Delete one ProblemTag
     * const ProblemTag = await prisma.problemTag.delete({
     *   where: {
     *     // ... filter to delete one ProblemTag
     *   }
     * })
     * 
     */
    delete<T extends ProblemTagDeleteArgs>(args: SelectSubset<T, ProblemTagDeleteArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProblemTag.
     * @param {ProblemTagUpdateArgs} args - Arguments to update one ProblemTag.
     * @example
     * // Update one ProblemTag
     * const problemTag = await prisma.problemTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemTagUpdateArgs>(args: SelectSubset<T, ProblemTagUpdateArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProblemTags.
     * @param {ProblemTagDeleteManyArgs} args - Arguments to filter ProblemTags to delete.
     * @example
     * // Delete a few ProblemTags
     * const { count } = await prisma.problemTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemTagDeleteManyArgs>(args?: SelectSubset<T, ProblemTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemTags
     * const problemTag = await prisma.problemTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemTagUpdateManyArgs>(args: SelectSubset<T, ProblemTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProblemTag.
     * @param {ProblemTagUpsertArgs} args - Arguments to update or create a ProblemTag.
     * @example
     * // Update or create a ProblemTag
     * const problemTag = await prisma.problemTag.upsert({
     *   create: {
     *     // ... data to create a ProblemTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemTag we want to update
     *   }
     * })
     */
    upsert<T extends ProblemTagUpsertArgs>(args: SelectSubset<T, ProblemTagUpsertArgs<ExtArgs>>): Prisma__ProblemTagClient<$Result.GetResult<Prisma.$ProblemTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProblemTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagCountArgs} args - Arguments to filter ProblemTags to count.
     * @example
     * // Count the number of ProblemTags
     * const count = await prisma.problemTag.count({
     *   where: {
     *     // ... the filter for the ProblemTags we want to count
     *   }
     * })
    **/
    count<T extends ProblemTagCountArgs>(
      args?: Subset<T, ProblemTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemTagAggregateArgs>(args: Subset<T, ProblemTagAggregateArgs>): Prisma.PrismaPromise<GetProblemTagAggregateType<T>>

    /**
     * Group by ProblemTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemTagGroupByArgs['orderBy'] }
        : { orderBy?: ProblemTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemTag model
   */
  readonly fields: ProblemTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemTag model
   */ 
  interface ProblemTagFieldRefs {
    readonly id: FieldRef<"ProblemTag", 'Int'>
    readonly problemId: FieldRef<"ProblemTag", 'Int'>
    readonly tag: FieldRef<"ProblemTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProblemTag findUnique
   */
  export type ProblemTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * Filter, which ProblemTag to fetch.
     */
    where: ProblemTagWhereUniqueInput
  }

  /**
   * ProblemTag findUniqueOrThrow
   */
  export type ProblemTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * Filter, which ProblemTag to fetch.
     */
    where: ProblemTagWhereUniqueInput
  }

  /**
   * ProblemTag findFirst
   */
  export type ProblemTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * Filter, which ProblemTag to fetch.
     */
    where?: ProblemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTags to fetch.
     */
    orderBy?: ProblemTagOrderByWithRelationInput | ProblemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemTags.
     */
    cursor?: ProblemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemTags.
     */
    distinct?: ProblemTagScalarFieldEnum | ProblemTagScalarFieldEnum[]
  }

  /**
   * ProblemTag findFirstOrThrow
   */
  export type ProblemTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * Filter, which ProblemTag to fetch.
     */
    where?: ProblemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTags to fetch.
     */
    orderBy?: ProblemTagOrderByWithRelationInput | ProblemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemTags.
     */
    cursor?: ProblemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemTags.
     */
    distinct?: ProblemTagScalarFieldEnum | ProblemTagScalarFieldEnum[]
  }

  /**
   * ProblemTag findMany
   */
  export type ProblemTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * Filter, which ProblemTags to fetch.
     */
    where?: ProblemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTags to fetch.
     */
    orderBy?: ProblemTagOrderByWithRelationInput | ProblemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemTags.
     */
    cursor?: ProblemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTags.
     */
    skip?: number
    distinct?: ProblemTagScalarFieldEnum | ProblemTagScalarFieldEnum[]
  }

  /**
   * ProblemTag create
   */
  export type ProblemTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ProblemTag.
     */
    data: XOR<ProblemTagCreateInput, ProblemTagUncheckedCreateInput>
  }

  /**
   * ProblemTag createMany
   */
  export type ProblemTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemTags.
     */
    data: ProblemTagCreateManyInput | ProblemTagCreateManyInput[]
  }

  /**
   * ProblemTag createManyAndReturn
   */
  export type ProblemTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProblemTags.
     */
    data: ProblemTagCreateManyInput | ProblemTagCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemTag update
   */
  export type ProblemTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ProblemTag.
     */
    data: XOR<ProblemTagUpdateInput, ProblemTagUncheckedUpdateInput>
    /**
     * Choose, which ProblemTag to update.
     */
    where: ProblemTagWhereUniqueInput
  }

  /**
   * ProblemTag updateMany
   */
  export type ProblemTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemTags.
     */
    data: XOR<ProblemTagUpdateManyMutationInput, ProblemTagUncheckedUpdateManyInput>
    /**
     * Filter which ProblemTags to update
     */
    where?: ProblemTagWhereInput
  }

  /**
   * ProblemTag upsert
   */
  export type ProblemTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ProblemTag to update in case it exists.
     */
    where: ProblemTagWhereUniqueInput
    /**
     * In case the ProblemTag found by the `where` argument doesn't exist, create a new ProblemTag with this data.
     */
    create: XOR<ProblemTagCreateInput, ProblemTagUncheckedCreateInput>
    /**
     * In case the ProblemTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemTagUpdateInput, ProblemTagUncheckedUpdateInput>
  }

  /**
   * ProblemTag delete
   */
  export type ProblemTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
    /**
     * Filter which ProblemTag to delete.
     */
    where: ProblemTagWhereUniqueInput
  }

  /**
   * ProblemTag deleteMany
   */
  export type ProblemTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemTags to delete
     */
    where?: ProblemTagWhereInput
  }

  /**
   * ProblemTag without action
   */
  export type ProblemTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemTag
     */
    select?: ProblemTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemTagInclude<ExtArgs> | null
  }


  /**
   * Model Pattern
   */

  export type AggregatePattern = {
    _count: PatternCountAggregateOutputType | null
    _avg: PatternAvgAggregateOutputType | null
    _sum: PatternSumAggregateOutputType | null
    _min: PatternMinAggregateOutputType | null
    _max: PatternMaxAggregateOutputType | null
  }

  export type PatternAvgAggregateOutputType = {
    id: number | null
  }

  export type PatternSumAggregateOutputType = {
    id: number | null
  }

  export type PatternMinAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
    description: string | null
  }

  export type PatternMaxAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
    description: string | null
  }

  export type PatternCountAggregateOutputType = {
    id: number
    name: number
    category: number
    description: number
    _all: number
  }


  export type PatternAvgAggregateInputType = {
    id?: true
  }

  export type PatternSumAggregateInputType = {
    id?: true
  }

  export type PatternMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
  }

  export type PatternMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
  }

  export type PatternCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    _all?: true
  }

  export type PatternAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pattern to aggregate.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patterns
    **/
    _count?: true | PatternCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatternAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatternSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatternMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatternMaxAggregateInputType
  }

  export type GetPatternAggregateType<T extends PatternAggregateArgs> = {
        [P in keyof T & keyof AggregatePattern]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePattern[P]>
      : GetScalarType<T[P], AggregatePattern[P]>
  }




  export type PatternGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatternWhereInput
    orderBy?: PatternOrderByWithAggregationInput | PatternOrderByWithAggregationInput[]
    by: PatternScalarFieldEnum[] | PatternScalarFieldEnum
    having?: PatternScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatternCountAggregateInputType | true
    _avg?: PatternAvgAggregateInputType
    _sum?: PatternSumAggregateInputType
    _min?: PatternMinAggregateInputType
    _max?: PatternMaxAggregateInputType
  }

  export type PatternGroupByOutputType = {
    id: number
    name: string
    category: string
    description: string | null
    _count: PatternCountAggregateOutputType | null
    _avg: PatternAvgAggregateOutputType | null
    _sum: PatternSumAggregateOutputType | null
    _min: PatternMinAggregateOutputType | null
    _max: PatternMaxAggregateOutputType | null
  }

  type GetPatternGroupByPayload<T extends PatternGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatternGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatternGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatternGroupByOutputType[P]>
            : GetScalarType<T[P], PatternGroupByOutputType[P]>
        }
      >
    >


  export type PatternSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    problems?: boolean | Pattern$problemsArgs<ExtArgs>
    _count?: boolean | PatternCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pattern"]>

  export type PatternSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
  }, ExtArgs["result"]["pattern"]>

  export type PatternSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
  }

  export type PatternInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | Pattern$problemsArgs<ExtArgs>
    _count?: boolean | PatternCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatternIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatternPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pattern"
    objects: {
      problems: Prisma.$ProblemPatternPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      category: string
      description: string | null
    }, ExtArgs["result"]["pattern"]>
    composites: {}
  }

  type PatternGetPayload<S extends boolean | null | undefined | PatternDefaultArgs> = $Result.GetResult<Prisma.$PatternPayload, S>

  type PatternCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatternFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatternCountAggregateInputType | true
    }

  export interface PatternDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pattern'], meta: { name: 'Pattern' } }
    /**
     * Find zero or one Pattern that matches the filter.
     * @param {PatternFindUniqueArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatternFindUniqueArgs>(args: SelectSubset<T, PatternFindUniqueArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pattern that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatternFindUniqueOrThrowArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatternFindUniqueOrThrowArgs>(args: SelectSubset<T, PatternFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pattern that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternFindFirstArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatternFindFirstArgs>(args?: SelectSubset<T, PatternFindFirstArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pattern that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternFindFirstOrThrowArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatternFindFirstOrThrowArgs>(args?: SelectSubset<T, PatternFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patterns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patterns
     * const patterns = await prisma.pattern.findMany()
     * 
     * // Get first 10 Patterns
     * const patterns = await prisma.pattern.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patternWithIdOnly = await prisma.pattern.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatternFindManyArgs>(args?: SelectSubset<T, PatternFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pattern.
     * @param {PatternCreateArgs} args - Arguments to create a Pattern.
     * @example
     * // Create one Pattern
     * const Pattern = await prisma.pattern.create({
     *   data: {
     *     // ... data to create a Pattern
     *   }
     * })
     * 
     */
    create<T extends PatternCreateArgs>(args: SelectSubset<T, PatternCreateArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patterns.
     * @param {PatternCreateManyArgs} args - Arguments to create many Patterns.
     * @example
     * // Create many Patterns
     * const pattern = await prisma.pattern.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatternCreateManyArgs>(args?: SelectSubset<T, PatternCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patterns and returns the data saved in the database.
     * @param {PatternCreateManyAndReturnArgs} args - Arguments to create many Patterns.
     * @example
     * // Create many Patterns
     * const pattern = await prisma.pattern.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patterns and only return the `id`
     * const patternWithIdOnly = await prisma.pattern.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatternCreateManyAndReturnArgs>(args?: SelectSubset<T, PatternCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pattern.
     * @param {PatternDeleteArgs} args - Arguments to delete one Pattern.
     * @example
     * // Delete one Pattern
     * const Pattern = await prisma.pattern.delete({
     *   where: {
     *     // ... filter to delete one Pattern
     *   }
     * })
     * 
     */
    delete<T extends PatternDeleteArgs>(args: SelectSubset<T, PatternDeleteArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pattern.
     * @param {PatternUpdateArgs} args - Arguments to update one Pattern.
     * @example
     * // Update one Pattern
     * const pattern = await prisma.pattern.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatternUpdateArgs>(args: SelectSubset<T, PatternUpdateArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patterns.
     * @param {PatternDeleteManyArgs} args - Arguments to filter Patterns to delete.
     * @example
     * // Delete a few Patterns
     * const { count } = await prisma.pattern.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatternDeleteManyArgs>(args?: SelectSubset<T, PatternDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patterns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patterns
     * const pattern = await prisma.pattern.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatternUpdateManyArgs>(args: SelectSubset<T, PatternUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pattern.
     * @param {PatternUpsertArgs} args - Arguments to update or create a Pattern.
     * @example
     * // Update or create a Pattern
     * const pattern = await prisma.pattern.upsert({
     *   create: {
     *     // ... data to create a Pattern
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pattern we want to update
     *   }
     * })
     */
    upsert<T extends PatternUpsertArgs>(args: SelectSubset<T, PatternUpsertArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patterns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternCountArgs} args - Arguments to filter Patterns to count.
     * @example
     * // Count the number of Patterns
     * const count = await prisma.pattern.count({
     *   where: {
     *     // ... the filter for the Patterns we want to count
     *   }
     * })
    **/
    count<T extends PatternCountArgs>(
      args?: Subset<T, PatternCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatternCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pattern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatternAggregateArgs>(args: Subset<T, PatternAggregateArgs>): Prisma.PrismaPromise<GetPatternAggregateType<T>>

    /**
     * Group by Pattern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatternGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatternGroupByArgs['orderBy'] }
        : { orderBy?: PatternGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatternGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatternGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pattern model
   */
  readonly fields: PatternFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pattern.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatternClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problems<T extends Pattern$problemsArgs<ExtArgs> = {}>(args?: Subset<T, Pattern$problemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pattern model
   */ 
  interface PatternFieldRefs {
    readonly id: FieldRef<"Pattern", 'Int'>
    readonly name: FieldRef<"Pattern", 'String'>
    readonly category: FieldRef<"Pattern", 'String'>
    readonly description: FieldRef<"Pattern", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pattern findUnique
   */
  export type PatternFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern findUniqueOrThrow
   */
  export type PatternFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern findFirst
   */
  export type PatternFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patterns.
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patterns.
     */
    distinct?: PatternScalarFieldEnum | PatternScalarFieldEnum[]
  }

  /**
   * Pattern findFirstOrThrow
   */
  export type PatternFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patterns.
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patterns.
     */
    distinct?: PatternScalarFieldEnum | PatternScalarFieldEnum[]
  }

  /**
   * Pattern findMany
   */
  export type PatternFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * Filter, which Patterns to fetch.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patterns.
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    distinct?: PatternScalarFieldEnum | PatternScalarFieldEnum[]
  }

  /**
   * Pattern create
   */
  export type PatternCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * The data needed to create a Pattern.
     */
    data: XOR<PatternCreateInput, PatternUncheckedCreateInput>
  }

  /**
   * Pattern createMany
   */
  export type PatternCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patterns.
     */
    data: PatternCreateManyInput | PatternCreateManyInput[]
  }

  /**
   * Pattern createManyAndReturn
   */
  export type PatternCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patterns.
     */
    data: PatternCreateManyInput | PatternCreateManyInput[]
  }

  /**
   * Pattern update
   */
  export type PatternUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * The data needed to update a Pattern.
     */
    data: XOR<PatternUpdateInput, PatternUncheckedUpdateInput>
    /**
     * Choose, which Pattern to update.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern updateMany
   */
  export type PatternUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patterns.
     */
    data: XOR<PatternUpdateManyMutationInput, PatternUncheckedUpdateManyInput>
    /**
     * Filter which Patterns to update
     */
    where?: PatternWhereInput
  }

  /**
   * Pattern upsert
   */
  export type PatternUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * The filter to search for the Pattern to update in case it exists.
     */
    where: PatternWhereUniqueInput
    /**
     * In case the Pattern found by the `where` argument doesn't exist, create a new Pattern with this data.
     */
    create: XOR<PatternCreateInput, PatternUncheckedCreateInput>
    /**
     * In case the Pattern was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatternUpdateInput, PatternUncheckedUpdateInput>
  }

  /**
   * Pattern delete
   */
  export type PatternDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
    /**
     * Filter which Pattern to delete.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern deleteMany
   */
  export type PatternDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patterns to delete
     */
    where?: PatternWhereInput
  }

  /**
   * Pattern.problems
   */
  export type Pattern$problemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    where?: ProblemPatternWhereInput
    orderBy?: ProblemPatternOrderByWithRelationInput | ProblemPatternOrderByWithRelationInput[]
    cursor?: ProblemPatternWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemPatternScalarFieldEnum | ProblemPatternScalarFieldEnum[]
  }

  /**
   * Pattern without action
   */
  export type PatternDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternInclude<ExtArgs> | null
  }


  /**
   * Model CompanyCard
   */

  export type AggregateCompanyCard = {
    _count: CompanyCardCountAggregateOutputType | null
    _avg: CompanyCardAvgAggregateOutputType | null
    _sum: CompanyCardSumAggregateOutputType | null
    _min: CompanyCardMinAggregateOutputType | null
    _max: CompanyCardMaxAggregateOutputType | null
  }

  export type CompanyCardAvgAggregateOutputType = {
    id: number | null
    targetProblems: number | null
  }

  export type CompanyCardSumAggregateOutputType = {
    id: number | null
    targetProblems: number | null
  }

  export type CompanyCardMinAggregateOutputType = {
    id: number | null
    name: string | null
    icon: string | null
    targetProblems: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCardMaxAggregateOutputType = {
    id: number | null
    name: string | null
    icon: string | null
    targetProblems: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCardCountAggregateOutputType = {
    id: number
    name: number
    icon: number
    targetProblems: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyCardAvgAggregateInputType = {
    id?: true
    targetProblems?: true
  }

  export type CompanyCardSumAggregateInputType = {
    id?: true
    targetProblems?: true
  }

  export type CompanyCardMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    targetProblems?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCardMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    targetProblems?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCardCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    targetProblems?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyCard to aggregate.
     */
    where?: CompanyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCards to fetch.
     */
    orderBy?: CompanyCardOrderByWithRelationInput | CompanyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyCards
    **/
    _count?: true | CompanyCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyCardMaxAggregateInputType
  }

  export type GetCompanyCardAggregateType<T extends CompanyCardAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyCard[P]>
      : GetScalarType<T[P], AggregateCompanyCard[P]>
  }




  export type CompanyCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyCardWhereInput
    orderBy?: CompanyCardOrderByWithAggregationInput | CompanyCardOrderByWithAggregationInput[]
    by: CompanyCardScalarFieldEnum[] | CompanyCardScalarFieldEnum
    having?: CompanyCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCardCountAggregateInputType | true
    _avg?: CompanyCardAvgAggregateInputType
    _sum?: CompanyCardSumAggregateInputType
    _min?: CompanyCardMinAggregateInputType
    _max?: CompanyCardMaxAggregateInputType
  }

  export type CompanyCardGroupByOutputType = {
    id: number
    name: string
    icon: string
    targetProblems: number
    createdAt: Date
    updatedAt: Date
    _count: CompanyCardCountAggregateOutputType | null
    _avg: CompanyCardAvgAggregateOutputType | null
    _sum: CompanyCardSumAggregateOutputType | null
    _min: CompanyCardMinAggregateOutputType | null
    _max: CompanyCardMaxAggregateOutputType | null
  }

  type GetCompanyCardGroupByPayload<T extends CompanyCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyCardGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyCardGroupByOutputType[P]>
        }
      >
    >


  export type CompanyCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    targetProblems?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problems?: boolean | CompanyCard$problemsArgs<ExtArgs>
    _count?: boolean | CompanyCardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyCard"]>

  export type CompanyCardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    targetProblems?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companyCard"]>

  export type CompanyCardSelectScalar = {
    id?: boolean
    name?: boolean
    icon?: boolean
    targetProblems?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | CompanyCard$problemsArgs<ExtArgs>
    _count?: boolean | CompanyCardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyCardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyCard"
    objects: {
      problems: Prisma.$ProblemCompanyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      icon: string
      targetProblems: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["companyCard"]>
    composites: {}
  }

  type CompanyCardGetPayload<S extends boolean | null | undefined | CompanyCardDefaultArgs> = $Result.GetResult<Prisma.$CompanyCardPayload, S>

  type CompanyCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanyCardFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanyCardCountAggregateInputType | true
    }

  export interface CompanyCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyCard'], meta: { name: 'CompanyCard' } }
    /**
     * Find zero or one CompanyCard that matches the filter.
     * @param {CompanyCardFindUniqueArgs} args - Arguments to find a CompanyCard
     * @example
     * // Get one CompanyCard
     * const companyCard = await prisma.companyCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyCardFindUniqueArgs>(args: SelectSubset<T, CompanyCardFindUniqueArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CompanyCard that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanyCardFindUniqueOrThrowArgs} args - Arguments to find a CompanyCard
     * @example
     * // Get one CompanyCard
     * const companyCard = await prisma.companyCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyCardFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CompanyCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardFindFirstArgs} args - Arguments to find a CompanyCard
     * @example
     * // Get one CompanyCard
     * const companyCard = await prisma.companyCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyCardFindFirstArgs>(args?: SelectSubset<T, CompanyCardFindFirstArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CompanyCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardFindFirstOrThrowArgs} args - Arguments to find a CompanyCard
     * @example
     * // Get one CompanyCard
     * const companyCard = await prisma.companyCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyCardFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CompanyCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyCards
     * const companyCards = await prisma.companyCard.findMany()
     * 
     * // Get first 10 CompanyCards
     * const companyCards = await prisma.companyCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyCardWithIdOnly = await prisma.companyCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyCardFindManyArgs>(args?: SelectSubset<T, CompanyCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CompanyCard.
     * @param {CompanyCardCreateArgs} args - Arguments to create a CompanyCard.
     * @example
     * // Create one CompanyCard
     * const CompanyCard = await prisma.companyCard.create({
     *   data: {
     *     // ... data to create a CompanyCard
     *   }
     * })
     * 
     */
    create<T extends CompanyCardCreateArgs>(args: SelectSubset<T, CompanyCardCreateArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CompanyCards.
     * @param {CompanyCardCreateManyArgs} args - Arguments to create many CompanyCards.
     * @example
     * // Create many CompanyCards
     * const companyCard = await prisma.companyCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCardCreateManyArgs>(args?: SelectSubset<T, CompanyCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyCards and returns the data saved in the database.
     * @param {CompanyCardCreateManyAndReturnArgs} args - Arguments to create many CompanyCards.
     * @example
     * // Create many CompanyCards
     * const companyCard = await prisma.companyCard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyCards and only return the `id`
     * const companyCardWithIdOnly = await prisma.companyCard.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCardCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CompanyCard.
     * @param {CompanyCardDeleteArgs} args - Arguments to delete one CompanyCard.
     * @example
     * // Delete one CompanyCard
     * const CompanyCard = await prisma.companyCard.delete({
     *   where: {
     *     // ... filter to delete one CompanyCard
     *   }
     * })
     * 
     */
    delete<T extends CompanyCardDeleteArgs>(args: SelectSubset<T, CompanyCardDeleteArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CompanyCard.
     * @param {CompanyCardUpdateArgs} args - Arguments to update one CompanyCard.
     * @example
     * // Update one CompanyCard
     * const companyCard = await prisma.companyCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyCardUpdateArgs>(args: SelectSubset<T, CompanyCardUpdateArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CompanyCards.
     * @param {CompanyCardDeleteManyArgs} args - Arguments to filter CompanyCards to delete.
     * @example
     * // Delete a few CompanyCards
     * const { count } = await prisma.companyCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyCardDeleteManyArgs>(args?: SelectSubset<T, CompanyCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyCards
     * const companyCard = await prisma.companyCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyCardUpdateManyArgs>(args: SelectSubset<T, CompanyCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyCard.
     * @param {CompanyCardUpsertArgs} args - Arguments to update or create a CompanyCard.
     * @example
     * // Update or create a CompanyCard
     * const companyCard = await prisma.companyCard.upsert({
     *   create: {
     *     // ... data to create a CompanyCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyCard we want to update
     *   }
     * })
     */
    upsert<T extends CompanyCardUpsertArgs>(args: SelectSubset<T, CompanyCardUpsertArgs<ExtArgs>>): Prisma__CompanyCardClient<$Result.GetResult<Prisma.$CompanyCardPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CompanyCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardCountArgs} args - Arguments to filter CompanyCards to count.
     * @example
     * // Count the number of CompanyCards
     * const count = await prisma.companyCard.count({
     *   where: {
     *     // ... the filter for the CompanyCards we want to count
     *   }
     * })
    **/
    count<T extends CompanyCardCountArgs>(
      args?: Subset<T, CompanyCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyCardAggregateArgs>(args: Subset<T, CompanyCardAggregateArgs>): Prisma.PrismaPromise<GetCompanyCardAggregateType<T>>

    /**
     * Group by CompanyCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyCardGroupByArgs['orderBy'] }
        : { orderBy?: CompanyCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyCard model
   */
  readonly fields: CompanyCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problems<T extends CompanyCard$problemsArgs<ExtArgs> = {}>(args?: Subset<T, CompanyCard$problemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemCompanyPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyCard model
   */ 
  interface CompanyCardFieldRefs {
    readonly id: FieldRef<"CompanyCard", 'Int'>
    readonly name: FieldRef<"CompanyCard", 'String'>
    readonly icon: FieldRef<"CompanyCard", 'String'>
    readonly targetProblems: FieldRef<"CompanyCard", 'Int'>
    readonly createdAt: FieldRef<"CompanyCard", 'DateTime'>
    readonly updatedAt: FieldRef<"CompanyCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompanyCard findUnique
   */
  export type CompanyCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCard to fetch.
     */
    where: CompanyCardWhereUniqueInput
  }

  /**
   * CompanyCard findUniqueOrThrow
   */
  export type CompanyCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCard to fetch.
     */
    where: CompanyCardWhereUniqueInput
  }

  /**
   * CompanyCard findFirst
   */
  export type CompanyCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCard to fetch.
     */
    where?: CompanyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCards to fetch.
     */
    orderBy?: CompanyCardOrderByWithRelationInput | CompanyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyCards.
     */
    cursor?: CompanyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyCards.
     */
    distinct?: CompanyCardScalarFieldEnum | CompanyCardScalarFieldEnum[]
  }

  /**
   * CompanyCard findFirstOrThrow
   */
  export type CompanyCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCard to fetch.
     */
    where?: CompanyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCards to fetch.
     */
    orderBy?: CompanyCardOrderByWithRelationInput | CompanyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyCards.
     */
    cursor?: CompanyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyCards.
     */
    distinct?: CompanyCardScalarFieldEnum | CompanyCardScalarFieldEnum[]
  }

  /**
   * CompanyCard findMany
   */
  export type CompanyCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCards to fetch.
     */
    where?: CompanyCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCards to fetch.
     */
    orderBy?: CompanyCardOrderByWithRelationInput | CompanyCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyCards.
     */
    cursor?: CompanyCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCards.
     */
    skip?: number
    distinct?: CompanyCardScalarFieldEnum | CompanyCardScalarFieldEnum[]
  }

  /**
   * CompanyCard create
   */
  export type CompanyCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyCard.
     */
    data: XOR<CompanyCardCreateInput, CompanyCardUncheckedCreateInput>
  }

  /**
   * CompanyCard createMany
   */
  export type CompanyCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyCards.
     */
    data: CompanyCardCreateManyInput | CompanyCardCreateManyInput[]
  }

  /**
   * CompanyCard createManyAndReturn
   */
  export type CompanyCardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompanyCards.
     */
    data: CompanyCardCreateManyInput | CompanyCardCreateManyInput[]
  }

  /**
   * CompanyCard update
   */
  export type CompanyCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyCard.
     */
    data: XOR<CompanyCardUpdateInput, CompanyCardUncheckedUpdateInput>
    /**
     * Choose, which CompanyCard to update.
     */
    where: CompanyCardWhereUniqueInput
  }

  /**
   * CompanyCard updateMany
   */
  export type CompanyCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyCards.
     */
    data: XOR<CompanyCardUpdateManyMutationInput, CompanyCardUncheckedUpdateManyInput>
    /**
     * Filter which CompanyCards to update
     */
    where?: CompanyCardWhereInput
  }

  /**
   * CompanyCard upsert
   */
  export type CompanyCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyCard to update in case it exists.
     */
    where: CompanyCardWhereUniqueInput
    /**
     * In case the CompanyCard found by the `where` argument doesn't exist, create a new CompanyCard with this data.
     */
    create: XOR<CompanyCardCreateInput, CompanyCardUncheckedCreateInput>
    /**
     * In case the CompanyCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyCardUpdateInput, CompanyCardUncheckedUpdateInput>
  }

  /**
   * CompanyCard delete
   */
  export type CompanyCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
    /**
     * Filter which CompanyCard to delete.
     */
    where: CompanyCardWhereUniqueInput
  }

  /**
   * CompanyCard deleteMany
   */
  export type CompanyCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyCards to delete
     */
    where?: CompanyCardWhereInput
  }

  /**
   * CompanyCard.problems
   */
  export type CompanyCard$problemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCompany
     */
    select?: ProblemCompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemCompanyInclude<ExtArgs> | null
    where?: ProblemCompanyWhereInput
    orderBy?: ProblemCompanyOrderByWithRelationInput | ProblemCompanyOrderByWithRelationInput[]
    cursor?: ProblemCompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemCompanyScalarFieldEnum | ProblemCompanyScalarFieldEnum[]
  }

  /**
   * CompanyCard without action
   */
  export type CompanyCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCard
     */
    select?: CompanyCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCardInclude<ExtArgs> | null
  }


  /**
   * Model ProblemPattern
   */

  export type AggregateProblemPattern = {
    _count: ProblemPatternCountAggregateOutputType | null
    _avg: ProblemPatternAvgAggregateOutputType | null
    _sum: ProblemPatternSumAggregateOutputType | null
    _min: ProblemPatternMinAggregateOutputType | null
    _max: ProblemPatternMaxAggregateOutputType | null
  }

  export type ProblemPatternAvgAggregateOutputType = {
    id: number | null
    problemId: number | null
    patternId: number | null
  }

  export type ProblemPatternSumAggregateOutputType = {
    id: number | null
    problemId: number | null
    patternId: number | null
  }

  export type ProblemPatternMinAggregateOutputType = {
    id: number | null
    problemId: number | null
    patternId: number | null
  }

  export type ProblemPatternMaxAggregateOutputType = {
    id: number | null
    problemId: number | null
    patternId: number | null
  }

  export type ProblemPatternCountAggregateOutputType = {
    id: number
    problemId: number
    patternId: number
    _all: number
  }


  export type ProblemPatternAvgAggregateInputType = {
    id?: true
    problemId?: true
    patternId?: true
  }

  export type ProblemPatternSumAggregateInputType = {
    id?: true
    problemId?: true
    patternId?: true
  }

  export type ProblemPatternMinAggregateInputType = {
    id?: true
    problemId?: true
    patternId?: true
  }

  export type ProblemPatternMaxAggregateInputType = {
    id?: true
    problemId?: true
    patternId?: true
  }

  export type ProblemPatternCountAggregateInputType = {
    id?: true
    problemId?: true
    patternId?: true
    _all?: true
  }

  export type ProblemPatternAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemPattern to aggregate.
     */
    where?: ProblemPatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPatterns to fetch.
     */
    orderBy?: ProblemPatternOrderByWithRelationInput | ProblemPatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemPatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPatterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPatterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemPatterns
    **/
    _count?: true | ProblemPatternCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemPatternAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemPatternSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemPatternMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemPatternMaxAggregateInputType
  }

  export type GetProblemPatternAggregateType<T extends ProblemPatternAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemPattern]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemPattern[P]>
      : GetScalarType<T[P], AggregateProblemPattern[P]>
  }




  export type ProblemPatternGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemPatternWhereInput
    orderBy?: ProblemPatternOrderByWithAggregationInput | ProblemPatternOrderByWithAggregationInput[]
    by: ProblemPatternScalarFieldEnum[] | ProblemPatternScalarFieldEnum
    having?: ProblemPatternScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemPatternCountAggregateInputType | true
    _avg?: ProblemPatternAvgAggregateInputType
    _sum?: ProblemPatternSumAggregateInputType
    _min?: ProblemPatternMinAggregateInputType
    _max?: ProblemPatternMaxAggregateInputType
  }

  export type ProblemPatternGroupByOutputType = {
    id: number
    problemId: number
    patternId: number
    _count: ProblemPatternCountAggregateOutputType | null
    _avg: ProblemPatternAvgAggregateOutputType | null
    _sum: ProblemPatternSumAggregateOutputType | null
    _min: ProblemPatternMinAggregateOutputType | null
    _max: ProblemPatternMaxAggregateOutputType | null
  }

  type GetProblemPatternGroupByPayload<T extends ProblemPatternGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemPatternGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemPatternGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemPatternGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemPatternGroupByOutputType[P]>
        }
      >
    >


  export type ProblemPatternSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    patternId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    pattern?: boolean | PatternDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemPattern"]>

  export type ProblemPatternSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    patternId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    pattern?: boolean | PatternDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemPattern"]>

  export type ProblemPatternSelectScalar = {
    id?: boolean
    problemId?: boolean
    patternId?: boolean
  }

  export type ProblemPatternInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    pattern?: boolean | PatternDefaultArgs<ExtArgs>
  }
  export type ProblemPatternIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    pattern?: boolean | PatternDefaultArgs<ExtArgs>
  }

  export type $ProblemPatternPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemPattern"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
      pattern: Prisma.$PatternPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      problemId: number
      patternId: number
    }, ExtArgs["result"]["problemPattern"]>
    composites: {}
  }

  type ProblemPatternGetPayload<S extends boolean | null | undefined | ProblemPatternDefaultArgs> = $Result.GetResult<Prisma.$ProblemPatternPayload, S>

  type ProblemPatternCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProblemPatternFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProblemPatternCountAggregateInputType | true
    }

  export interface ProblemPatternDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemPattern'], meta: { name: 'ProblemPattern' } }
    /**
     * Find zero or one ProblemPattern that matches the filter.
     * @param {ProblemPatternFindUniqueArgs} args - Arguments to find a ProblemPattern
     * @example
     * // Get one ProblemPattern
     * const problemPattern = await prisma.problemPattern.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemPatternFindUniqueArgs>(args: SelectSubset<T, ProblemPatternFindUniqueArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProblemPattern that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProblemPatternFindUniqueOrThrowArgs} args - Arguments to find a ProblemPattern
     * @example
     * // Get one ProblemPattern
     * const problemPattern = await prisma.problemPattern.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemPatternFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemPatternFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProblemPattern that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternFindFirstArgs} args - Arguments to find a ProblemPattern
     * @example
     * // Get one ProblemPattern
     * const problemPattern = await prisma.problemPattern.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemPatternFindFirstArgs>(args?: SelectSubset<T, ProblemPatternFindFirstArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProblemPattern that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternFindFirstOrThrowArgs} args - Arguments to find a ProblemPattern
     * @example
     * // Get one ProblemPattern
     * const problemPattern = await prisma.problemPattern.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemPatternFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemPatternFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProblemPatterns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemPatterns
     * const problemPatterns = await prisma.problemPattern.findMany()
     * 
     * // Get first 10 ProblemPatterns
     * const problemPatterns = await prisma.problemPattern.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemPatternWithIdOnly = await prisma.problemPattern.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemPatternFindManyArgs>(args?: SelectSubset<T, ProblemPatternFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProblemPattern.
     * @param {ProblemPatternCreateArgs} args - Arguments to create a ProblemPattern.
     * @example
     * // Create one ProblemPattern
     * const ProblemPattern = await prisma.problemPattern.create({
     *   data: {
     *     // ... data to create a ProblemPattern
     *   }
     * })
     * 
     */
    create<T extends ProblemPatternCreateArgs>(args: SelectSubset<T, ProblemPatternCreateArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProblemPatterns.
     * @param {ProblemPatternCreateManyArgs} args - Arguments to create many ProblemPatterns.
     * @example
     * // Create many ProblemPatterns
     * const problemPattern = await prisma.problemPattern.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemPatternCreateManyArgs>(args?: SelectSubset<T, ProblemPatternCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProblemPatterns and returns the data saved in the database.
     * @param {ProblemPatternCreateManyAndReturnArgs} args - Arguments to create many ProblemPatterns.
     * @example
     * // Create many ProblemPatterns
     * const problemPattern = await prisma.problemPattern.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProblemPatterns and only return the `id`
     * const problemPatternWithIdOnly = await prisma.problemPattern.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemPatternCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemPatternCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProblemPattern.
     * @param {ProblemPatternDeleteArgs} args - Arguments to delete one ProblemPattern.
     * @example
     * // Delete one ProblemPattern
     * const ProblemPattern = await prisma.problemPattern.delete({
     *   where: {
     *     // ... filter to delete one ProblemPattern
     *   }
     * })
     * 
     */
    delete<T extends ProblemPatternDeleteArgs>(args: SelectSubset<T, ProblemPatternDeleteArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProblemPattern.
     * @param {ProblemPatternUpdateArgs} args - Arguments to update one ProblemPattern.
     * @example
     * // Update one ProblemPattern
     * const problemPattern = await prisma.problemPattern.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemPatternUpdateArgs>(args: SelectSubset<T, ProblemPatternUpdateArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProblemPatterns.
     * @param {ProblemPatternDeleteManyArgs} args - Arguments to filter ProblemPatterns to delete.
     * @example
     * // Delete a few ProblemPatterns
     * const { count } = await prisma.problemPattern.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemPatternDeleteManyArgs>(args?: SelectSubset<T, ProblemPatternDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemPatterns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemPatterns
     * const problemPattern = await prisma.problemPattern.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemPatternUpdateManyArgs>(args: SelectSubset<T, ProblemPatternUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProblemPattern.
     * @param {ProblemPatternUpsertArgs} args - Arguments to update or create a ProblemPattern.
     * @example
     * // Update or create a ProblemPattern
     * const problemPattern = await prisma.problemPattern.upsert({
     *   create: {
     *     // ... data to create a ProblemPattern
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemPattern we want to update
     *   }
     * })
     */
    upsert<T extends ProblemPatternUpsertArgs>(args: SelectSubset<T, ProblemPatternUpsertArgs<ExtArgs>>): Prisma__ProblemPatternClient<$Result.GetResult<Prisma.$ProblemPatternPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProblemPatterns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternCountArgs} args - Arguments to filter ProblemPatterns to count.
     * @example
     * // Count the number of ProblemPatterns
     * const count = await prisma.problemPattern.count({
     *   where: {
     *     // ... the filter for the ProblemPatterns we want to count
     *   }
     * })
    **/
    count<T extends ProblemPatternCountArgs>(
      args?: Subset<T, ProblemPatternCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemPatternCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemPattern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemPatternAggregateArgs>(args: Subset<T, ProblemPatternAggregateArgs>): Prisma.PrismaPromise<GetProblemPatternAggregateType<T>>

    /**
     * Group by ProblemPattern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPatternGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemPatternGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemPatternGroupByArgs['orderBy'] }
        : { orderBy?: ProblemPatternGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemPatternGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemPatternGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemPattern model
   */
  readonly fields: ProblemPatternFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemPattern.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemPatternClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    pattern<T extends PatternDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatternDefaultArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemPattern model
   */ 
  interface ProblemPatternFieldRefs {
    readonly id: FieldRef<"ProblemPattern", 'Int'>
    readonly problemId: FieldRef<"ProblemPattern", 'Int'>
    readonly patternId: FieldRef<"ProblemPattern", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProblemPattern findUnique
   */
  export type ProblemPatternFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPattern to fetch.
     */
    where: ProblemPatternWhereUniqueInput
  }

  /**
   * ProblemPattern findUniqueOrThrow
   */
  export type ProblemPatternFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPattern to fetch.
     */
    where: ProblemPatternWhereUniqueInput
  }

  /**
   * ProblemPattern findFirst
   */
  export type ProblemPatternFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPattern to fetch.
     */
    where?: ProblemPatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPatterns to fetch.
     */
    orderBy?: ProblemPatternOrderByWithRelationInput | ProblemPatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemPatterns.
     */
    cursor?: ProblemPatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPatterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPatterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemPatterns.
     */
    distinct?: ProblemPatternScalarFieldEnum | ProblemPatternScalarFieldEnum[]
  }

  /**
   * ProblemPattern findFirstOrThrow
   */
  export type ProblemPatternFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPattern to fetch.
     */
    where?: ProblemPatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPatterns to fetch.
     */
    orderBy?: ProblemPatternOrderByWithRelationInput | ProblemPatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemPatterns.
     */
    cursor?: ProblemPatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPatterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPatterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemPatterns.
     */
    distinct?: ProblemPatternScalarFieldEnum | ProblemPatternScalarFieldEnum[]
  }

  /**
   * ProblemPattern findMany
   */
  export type ProblemPatternFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPatterns to fetch.
     */
    where?: ProblemPatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPatterns to fetch.
     */
    orderBy?: ProblemPatternOrderByWithRelationInput | ProblemPatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemPatterns.
     */
    cursor?: ProblemPatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPatterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPatterns.
     */
    skip?: number
    distinct?: ProblemPatternScalarFieldEnum | ProblemPatternScalarFieldEnum[]
  }

  /**
   * ProblemPattern create
   */
  export type ProblemPatternCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * The data needed to create a ProblemPattern.
     */
    data: XOR<ProblemPatternCreateInput, ProblemPatternUncheckedCreateInput>
  }

  /**
   * ProblemPattern createMany
   */
  export type ProblemPatternCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemPatterns.
     */
    data: ProblemPatternCreateManyInput | ProblemPatternCreateManyInput[]
  }

  /**
   * ProblemPattern createManyAndReturn
   */
  export type ProblemPatternCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProblemPatterns.
     */
    data: ProblemPatternCreateManyInput | ProblemPatternCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemPattern update
   */
  export type ProblemPatternUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * The data needed to update a ProblemPattern.
     */
    data: XOR<ProblemPatternUpdateInput, ProblemPatternUncheckedUpdateInput>
    /**
     * Choose, which ProblemPattern to update.
     */
    where: ProblemPatternWhereUniqueInput
  }

  /**
   * ProblemPattern updateMany
   */
  export type ProblemPatternUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemPatterns.
     */
    data: XOR<ProblemPatternUpdateManyMutationInput, ProblemPatternUncheckedUpdateManyInput>
    /**
     * Filter which ProblemPatterns to update
     */
    where?: ProblemPatternWhereInput
  }

  /**
   * ProblemPattern upsert
   */
  export type ProblemPatternUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * The filter to search for the ProblemPattern to update in case it exists.
     */
    where: ProblemPatternWhereUniqueInput
    /**
     * In case the ProblemPattern found by the `where` argument doesn't exist, create a new ProblemPattern with this data.
     */
    create: XOR<ProblemPatternCreateInput, ProblemPatternUncheckedCreateInput>
    /**
     * In case the ProblemPattern was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemPatternUpdateInput, ProblemPatternUncheckedUpdateInput>
  }

  /**
   * ProblemPattern delete
   */
  export type ProblemPatternDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
    /**
     * Filter which ProblemPattern to delete.
     */
    where: ProblemPatternWhereUniqueInput
  }

  /**
   * ProblemPattern deleteMany
   */
  export type ProblemPatternDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemPatterns to delete
     */
    where?: ProblemPatternWhereInput
  }

  /**
   * ProblemPattern without action
   */
  export type ProblemPatternDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPattern
     */
    select?: ProblemPatternSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPatternInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    id: number | null
    problemId: number | null
    attemptNumber: number | null
    timeSpentSeconds: number | null
    patternRecognitionSeconds: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    id: number | null
    problemId: number | null
    attemptNumber: number | null
    timeSpentSeconds: number | null
    patternRecognitionSeconds: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: number | null
    problemId: number | null
    attemptNumber: number | null
    timeSpentSeconds: number | null
    status: string | null
    notes: string | null
    submittedAt: Date | null
    createdAt: Date | null
    attemptType: string | null
    wasHintUsed: boolean | null
    mistakeNote: string | null
    approachNote: string | null
    patternRecognitionSeconds: number | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: number | null
    problemId: number | null
    attemptNumber: number | null
    timeSpentSeconds: number | null
    status: string | null
    notes: string | null
    submittedAt: Date | null
    createdAt: Date | null
    attemptType: string | null
    wasHintUsed: boolean | null
    mistakeNote: string | null
    approachNote: string | null
    patternRecognitionSeconds: number | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    problemId: number
    attemptNumber: number
    timeSpentSeconds: number
    status: number
    notes: number
    submittedAt: number
    createdAt: number
    attemptType: number
    wasHintUsed: number
    mistakeNote: number
    approachNote: number
    patternRecognitionSeconds: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    id?: true
    problemId?: true
    attemptNumber?: true
    timeSpentSeconds?: true
    patternRecognitionSeconds?: true
  }

  export type SubmissionSumAggregateInputType = {
    id?: true
    problemId?: true
    attemptNumber?: true
    timeSpentSeconds?: true
    patternRecognitionSeconds?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    problemId?: true
    attemptNumber?: true
    timeSpentSeconds?: true
    status?: true
    notes?: true
    submittedAt?: true
    createdAt?: true
    attemptType?: true
    wasHintUsed?: true
    mistakeNote?: true
    approachNote?: true
    patternRecognitionSeconds?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    problemId?: true
    attemptNumber?: true
    timeSpentSeconds?: true
    status?: true
    notes?: true
    submittedAt?: true
    createdAt?: true
    attemptType?: true
    wasHintUsed?: true
    mistakeNote?: true
    approachNote?: true
    patternRecognitionSeconds?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    problemId?: true
    attemptNumber?: true
    timeSpentSeconds?: true
    status?: true
    notes?: true
    submittedAt?: true
    createdAt?: true
    attemptType?: true
    wasHintUsed?: true
    mistakeNote?: true
    approachNote?: true
    patternRecognitionSeconds?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: number
    problemId: number
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes: string | null
    submittedAt: Date
    createdAt: Date
    attemptType: string
    wasHintUsed: boolean
    mistakeNote: string | null
    approachNote: string | null
    patternRecognitionSeconds: number | null
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    attemptNumber?: boolean
    timeSpentSeconds?: boolean
    status?: boolean
    notes?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    attemptType?: boolean
    wasHintUsed?: boolean
    mistakeNote?: boolean
    approachNote?: boolean
    patternRecognitionSeconds?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    revisions?: boolean | Submission$revisionsArgs<ExtArgs>
    _count?: boolean | SubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    attemptNumber?: boolean
    timeSpentSeconds?: boolean
    status?: boolean
    notes?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    attemptType?: boolean
    wasHintUsed?: boolean
    mistakeNote?: boolean
    approachNote?: boolean
    patternRecognitionSeconds?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    problemId?: boolean
    attemptNumber?: boolean
    timeSpentSeconds?: boolean
    status?: boolean
    notes?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    attemptType?: boolean
    wasHintUsed?: boolean
    mistakeNote?: boolean
    approachNote?: boolean
    patternRecognitionSeconds?: boolean
  }

  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    revisions?: boolean | Submission$revisionsArgs<ExtArgs>
    _count?: boolean | SubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
      revisions: Prisma.$RevisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      problemId: number
      attemptNumber: number
      timeSpentSeconds: number
      status: string
      notes: string | null
      submittedAt: Date
      createdAt: Date
      attemptType: string
      wasHintUsed: boolean
      mistakeNote: string | null
      approachNote: string | null
      patternRecognitionSeconds: number | null
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    revisions<T extends Submission$revisionsArgs<ExtArgs> = {}>(args?: Subset<T, Submission$revisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Submission model
   */ 
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'Int'>
    readonly problemId: FieldRef<"Submission", 'Int'>
    readonly attemptNumber: FieldRef<"Submission", 'Int'>
    readonly timeSpentSeconds: FieldRef<"Submission", 'Int'>
    readonly status: FieldRef<"Submission", 'String'>
    readonly notes: FieldRef<"Submission", 'String'>
    readonly submittedAt: FieldRef<"Submission", 'DateTime'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly attemptType: FieldRef<"Submission", 'String'>
    readonly wasHintUsed: FieldRef<"Submission", 'Boolean'>
    readonly mistakeNote: FieldRef<"Submission", 'String'>
    readonly approachNote: FieldRef<"Submission", 'String'>
    readonly patternRecognitionSeconds: FieldRef<"Submission", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
  }

  /**
   * Submission.revisions
   */
  export type Submission$revisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    where?: RevisionWhereInput
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    cursor?: RevisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    id: number | null
    problemId: number | null
    durationSeconds: number | null
  }

  export type SessionSumAggregateOutputType = {
    id: number | null
    problemId: number | null
    durationSeconds: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: number | null
    problemId: number | null
    startedAt: Date | null
    endedAt: Date | null
    durationSeconds: number | null
    notes: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: number | null
    problemId: number | null
    startedAt: Date | null
    endedAt: Date | null
    durationSeconds: number | null
    notes: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    problemId: number
    startedAt: number
    endedAt: number
    durationSeconds: number
    notes: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    id?: true
    problemId?: true
    durationSeconds?: true
  }

  export type SessionSumAggregateInputType = {
    id?: true
    problemId?: true
    durationSeconds?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    problemId?: true
    startedAt?: true
    endedAt?: true
    durationSeconds?: true
    notes?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    problemId?: true
    startedAt?: true
    endedAt?: true
    durationSeconds?: true
    notes?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    problemId?: true
    startedAt?: true
    endedAt?: true
    durationSeconds?: true
    notes?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: number
    problemId: number
    startedAt: Date
    endedAt: Date | null
    durationSeconds: number | null
    notes: string | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    durationSeconds?: boolean
    notes?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    durationSeconds?: boolean
    notes?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    problemId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    durationSeconds?: boolean
    notes?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      problemId: number
      startedAt: Date
      endedAt: Date | null
      durationSeconds: number | null
      notes: string | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'Int'>
    readonly problemId: FieldRef<"Session", 'Int'>
    readonly startedAt: FieldRef<"Session", 'DateTime'>
    readonly endedAt: FieldRef<"Session", 'DateTime'>
    readonly durationSeconds: FieldRef<"Session", 'Int'>
    readonly notes: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Revision
   */

  export type AggregateRevision = {
    _count: RevisionCountAggregateOutputType | null
    _avg: RevisionAvgAggregateOutputType | null
    _sum: RevisionSumAggregateOutputType | null
    _min: RevisionMinAggregateOutputType | null
    _max: RevisionMaxAggregateOutputType | null
  }

  export type RevisionAvgAggregateOutputType = {
    id: number | null
    submissionId: number | null
    intervalLevel: number | null
    timeSpentSeconds: number | null
    confidenceLevel: number | null
    difficultyRating: number | null
    previousRevisionId: number | null
  }

  export type RevisionSumAggregateOutputType = {
    id: number | null
    submissionId: number | null
    intervalLevel: number | null
    timeSpentSeconds: number | null
    confidenceLevel: number | null
    difficultyRating: number | null
    previousRevisionId: number | null
  }

  export type RevisionMinAggregateOutputType = {
    id: number | null
    submissionId: number | null
    intervalLevel: number | null
    nextReviewDate: Date | null
    completed: boolean | null
    completedAt: Date | null
    wasSuccessful: boolean | null
    timeSpentSeconds: number | null
    solvedWithoutHint: boolean | null
    confidenceLevel: number | null
    difficultyRating: number | null
    notes: string | null
    previousRevisionId: number | null
  }

  export type RevisionMaxAggregateOutputType = {
    id: number | null
    submissionId: number | null
    intervalLevel: number | null
    nextReviewDate: Date | null
    completed: boolean | null
    completedAt: Date | null
    wasSuccessful: boolean | null
    timeSpentSeconds: number | null
    solvedWithoutHint: boolean | null
    confidenceLevel: number | null
    difficultyRating: number | null
    notes: string | null
    previousRevisionId: number | null
  }

  export type RevisionCountAggregateOutputType = {
    id: number
    submissionId: number
    intervalLevel: number
    nextReviewDate: number
    completed: number
    completedAt: number
    wasSuccessful: number
    timeSpentSeconds: number
    solvedWithoutHint: number
    confidenceLevel: number
    difficultyRating: number
    notes: number
    previousRevisionId: number
    _all: number
  }


  export type RevisionAvgAggregateInputType = {
    id?: true
    submissionId?: true
    intervalLevel?: true
    timeSpentSeconds?: true
    confidenceLevel?: true
    difficultyRating?: true
    previousRevisionId?: true
  }

  export type RevisionSumAggregateInputType = {
    id?: true
    submissionId?: true
    intervalLevel?: true
    timeSpentSeconds?: true
    confidenceLevel?: true
    difficultyRating?: true
    previousRevisionId?: true
  }

  export type RevisionMinAggregateInputType = {
    id?: true
    submissionId?: true
    intervalLevel?: true
    nextReviewDate?: true
    completed?: true
    completedAt?: true
    wasSuccessful?: true
    timeSpentSeconds?: true
    solvedWithoutHint?: true
    confidenceLevel?: true
    difficultyRating?: true
    notes?: true
    previousRevisionId?: true
  }

  export type RevisionMaxAggregateInputType = {
    id?: true
    submissionId?: true
    intervalLevel?: true
    nextReviewDate?: true
    completed?: true
    completedAt?: true
    wasSuccessful?: true
    timeSpentSeconds?: true
    solvedWithoutHint?: true
    confidenceLevel?: true
    difficultyRating?: true
    notes?: true
    previousRevisionId?: true
  }

  export type RevisionCountAggregateInputType = {
    id?: true
    submissionId?: true
    intervalLevel?: true
    nextReviewDate?: true
    completed?: true
    completedAt?: true
    wasSuccessful?: true
    timeSpentSeconds?: true
    solvedWithoutHint?: true
    confidenceLevel?: true
    difficultyRating?: true
    notes?: true
    previousRevisionId?: true
    _all?: true
  }

  export type RevisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Revision to aggregate.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Revisions
    **/
    _count?: true | RevisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RevisionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RevisionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RevisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RevisionMaxAggregateInputType
  }

  export type GetRevisionAggregateType<T extends RevisionAggregateArgs> = {
        [P in keyof T & keyof AggregateRevision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRevision[P]>
      : GetScalarType<T[P], AggregateRevision[P]>
  }




  export type RevisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RevisionWhereInput
    orderBy?: RevisionOrderByWithAggregationInput | RevisionOrderByWithAggregationInput[]
    by: RevisionScalarFieldEnum[] | RevisionScalarFieldEnum
    having?: RevisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RevisionCountAggregateInputType | true
    _avg?: RevisionAvgAggregateInputType
    _sum?: RevisionSumAggregateInputType
    _min?: RevisionMinAggregateInputType
    _max?: RevisionMaxAggregateInputType
  }

  export type RevisionGroupByOutputType = {
    id: number
    submissionId: number
    intervalLevel: number
    nextReviewDate: Date
    completed: boolean
    completedAt: Date | null
    wasSuccessful: boolean | null
    timeSpentSeconds: number | null
    solvedWithoutHint: boolean | null
    confidenceLevel: number | null
    difficultyRating: number | null
    notes: string | null
    previousRevisionId: number | null
    _count: RevisionCountAggregateOutputType | null
    _avg: RevisionAvgAggregateOutputType | null
    _sum: RevisionSumAggregateOutputType | null
    _min: RevisionMinAggregateOutputType | null
    _max: RevisionMaxAggregateOutputType | null
  }

  type GetRevisionGroupByPayload<T extends RevisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RevisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RevisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RevisionGroupByOutputType[P]>
            : GetScalarType<T[P], RevisionGroupByOutputType[P]>
        }
      >
    >


  export type RevisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    intervalLevel?: boolean
    nextReviewDate?: boolean
    completed?: boolean
    completedAt?: boolean
    wasSuccessful?: boolean
    timeSpentSeconds?: boolean
    solvedWithoutHint?: boolean
    confidenceLevel?: boolean
    difficultyRating?: boolean
    notes?: boolean
    previousRevisionId?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["revision"]>

  export type RevisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    intervalLevel?: boolean
    nextReviewDate?: boolean
    completed?: boolean
    completedAt?: boolean
    wasSuccessful?: boolean
    timeSpentSeconds?: boolean
    solvedWithoutHint?: boolean
    confidenceLevel?: boolean
    difficultyRating?: boolean
    notes?: boolean
    previousRevisionId?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["revision"]>

  export type RevisionSelectScalar = {
    id?: boolean
    submissionId?: boolean
    intervalLevel?: boolean
    nextReviewDate?: boolean
    completed?: boolean
    completedAt?: boolean
    wasSuccessful?: boolean
    timeSpentSeconds?: boolean
    solvedWithoutHint?: boolean
    confidenceLevel?: boolean
    difficultyRating?: boolean
    notes?: boolean
    previousRevisionId?: boolean
  }

  export type RevisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }
  export type RevisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }

  export type $RevisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Revision"
    objects: {
      submission: Prisma.$SubmissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      submissionId: number
      intervalLevel: number
      nextReviewDate: Date
      completed: boolean
      completedAt: Date | null
      wasSuccessful: boolean | null
      timeSpentSeconds: number | null
      solvedWithoutHint: boolean | null
      confidenceLevel: number | null
      difficultyRating: number | null
      notes: string | null
      previousRevisionId: number | null
    }, ExtArgs["result"]["revision"]>
    composites: {}
  }

  type RevisionGetPayload<S extends boolean | null | undefined | RevisionDefaultArgs> = $Result.GetResult<Prisma.$RevisionPayload, S>

  type RevisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RevisionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RevisionCountAggregateInputType | true
    }

  export interface RevisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Revision'], meta: { name: 'Revision' } }
    /**
     * Find zero or one Revision that matches the filter.
     * @param {RevisionFindUniqueArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RevisionFindUniqueArgs>(args: SelectSubset<T, RevisionFindUniqueArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Revision that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RevisionFindUniqueOrThrowArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RevisionFindUniqueOrThrowArgs>(args: SelectSubset<T, RevisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Revision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionFindFirstArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RevisionFindFirstArgs>(args?: SelectSubset<T, RevisionFindFirstArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Revision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionFindFirstOrThrowArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RevisionFindFirstOrThrowArgs>(args?: SelectSubset<T, RevisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Revisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Revisions
     * const revisions = await prisma.revision.findMany()
     * 
     * // Get first 10 Revisions
     * const revisions = await prisma.revision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const revisionWithIdOnly = await prisma.revision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RevisionFindManyArgs>(args?: SelectSubset<T, RevisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Revision.
     * @param {RevisionCreateArgs} args - Arguments to create a Revision.
     * @example
     * // Create one Revision
     * const Revision = await prisma.revision.create({
     *   data: {
     *     // ... data to create a Revision
     *   }
     * })
     * 
     */
    create<T extends RevisionCreateArgs>(args: SelectSubset<T, RevisionCreateArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Revisions.
     * @param {RevisionCreateManyArgs} args - Arguments to create many Revisions.
     * @example
     * // Create many Revisions
     * const revision = await prisma.revision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RevisionCreateManyArgs>(args?: SelectSubset<T, RevisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Revisions and returns the data saved in the database.
     * @param {RevisionCreateManyAndReturnArgs} args - Arguments to create many Revisions.
     * @example
     * // Create many Revisions
     * const revision = await prisma.revision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Revisions and only return the `id`
     * const revisionWithIdOnly = await prisma.revision.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RevisionCreateManyAndReturnArgs>(args?: SelectSubset<T, RevisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Revision.
     * @param {RevisionDeleteArgs} args - Arguments to delete one Revision.
     * @example
     * // Delete one Revision
     * const Revision = await prisma.revision.delete({
     *   where: {
     *     // ... filter to delete one Revision
     *   }
     * })
     * 
     */
    delete<T extends RevisionDeleteArgs>(args: SelectSubset<T, RevisionDeleteArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Revision.
     * @param {RevisionUpdateArgs} args - Arguments to update one Revision.
     * @example
     * // Update one Revision
     * const revision = await prisma.revision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RevisionUpdateArgs>(args: SelectSubset<T, RevisionUpdateArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Revisions.
     * @param {RevisionDeleteManyArgs} args - Arguments to filter Revisions to delete.
     * @example
     * // Delete a few Revisions
     * const { count } = await prisma.revision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RevisionDeleteManyArgs>(args?: SelectSubset<T, RevisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Revisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Revisions
     * const revision = await prisma.revision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RevisionUpdateManyArgs>(args: SelectSubset<T, RevisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Revision.
     * @param {RevisionUpsertArgs} args - Arguments to update or create a Revision.
     * @example
     * // Update or create a Revision
     * const revision = await prisma.revision.upsert({
     *   create: {
     *     // ... data to create a Revision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Revision we want to update
     *   }
     * })
     */
    upsert<T extends RevisionUpsertArgs>(args: SelectSubset<T, RevisionUpsertArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Revisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionCountArgs} args - Arguments to filter Revisions to count.
     * @example
     * // Count the number of Revisions
     * const count = await prisma.revision.count({
     *   where: {
     *     // ... the filter for the Revisions we want to count
     *   }
     * })
    **/
    count<T extends RevisionCountArgs>(
      args?: Subset<T, RevisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RevisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Revision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RevisionAggregateArgs>(args: Subset<T, RevisionAggregateArgs>): Prisma.PrismaPromise<GetRevisionAggregateType<T>>

    /**
     * Group by Revision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RevisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RevisionGroupByArgs['orderBy'] }
        : { orderBy?: RevisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RevisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRevisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Revision model
   */
  readonly fields: RevisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Revision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RevisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submission<T extends SubmissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubmissionDefaultArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Revision model
   */ 
  interface RevisionFieldRefs {
    readonly id: FieldRef<"Revision", 'Int'>
    readonly submissionId: FieldRef<"Revision", 'Int'>
    readonly intervalLevel: FieldRef<"Revision", 'Int'>
    readonly nextReviewDate: FieldRef<"Revision", 'DateTime'>
    readonly completed: FieldRef<"Revision", 'Boolean'>
    readonly completedAt: FieldRef<"Revision", 'DateTime'>
    readonly wasSuccessful: FieldRef<"Revision", 'Boolean'>
    readonly timeSpentSeconds: FieldRef<"Revision", 'Int'>
    readonly solvedWithoutHint: FieldRef<"Revision", 'Boolean'>
    readonly confidenceLevel: FieldRef<"Revision", 'Int'>
    readonly difficultyRating: FieldRef<"Revision", 'Int'>
    readonly notes: FieldRef<"Revision", 'String'>
    readonly previousRevisionId: FieldRef<"Revision", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Revision findUnique
   */
  export type RevisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision findUniqueOrThrow
   */
  export type RevisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision findFirst
   */
  export type RevisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Revisions.
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Revisions.
     */
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Revision findFirstOrThrow
   */
  export type RevisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Revisions.
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Revisions.
     */
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Revision findMany
   */
  export type RevisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revisions to fetch.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Revisions.
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Revision create
   */
  export type RevisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * The data needed to create a Revision.
     */
    data: XOR<RevisionCreateInput, RevisionUncheckedCreateInput>
  }

  /**
   * Revision createMany
   */
  export type RevisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Revisions.
     */
    data: RevisionCreateManyInput | RevisionCreateManyInput[]
  }

  /**
   * Revision createManyAndReturn
   */
  export type RevisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Revisions.
     */
    data: RevisionCreateManyInput | RevisionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Revision update
   */
  export type RevisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * The data needed to update a Revision.
     */
    data: XOR<RevisionUpdateInput, RevisionUncheckedUpdateInput>
    /**
     * Choose, which Revision to update.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision updateMany
   */
  export type RevisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Revisions.
     */
    data: XOR<RevisionUpdateManyMutationInput, RevisionUncheckedUpdateManyInput>
    /**
     * Filter which Revisions to update
     */
    where?: RevisionWhereInput
  }

  /**
   * Revision upsert
   */
  export type RevisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * The filter to search for the Revision to update in case it exists.
     */
    where: RevisionWhereUniqueInput
    /**
     * In case the Revision found by the `where` argument doesn't exist, create a new Revision with this data.
     */
    create: XOR<RevisionCreateInput, RevisionUncheckedCreateInput>
    /**
     * In case the Revision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RevisionUpdateInput, RevisionUncheckedUpdateInput>
  }

  /**
   * Revision delete
   */
  export type RevisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter which Revision to delete.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision deleteMany
   */
  export type RevisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Revisions to delete
     */
    where?: RevisionWhereInput
  }

  /**
   * Revision without action
   */
  export type RevisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
  }


  /**
   * Model MockInterview
   */

  export type AggregateMockInterview = {
    _count: MockInterviewCountAggregateOutputType | null
    _avg: MockInterviewAvgAggregateOutputType | null
    _sum: MockInterviewSumAggregateOutputType | null
    _min: MockInterviewMinAggregateOutputType | null
    _max: MockInterviewMaxAggregateOutputType | null
  }

  export type MockInterviewAvgAggregateOutputType = {
    id: number | null
    problemId: number | null
    timeLimit: number | null
    timeTakenSeconds: number | null
    patternRecognitionSeconds: number | null
    explanationScore: number | null
    codeQualityScore: number | null
    overallScore: number | null
  }

  export type MockInterviewSumAggregateOutputType = {
    id: number | null
    problemId: number | null
    timeLimit: number | null
    timeTakenSeconds: number | null
    patternRecognitionSeconds: number | null
    explanationScore: number | null
    codeQualityScore: number | null
    overallScore: number | null
  }

  export type MockInterviewMinAggregateOutputType = {
    id: number | null
    problemId: number | null
    date: Date | null
    timeLimit: number | null
    timeTakenSeconds: number | null
    patternRecognitionSeconds: number | null
    solved: boolean | null
    explanationScore: number | null
    codeQualityScore: number | null
    overallScore: number | null
    notes: string | null
  }

  export type MockInterviewMaxAggregateOutputType = {
    id: number | null
    problemId: number | null
    date: Date | null
    timeLimit: number | null
    timeTakenSeconds: number | null
    patternRecognitionSeconds: number | null
    solved: boolean | null
    explanationScore: number | null
    codeQualityScore: number | null
    overallScore: number | null
    notes: string | null
  }

  export type MockInterviewCountAggregateOutputType = {
    id: number
    problemId: number
    date: number
    timeLimit: number
    timeTakenSeconds: number
    patternRecognitionSeconds: number
    solved: number
    explanationScore: number
    codeQualityScore: number
    overallScore: number
    notes: number
    _all: number
  }


  export type MockInterviewAvgAggregateInputType = {
    id?: true
    problemId?: true
    timeLimit?: true
    timeTakenSeconds?: true
    patternRecognitionSeconds?: true
    explanationScore?: true
    codeQualityScore?: true
    overallScore?: true
  }

  export type MockInterviewSumAggregateInputType = {
    id?: true
    problemId?: true
    timeLimit?: true
    timeTakenSeconds?: true
    patternRecognitionSeconds?: true
    explanationScore?: true
    codeQualityScore?: true
    overallScore?: true
  }

  export type MockInterviewMinAggregateInputType = {
    id?: true
    problemId?: true
    date?: true
    timeLimit?: true
    timeTakenSeconds?: true
    patternRecognitionSeconds?: true
    solved?: true
    explanationScore?: true
    codeQualityScore?: true
    overallScore?: true
    notes?: true
  }

  export type MockInterviewMaxAggregateInputType = {
    id?: true
    problemId?: true
    date?: true
    timeLimit?: true
    timeTakenSeconds?: true
    patternRecognitionSeconds?: true
    solved?: true
    explanationScore?: true
    codeQualityScore?: true
    overallScore?: true
    notes?: true
  }

  export type MockInterviewCountAggregateInputType = {
    id?: true
    problemId?: true
    date?: true
    timeLimit?: true
    timeTakenSeconds?: true
    patternRecognitionSeconds?: true
    solved?: true
    explanationScore?: true
    codeQualityScore?: true
    overallScore?: true
    notes?: true
    _all?: true
  }

  export type MockInterviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MockInterview to aggregate.
     */
    where?: MockInterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockInterviews to fetch.
     */
    orderBy?: MockInterviewOrderByWithRelationInput | MockInterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MockInterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockInterviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockInterviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MockInterviews
    **/
    _count?: true | MockInterviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MockInterviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MockInterviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MockInterviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MockInterviewMaxAggregateInputType
  }

  export type GetMockInterviewAggregateType<T extends MockInterviewAggregateArgs> = {
        [P in keyof T & keyof AggregateMockInterview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMockInterview[P]>
      : GetScalarType<T[P], AggregateMockInterview[P]>
  }




  export type MockInterviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MockInterviewWhereInput
    orderBy?: MockInterviewOrderByWithAggregationInput | MockInterviewOrderByWithAggregationInput[]
    by: MockInterviewScalarFieldEnum[] | MockInterviewScalarFieldEnum
    having?: MockInterviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MockInterviewCountAggregateInputType | true
    _avg?: MockInterviewAvgAggregateInputType
    _sum?: MockInterviewSumAggregateInputType
    _min?: MockInterviewMinAggregateInputType
    _max?: MockInterviewMaxAggregateInputType
  }

  export type MockInterviewGroupByOutputType = {
    id: number
    problemId: number
    date: Date
    timeLimit: number
    timeTakenSeconds: number | null
    patternRecognitionSeconds: number | null
    solved: boolean
    explanationScore: number | null
    codeQualityScore: number | null
    overallScore: number | null
    notes: string | null
    _count: MockInterviewCountAggregateOutputType | null
    _avg: MockInterviewAvgAggregateOutputType | null
    _sum: MockInterviewSumAggregateOutputType | null
    _min: MockInterviewMinAggregateOutputType | null
    _max: MockInterviewMaxAggregateOutputType | null
  }

  type GetMockInterviewGroupByPayload<T extends MockInterviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MockInterviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MockInterviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MockInterviewGroupByOutputType[P]>
            : GetScalarType<T[P], MockInterviewGroupByOutputType[P]>
        }
      >
    >


  export type MockInterviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    date?: boolean
    timeLimit?: boolean
    timeTakenSeconds?: boolean
    patternRecognitionSeconds?: boolean
    solved?: boolean
    explanationScore?: boolean
    codeQualityScore?: boolean
    overallScore?: boolean
    notes?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockInterview"]>

  export type MockInterviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    date?: boolean
    timeLimit?: boolean
    timeTakenSeconds?: boolean
    patternRecognitionSeconds?: boolean
    solved?: boolean
    explanationScore?: boolean
    codeQualityScore?: boolean
    overallScore?: boolean
    notes?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mockInterview"]>

  export type MockInterviewSelectScalar = {
    id?: boolean
    problemId?: boolean
    date?: boolean
    timeLimit?: boolean
    timeTakenSeconds?: boolean
    patternRecognitionSeconds?: boolean
    solved?: boolean
    explanationScore?: boolean
    codeQualityScore?: boolean
    overallScore?: boolean
    notes?: boolean
  }

  export type MockInterviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type MockInterviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $MockInterviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MockInterview"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      problemId: number
      date: Date
      timeLimit: number
      timeTakenSeconds: number | null
      patternRecognitionSeconds: number | null
      solved: boolean
      explanationScore: number | null
      codeQualityScore: number | null
      overallScore: number | null
      notes: string | null
    }, ExtArgs["result"]["mockInterview"]>
    composites: {}
  }

  type MockInterviewGetPayload<S extends boolean | null | undefined | MockInterviewDefaultArgs> = $Result.GetResult<Prisma.$MockInterviewPayload, S>

  type MockInterviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MockInterviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MockInterviewCountAggregateInputType | true
    }

  export interface MockInterviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MockInterview'], meta: { name: 'MockInterview' } }
    /**
     * Find zero or one MockInterview that matches the filter.
     * @param {MockInterviewFindUniqueArgs} args - Arguments to find a MockInterview
     * @example
     * // Get one MockInterview
     * const mockInterview = await prisma.mockInterview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MockInterviewFindUniqueArgs>(args: SelectSubset<T, MockInterviewFindUniqueArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MockInterview that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MockInterviewFindUniqueOrThrowArgs} args - Arguments to find a MockInterview
     * @example
     * // Get one MockInterview
     * const mockInterview = await prisma.mockInterview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MockInterviewFindUniqueOrThrowArgs>(args: SelectSubset<T, MockInterviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MockInterview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewFindFirstArgs} args - Arguments to find a MockInterview
     * @example
     * // Get one MockInterview
     * const mockInterview = await prisma.mockInterview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MockInterviewFindFirstArgs>(args?: SelectSubset<T, MockInterviewFindFirstArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MockInterview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewFindFirstOrThrowArgs} args - Arguments to find a MockInterview
     * @example
     * // Get one MockInterview
     * const mockInterview = await prisma.mockInterview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MockInterviewFindFirstOrThrowArgs>(args?: SelectSubset<T, MockInterviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MockInterviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MockInterviews
     * const mockInterviews = await prisma.mockInterview.findMany()
     * 
     * // Get first 10 MockInterviews
     * const mockInterviews = await prisma.mockInterview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mockInterviewWithIdOnly = await prisma.mockInterview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MockInterviewFindManyArgs>(args?: SelectSubset<T, MockInterviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MockInterview.
     * @param {MockInterviewCreateArgs} args - Arguments to create a MockInterview.
     * @example
     * // Create one MockInterview
     * const MockInterview = await prisma.mockInterview.create({
     *   data: {
     *     // ... data to create a MockInterview
     *   }
     * })
     * 
     */
    create<T extends MockInterviewCreateArgs>(args: SelectSubset<T, MockInterviewCreateArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MockInterviews.
     * @param {MockInterviewCreateManyArgs} args - Arguments to create many MockInterviews.
     * @example
     * // Create many MockInterviews
     * const mockInterview = await prisma.mockInterview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MockInterviewCreateManyArgs>(args?: SelectSubset<T, MockInterviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MockInterviews and returns the data saved in the database.
     * @param {MockInterviewCreateManyAndReturnArgs} args - Arguments to create many MockInterviews.
     * @example
     * // Create many MockInterviews
     * const mockInterview = await prisma.mockInterview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MockInterviews and only return the `id`
     * const mockInterviewWithIdOnly = await prisma.mockInterview.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MockInterviewCreateManyAndReturnArgs>(args?: SelectSubset<T, MockInterviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MockInterview.
     * @param {MockInterviewDeleteArgs} args - Arguments to delete one MockInterview.
     * @example
     * // Delete one MockInterview
     * const MockInterview = await prisma.mockInterview.delete({
     *   where: {
     *     // ... filter to delete one MockInterview
     *   }
     * })
     * 
     */
    delete<T extends MockInterviewDeleteArgs>(args: SelectSubset<T, MockInterviewDeleteArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MockInterview.
     * @param {MockInterviewUpdateArgs} args - Arguments to update one MockInterview.
     * @example
     * // Update one MockInterview
     * const mockInterview = await prisma.mockInterview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MockInterviewUpdateArgs>(args: SelectSubset<T, MockInterviewUpdateArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MockInterviews.
     * @param {MockInterviewDeleteManyArgs} args - Arguments to filter MockInterviews to delete.
     * @example
     * // Delete a few MockInterviews
     * const { count } = await prisma.mockInterview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MockInterviewDeleteManyArgs>(args?: SelectSubset<T, MockInterviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MockInterviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MockInterviews
     * const mockInterview = await prisma.mockInterview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MockInterviewUpdateManyArgs>(args: SelectSubset<T, MockInterviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MockInterview.
     * @param {MockInterviewUpsertArgs} args - Arguments to update or create a MockInterview.
     * @example
     * // Update or create a MockInterview
     * const mockInterview = await prisma.mockInterview.upsert({
     *   create: {
     *     // ... data to create a MockInterview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MockInterview we want to update
     *   }
     * })
     */
    upsert<T extends MockInterviewUpsertArgs>(args: SelectSubset<T, MockInterviewUpsertArgs<ExtArgs>>): Prisma__MockInterviewClient<$Result.GetResult<Prisma.$MockInterviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MockInterviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewCountArgs} args - Arguments to filter MockInterviews to count.
     * @example
     * // Count the number of MockInterviews
     * const count = await prisma.mockInterview.count({
     *   where: {
     *     // ... the filter for the MockInterviews we want to count
     *   }
     * })
    **/
    count<T extends MockInterviewCountArgs>(
      args?: Subset<T, MockInterviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MockInterviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MockInterview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MockInterviewAggregateArgs>(args: Subset<T, MockInterviewAggregateArgs>): Prisma.PrismaPromise<GetMockInterviewAggregateType<T>>

    /**
     * Group by MockInterview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MockInterviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MockInterviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MockInterviewGroupByArgs['orderBy'] }
        : { orderBy?: MockInterviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MockInterviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMockInterviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MockInterview model
   */
  readonly fields: MockInterviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MockInterview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MockInterviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MockInterview model
   */ 
  interface MockInterviewFieldRefs {
    readonly id: FieldRef<"MockInterview", 'Int'>
    readonly problemId: FieldRef<"MockInterview", 'Int'>
    readonly date: FieldRef<"MockInterview", 'DateTime'>
    readonly timeLimit: FieldRef<"MockInterview", 'Int'>
    readonly timeTakenSeconds: FieldRef<"MockInterview", 'Int'>
    readonly patternRecognitionSeconds: FieldRef<"MockInterview", 'Int'>
    readonly solved: FieldRef<"MockInterview", 'Boolean'>
    readonly explanationScore: FieldRef<"MockInterview", 'Int'>
    readonly codeQualityScore: FieldRef<"MockInterview", 'Int'>
    readonly overallScore: FieldRef<"MockInterview", 'Float'>
    readonly notes: FieldRef<"MockInterview", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MockInterview findUnique
   */
  export type MockInterviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * Filter, which MockInterview to fetch.
     */
    where: MockInterviewWhereUniqueInput
  }

  /**
   * MockInterview findUniqueOrThrow
   */
  export type MockInterviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * Filter, which MockInterview to fetch.
     */
    where: MockInterviewWhereUniqueInput
  }

  /**
   * MockInterview findFirst
   */
  export type MockInterviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * Filter, which MockInterview to fetch.
     */
    where?: MockInterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockInterviews to fetch.
     */
    orderBy?: MockInterviewOrderByWithRelationInput | MockInterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MockInterviews.
     */
    cursor?: MockInterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockInterviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockInterviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MockInterviews.
     */
    distinct?: MockInterviewScalarFieldEnum | MockInterviewScalarFieldEnum[]
  }

  /**
   * MockInterview findFirstOrThrow
   */
  export type MockInterviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * Filter, which MockInterview to fetch.
     */
    where?: MockInterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockInterviews to fetch.
     */
    orderBy?: MockInterviewOrderByWithRelationInput | MockInterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MockInterviews.
     */
    cursor?: MockInterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockInterviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockInterviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MockInterviews.
     */
    distinct?: MockInterviewScalarFieldEnum | MockInterviewScalarFieldEnum[]
  }

  /**
   * MockInterview findMany
   */
  export type MockInterviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * Filter, which MockInterviews to fetch.
     */
    where?: MockInterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MockInterviews to fetch.
     */
    orderBy?: MockInterviewOrderByWithRelationInput | MockInterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MockInterviews.
     */
    cursor?: MockInterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MockInterviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MockInterviews.
     */
    skip?: number
    distinct?: MockInterviewScalarFieldEnum | MockInterviewScalarFieldEnum[]
  }

  /**
   * MockInterview create
   */
  export type MockInterviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * The data needed to create a MockInterview.
     */
    data: XOR<MockInterviewCreateInput, MockInterviewUncheckedCreateInput>
  }

  /**
   * MockInterview createMany
   */
  export type MockInterviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MockInterviews.
     */
    data: MockInterviewCreateManyInput | MockInterviewCreateManyInput[]
  }

  /**
   * MockInterview createManyAndReturn
   */
  export type MockInterviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MockInterviews.
     */
    data: MockInterviewCreateManyInput | MockInterviewCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MockInterview update
   */
  export type MockInterviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * The data needed to update a MockInterview.
     */
    data: XOR<MockInterviewUpdateInput, MockInterviewUncheckedUpdateInput>
    /**
     * Choose, which MockInterview to update.
     */
    where: MockInterviewWhereUniqueInput
  }

  /**
   * MockInterview updateMany
   */
  export type MockInterviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MockInterviews.
     */
    data: XOR<MockInterviewUpdateManyMutationInput, MockInterviewUncheckedUpdateManyInput>
    /**
     * Filter which MockInterviews to update
     */
    where?: MockInterviewWhereInput
  }

  /**
   * MockInterview upsert
   */
  export type MockInterviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * The filter to search for the MockInterview to update in case it exists.
     */
    where: MockInterviewWhereUniqueInput
    /**
     * In case the MockInterview found by the `where` argument doesn't exist, create a new MockInterview with this data.
     */
    create: XOR<MockInterviewCreateInput, MockInterviewUncheckedCreateInput>
    /**
     * In case the MockInterview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MockInterviewUpdateInput, MockInterviewUncheckedUpdateInput>
  }

  /**
   * MockInterview delete
   */
  export type MockInterviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
    /**
     * Filter which MockInterview to delete.
     */
    where: MockInterviewWhereUniqueInput
  }

  /**
   * MockInterview deleteMany
   */
  export type MockInterviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MockInterviews to delete
     */
    where?: MockInterviewWhereInput
  }

  /**
   * MockInterview without action
   */
  export type MockInterviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MockInterview
     */
    select?: MockInterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MockInterviewInclude<ExtArgs> | null
  }


  /**
   * Model DailyProgress
   */

  export type AggregateDailyProgress = {
    _count: DailyProgressCountAggregateOutputType | null
    _avg: DailyProgressAvgAggregateOutputType | null
    _sum: DailyProgressSumAggregateOutputType | null
    _min: DailyProgressMinAggregateOutputType | null
    _max: DailyProgressMaxAggregateOutputType | null
  }

  export type DailyProgressAvgAggregateOutputType = {
    id: number | null
    problemsSolved: number | null
    totalTimeSpent: number | null
    patternsWorked: number | null
    mockInterviews: number | null
  }

  export type DailyProgressSumAggregateOutputType = {
    id: number | null
    problemsSolved: number | null
    totalTimeSpent: number | null
    patternsWorked: number | null
    mockInterviews: number | null
  }

  export type DailyProgressMinAggregateOutputType = {
    id: number | null
    date: Date | null
    problemsSolved: number | null
    totalTimeSpent: number | null
    patternsWorked: number | null
    mockInterviews: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyProgressMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    problemsSolved: number | null
    totalTimeSpent: number | null
    patternsWorked: number | null
    mockInterviews: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyProgressCountAggregateOutputType = {
    id: number
    date: number
    problemsSolved: number
    totalTimeSpent: number
    patternsWorked: number
    mockInterviews: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyProgressAvgAggregateInputType = {
    id?: true
    problemsSolved?: true
    totalTimeSpent?: true
    patternsWorked?: true
    mockInterviews?: true
  }

  export type DailyProgressSumAggregateInputType = {
    id?: true
    problemsSolved?: true
    totalTimeSpent?: true
    patternsWorked?: true
    mockInterviews?: true
  }

  export type DailyProgressMinAggregateInputType = {
    id?: true
    date?: true
    problemsSolved?: true
    totalTimeSpent?: true
    patternsWorked?: true
    mockInterviews?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyProgressMaxAggregateInputType = {
    id?: true
    date?: true
    problemsSolved?: true
    totalTimeSpent?: true
    patternsWorked?: true
    mockInterviews?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyProgressCountAggregateInputType = {
    id?: true
    date?: true
    problemsSolved?: true
    totalTimeSpent?: true
    patternsWorked?: true
    mockInterviews?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyProgress to aggregate.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyProgresses
    **/
    _count?: true | DailyProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyProgressMaxAggregateInputType
  }

  export type GetDailyProgressAggregateType<T extends DailyProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyProgress[P]>
      : GetScalarType<T[P], AggregateDailyProgress[P]>
  }




  export type DailyProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyProgressWhereInput
    orderBy?: DailyProgressOrderByWithAggregationInput | DailyProgressOrderByWithAggregationInput[]
    by: DailyProgressScalarFieldEnum[] | DailyProgressScalarFieldEnum
    having?: DailyProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyProgressCountAggregateInputType | true
    _avg?: DailyProgressAvgAggregateInputType
    _sum?: DailyProgressSumAggregateInputType
    _min?: DailyProgressMinAggregateInputType
    _max?: DailyProgressMaxAggregateInputType
  }

  export type DailyProgressGroupByOutputType = {
    id: number
    date: Date
    problemsSolved: number
    totalTimeSpent: number
    patternsWorked: number
    mockInterviews: number
    createdAt: Date
    updatedAt: Date
    _count: DailyProgressCountAggregateOutputType | null
    _avg: DailyProgressAvgAggregateOutputType | null
    _sum: DailyProgressSumAggregateOutputType | null
    _min: DailyProgressMinAggregateOutputType | null
    _max: DailyProgressMaxAggregateOutputType | null
  }

  type GetDailyProgressGroupByPayload<T extends DailyProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyProgressGroupByOutputType[P]>
            : GetScalarType<T[P], DailyProgressGroupByOutputType[P]>
        }
      >
    >


  export type DailyProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    problemsSolved?: boolean
    totalTimeSpent?: boolean
    patternsWorked?: boolean
    mockInterviews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyProgress"]>

  export type DailyProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    problemsSolved?: boolean
    totalTimeSpent?: boolean
    patternsWorked?: boolean
    mockInterviews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyProgress"]>

  export type DailyProgressSelectScalar = {
    id?: boolean
    date?: boolean
    problemsSolved?: boolean
    totalTimeSpent?: boolean
    patternsWorked?: boolean
    mockInterviews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $DailyProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyProgress"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      problemsSolved: number
      totalTimeSpent: number
      patternsWorked: number
      mockInterviews: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyProgress"]>
    composites: {}
  }

  type DailyProgressGetPayload<S extends boolean | null | undefined | DailyProgressDefaultArgs> = $Result.GetResult<Prisma.$DailyProgressPayload, S>

  type DailyProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyProgressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyProgressCountAggregateInputType | true
    }

  export interface DailyProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyProgress'], meta: { name: 'DailyProgress' } }
    /**
     * Find zero or one DailyProgress that matches the filter.
     * @param {DailyProgressFindUniqueArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyProgressFindUniqueArgs>(args: SelectSubset<T, DailyProgressFindUniqueArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyProgress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyProgressFindUniqueOrThrowArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressFindFirstArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyProgressFindFirstArgs>(args?: SelectSubset<T, DailyProgressFindFirstArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressFindFirstOrThrowArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyProgresses
     * const dailyProgresses = await prisma.dailyProgress.findMany()
     * 
     * // Get first 10 DailyProgresses
     * const dailyProgresses = await prisma.dailyProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyProgressWithIdOnly = await prisma.dailyProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyProgressFindManyArgs>(args?: SelectSubset<T, DailyProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyProgress.
     * @param {DailyProgressCreateArgs} args - Arguments to create a DailyProgress.
     * @example
     * // Create one DailyProgress
     * const DailyProgress = await prisma.dailyProgress.create({
     *   data: {
     *     // ... data to create a DailyProgress
     *   }
     * })
     * 
     */
    create<T extends DailyProgressCreateArgs>(args: SelectSubset<T, DailyProgressCreateArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyProgresses.
     * @param {DailyProgressCreateManyArgs} args - Arguments to create many DailyProgresses.
     * @example
     * // Create many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyProgressCreateManyArgs>(args?: SelectSubset<T, DailyProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyProgresses and returns the data saved in the database.
     * @param {DailyProgressCreateManyAndReturnArgs} args - Arguments to create many DailyProgresses.
     * @example
     * // Create many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyProgresses and only return the `id`
     * const dailyProgressWithIdOnly = await prisma.dailyProgress.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyProgress.
     * @param {DailyProgressDeleteArgs} args - Arguments to delete one DailyProgress.
     * @example
     * // Delete one DailyProgress
     * const DailyProgress = await prisma.dailyProgress.delete({
     *   where: {
     *     // ... filter to delete one DailyProgress
     *   }
     * })
     * 
     */
    delete<T extends DailyProgressDeleteArgs>(args: SelectSubset<T, DailyProgressDeleteArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyProgress.
     * @param {DailyProgressUpdateArgs} args - Arguments to update one DailyProgress.
     * @example
     * // Update one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyProgressUpdateArgs>(args: SelectSubset<T, DailyProgressUpdateArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyProgresses.
     * @param {DailyProgressDeleteManyArgs} args - Arguments to filter DailyProgresses to delete.
     * @example
     * // Delete a few DailyProgresses
     * const { count } = await prisma.dailyProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyProgressDeleteManyArgs>(args?: SelectSubset<T, DailyProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyProgressUpdateManyArgs>(args: SelectSubset<T, DailyProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyProgress.
     * @param {DailyProgressUpsertArgs} args - Arguments to update or create a DailyProgress.
     * @example
     * // Update or create a DailyProgress
     * const dailyProgress = await prisma.dailyProgress.upsert({
     *   create: {
     *     // ... data to create a DailyProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyProgress we want to update
     *   }
     * })
     */
    upsert<T extends DailyProgressUpsertArgs>(args: SelectSubset<T, DailyProgressUpsertArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressCountArgs} args - Arguments to filter DailyProgresses to count.
     * @example
     * // Count the number of DailyProgresses
     * const count = await prisma.dailyProgress.count({
     *   where: {
     *     // ... the filter for the DailyProgresses we want to count
     *   }
     * })
    **/
    count<T extends DailyProgressCountArgs>(
      args?: Subset<T, DailyProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyProgressAggregateArgs>(args: Subset<T, DailyProgressAggregateArgs>): Prisma.PrismaPromise<GetDailyProgressAggregateType<T>>

    /**
     * Group by DailyProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyProgressGroupByArgs['orderBy'] }
        : { orderBy?: DailyProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyProgress model
   */
  readonly fields: DailyProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyProgress model
   */ 
  interface DailyProgressFieldRefs {
    readonly id: FieldRef<"DailyProgress", 'Int'>
    readonly date: FieldRef<"DailyProgress", 'DateTime'>
    readonly problemsSolved: FieldRef<"DailyProgress", 'Int'>
    readonly totalTimeSpent: FieldRef<"DailyProgress", 'Int'>
    readonly patternsWorked: FieldRef<"DailyProgress", 'Int'>
    readonly mockInterviews: FieldRef<"DailyProgress", 'Int'>
    readonly createdAt: FieldRef<"DailyProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyProgress findUnique
   */
  export type DailyProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress findUniqueOrThrow
   */
  export type DailyProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress findFirst
   */
  export type DailyProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyProgresses.
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyProgresses.
     */
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * DailyProgress findFirstOrThrow
   */
  export type DailyProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyProgresses.
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyProgresses.
     */
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * DailyProgress findMany
   */
  export type DailyProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Filter, which DailyProgresses to fetch.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyProgresses.
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * DailyProgress create
   */
  export type DailyProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * The data needed to create a DailyProgress.
     */
    data: XOR<DailyProgressCreateInput, DailyProgressUncheckedCreateInput>
  }

  /**
   * DailyProgress createMany
   */
  export type DailyProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyProgresses.
     */
    data: DailyProgressCreateManyInput | DailyProgressCreateManyInput[]
  }

  /**
   * DailyProgress createManyAndReturn
   */
  export type DailyProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyProgresses.
     */
    data: DailyProgressCreateManyInput | DailyProgressCreateManyInput[]
  }

  /**
   * DailyProgress update
   */
  export type DailyProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * The data needed to update a DailyProgress.
     */
    data: XOR<DailyProgressUpdateInput, DailyProgressUncheckedUpdateInput>
    /**
     * Choose, which DailyProgress to update.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress updateMany
   */
  export type DailyProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyProgresses.
     */
    data: XOR<DailyProgressUpdateManyMutationInput, DailyProgressUncheckedUpdateManyInput>
    /**
     * Filter which DailyProgresses to update
     */
    where?: DailyProgressWhereInput
  }

  /**
   * DailyProgress upsert
   */
  export type DailyProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * The filter to search for the DailyProgress to update in case it exists.
     */
    where: DailyProgressWhereUniqueInput
    /**
     * In case the DailyProgress found by the `where` argument doesn't exist, create a new DailyProgress with this data.
     */
    create: XOR<DailyProgressCreateInput, DailyProgressUncheckedCreateInput>
    /**
     * In case the DailyProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyProgressUpdateInput, DailyProgressUncheckedUpdateInput>
  }

  /**
   * DailyProgress delete
   */
  export type DailyProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Filter which DailyProgress to delete.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress deleteMany
   */
  export type DailyProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyProgresses to delete
     */
    where?: DailyProgressWhereInput
  }

  /**
   * DailyProgress without action
   */
  export type DailyProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
  }


  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalAvgAggregateOutputType = {
    id: number | null
    targetValue: number | null
    currentValue: number | null
  }

  export type GoalSumAggregateOutputType = {
    id: number | null
    targetValue: number | null
    currentValue: number | null
  }

  export type GoalMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    type: string | null
    targetValue: number | null
    currentValue: number | null
    unit: string | null
    startDate: Date | null
    deadline: Date | null
    status: string | null
    priority: string | null
    targetPattern: string | null
    targetCompany: string | null
    targetDifficulty: string | null
    completedAt: Date | null
    lastProgressUpdate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    type: string | null
    targetValue: number | null
    currentValue: number | null
    unit: string | null
    startDate: Date | null
    deadline: Date | null
    status: string | null
    priority: string | null
    targetPattern: string | null
    targetCompany: string | null
    targetDifficulty: string | null
    completedAt: Date | null
    lastProgressUpdate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    title: number
    description: number
    type: number
    targetValue: number
    currentValue: number
    unit: number
    startDate: number
    deadline: number
    status: number
    priority: number
    targetPattern: number
    targetCompany: number
    targetDifficulty: number
    completedAt: number
    lastProgressUpdate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GoalAvgAggregateInputType = {
    id?: true
    targetValue?: true
    currentValue?: true
  }

  export type GoalSumAggregateInputType = {
    id?: true
    targetValue?: true
    currentValue?: true
  }

  export type GoalMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    targetValue?: true
    currentValue?: true
    unit?: true
    startDate?: true
    deadline?: true
    status?: true
    priority?: true
    targetPattern?: true
    targetCompany?: true
    targetDifficulty?: true
    completedAt?: true
    lastProgressUpdate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    targetValue?: true
    currentValue?: true
    unit?: true
    startDate?: true
    deadline?: true
    status?: true
    priority?: true
    targetPattern?: true
    targetCompany?: true
    targetDifficulty?: true
    completedAt?: true
    lastProgressUpdate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    targetValue?: true
    currentValue?: true
    unit?: true
    startDate?: true
    deadline?: true
    status?: true
    priority?: true
    targetPattern?: true
    targetCompany?: true
    targetDifficulty?: true
    completedAt?: true
    lastProgressUpdate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _avg?: GoalAvgAggregateInputType
    _sum?: GoalSumAggregateInputType
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: number
    title: string
    description: string | null
    type: string
    targetValue: number
    currentValue: number
    unit: string
    startDate: Date
    deadline: Date
    status: string
    priority: string
    targetPattern: string | null
    targetCompany: string | null
    targetDifficulty: string | null
    completedAt: Date | null
    lastProgressUpdate: Date
    createdAt: Date
    updatedAt: Date
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    currentValue?: boolean
    unit?: boolean
    startDate?: boolean
    deadline?: boolean
    status?: boolean
    priority?: boolean
    targetPattern?: boolean
    targetCompany?: boolean
    targetDifficulty?: boolean
    completedAt?: boolean
    lastProgressUpdate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    milestones?: boolean | Goal$milestonesArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    currentValue?: boolean
    unit?: boolean
    startDate?: boolean
    deadline?: boolean
    status?: boolean
    priority?: boolean
    targetPattern?: boolean
    targetCompany?: boolean
    targetDifficulty?: boolean
    completedAt?: boolean
    lastProgressUpdate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    currentValue?: boolean
    unit?: boolean
    startDate?: boolean
    deadline?: boolean
    status?: boolean
    priority?: boolean
    targetPattern?: boolean
    targetCompany?: boolean
    targetDifficulty?: boolean
    completedAt?: boolean
    lastProgressUpdate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    milestones?: boolean | Goal$milestonesArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {
      milestones: Prisma.$MilestonePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      type: string
      targetValue: number
      currentValue: number
      unit: string
      startDate: Date
      deadline: Date
      status: string
      priority: string
      targetPattern: string | null
      targetCompany: string | null
      targetDifficulty: string | null
      completedAt: Date | null
      lastProgressUpdate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    milestones<T extends Goal$milestonesArgs<ExtArgs> = {}>(args?: Subset<T, Goal$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goal model
   */ 
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'Int'>
    readonly title: FieldRef<"Goal", 'String'>
    readonly description: FieldRef<"Goal", 'String'>
    readonly type: FieldRef<"Goal", 'String'>
    readonly targetValue: FieldRef<"Goal", 'Int'>
    readonly currentValue: FieldRef<"Goal", 'Int'>
    readonly unit: FieldRef<"Goal", 'String'>
    readonly startDate: FieldRef<"Goal", 'DateTime'>
    readonly deadline: FieldRef<"Goal", 'DateTime'>
    readonly status: FieldRef<"Goal", 'String'>
    readonly priority: FieldRef<"Goal", 'String'>
    readonly targetPattern: FieldRef<"Goal", 'String'>
    readonly targetCompany: FieldRef<"Goal", 'String'>
    readonly targetDifficulty: FieldRef<"Goal", 'String'>
    readonly completedAt: FieldRef<"Goal", 'DateTime'>
    readonly lastProgressUpdate: FieldRef<"Goal", 'DateTime'>
    readonly createdAt: FieldRef<"Goal", 'DateTime'>
    readonly updatedAt: FieldRef<"Goal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
  }

  /**
   * Goal.milestones
   */
  export type Goal$milestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    cursor?: MilestoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
  }


  /**
   * Model Milestone
   */

  export type AggregateMilestone = {
    _count: MilestoneCountAggregateOutputType | null
    _avg: MilestoneAvgAggregateOutputType | null
    _sum: MilestoneSumAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  export type MilestoneAvgAggregateOutputType = {
    id: number | null
    goalId: number | null
    targetValue: number | null
  }

  export type MilestoneSumAggregateOutputType = {
    id: number | null
    goalId: number | null
    targetValue: number | null
  }

  export type MilestoneMinAggregateOutputType = {
    id: number | null
    goalId: number | null
    title: string | null
    description: string | null
    targetValue: number | null
    dueDate: Date | null
    completed: boolean | null
    completedDate: Date | null
    completionNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilestoneMaxAggregateOutputType = {
    id: number | null
    goalId: number | null
    title: string | null
    description: string | null
    targetValue: number | null
    dueDate: Date | null
    completed: boolean | null
    completedDate: Date | null
    completionNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilestoneCountAggregateOutputType = {
    id: number
    goalId: number
    title: number
    description: number
    targetValue: number
    dueDate: number
    completed: number
    completedDate: number
    completionNote: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MilestoneAvgAggregateInputType = {
    id?: true
    goalId?: true
    targetValue?: true
  }

  export type MilestoneSumAggregateInputType = {
    id?: true
    goalId?: true
    targetValue?: true
  }

  export type MilestoneMinAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    description?: true
    targetValue?: true
    dueDate?: true
    completed?: true
    completedDate?: true
    completionNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilestoneMaxAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    description?: true
    targetValue?: true
    dueDate?: true
    completed?: true
    completedDate?: true
    completionNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilestoneCountAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    description?: true
    targetValue?: true
    dueDate?: true
    completed?: true
    completedDate?: true
    completionNote?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MilestoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestone to aggregate.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Milestones
    **/
    _count?: true | MilestoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MilestoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MilestoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MilestoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MilestoneMaxAggregateInputType
  }

  export type GetMilestoneAggregateType<T extends MilestoneAggregateArgs> = {
        [P in keyof T & keyof AggregateMilestone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMilestone[P]>
      : GetScalarType<T[P], AggregateMilestone[P]>
  }




  export type MilestoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithAggregationInput | MilestoneOrderByWithAggregationInput[]
    by: MilestoneScalarFieldEnum[] | MilestoneScalarFieldEnum
    having?: MilestoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MilestoneCountAggregateInputType | true
    _avg?: MilestoneAvgAggregateInputType
    _sum?: MilestoneSumAggregateInputType
    _min?: MilestoneMinAggregateInputType
    _max?: MilestoneMaxAggregateInputType
  }

  export type MilestoneGroupByOutputType = {
    id: number
    goalId: number
    title: string
    description: string | null
    targetValue: number
    dueDate: Date
    completed: boolean
    completedDate: Date | null
    completionNote: string | null
    createdAt: Date
    updatedAt: Date
    _count: MilestoneCountAggregateOutputType | null
    _avg: MilestoneAvgAggregateOutputType | null
    _sum: MilestoneSumAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  type GetMilestoneGroupByPayload<T extends MilestoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MilestoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MilestoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
            : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
        }
      >
    >


  export type MilestoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    description?: boolean
    targetValue?: boolean
    dueDate?: boolean
    completed?: boolean
    completedDate?: boolean
    completionNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    description?: boolean
    targetValue?: boolean
    dueDate?: boolean
    completed?: boolean
    completedDate?: boolean
    completionNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectScalar = {
    id?: boolean
    goalId?: boolean
    title?: boolean
    description?: boolean
    targetValue?: boolean
    dueDate?: boolean
    completed?: boolean
    completedDate?: boolean
    completionNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MilestoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $MilestonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Milestone"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      goalId: number
      title: string
      description: string | null
      targetValue: number
      dueDate: Date
      completed: boolean
      completedDate: Date | null
      completionNote: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["milestone"]>
    composites: {}
  }

  type MilestoneGetPayload<S extends boolean | null | undefined | MilestoneDefaultArgs> = $Result.GetResult<Prisma.$MilestonePayload, S>

  type MilestoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MilestoneFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MilestoneCountAggregateInputType | true
    }

  export interface MilestoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Milestone'], meta: { name: 'Milestone' } }
    /**
     * Find zero or one Milestone that matches the filter.
     * @param {MilestoneFindUniqueArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MilestoneFindUniqueArgs>(args: SelectSubset<T, MilestoneFindUniqueArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Milestone that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MilestoneFindUniqueOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MilestoneFindUniqueOrThrowArgs>(args: SelectSubset<T, MilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Milestone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MilestoneFindFirstArgs>(args?: SelectSubset<T, MilestoneFindFirstArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Milestone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MilestoneFindFirstOrThrowArgs>(args?: SelectSubset<T, MilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Milestones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Milestones
     * const milestones = await prisma.milestone.findMany()
     * 
     * // Get first 10 Milestones
     * const milestones = await prisma.milestone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const milestoneWithIdOnly = await prisma.milestone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MilestoneFindManyArgs>(args?: SelectSubset<T, MilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Milestone.
     * @param {MilestoneCreateArgs} args - Arguments to create a Milestone.
     * @example
     * // Create one Milestone
     * const Milestone = await prisma.milestone.create({
     *   data: {
     *     // ... data to create a Milestone
     *   }
     * })
     * 
     */
    create<T extends MilestoneCreateArgs>(args: SelectSubset<T, MilestoneCreateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Milestones.
     * @param {MilestoneCreateManyArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MilestoneCreateManyArgs>(args?: SelectSubset<T, MilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Milestones and returns the data saved in the database.
     * @param {MilestoneCreateManyAndReturnArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MilestoneCreateManyAndReturnArgs>(args?: SelectSubset<T, MilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Milestone.
     * @param {MilestoneDeleteArgs} args - Arguments to delete one Milestone.
     * @example
     * // Delete one Milestone
     * const Milestone = await prisma.milestone.delete({
     *   where: {
     *     // ... filter to delete one Milestone
     *   }
     * })
     * 
     */
    delete<T extends MilestoneDeleteArgs>(args: SelectSubset<T, MilestoneDeleteArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Milestone.
     * @param {MilestoneUpdateArgs} args - Arguments to update one Milestone.
     * @example
     * // Update one Milestone
     * const milestone = await prisma.milestone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MilestoneUpdateArgs>(args: SelectSubset<T, MilestoneUpdateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Milestones.
     * @param {MilestoneDeleteManyArgs} args - Arguments to filter Milestones to delete.
     * @example
     * // Delete a few Milestones
     * const { count } = await prisma.milestone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MilestoneDeleteManyArgs>(args?: SelectSubset<T, MilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MilestoneUpdateManyArgs>(args: SelectSubset<T, MilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Milestone.
     * @param {MilestoneUpsertArgs} args - Arguments to update or create a Milestone.
     * @example
     * // Update or create a Milestone
     * const milestone = await prisma.milestone.upsert({
     *   create: {
     *     // ... data to create a Milestone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Milestone we want to update
     *   }
     * })
     */
    upsert<T extends MilestoneUpsertArgs>(args: SelectSubset<T, MilestoneUpsertArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneCountArgs} args - Arguments to filter Milestones to count.
     * @example
     * // Count the number of Milestones
     * const count = await prisma.milestone.count({
     *   where: {
     *     // ... the filter for the Milestones we want to count
     *   }
     * })
    **/
    count<T extends MilestoneCountArgs>(
      args?: Subset<T, MilestoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MilestoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MilestoneAggregateArgs>(args: Subset<T, MilestoneAggregateArgs>): Prisma.PrismaPromise<GetMilestoneAggregateType<T>>

    /**
     * Group by Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MilestoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MilestoneGroupByArgs['orderBy'] }
        : { orderBy?: MilestoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Milestone model
   */
  readonly fields: MilestoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Milestone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MilestoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Milestone model
   */ 
  interface MilestoneFieldRefs {
    readonly id: FieldRef<"Milestone", 'Int'>
    readonly goalId: FieldRef<"Milestone", 'Int'>
    readonly title: FieldRef<"Milestone", 'String'>
    readonly description: FieldRef<"Milestone", 'String'>
    readonly targetValue: FieldRef<"Milestone", 'Int'>
    readonly dueDate: FieldRef<"Milestone", 'DateTime'>
    readonly completed: FieldRef<"Milestone", 'Boolean'>
    readonly completedDate: FieldRef<"Milestone", 'DateTime'>
    readonly completionNote: FieldRef<"Milestone", 'String'>
    readonly createdAt: FieldRef<"Milestone", 'DateTime'>
    readonly updatedAt: FieldRef<"Milestone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Milestone findUnique
   */
  export type MilestoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findUniqueOrThrow
   */
  export type MilestoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findFirst
   */
  export type MilestoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findFirstOrThrow
   */
  export type MilestoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findMany
   */
  export type MilestoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestones to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone create
   */
  export type MilestoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to create a Milestone.
     */
    data: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
  }

  /**
   * Milestone createMany
   */
  export type MilestoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
  }

  /**
   * Milestone createManyAndReturn
   */
  export type MilestoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone update
   */
  export type MilestoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to update a Milestone.
     */
    data: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
    /**
     * Choose, which Milestone to update.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone updateMany
   */
  export type MilestoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
  }

  /**
   * Milestone upsert
   */
  export type MilestoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The filter to search for the Milestone to update in case it exists.
     */
    where: MilestoneWhereUniqueInput
    /**
     * In case the Milestone found by the `where` argument doesn't exist, create a new Milestone with this data.
     */
    create: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
    /**
     * In case the Milestone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
  }

  /**
   * Milestone delete
   */
  export type MilestoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter which Milestone to delete.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone deleteMany
   */
  export type MilestoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestones to delete
     */
    where?: MilestoneWhereInput
  }

  /**
   * Milestone without action
   */
  export type MilestoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProblemScalarFieldEnum: {
    id: 'id',
    platform: 'platform',
    problemId: 'problemId',
    title: 'title',
    difficulty: 'difficulty',
    url: 'url',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    source: 'source'
  };

  export type ProblemScalarFieldEnum = (typeof ProblemScalarFieldEnum)[keyof typeof ProblemScalarFieldEnum]


  export const ProblemCompanyScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    companyId: 'companyId'
  };

  export type ProblemCompanyScalarFieldEnum = (typeof ProblemCompanyScalarFieldEnum)[keyof typeof ProblemCompanyScalarFieldEnum]


  export const ProblemTagScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    tag: 'tag'
  };

  export type ProblemTagScalarFieldEnum = (typeof ProblemTagScalarFieldEnum)[keyof typeof ProblemTagScalarFieldEnum]


  export const PatternScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    description: 'description'
  };

  export type PatternScalarFieldEnum = (typeof PatternScalarFieldEnum)[keyof typeof PatternScalarFieldEnum]


  export const CompanyCardScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    targetProblems: 'targetProblems',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyCardScalarFieldEnum = (typeof CompanyCardScalarFieldEnum)[keyof typeof CompanyCardScalarFieldEnum]


  export const ProblemPatternScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    patternId: 'patternId'
  };

  export type ProblemPatternScalarFieldEnum = (typeof ProblemPatternScalarFieldEnum)[keyof typeof ProblemPatternScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    attemptNumber: 'attemptNumber',
    timeSpentSeconds: 'timeSpentSeconds',
    status: 'status',
    notes: 'notes',
    submittedAt: 'submittedAt',
    createdAt: 'createdAt',
    attemptType: 'attemptType',
    wasHintUsed: 'wasHintUsed',
    mistakeNote: 'mistakeNote',
    approachNote: 'approachNote',
    patternRecognitionSeconds: 'patternRecognitionSeconds'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    durationSeconds: 'durationSeconds',
    notes: 'notes'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const RevisionScalarFieldEnum: {
    id: 'id',
    submissionId: 'submissionId',
    intervalLevel: 'intervalLevel',
    nextReviewDate: 'nextReviewDate',
    completed: 'completed',
    completedAt: 'completedAt',
    wasSuccessful: 'wasSuccessful',
    timeSpentSeconds: 'timeSpentSeconds',
    solvedWithoutHint: 'solvedWithoutHint',
    confidenceLevel: 'confidenceLevel',
    difficultyRating: 'difficultyRating',
    notes: 'notes',
    previousRevisionId: 'previousRevisionId'
  };

  export type RevisionScalarFieldEnum = (typeof RevisionScalarFieldEnum)[keyof typeof RevisionScalarFieldEnum]


  export const MockInterviewScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    date: 'date',
    timeLimit: 'timeLimit',
    timeTakenSeconds: 'timeTakenSeconds',
    patternRecognitionSeconds: 'patternRecognitionSeconds',
    solved: 'solved',
    explanationScore: 'explanationScore',
    codeQualityScore: 'codeQualityScore',
    overallScore: 'overallScore',
    notes: 'notes'
  };

  export type MockInterviewScalarFieldEnum = (typeof MockInterviewScalarFieldEnum)[keyof typeof MockInterviewScalarFieldEnum]


  export const DailyProgressScalarFieldEnum: {
    id: 'id',
    date: 'date',
    problemsSolved: 'problemsSolved',
    totalTimeSpent: 'totalTimeSpent',
    patternsWorked: 'patternsWorked',
    mockInterviews: 'mockInterviews',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyProgressScalarFieldEnum = (typeof DailyProgressScalarFieldEnum)[keyof typeof DailyProgressScalarFieldEnum]


  export const GoalScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    targetValue: 'targetValue',
    currentValue: 'currentValue',
    unit: 'unit',
    startDate: 'startDate',
    deadline: 'deadline',
    status: 'status',
    priority: 'priority',
    targetPattern: 'targetPattern',
    targetCompany: 'targetCompany',
    targetDifficulty: 'targetDifficulty',
    completedAt: 'completedAt',
    lastProgressUpdate: 'lastProgressUpdate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const MilestoneScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    title: 'title',
    description: 'description',
    targetValue: 'targetValue',
    dueDate: 'dueDate',
    completed: 'completed',
    completedDate: 'completedDate',
    completionNote: 'completionNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MilestoneScalarFieldEnum = (typeof MilestoneScalarFieldEnum)[keyof typeof MilestoneScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ProblemWhereInput = {
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    id?: IntFilter<"Problem"> | number
    platform?: StringFilter<"Problem"> | string
    problemId?: StringFilter<"Problem"> | string
    title?: StringFilter<"Problem"> | string
    difficulty?: StringFilter<"Problem"> | string
    url?: StringNullableFilter<"Problem"> | string | null
    notes?: StringNullableFilter<"Problem"> | string | null
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
    source?: StringFilter<"Problem"> | string
    tags?: ProblemTagListRelationFilter
    companies?: ProblemCompanyListRelationFilter
    patterns?: ProblemPatternListRelationFilter
    submissions?: SubmissionListRelationFilter
    sessions?: SessionListRelationFilter
    mockInterviews?: MockInterviewListRelationFilter
  }

  export type ProblemOrderByWithRelationInput = {
    id?: SortOrder
    platform?: SortOrder
    problemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    url?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    source?: SortOrder
    tags?: ProblemTagOrderByRelationAggregateInput
    companies?: ProblemCompanyOrderByRelationAggregateInput
    patterns?: ProblemPatternOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    mockInterviews?: MockInterviewOrderByRelationAggregateInput
  }

  export type ProblemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    platform_problemId?: ProblemPlatformProblemIdCompoundUniqueInput
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    platform?: StringFilter<"Problem"> | string
    problemId?: StringFilter<"Problem"> | string
    title?: StringFilter<"Problem"> | string
    difficulty?: StringFilter<"Problem"> | string
    url?: StringNullableFilter<"Problem"> | string | null
    notes?: StringNullableFilter<"Problem"> | string | null
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
    source?: StringFilter<"Problem"> | string
    tags?: ProblemTagListRelationFilter
    companies?: ProblemCompanyListRelationFilter
    patterns?: ProblemPatternListRelationFilter
    submissions?: SubmissionListRelationFilter
    sessions?: SessionListRelationFilter
    mockInterviews?: MockInterviewListRelationFilter
  }, "id" | "platform_problemId">

  export type ProblemOrderByWithAggregationInput = {
    id?: SortOrder
    platform?: SortOrder
    problemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    url?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    source?: SortOrder
    _count?: ProblemCountOrderByAggregateInput
    _avg?: ProblemAvgOrderByAggregateInput
    _max?: ProblemMaxOrderByAggregateInput
    _min?: ProblemMinOrderByAggregateInput
    _sum?: ProblemSumOrderByAggregateInput
  }

  export type ProblemScalarWhereWithAggregatesInput = {
    AND?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    OR?: ProblemScalarWhereWithAggregatesInput[]
    NOT?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Problem"> | number
    platform?: StringWithAggregatesFilter<"Problem"> | string
    problemId?: StringWithAggregatesFilter<"Problem"> | string
    title?: StringWithAggregatesFilter<"Problem"> | string
    difficulty?: StringWithAggregatesFilter<"Problem"> | string
    url?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Problem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Problem"> | Date | string
    source?: StringWithAggregatesFilter<"Problem"> | string
  }

  export type ProblemCompanyWhereInput = {
    AND?: ProblemCompanyWhereInput | ProblemCompanyWhereInput[]
    OR?: ProblemCompanyWhereInput[]
    NOT?: ProblemCompanyWhereInput | ProblemCompanyWhereInput[]
    id?: IntFilter<"ProblemCompany"> | number
    problemId?: IntFilter<"ProblemCompany"> | number
    companyId?: IntFilter<"ProblemCompany"> | number
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
    company?: XOR<CompanyCardRelationFilter, CompanyCardWhereInput>
  }

  export type ProblemCompanyOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
    problem?: ProblemOrderByWithRelationInput
    company?: CompanyCardOrderByWithRelationInput
  }

  export type ProblemCompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    problemId_companyId?: ProblemCompanyProblemIdCompanyIdCompoundUniqueInput
    AND?: ProblemCompanyWhereInput | ProblemCompanyWhereInput[]
    OR?: ProblemCompanyWhereInput[]
    NOT?: ProblemCompanyWhereInput | ProblemCompanyWhereInput[]
    problemId?: IntFilter<"ProblemCompany"> | number
    companyId?: IntFilter<"ProblemCompany"> | number
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
    company?: XOR<CompanyCardRelationFilter, CompanyCardWhereInput>
  }, "id" | "problemId_companyId">

  export type ProblemCompanyOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
    _count?: ProblemCompanyCountOrderByAggregateInput
    _avg?: ProblemCompanyAvgOrderByAggregateInput
    _max?: ProblemCompanyMaxOrderByAggregateInput
    _min?: ProblemCompanyMinOrderByAggregateInput
    _sum?: ProblemCompanySumOrderByAggregateInput
  }

  export type ProblemCompanyScalarWhereWithAggregatesInput = {
    AND?: ProblemCompanyScalarWhereWithAggregatesInput | ProblemCompanyScalarWhereWithAggregatesInput[]
    OR?: ProblemCompanyScalarWhereWithAggregatesInput[]
    NOT?: ProblemCompanyScalarWhereWithAggregatesInput | ProblemCompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProblemCompany"> | number
    problemId?: IntWithAggregatesFilter<"ProblemCompany"> | number
    companyId?: IntWithAggregatesFilter<"ProblemCompany"> | number
  }

  export type ProblemTagWhereInput = {
    AND?: ProblemTagWhereInput | ProblemTagWhereInput[]
    OR?: ProblemTagWhereInput[]
    NOT?: ProblemTagWhereInput | ProblemTagWhereInput[]
    id?: IntFilter<"ProblemTag"> | number
    problemId?: IntFilter<"ProblemTag"> | number
    tag?: StringFilter<"ProblemTag"> | string
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
  }

  export type ProblemTagOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    tag?: SortOrder
    problem?: ProblemOrderByWithRelationInput
  }

  export type ProblemTagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProblemTagWhereInput | ProblemTagWhereInput[]
    OR?: ProblemTagWhereInput[]
    NOT?: ProblemTagWhereInput | ProblemTagWhereInput[]
    problemId?: IntFilter<"ProblemTag"> | number
    tag?: StringFilter<"ProblemTag"> | string
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
  }, "id">

  export type ProblemTagOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    tag?: SortOrder
    _count?: ProblemTagCountOrderByAggregateInput
    _avg?: ProblemTagAvgOrderByAggregateInput
    _max?: ProblemTagMaxOrderByAggregateInput
    _min?: ProblemTagMinOrderByAggregateInput
    _sum?: ProblemTagSumOrderByAggregateInput
  }

  export type ProblemTagScalarWhereWithAggregatesInput = {
    AND?: ProblemTagScalarWhereWithAggregatesInput | ProblemTagScalarWhereWithAggregatesInput[]
    OR?: ProblemTagScalarWhereWithAggregatesInput[]
    NOT?: ProblemTagScalarWhereWithAggregatesInput | ProblemTagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProblemTag"> | number
    problemId?: IntWithAggregatesFilter<"ProblemTag"> | number
    tag?: StringWithAggregatesFilter<"ProblemTag"> | string
  }

  export type PatternWhereInput = {
    AND?: PatternWhereInput | PatternWhereInput[]
    OR?: PatternWhereInput[]
    NOT?: PatternWhereInput | PatternWhereInput[]
    id?: IntFilter<"Pattern"> | number
    name?: StringFilter<"Pattern"> | string
    category?: StringFilter<"Pattern"> | string
    description?: StringNullableFilter<"Pattern"> | string | null
    problems?: ProblemPatternListRelationFilter
  }

  export type PatternOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    problems?: ProblemPatternOrderByRelationAggregateInput
  }

  export type PatternWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: PatternWhereInput | PatternWhereInput[]
    OR?: PatternWhereInput[]
    NOT?: PatternWhereInput | PatternWhereInput[]
    category?: StringFilter<"Pattern"> | string
    description?: StringNullableFilter<"Pattern"> | string | null
    problems?: ProblemPatternListRelationFilter
  }, "id" | "name">

  export type PatternOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: PatternCountOrderByAggregateInput
    _avg?: PatternAvgOrderByAggregateInput
    _max?: PatternMaxOrderByAggregateInput
    _min?: PatternMinOrderByAggregateInput
    _sum?: PatternSumOrderByAggregateInput
  }

  export type PatternScalarWhereWithAggregatesInput = {
    AND?: PatternScalarWhereWithAggregatesInput | PatternScalarWhereWithAggregatesInput[]
    OR?: PatternScalarWhereWithAggregatesInput[]
    NOT?: PatternScalarWhereWithAggregatesInput | PatternScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pattern"> | number
    name?: StringWithAggregatesFilter<"Pattern"> | string
    category?: StringWithAggregatesFilter<"Pattern"> | string
    description?: StringNullableWithAggregatesFilter<"Pattern"> | string | null
  }

  export type CompanyCardWhereInput = {
    AND?: CompanyCardWhereInput | CompanyCardWhereInput[]
    OR?: CompanyCardWhereInput[]
    NOT?: CompanyCardWhereInput | CompanyCardWhereInput[]
    id?: IntFilter<"CompanyCard"> | number
    name?: StringFilter<"CompanyCard"> | string
    icon?: StringFilter<"CompanyCard"> | string
    targetProblems?: IntFilter<"CompanyCard"> | number
    createdAt?: DateTimeFilter<"CompanyCard"> | Date | string
    updatedAt?: DateTimeFilter<"CompanyCard"> | Date | string
    problems?: ProblemCompanyListRelationFilter
  }

  export type CompanyCardOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    targetProblems?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problems?: ProblemCompanyOrderByRelationAggregateInput
  }

  export type CompanyCardWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CompanyCardWhereInput | CompanyCardWhereInput[]
    OR?: CompanyCardWhereInput[]
    NOT?: CompanyCardWhereInput | CompanyCardWhereInput[]
    icon?: StringFilter<"CompanyCard"> | string
    targetProblems?: IntFilter<"CompanyCard"> | number
    createdAt?: DateTimeFilter<"CompanyCard"> | Date | string
    updatedAt?: DateTimeFilter<"CompanyCard"> | Date | string
    problems?: ProblemCompanyListRelationFilter
  }, "id" | "name">

  export type CompanyCardOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    targetProblems?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCardCountOrderByAggregateInput
    _avg?: CompanyCardAvgOrderByAggregateInput
    _max?: CompanyCardMaxOrderByAggregateInput
    _min?: CompanyCardMinOrderByAggregateInput
    _sum?: CompanyCardSumOrderByAggregateInput
  }

  export type CompanyCardScalarWhereWithAggregatesInput = {
    AND?: CompanyCardScalarWhereWithAggregatesInput | CompanyCardScalarWhereWithAggregatesInput[]
    OR?: CompanyCardScalarWhereWithAggregatesInput[]
    NOT?: CompanyCardScalarWhereWithAggregatesInput | CompanyCardScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CompanyCard"> | number
    name?: StringWithAggregatesFilter<"CompanyCard"> | string
    icon?: StringWithAggregatesFilter<"CompanyCard"> | string
    targetProblems?: IntWithAggregatesFilter<"CompanyCard"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CompanyCard"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CompanyCard"> | Date | string
  }

  export type ProblemPatternWhereInput = {
    AND?: ProblemPatternWhereInput | ProblemPatternWhereInput[]
    OR?: ProblemPatternWhereInput[]
    NOT?: ProblemPatternWhereInput | ProblemPatternWhereInput[]
    id?: IntFilter<"ProblemPattern"> | number
    problemId?: IntFilter<"ProblemPattern"> | number
    patternId?: IntFilter<"ProblemPattern"> | number
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
    pattern?: XOR<PatternRelationFilter, PatternWhereInput>
  }

  export type ProblemPatternOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
    problem?: ProblemOrderByWithRelationInput
    pattern?: PatternOrderByWithRelationInput
  }

  export type ProblemPatternWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    problemId_patternId?: ProblemPatternProblemIdPatternIdCompoundUniqueInput
    AND?: ProblemPatternWhereInput | ProblemPatternWhereInput[]
    OR?: ProblemPatternWhereInput[]
    NOT?: ProblemPatternWhereInput | ProblemPatternWhereInput[]
    problemId?: IntFilter<"ProblemPattern"> | number
    patternId?: IntFilter<"ProblemPattern"> | number
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
    pattern?: XOR<PatternRelationFilter, PatternWhereInput>
  }, "id" | "problemId_patternId">

  export type ProblemPatternOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
    _count?: ProblemPatternCountOrderByAggregateInput
    _avg?: ProblemPatternAvgOrderByAggregateInput
    _max?: ProblemPatternMaxOrderByAggregateInput
    _min?: ProblemPatternMinOrderByAggregateInput
    _sum?: ProblemPatternSumOrderByAggregateInput
  }

  export type ProblemPatternScalarWhereWithAggregatesInput = {
    AND?: ProblemPatternScalarWhereWithAggregatesInput | ProblemPatternScalarWhereWithAggregatesInput[]
    OR?: ProblemPatternScalarWhereWithAggregatesInput[]
    NOT?: ProblemPatternScalarWhereWithAggregatesInput | ProblemPatternScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProblemPattern"> | number
    problemId?: IntWithAggregatesFilter<"ProblemPattern"> | number
    patternId?: IntWithAggregatesFilter<"ProblemPattern"> | number
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: IntFilter<"Submission"> | number
    problemId?: IntFilter<"Submission"> | number
    attemptNumber?: IntFilter<"Submission"> | number
    timeSpentSeconds?: IntFilter<"Submission"> | number
    status?: StringFilter<"Submission"> | string
    notes?: StringNullableFilter<"Submission"> | string | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    attemptType?: StringFilter<"Submission"> | string
    wasHintUsed?: BoolFilter<"Submission"> | boolean
    mistakeNote?: StringNullableFilter<"Submission"> | string | null
    approachNote?: StringNullableFilter<"Submission"> | string | null
    patternRecognitionSeconds?: IntNullableFilter<"Submission"> | number | null
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
    revisions?: RevisionListRelationFilter
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    attemptType?: SortOrder
    wasHintUsed?: SortOrder
    mistakeNote?: SortOrderInput | SortOrder
    approachNote?: SortOrderInput | SortOrder
    patternRecognitionSeconds?: SortOrderInput | SortOrder
    problem?: ProblemOrderByWithRelationInput
    revisions?: RevisionOrderByRelationAggregateInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    problemId?: IntFilter<"Submission"> | number
    attemptNumber?: IntFilter<"Submission"> | number
    timeSpentSeconds?: IntFilter<"Submission"> | number
    status?: StringFilter<"Submission"> | string
    notes?: StringNullableFilter<"Submission"> | string | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    attemptType?: StringFilter<"Submission"> | string
    wasHintUsed?: BoolFilter<"Submission"> | boolean
    mistakeNote?: StringNullableFilter<"Submission"> | string | null
    approachNote?: StringNullableFilter<"Submission"> | string | null
    patternRecognitionSeconds?: IntNullableFilter<"Submission"> | number | null
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
    revisions?: RevisionListRelationFilter
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    attemptType?: SortOrder
    wasHintUsed?: SortOrder
    mistakeNote?: SortOrderInput | SortOrder
    approachNote?: SortOrderInput | SortOrder
    patternRecognitionSeconds?: SortOrderInput | SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Submission"> | number
    problemId?: IntWithAggregatesFilter<"Submission"> | number
    attemptNumber?: IntWithAggregatesFilter<"Submission"> | number
    timeSpentSeconds?: IntWithAggregatesFilter<"Submission"> | number
    status?: StringWithAggregatesFilter<"Submission"> | string
    notes?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    submittedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    attemptType?: StringWithAggregatesFilter<"Submission"> | string
    wasHintUsed?: BoolWithAggregatesFilter<"Submission"> | boolean
    mistakeNote?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    approachNote?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    patternRecognitionSeconds?: IntNullableWithAggregatesFilter<"Submission"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: IntFilter<"Session"> | number
    problemId?: IntFilter<"Session"> | number
    startedAt?: DateTimeFilter<"Session"> | Date | string
    endedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    durationSeconds?: IntNullableFilter<"Session"> | number | null
    notes?: StringNullableFilter<"Session"> | string | null
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    problem?: ProblemOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    problemId?: IntFilter<"Session"> | number
    startedAt?: DateTimeFilter<"Session"> | Date | string
    endedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    durationSeconds?: IntNullableFilter<"Session"> | number | null
    notes?: StringNullableFilter<"Session"> | string | null
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Session"> | number
    problemId?: IntWithAggregatesFilter<"Session"> | number
    startedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    durationSeconds?: IntNullableWithAggregatesFilter<"Session"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Session"> | string | null
  }

  export type RevisionWhereInput = {
    AND?: RevisionWhereInput | RevisionWhereInput[]
    OR?: RevisionWhereInput[]
    NOT?: RevisionWhereInput | RevisionWhereInput[]
    id?: IntFilter<"Revision"> | number
    submissionId?: IntFilter<"Revision"> | number
    intervalLevel?: IntFilter<"Revision"> | number
    nextReviewDate?: DateTimeFilter<"Revision"> | Date | string
    completed?: BoolFilter<"Revision"> | boolean
    completedAt?: DateTimeNullableFilter<"Revision"> | Date | string | null
    wasSuccessful?: BoolNullableFilter<"Revision"> | boolean | null
    timeSpentSeconds?: IntNullableFilter<"Revision"> | number | null
    solvedWithoutHint?: BoolNullableFilter<"Revision"> | boolean | null
    confidenceLevel?: IntNullableFilter<"Revision"> | number | null
    difficultyRating?: IntNullableFilter<"Revision"> | number | null
    notes?: StringNullableFilter<"Revision"> | string | null
    previousRevisionId?: IntNullableFilter<"Revision"> | number | null
    submission?: XOR<SubmissionRelationFilter, SubmissionWhereInput>
  }

  export type RevisionOrderByWithRelationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    nextReviewDate?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    wasSuccessful?: SortOrderInput | SortOrder
    timeSpentSeconds?: SortOrderInput | SortOrder
    solvedWithoutHint?: SortOrderInput | SortOrder
    confidenceLevel?: SortOrderInput | SortOrder
    difficultyRating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    previousRevisionId?: SortOrderInput | SortOrder
    submission?: SubmissionOrderByWithRelationInput
  }

  export type RevisionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RevisionWhereInput | RevisionWhereInput[]
    OR?: RevisionWhereInput[]
    NOT?: RevisionWhereInput | RevisionWhereInput[]
    submissionId?: IntFilter<"Revision"> | number
    intervalLevel?: IntFilter<"Revision"> | number
    nextReviewDate?: DateTimeFilter<"Revision"> | Date | string
    completed?: BoolFilter<"Revision"> | boolean
    completedAt?: DateTimeNullableFilter<"Revision"> | Date | string | null
    wasSuccessful?: BoolNullableFilter<"Revision"> | boolean | null
    timeSpentSeconds?: IntNullableFilter<"Revision"> | number | null
    solvedWithoutHint?: BoolNullableFilter<"Revision"> | boolean | null
    confidenceLevel?: IntNullableFilter<"Revision"> | number | null
    difficultyRating?: IntNullableFilter<"Revision"> | number | null
    notes?: StringNullableFilter<"Revision"> | string | null
    previousRevisionId?: IntNullableFilter<"Revision"> | number | null
    submission?: XOR<SubmissionRelationFilter, SubmissionWhereInput>
  }, "id">

  export type RevisionOrderByWithAggregationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    nextReviewDate?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    wasSuccessful?: SortOrderInput | SortOrder
    timeSpentSeconds?: SortOrderInput | SortOrder
    solvedWithoutHint?: SortOrderInput | SortOrder
    confidenceLevel?: SortOrderInput | SortOrder
    difficultyRating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    previousRevisionId?: SortOrderInput | SortOrder
    _count?: RevisionCountOrderByAggregateInput
    _avg?: RevisionAvgOrderByAggregateInput
    _max?: RevisionMaxOrderByAggregateInput
    _min?: RevisionMinOrderByAggregateInput
    _sum?: RevisionSumOrderByAggregateInput
  }

  export type RevisionScalarWhereWithAggregatesInput = {
    AND?: RevisionScalarWhereWithAggregatesInput | RevisionScalarWhereWithAggregatesInput[]
    OR?: RevisionScalarWhereWithAggregatesInput[]
    NOT?: RevisionScalarWhereWithAggregatesInput | RevisionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Revision"> | number
    submissionId?: IntWithAggregatesFilter<"Revision"> | number
    intervalLevel?: IntWithAggregatesFilter<"Revision"> | number
    nextReviewDate?: DateTimeWithAggregatesFilter<"Revision"> | Date | string
    completed?: BoolWithAggregatesFilter<"Revision"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"Revision"> | Date | string | null
    wasSuccessful?: BoolNullableWithAggregatesFilter<"Revision"> | boolean | null
    timeSpentSeconds?: IntNullableWithAggregatesFilter<"Revision"> | number | null
    solvedWithoutHint?: BoolNullableWithAggregatesFilter<"Revision"> | boolean | null
    confidenceLevel?: IntNullableWithAggregatesFilter<"Revision"> | number | null
    difficultyRating?: IntNullableWithAggregatesFilter<"Revision"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Revision"> | string | null
    previousRevisionId?: IntNullableWithAggregatesFilter<"Revision"> | number | null
  }

  export type MockInterviewWhereInput = {
    AND?: MockInterviewWhereInput | MockInterviewWhereInput[]
    OR?: MockInterviewWhereInput[]
    NOT?: MockInterviewWhereInput | MockInterviewWhereInput[]
    id?: IntFilter<"MockInterview"> | number
    problemId?: IntFilter<"MockInterview"> | number
    date?: DateTimeFilter<"MockInterview"> | Date | string
    timeLimit?: IntFilter<"MockInterview"> | number
    timeTakenSeconds?: IntNullableFilter<"MockInterview"> | number | null
    patternRecognitionSeconds?: IntNullableFilter<"MockInterview"> | number | null
    solved?: BoolFilter<"MockInterview"> | boolean
    explanationScore?: IntNullableFilter<"MockInterview"> | number | null
    codeQualityScore?: IntNullableFilter<"MockInterview"> | number | null
    overallScore?: FloatNullableFilter<"MockInterview"> | number | null
    notes?: StringNullableFilter<"MockInterview"> | string | null
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
  }

  export type MockInterviewOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    date?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrderInput | SortOrder
    patternRecognitionSeconds?: SortOrderInput | SortOrder
    solved?: SortOrder
    explanationScore?: SortOrderInput | SortOrder
    codeQualityScore?: SortOrderInput | SortOrder
    overallScore?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    problem?: ProblemOrderByWithRelationInput
  }

  export type MockInterviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MockInterviewWhereInput | MockInterviewWhereInput[]
    OR?: MockInterviewWhereInput[]
    NOT?: MockInterviewWhereInput | MockInterviewWhereInput[]
    problemId?: IntFilter<"MockInterview"> | number
    date?: DateTimeFilter<"MockInterview"> | Date | string
    timeLimit?: IntFilter<"MockInterview"> | number
    timeTakenSeconds?: IntNullableFilter<"MockInterview"> | number | null
    patternRecognitionSeconds?: IntNullableFilter<"MockInterview"> | number | null
    solved?: BoolFilter<"MockInterview"> | boolean
    explanationScore?: IntNullableFilter<"MockInterview"> | number | null
    codeQualityScore?: IntNullableFilter<"MockInterview"> | number | null
    overallScore?: FloatNullableFilter<"MockInterview"> | number | null
    notes?: StringNullableFilter<"MockInterview"> | string | null
    problem?: XOR<ProblemRelationFilter, ProblemWhereInput>
  }, "id">

  export type MockInterviewOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    date?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrderInput | SortOrder
    patternRecognitionSeconds?: SortOrderInput | SortOrder
    solved?: SortOrder
    explanationScore?: SortOrderInput | SortOrder
    codeQualityScore?: SortOrderInput | SortOrder
    overallScore?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: MockInterviewCountOrderByAggregateInput
    _avg?: MockInterviewAvgOrderByAggregateInput
    _max?: MockInterviewMaxOrderByAggregateInput
    _min?: MockInterviewMinOrderByAggregateInput
    _sum?: MockInterviewSumOrderByAggregateInput
  }

  export type MockInterviewScalarWhereWithAggregatesInput = {
    AND?: MockInterviewScalarWhereWithAggregatesInput | MockInterviewScalarWhereWithAggregatesInput[]
    OR?: MockInterviewScalarWhereWithAggregatesInput[]
    NOT?: MockInterviewScalarWhereWithAggregatesInput | MockInterviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MockInterview"> | number
    problemId?: IntWithAggregatesFilter<"MockInterview"> | number
    date?: DateTimeWithAggregatesFilter<"MockInterview"> | Date | string
    timeLimit?: IntWithAggregatesFilter<"MockInterview"> | number
    timeTakenSeconds?: IntNullableWithAggregatesFilter<"MockInterview"> | number | null
    patternRecognitionSeconds?: IntNullableWithAggregatesFilter<"MockInterview"> | number | null
    solved?: BoolWithAggregatesFilter<"MockInterview"> | boolean
    explanationScore?: IntNullableWithAggregatesFilter<"MockInterview"> | number | null
    codeQualityScore?: IntNullableWithAggregatesFilter<"MockInterview"> | number | null
    overallScore?: FloatNullableWithAggregatesFilter<"MockInterview"> | number | null
    notes?: StringNullableWithAggregatesFilter<"MockInterview"> | string | null
  }

  export type DailyProgressWhereInput = {
    AND?: DailyProgressWhereInput | DailyProgressWhereInput[]
    OR?: DailyProgressWhereInput[]
    NOT?: DailyProgressWhereInput | DailyProgressWhereInput[]
    id?: IntFilter<"DailyProgress"> | number
    date?: DateTimeFilter<"DailyProgress"> | Date | string
    problemsSolved?: IntFilter<"DailyProgress"> | number
    totalTimeSpent?: IntFilter<"DailyProgress"> | number
    patternsWorked?: IntFilter<"DailyProgress"> | number
    mockInterviews?: IntFilter<"DailyProgress"> | number
    createdAt?: DateTimeFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeFilter<"DailyProgress"> | Date | string
  }

  export type DailyProgressOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    date?: Date | string
    AND?: DailyProgressWhereInput | DailyProgressWhereInput[]
    OR?: DailyProgressWhereInput[]
    NOT?: DailyProgressWhereInput | DailyProgressWhereInput[]
    problemsSolved?: IntFilter<"DailyProgress"> | number
    totalTimeSpent?: IntFilter<"DailyProgress"> | number
    patternsWorked?: IntFilter<"DailyProgress"> | number
    mockInterviews?: IntFilter<"DailyProgress"> | number
    createdAt?: DateTimeFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeFilter<"DailyProgress"> | Date | string
  }, "id" | "date">

  export type DailyProgressOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyProgressCountOrderByAggregateInput
    _avg?: DailyProgressAvgOrderByAggregateInput
    _max?: DailyProgressMaxOrderByAggregateInput
    _min?: DailyProgressMinOrderByAggregateInput
    _sum?: DailyProgressSumOrderByAggregateInput
  }

  export type DailyProgressScalarWhereWithAggregatesInput = {
    AND?: DailyProgressScalarWhereWithAggregatesInput | DailyProgressScalarWhereWithAggregatesInput[]
    OR?: DailyProgressScalarWhereWithAggregatesInput[]
    NOT?: DailyProgressScalarWhereWithAggregatesInput | DailyProgressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DailyProgress"> | number
    date?: DateTimeWithAggregatesFilter<"DailyProgress"> | Date | string
    problemsSolved?: IntWithAggregatesFilter<"DailyProgress"> | number
    totalTimeSpent?: IntWithAggregatesFilter<"DailyProgress"> | number
    patternsWorked?: IntWithAggregatesFilter<"DailyProgress"> | number
    mockInterviews?: IntWithAggregatesFilter<"DailyProgress"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyProgress"> | Date | string
  }

  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: IntFilter<"Goal"> | number
    title?: StringFilter<"Goal"> | string
    description?: StringNullableFilter<"Goal"> | string | null
    type?: StringFilter<"Goal"> | string
    targetValue?: IntFilter<"Goal"> | number
    currentValue?: IntFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    deadline?: DateTimeFilter<"Goal"> | Date | string
    status?: StringFilter<"Goal"> | string
    priority?: StringFilter<"Goal"> | string
    targetPattern?: StringNullableFilter<"Goal"> | string | null
    targetCompany?: StringNullableFilter<"Goal"> | string | null
    targetDifficulty?: StringNullableFilter<"Goal"> | string | null
    completedAt?: DateTimeNullableFilter<"Goal"> | Date | string | null
    lastProgressUpdate?: DateTimeFilter<"Goal"> | Date | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    milestones?: MilestoneListRelationFilter
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    targetPattern?: SortOrderInput | SortOrder
    targetCompany?: SortOrderInput | SortOrder
    targetDifficulty?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    lastProgressUpdate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    milestones?: MilestoneOrderByRelationAggregateInput
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    title?: StringFilter<"Goal"> | string
    description?: StringNullableFilter<"Goal"> | string | null
    type?: StringFilter<"Goal"> | string
    targetValue?: IntFilter<"Goal"> | number
    currentValue?: IntFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    deadline?: DateTimeFilter<"Goal"> | Date | string
    status?: StringFilter<"Goal"> | string
    priority?: StringFilter<"Goal"> | string
    targetPattern?: StringNullableFilter<"Goal"> | string | null
    targetCompany?: StringNullableFilter<"Goal"> | string | null
    targetDifficulty?: StringNullableFilter<"Goal"> | string | null
    completedAt?: DateTimeNullableFilter<"Goal"> | Date | string | null
    lastProgressUpdate?: DateTimeFilter<"Goal"> | Date | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    milestones?: MilestoneListRelationFilter
  }, "id">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    targetPattern?: SortOrderInput | SortOrder
    targetCompany?: SortOrderInput | SortOrder
    targetDifficulty?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    lastProgressUpdate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _avg?: GoalAvgOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
    _sum?: GoalSumOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Goal"> | number
    title?: StringWithAggregatesFilter<"Goal"> | string
    description?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    type?: StringWithAggregatesFilter<"Goal"> | string
    targetValue?: IntWithAggregatesFilter<"Goal"> | number
    currentValue?: IntWithAggregatesFilter<"Goal"> | number
    unit?: StringWithAggregatesFilter<"Goal"> | string
    startDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    deadline?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    status?: StringWithAggregatesFilter<"Goal"> | string
    priority?: StringWithAggregatesFilter<"Goal"> | string
    targetPattern?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    targetCompany?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    targetDifficulty?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null
    lastProgressUpdate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
  }

  export type MilestoneWhereInput = {
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    id?: IntFilter<"Milestone"> | number
    goalId?: IntFilter<"Milestone"> | number
    title?: StringFilter<"Milestone"> | string
    description?: StringNullableFilter<"Milestone"> | string | null
    targetValue?: IntFilter<"Milestone"> | number
    dueDate?: DateTimeFilter<"Milestone"> | Date | string
    completed?: BoolFilter<"Milestone"> | boolean
    completedDate?: DateTimeNullableFilter<"Milestone"> | Date | string | null
    completionNote?: StringNullableFilter<"Milestone"> | string | null
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    goal?: XOR<GoalRelationFilter, GoalWhereInput>
  }

  export type MilestoneOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    targetValue?: SortOrder
    dueDate?: SortOrder
    completed?: SortOrder
    completedDate?: SortOrderInput | SortOrder
    completionNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
  }

  export type MilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    goalId?: IntFilter<"Milestone"> | number
    title?: StringFilter<"Milestone"> | string
    description?: StringNullableFilter<"Milestone"> | string | null
    targetValue?: IntFilter<"Milestone"> | number
    dueDate?: DateTimeFilter<"Milestone"> | Date | string
    completed?: BoolFilter<"Milestone"> | boolean
    completedDate?: DateTimeNullableFilter<"Milestone"> | Date | string | null
    completionNote?: StringNullableFilter<"Milestone"> | string | null
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    goal?: XOR<GoalRelationFilter, GoalWhereInput>
  }, "id">

  export type MilestoneOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    targetValue?: SortOrder
    dueDate?: SortOrder
    completed?: SortOrder
    completedDate?: SortOrderInput | SortOrder
    completionNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MilestoneCountOrderByAggregateInput
    _avg?: MilestoneAvgOrderByAggregateInput
    _max?: MilestoneMaxOrderByAggregateInput
    _min?: MilestoneMinOrderByAggregateInput
    _sum?: MilestoneSumOrderByAggregateInput
  }

  export type MilestoneScalarWhereWithAggregatesInput = {
    AND?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    OR?: MilestoneScalarWhereWithAggregatesInput[]
    NOT?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Milestone"> | number
    goalId?: IntWithAggregatesFilter<"Milestone"> | number
    title?: StringWithAggregatesFilter<"Milestone"> | string
    description?: StringNullableWithAggregatesFilter<"Milestone"> | string | null
    targetValue?: IntWithAggregatesFilter<"Milestone"> | number
    dueDate?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    completed?: BoolWithAggregatesFilter<"Milestone"> | boolean
    completedDate?: DateTimeNullableWithAggregatesFilter<"Milestone"> | Date | string | null
    completionNote?: StringNullableWithAggregatesFilter<"Milestone"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
  }

  export type ProblemCreateInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternCreateNestedManyWithoutProblemInput
    submissions?: SubmissionCreateNestedManyWithoutProblemInput
    sessions?: SessionCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagUncheckedCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternUncheckedCreateNestedManyWithoutProblemInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    sessions?: SessionUncheckedCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemUpdateInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUpdateManyWithoutProblemNestedInput
    sessions?: SessionUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUncheckedUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemCreateManyInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
  }

  export type ProblemUpdateManyMutationInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemCompanyCreateInput = {
    problem: ProblemCreateNestedOneWithoutCompaniesInput
    company: CompanyCardCreateNestedOneWithoutProblemsInput
  }

  export type ProblemCompanyUncheckedCreateInput = {
    id?: number
    problemId: number
    companyId: number
  }

  export type ProblemCompanyUpdateInput = {
    problem?: ProblemUpdateOneRequiredWithoutCompaniesNestedInput
    company?: CompanyCardUpdateOneRequiredWithoutProblemsNestedInput
  }

  export type ProblemCompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemCompanyCreateManyInput = {
    id?: number
    problemId: number
    companyId: number
  }

  export type ProblemCompanyUpdateManyMutationInput = {

  }

  export type ProblemCompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemTagCreateInput = {
    tag: string
    problem: ProblemCreateNestedOneWithoutTagsInput
  }

  export type ProblemTagUncheckedCreateInput = {
    id?: number
    problemId: number
    tag: string
  }

  export type ProblemTagUpdateInput = {
    tag?: StringFieldUpdateOperationsInput | string
    problem?: ProblemUpdateOneRequiredWithoutTagsNestedInput
  }

  export type ProblemTagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemTagCreateManyInput = {
    id?: number
    problemId: number
    tag: string
  }

  export type ProblemTagUpdateManyMutationInput = {
    tag?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemTagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
  }

  export type PatternCreateInput = {
    name: string
    category: string
    description?: string | null
    problems?: ProblemPatternCreateNestedManyWithoutPatternInput
  }

  export type PatternUncheckedCreateInput = {
    id?: number
    name: string
    category: string
    description?: string | null
    problems?: ProblemPatternUncheckedCreateNestedManyWithoutPatternInput
  }

  export type PatternUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemPatternUpdateManyWithoutPatternNestedInput
  }

  export type PatternUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemPatternUncheckedUpdateManyWithoutPatternNestedInput
  }

  export type PatternCreateManyInput = {
    id?: number
    name: string
    category: string
    description?: string | null
  }

  export type PatternUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatternUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyCardCreateInput = {
    name: string
    icon?: string
    targetProblems?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    problems?: ProblemCompanyCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCardUncheckedCreateInput = {
    id?: number
    name: string
    icon?: string
    targetProblems?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    problems?: ProblemCompanyUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCardUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    targetProblems?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemCompanyUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCardUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    targetProblems?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemCompanyUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCardCreateManyInput = {
    id?: number
    name: string
    icon?: string
    targetProblems?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCardUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    targetProblems?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCardUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    targetProblems?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPatternCreateInput = {
    problem: ProblemCreateNestedOneWithoutPatternsInput
    pattern: PatternCreateNestedOneWithoutProblemsInput
  }

  export type ProblemPatternUncheckedCreateInput = {
    id?: number
    problemId: number
    patternId: number
  }

  export type ProblemPatternUpdateInput = {
    problem?: ProblemUpdateOneRequiredWithoutPatternsNestedInput
    pattern?: PatternUpdateOneRequiredWithoutProblemsNestedInput
  }

  export type ProblemPatternUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    patternId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemPatternCreateManyInput = {
    id?: number
    problemId: number
    patternId: number
  }

  export type ProblemPatternUpdateManyMutationInput = {

  }

  export type ProblemPatternUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    patternId?: IntFieldUpdateOperationsInput | number
  }

  export type SubmissionCreateInput = {
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
    problem: ProblemCreateNestedOneWithoutSubmissionsInput
    revisions?: RevisionCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: number
    problemId: number
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
    revisions?: RevisionUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUpdateInput = {
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    problem?: ProblemUpdateOneRequiredWithoutSubmissionsNestedInput
    revisions?: RevisionUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    revisions?: RevisionUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionCreateManyInput = {
    id?: number
    problemId: number
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
  }

  export type SubmissionUpdateManyMutationInput = {
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    startedAt: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    notes?: string | null
    problem: ProblemCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: number
    problemId: number
    startedAt: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    notes?: string | null
  }

  export type SessionUpdateInput = {
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    problem?: ProblemUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateManyInput = {
    id?: number
    problemId: number
    startedAt: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    notes?: string | null
  }

  export type SessionUpdateManyMutationInput = {
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RevisionCreateInput = {
    intervalLevel?: number
    nextReviewDate: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    wasSuccessful?: boolean | null
    timeSpentSeconds?: number | null
    solvedWithoutHint?: boolean | null
    confidenceLevel?: number | null
    difficultyRating?: number | null
    notes?: string | null
    previousRevisionId?: number | null
    submission: SubmissionCreateNestedOneWithoutRevisionsInput
  }

  export type RevisionUncheckedCreateInput = {
    id?: number
    submissionId: number
    intervalLevel?: number
    nextReviewDate: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    wasSuccessful?: boolean | null
    timeSpentSeconds?: number | null
    solvedWithoutHint?: boolean | null
    confidenceLevel?: number | null
    difficultyRating?: number | null
    notes?: string | null
    previousRevisionId?: number | null
  }

  export type RevisionUpdateInput = {
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
    submission?: SubmissionUpdateOneRequiredWithoutRevisionsNestedInput
  }

  export type RevisionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    submissionId?: IntFieldUpdateOperationsInput | number
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RevisionCreateManyInput = {
    id?: number
    submissionId: number
    intervalLevel?: number
    nextReviewDate: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    wasSuccessful?: boolean | null
    timeSpentSeconds?: number | null
    solvedWithoutHint?: boolean | null
    confidenceLevel?: number | null
    difficultyRating?: number | null
    notes?: string | null
    previousRevisionId?: number | null
  }

  export type RevisionUpdateManyMutationInput = {
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RevisionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    submissionId?: IntFieldUpdateOperationsInput | number
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MockInterviewCreateInput = {
    date?: Date | string
    timeLimit?: number
    timeTakenSeconds?: number | null
    patternRecognitionSeconds?: number | null
    solved?: boolean
    explanationScore?: number | null
    codeQualityScore?: number | null
    overallScore?: number | null
    notes?: string | null
    problem: ProblemCreateNestedOneWithoutMockInterviewsInput
  }

  export type MockInterviewUncheckedCreateInput = {
    id?: number
    problemId: number
    date?: Date | string
    timeLimit?: number
    timeTakenSeconds?: number | null
    patternRecognitionSeconds?: number | null
    solved?: boolean
    explanationScore?: number | null
    codeQualityScore?: number | null
    overallScore?: number | null
    notes?: string | null
  }

  export type MockInterviewUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    problem?: ProblemUpdateOneRequiredWithoutMockInterviewsNestedInput
  }

  export type MockInterviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MockInterviewCreateManyInput = {
    id?: number
    problemId: number
    date?: Date | string
    timeLimit?: number
    timeTakenSeconds?: number | null
    patternRecognitionSeconds?: number | null
    solved?: boolean
    explanationScore?: number | null
    codeQualityScore?: number | null
    overallScore?: number | null
    notes?: string | null
  }

  export type MockInterviewUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MockInterviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyProgressCreateInput = {
    date: Date | string
    problemsSolved?: number
    totalTimeSpent?: number
    patternsWorked?: number
    mockInterviews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressUncheckedCreateInput = {
    id?: number
    date: Date | string
    problemsSolved?: number
    totalTimeSpent?: number
    patternsWorked?: number
    mockInterviews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemsSolved?: IntFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    patternsWorked?: IntFieldUpdateOperationsInput | number
    mockInterviews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemsSolved?: IntFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    patternsWorked?: IntFieldUpdateOperationsInput | number
    mockInterviews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressCreateManyInput = {
    id?: number
    date: Date | string
    problemsSolved?: number
    totalTimeSpent?: number
    patternsWorked?: number
    mockInterviews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemsSolved?: IntFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    patternsWorked?: IntFieldUpdateOperationsInput | number
    mockInterviews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemsSolved?: IntFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    patternsWorked?: IntFieldUpdateOperationsInput | number
    mockInterviews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateInput = {
    title: string
    description?: string | null
    type: string
    targetValue: number
    currentValue?: number
    unit?: string
    startDate?: Date | string
    deadline: Date | string
    status?: string
    priority?: string
    targetPattern?: string | null
    targetCompany?: string | null
    targetDifficulty?: string | null
    completedAt?: Date | string | null
    lastProgressUpdate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    milestones?: MilestoneCreateNestedManyWithoutGoalInput
  }

  export type GoalUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    type: string
    targetValue: number
    currentValue?: number
    unit?: string
    startDate?: Date | string
    deadline: Date | string
    status?: string
    priority?: string
    targetPattern?: string | null
    targetCompany?: string | null
    targetDifficulty?: string | null
    completedAt?: Date | string | null
    lastProgressUpdate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutGoalInput
  }

  export type GoalUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    currentValue?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    targetPattern?: NullableStringFieldUpdateOperationsInput | string | null
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    targetDifficulty?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastProgressUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    milestones?: MilestoneUpdateManyWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    currentValue?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    targetPattern?: NullableStringFieldUpdateOperationsInput | string | null
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    targetDifficulty?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastProgressUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    milestones?: MilestoneUncheckedUpdateManyWithoutGoalNestedInput
  }

  export type GoalCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    type: string
    targetValue: number
    currentValue?: number
    unit?: string
    startDate?: Date | string
    deadline: Date | string
    status?: string
    priority?: string
    targetPattern?: string | null
    targetCompany?: string | null
    targetDifficulty?: string | null
    completedAt?: Date | string | null
    lastProgressUpdate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    currentValue?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    targetPattern?: NullableStringFieldUpdateOperationsInput | string | null
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    targetDifficulty?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastProgressUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    currentValue?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    targetPattern?: NullableStringFieldUpdateOperationsInput | string | null
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    targetDifficulty?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastProgressUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateInput = {
    title: string
    description?: string | null
    targetValue: number
    dueDate: Date | string
    completed?: boolean
    completedDate?: Date | string | null
    completionNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutMilestonesInput
  }

  export type MilestoneUncheckedCreateInput = {
    id?: number
    goalId: number
    title: string
    description?: string | null
    targetValue: number
    dueDate: Date | string
    completed?: boolean
    completedDate?: Date | string | null
    completionNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutMilestonesNestedInput
  }

  export type MilestoneUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    goalId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateManyInput = {
    id?: number
    goalId: number
    title: string
    description?: string | null
    targetValue: number
    dueDate: Date | string
    completed?: boolean
    completedDate?: Date | string | null
    completionNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    goalId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProblemTagListRelationFilter = {
    every?: ProblemTagWhereInput
    some?: ProblemTagWhereInput
    none?: ProblemTagWhereInput
  }

  export type ProblemCompanyListRelationFilter = {
    every?: ProblemCompanyWhereInput
    some?: ProblemCompanyWhereInput
    none?: ProblemCompanyWhereInput
  }

  export type ProblemPatternListRelationFilter = {
    every?: ProblemPatternWhereInput
    some?: ProblemPatternWhereInput
    none?: ProblemPatternWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type MockInterviewListRelationFilter = {
    every?: MockInterviewWhereInput
    some?: MockInterviewWhereInput
    none?: MockInterviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProblemTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProblemCompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProblemPatternOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MockInterviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProblemPlatformProblemIdCompoundUniqueInput = {
    platform: string
    problemId: string
  }

  export type ProblemCountOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    problemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    url?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    source?: SortOrder
  }

  export type ProblemAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProblemMaxOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    problemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    url?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    source?: SortOrder
  }

  export type ProblemMinOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    problemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    url?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    source?: SortOrder
  }

  export type ProblemSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProblemRelationFilter = {
    is?: ProblemWhereInput
    isNot?: ProblemWhereInput
  }

  export type CompanyCardRelationFilter = {
    is?: CompanyCardWhereInput
    isNot?: CompanyCardWhereInput
  }

  export type ProblemCompanyProblemIdCompanyIdCompoundUniqueInput = {
    problemId: number
    companyId: number
  }

  export type ProblemCompanyCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
  }

  export type ProblemCompanyAvgOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
  }

  export type ProblemCompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
  }

  export type ProblemCompanyMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
  }

  export type ProblemCompanySumOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    companyId?: SortOrder
  }

  export type ProblemTagCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    tag?: SortOrder
  }

  export type ProblemTagAvgOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
  }

  export type ProblemTagMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    tag?: SortOrder
  }

  export type ProblemTagMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    tag?: SortOrder
  }

  export type ProblemTagSumOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
  }

  export type PatternCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
  }

  export type PatternAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PatternMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
  }

  export type PatternMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
  }

  export type PatternSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyCardCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    targetProblems?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyCardAvgOrderByAggregateInput = {
    id?: SortOrder
    targetProblems?: SortOrder
  }

  export type CompanyCardMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    targetProblems?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyCardMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    targetProblems?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyCardSumOrderByAggregateInput = {
    id?: SortOrder
    targetProblems?: SortOrder
  }

  export type PatternRelationFilter = {
    is?: PatternWhereInput
    isNot?: PatternWhereInput
  }

  export type ProblemPatternProblemIdPatternIdCompoundUniqueInput = {
    problemId: number
    patternId: number
  }

  export type ProblemPatternCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
  }

  export type ProblemPatternAvgOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
  }

  export type ProblemPatternMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
  }

  export type ProblemPatternMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
  }

  export type ProblemPatternSumOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    patternId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type RevisionListRelationFilter = {
    every?: RevisionWhereInput
    some?: RevisionWhereInput
    none?: RevisionWhereInput
  }

  export type RevisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    attemptType?: SortOrder
    wasHintUsed?: SortOrder
    mistakeNote?: SortOrder
    approachNote?: SortOrder
    patternRecognitionSeconds?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    attemptType?: SortOrder
    wasHintUsed?: SortOrder
    mistakeNote?: SortOrder
    approachNote?: SortOrder
    patternRecognitionSeconds?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    attemptType?: SortOrder
    wasHintUsed?: SortOrder
    mistakeNote?: SortOrder
    approachNote?: SortOrder
    patternRecognitionSeconds?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    attemptNumber?: SortOrder
    timeSpentSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    durationSeconds?: SortOrder
    notes?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    durationSeconds?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    durationSeconds?: SortOrder
    notes?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    durationSeconds?: SortOrder
    notes?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    durationSeconds?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SubmissionRelationFilter = {
    is?: SubmissionWhereInput
    isNot?: SubmissionWhereInput
  }

  export type RevisionCountOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    nextReviewDate?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    wasSuccessful?: SortOrder
    timeSpentSeconds?: SortOrder
    solvedWithoutHint?: SortOrder
    confidenceLevel?: SortOrder
    difficultyRating?: SortOrder
    notes?: SortOrder
    previousRevisionId?: SortOrder
  }

  export type RevisionAvgOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    timeSpentSeconds?: SortOrder
    confidenceLevel?: SortOrder
    difficultyRating?: SortOrder
    previousRevisionId?: SortOrder
  }

  export type RevisionMaxOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    nextReviewDate?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    wasSuccessful?: SortOrder
    timeSpentSeconds?: SortOrder
    solvedWithoutHint?: SortOrder
    confidenceLevel?: SortOrder
    difficultyRating?: SortOrder
    notes?: SortOrder
    previousRevisionId?: SortOrder
  }

  export type RevisionMinOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    nextReviewDate?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    wasSuccessful?: SortOrder
    timeSpentSeconds?: SortOrder
    solvedWithoutHint?: SortOrder
    confidenceLevel?: SortOrder
    difficultyRating?: SortOrder
    notes?: SortOrder
    previousRevisionId?: SortOrder
  }

  export type RevisionSumOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    intervalLevel?: SortOrder
    timeSpentSeconds?: SortOrder
    confidenceLevel?: SortOrder
    difficultyRating?: SortOrder
    previousRevisionId?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type MockInterviewCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    date?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
    solved?: SortOrder
    explanationScore?: SortOrder
    codeQualityScore?: SortOrder
    overallScore?: SortOrder
    notes?: SortOrder
  }

  export type MockInterviewAvgOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
    explanationScore?: SortOrder
    codeQualityScore?: SortOrder
    overallScore?: SortOrder
  }

  export type MockInterviewMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    date?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
    solved?: SortOrder
    explanationScore?: SortOrder
    codeQualityScore?: SortOrder
    overallScore?: SortOrder
    notes?: SortOrder
  }

  export type MockInterviewMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    date?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
    solved?: SortOrder
    explanationScore?: SortOrder
    codeQualityScore?: SortOrder
    overallScore?: SortOrder
    notes?: SortOrder
  }

  export type MockInterviewSumOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    timeLimit?: SortOrder
    timeTakenSeconds?: SortOrder
    patternRecognitionSeconds?: SortOrder
    explanationScore?: SortOrder
    codeQualityScore?: SortOrder
    overallScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DailyProgressCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyProgressAvgOrderByAggregateInput = {
    id?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
  }

  export type DailyProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyProgressMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyProgressSumOrderByAggregateInput = {
    id?: SortOrder
    problemsSolved?: SortOrder
    totalTimeSpent?: SortOrder
    patternsWorked?: SortOrder
    mockInterviews?: SortOrder
  }

  export type MilestoneListRelationFilter = {
    every?: MilestoneWhereInput
    some?: MilestoneWhereInput
    none?: MilestoneWhereInput
  }

  export type MilestoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    targetPattern?: SortOrder
    targetCompany?: SortOrder
    targetDifficulty?: SortOrder
    completedAt?: SortOrder
    lastProgressUpdate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalAvgOrderByAggregateInput = {
    id?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    targetPattern?: SortOrder
    targetCompany?: SortOrder
    targetDifficulty?: SortOrder
    completedAt?: SortOrder
    lastProgressUpdate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    targetPattern?: SortOrder
    targetCompany?: SortOrder
    targetDifficulty?: SortOrder
    completedAt?: SortOrder
    lastProgressUpdate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalSumOrderByAggregateInput = {
    id?: SortOrder
    targetValue?: SortOrder
    currentValue?: SortOrder
  }

  export type GoalRelationFilter = {
    is?: GoalWhereInput
    isNot?: GoalWhereInput
  }

  export type MilestoneCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    targetValue?: SortOrder
    dueDate?: SortOrder
    completed?: SortOrder
    completedDate?: SortOrder
    completionNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneAvgOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetValue?: SortOrder
  }

  export type MilestoneMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    targetValue?: SortOrder
    dueDate?: SortOrder
    completed?: SortOrder
    completedDate?: SortOrder
    completionNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    targetValue?: SortOrder
    dueDate?: SortOrder
    completed?: SortOrder
    completedDate?: SortOrder
    completionNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneSumOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetValue?: SortOrder
  }

  export type ProblemTagCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemTagCreateWithoutProblemInput, ProblemTagUncheckedCreateWithoutProblemInput> | ProblemTagCreateWithoutProblemInput[] | ProblemTagUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemTagCreateOrConnectWithoutProblemInput | ProblemTagCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemTagCreateManyProblemInputEnvelope
    connect?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
  }

  export type ProblemCompanyCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemCompanyCreateWithoutProblemInput, ProblemCompanyUncheckedCreateWithoutProblemInput> | ProblemCompanyCreateWithoutProblemInput[] | ProblemCompanyUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutProblemInput | ProblemCompanyCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemCompanyCreateManyProblemInputEnvelope
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
  }

  export type ProblemPatternCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemPatternCreateWithoutProblemInput, ProblemPatternUncheckedCreateWithoutProblemInput> | ProblemPatternCreateWithoutProblemInput[] | ProblemPatternUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutProblemInput | ProblemPatternCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemPatternCreateManyProblemInputEnvelope
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutProblemInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutProblemInput = {
    create?: XOR<SessionCreateWithoutProblemInput, SessionUncheckedCreateWithoutProblemInput> | SessionCreateWithoutProblemInput[] | SessionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProblemInput | SessionCreateOrConnectWithoutProblemInput[]
    createMany?: SessionCreateManyProblemInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type MockInterviewCreateNestedManyWithoutProblemInput = {
    create?: XOR<MockInterviewCreateWithoutProblemInput, MockInterviewUncheckedCreateWithoutProblemInput> | MockInterviewCreateWithoutProblemInput[] | MockInterviewUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: MockInterviewCreateOrConnectWithoutProblemInput | MockInterviewCreateOrConnectWithoutProblemInput[]
    createMany?: MockInterviewCreateManyProblemInputEnvelope
    connect?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
  }

  export type ProblemTagUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemTagCreateWithoutProblemInput, ProblemTagUncheckedCreateWithoutProblemInput> | ProblemTagCreateWithoutProblemInput[] | ProblemTagUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemTagCreateOrConnectWithoutProblemInput | ProblemTagCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemTagCreateManyProblemInputEnvelope
    connect?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
  }

  export type ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemCompanyCreateWithoutProblemInput, ProblemCompanyUncheckedCreateWithoutProblemInput> | ProblemCompanyCreateWithoutProblemInput[] | ProblemCompanyUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutProblemInput | ProblemCompanyCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemCompanyCreateManyProblemInputEnvelope
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
  }

  export type ProblemPatternUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemPatternCreateWithoutProblemInput, ProblemPatternUncheckedCreateWithoutProblemInput> | ProblemPatternCreateWithoutProblemInput[] | ProblemPatternUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutProblemInput | ProblemPatternCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemPatternCreateManyProblemInputEnvelope
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<SessionCreateWithoutProblemInput, SessionUncheckedCreateWithoutProblemInput> | SessionCreateWithoutProblemInput[] | SessionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProblemInput | SessionCreateOrConnectWithoutProblemInput[]
    createMany?: SessionCreateManyProblemInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type MockInterviewUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<MockInterviewCreateWithoutProblemInput, MockInterviewUncheckedCreateWithoutProblemInput> | MockInterviewCreateWithoutProblemInput[] | MockInterviewUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: MockInterviewCreateOrConnectWithoutProblemInput | MockInterviewCreateOrConnectWithoutProblemInput[]
    createMany?: MockInterviewCreateManyProblemInputEnvelope
    connect?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProblemTagUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemTagCreateWithoutProblemInput, ProblemTagUncheckedCreateWithoutProblemInput> | ProblemTagCreateWithoutProblemInput[] | ProblemTagUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemTagCreateOrConnectWithoutProblemInput | ProblemTagCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemTagUpsertWithWhereUniqueWithoutProblemInput | ProblemTagUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemTagCreateManyProblemInputEnvelope
    set?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    disconnect?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    delete?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    connect?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    update?: ProblemTagUpdateWithWhereUniqueWithoutProblemInput | ProblemTagUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemTagUpdateManyWithWhereWithoutProblemInput | ProblemTagUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemTagScalarWhereInput | ProblemTagScalarWhereInput[]
  }

  export type ProblemCompanyUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemCompanyCreateWithoutProblemInput, ProblemCompanyUncheckedCreateWithoutProblemInput> | ProblemCompanyCreateWithoutProblemInput[] | ProblemCompanyUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutProblemInput | ProblemCompanyCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemCompanyUpsertWithWhereUniqueWithoutProblemInput | ProblemCompanyUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemCompanyCreateManyProblemInputEnvelope
    set?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    disconnect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    delete?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    update?: ProblemCompanyUpdateWithWhereUniqueWithoutProblemInput | ProblemCompanyUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemCompanyUpdateManyWithWhereWithoutProblemInput | ProblemCompanyUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemCompanyScalarWhereInput | ProblemCompanyScalarWhereInput[]
  }

  export type ProblemPatternUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemPatternCreateWithoutProblemInput, ProblemPatternUncheckedCreateWithoutProblemInput> | ProblemPatternCreateWithoutProblemInput[] | ProblemPatternUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutProblemInput | ProblemPatternCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemPatternUpsertWithWhereUniqueWithoutProblemInput | ProblemPatternUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemPatternCreateManyProblemInputEnvelope
    set?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    disconnect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    delete?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    update?: ProblemPatternUpdateWithWhereUniqueWithoutProblemInput | ProblemPatternUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemPatternUpdateManyWithWhereWithoutProblemInput | ProblemPatternUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemPatternScalarWhereInput | ProblemPatternScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutProblemInput | SubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutProblemInput | SubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutProblemInput | SubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<SessionCreateWithoutProblemInput, SessionUncheckedCreateWithoutProblemInput> | SessionCreateWithoutProblemInput[] | SessionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProblemInput | SessionCreateOrConnectWithoutProblemInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutProblemInput | SessionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: SessionCreateManyProblemInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutProblemInput | SessionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutProblemInput | SessionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type MockInterviewUpdateManyWithoutProblemNestedInput = {
    create?: XOR<MockInterviewCreateWithoutProblemInput, MockInterviewUncheckedCreateWithoutProblemInput> | MockInterviewCreateWithoutProblemInput[] | MockInterviewUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: MockInterviewCreateOrConnectWithoutProblemInput | MockInterviewCreateOrConnectWithoutProblemInput[]
    upsert?: MockInterviewUpsertWithWhereUniqueWithoutProblemInput | MockInterviewUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: MockInterviewCreateManyProblemInputEnvelope
    set?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    disconnect?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    delete?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    connect?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    update?: MockInterviewUpdateWithWhereUniqueWithoutProblemInput | MockInterviewUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: MockInterviewUpdateManyWithWhereWithoutProblemInput | MockInterviewUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: MockInterviewScalarWhereInput | MockInterviewScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProblemTagUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemTagCreateWithoutProblemInput, ProblemTagUncheckedCreateWithoutProblemInput> | ProblemTagCreateWithoutProblemInput[] | ProblemTagUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemTagCreateOrConnectWithoutProblemInput | ProblemTagCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemTagUpsertWithWhereUniqueWithoutProblemInput | ProblemTagUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemTagCreateManyProblemInputEnvelope
    set?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    disconnect?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    delete?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    connect?: ProblemTagWhereUniqueInput | ProblemTagWhereUniqueInput[]
    update?: ProblemTagUpdateWithWhereUniqueWithoutProblemInput | ProblemTagUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemTagUpdateManyWithWhereWithoutProblemInput | ProblemTagUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemTagScalarWhereInput | ProblemTagScalarWhereInput[]
  }

  export type ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemCompanyCreateWithoutProblemInput, ProblemCompanyUncheckedCreateWithoutProblemInput> | ProblemCompanyCreateWithoutProblemInput[] | ProblemCompanyUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutProblemInput | ProblemCompanyCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemCompanyUpsertWithWhereUniqueWithoutProblemInput | ProblemCompanyUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemCompanyCreateManyProblemInputEnvelope
    set?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    disconnect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    delete?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    update?: ProblemCompanyUpdateWithWhereUniqueWithoutProblemInput | ProblemCompanyUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemCompanyUpdateManyWithWhereWithoutProblemInput | ProblemCompanyUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemCompanyScalarWhereInput | ProblemCompanyScalarWhereInput[]
  }

  export type ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemPatternCreateWithoutProblemInput, ProblemPatternUncheckedCreateWithoutProblemInput> | ProblemPatternCreateWithoutProblemInput[] | ProblemPatternUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutProblemInput | ProblemPatternCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemPatternUpsertWithWhereUniqueWithoutProblemInput | ProblemPatternUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemPatternCreateManyProblemInputEnvelope
    set?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    disconnect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    delete?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    update?: ProblemPatternUpdateWithWhereUniqueWithoutProblemInput | ProblemPatternUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemPatternUpdateManyWithWhereWithoutProblemInput | ProblemPatternUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemPatternScalarWhereInput | ProblemPatternScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutProblemInput | SubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutProblemInput | SubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutProblemInput | SubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<SessionCreateWithoutProblemInput, SessionUncheckedCreateWithoutProblemInput> | SessionCreateWithoutProblemInput[] | SessionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProblemInput | SessionCreateOrConnectWithoutProblemInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutProblemInput | SessionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: SessionCreateManyProblemInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutProblemInput | SessionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutProblemInput | SessionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type MockInterviewUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<MockInterviewCreateWithoutProblemInput, MockInterviewUncheckedCreateWithoutProblemInput> | MockInterviewCreateWithoutProblemInput[] | MockInterviewUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: MockInterviewCreateOrConnectWithoutProblemInput | MockInterviewCreateOrConnectWithoutProblemInput[]
    upsert?: MockInterviewUpsertWithWhereUniqueWithoutProblemInput | MockInterviewUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: MockInterviewCreateManyProblemInputEnvelope
    set?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    disconnect?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    delete?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    connect?: MockInterviewWhereUniqueInput | MockInterviewWhereUniqueInput[]
    update?: MockInterviewUpdateWithWhereUniqueWithoutProblemInput | MockInterviewUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: MockInterviewUpdateManyWithWhereWithoutProblemInput | MockInterviewUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: MockInterviewScalarWhereInput | MockInterviewScalarWhereInput[]
  }

  export type ProblemCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<ProblemCreateWithoutCompaniesInput, ProblemUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutCompaniesInput
    connect?: ProblemWhereUniqueInput
  }

  export type CompanyCardCreateNestedOneWithoutProblemsInput = {
    create?: XOR<CompanyCardCreateWithoutProblemsInput, CompanyCardUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: CompanyCardCreateOrConnectWithoutProblemsInput
    connect?: CompanyCardWhereUniqueInput
  }

  export type ProblemUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<ProblemCreateWithoutCompaniesInput, ProblemUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutCompaniesInput
    upsert?: ProblemUpsertWithoutCompaniesInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutCompaniesInput, ProblemUpdateWithoutCompaniesInput>, ProblemUncheckedUpdateWithoutCompaniesInput>
  }

  export type CompanyCardUpdateOneRequiredWithoutProblemsNestedInput = {
    create?: XOR<CompanyCardCreateWithoutProblemsInput, CompanyCardUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: CompanyCardCreateOrConnectWithoutProblemsInput
    upsert?: CompanyCardUpsertWithoutProblemsInput
    connect?: CompanyCardWhereUniqueInput
    update?: XOR<XOR<CompanyCardUpdateToOneWithWhereWithoutProblemsInput, CompanyCardUpdateWithoutProblemsInput>, CompanyCardUncheckedUpdateWithoutProblemsInput>
  }

  export type ProblemCreateNestedOneWithoutTagsInput = {
    create?: XOR<ProblemCreateWithoutTagsInput, ProblemUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutTagsInput
    connect?: ProblemWhereUniqueInput
  }

  export type ProblemUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<ProblemCreateWithoutTagsInput, ProblemUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutTagsInput
    upsert?: ProblemUpsertWithoutTagsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutTagsInput, ProblemUpdateWithoutTagsInput>, ProblemUncheckedUpdateWithoutTagsInput>
  }

  export type ProblemPatternCreateNestedManyWithoutPatternInput = {
    create?: XOR<ProblemPatternCreateWithoutPatternInput, ProblemPatternUncheckedCreateWithoutPatternInput> | ProblemPatternCreateWithoutPatternInput[] | ProblemPatternUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutPatternInput | ProblemPatternCreateOrConnectWithoutPatternInput[]
    createMany?: ProblemPatternCreateManyPatternInputEnvelope
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
  }

  export type ProblemPatternUncheckedCreateNestedManyWithoutPatternInput = {
    create?: XOR<ProblemPatternCreateWithoutPatternInput, ProblemPatternUncheckedCreateWithoutPatternInput> | ProblemPatternCreateWithoutPatternInput[] | ProblemPatternUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutPatternInput | ProblemPatternCreateOrConnectWithoutPatternInput[]
    createMany?: ProblemPatternCreateManyPatternInputEnvelope
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
  }

  export type ProblemPatternUpdateManyWithoutPatternNestedInput = {
    create?: XOR<ProblemPatternCreateWithoutPatternInput, ProblemPatternUncheckedCreateWithoutPatternInput> | ProblemPatternCreateWithoutPatternInput[] | ProblemPatternUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutPatternInput | ProblemPatternCreateOrConnectWithoutPatternInput[]
    upsert?: ProblemPatternUpsertWithWhereUniqueWithoutPatternInput | ProblemPatternUpsertWithWhereUniqueWithoutPatternInput[]
    createMany?: ProblemPatternCreateManyPatternInputEnvelope
    set?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    disconnect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    delete?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    update?: ProblemPatternUpdateWithWhereUniqueWithoutPatternInput | ProblemPatternUpdateWithWhereUniqueWithoutPatternInput[]
    updateMany?: ProblemPatternUpdateManyWithWhereWithoutPatternInput | ProblemPatternUpdateManyWithWhereWithoutPatternInput[]
    deleteMany?: ProblemPatternScalarWhereInput | ProblemPatternScalarWhereInput[]
  }

  export type ProblemPatternUncheckedUpdateManyWithoutPatternNestedInput = {
    create?: XOR<ProblemPatternCreateWithoutPatternInput, ProblemPatternUncheckedCreateWithoutPatternInput> | ProblemPatternCreateWithoutPatternInput[] | ProblemPatternUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: ProblemPatternCreateOrConnectWithoutPatternInput | ProblemPatternCreateOrConnectWithoutPatternInput[]
    upsert?: ProblemPatternUpsertWithWhereUniqueWithoutPatternInput | ProblemPatternUpsertWithWhereUniqueWithoutPatternInput[]
    createMany?: ProblemPatternCreateManyPatternInputEnvelope
    set?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    disconnect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    delete?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    connect?: ProblemPatternWhereUniqueInput | ProblemPatternWhereUniqueInput[]
    update?: ProblemPatternUpdateWithWhereUniqueWithoutPatternInput | ProblemPatternUpdateWithWhereUniqueWithoutPatternInput[]
    updateMany?: ProblemPatternUpdateManyWithWhereWithoutPatternInput | ProblemPatternUpdateManyWithWhereWithoutPatternInput[]
    deleteMany?: ProblemPatternScalarWhereInput | ProblemPatternScalarWhereInput[]
  }

  export type ProblemCompanyCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ProblemCompanyCreateWithoutCompanyInput, ProblemCompanyUncheckedCreateWithoutCompanyInput> | ProblemCompanyCreateWithoutCompanyInput[] | ProblemCompanyUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutCompanyInput | ProblemCompanyCreateOrConnectWithoutCompanyInput[]
    createMany?: ProblemCompanyCreateManyCompanyInputEnvelope
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
  }

  export type ProblemCompanyUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ProblemCompanyCreateWithoutCompanyInput, ProblemCompanyUncheckedCreateWithoutCompanyInput> | ProblemCompanyCreateWithoutCompanyInput[] | ProblemCompanyUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutCompanyInput | ProblemCompanyCreateOrConnectWithoutCompanyInput[]
    createMany?: ProblemCompanyCreateManyCompanyInputEnvelope
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
  }

  export type ProblemCompanyUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ProblemCompanyCreateWithoutCompanyInput, ProblemCompanyUncheckedCreateWithoutCompanyInput> | ProblemCompanyCreateWithoutCompanyInput[] | ProblemCompanyUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutCompanyInput | ProblemCompanyCreateOrConnectWithoutCompanyInput[]
    upsert?: ProblemCompanyUpsertWithWhereUniqueWithoutCompanyInput | ProblemCompanyUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ProblemCompanyCreateManyCompanyInputEnvelope
    set?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    disconnect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    delete?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    update?: ProblemCompanyUpdateWithWhereUniqueWithoutCompanyInput | ProblemCompanyUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ProblemCompanyUpdateManyWithWhereWithoutCompanyInput | ProblemCompanyUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ProblemCompanyScalarWhereInput | ProblemCompanyScalarWhereInput[]
  }

  export type ProblemCompanyUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ProblemCompanyCreateWithoutCompanyInput, ProblemCompanyUncheckedCreateWithoutCompanyInput> | ProblemCompanyCreateWithoutCompanyInput[] | ProblemCompanyUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProblemCompanyCreateOrConnectWithoutCompanyInput | ProblemCompanyCreateOrConnectWithoutCompanyInput[]
    upsert?: ProblemCompanyUpsertWithWhereUniqueWithoutCompanyInput | ProblemCompanyUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ProblemCompanyCreateManyCompanyInputEnvelope
    set?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    disconnect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    delete?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    connect?: ProblemCompanyWhereUniqueInput | ProblemCompanyWhereUniqueInput[]
    update?: ProblemCompanyUpdateWithWhereUniqueWithoutCompanyInput | ProblemCompanyUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ProblemCompanyUpdateManyWithWhereWithoutCompanyInput | ProblemCompanyUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ProblemCompanyScalarWhereInput | ProblemCompanyScalarWhereInput[]
  }

  export type ProblemCreateNestedOneWithoutPatternsInput = {
    create?: XOR<ProblemCreateWithoutPatternsInput, ProblemUncheckedCreateWithoutPatternsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutPatternsInput
    connect?: ProblemWhereUniqueInput
  }

  export type PatternCreateNestedOneWithoutProblemsInput = {
    create?: XOR<PatternCreateWithoutProblemsInput, PatternUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: PatternCreateOrConnectWithoutProblemsInput
    connect?: PatternWhereUniqueInput
  }

  export type ProblemUpdateOneRequiredWithoutPatternsNestedInput = {
    create?: XOR<ProblemCreateWithoutPatternsInput, ProblemUncheckedCreateWithoutPatternsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutPatternsInput
    upsert?: ProblemUpsertWithoutPatternsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutPatternsInput, ProblemUpdateWithoutPatternsInput>, ProblemUncheckedUpdateWithoutPatternsInput>
  }

  export type PatternUpdateOneRequiredWithoutProblemsNestedInput = {
    create?: XOR<PatternCreateWithoutProblemsInput, PatternUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: PatternCreateOrConnectWithoutProblemsInput
    upsert?: PatternUpsertWithoutProblemsInput
    connect?: PatternWhereUniqueInput
    update?: XOR<XOR<PatternUpdateToOneWithWhereWithoutProblemsInput, PatternUpdateWithoutProblemsInput>, PatternUncheckedUpdateWithoutProblemsInput>
  }

  export type ProblemCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSubmissionsInput
    connect?: ProblemWhereUniqueInput
  }

  export type RevisionCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<RevisionCreateWithoutSubmissionInput, RevisionUncheckedCreateWithoutSubmissionInput> | RevisionCreateWithoutSubmissionInput[] | RevisionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutSubmissionInput | RevisionCreateOrConnectWithoutSubmissionInput[]
    createMany?: RevisionCreateManySubmissionInputEnvelope
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
  }

  export type RevisionUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<RevisionCreateWithoutSubmissionInput, RevisionUncheckedCreateWithoutSubmissionInput> | RevisionCreateWithoutSubmissionInput[] | RevisionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutSubmissionInput | RevisionCreateOrConnectWithoutSubmissionInput[]
    createMany?: RevisionCreateManySubmissionInputEnvelope
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProblemUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSubmissionsInput
    upsert?: ProblemUpsertWithoutSubmissionsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutSubmissionsInput, ProblemUpdateWithoutSubmissionsInput>, ProblemUncheckedUpdateWithoutSubmissionsInput>
  }

  export type RevisionUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<RevisionCreateWithoutSubmissionInput, RevisionUncheckedCreateWithoutSubmissionInput> | RevisionCreateWithoutSubmissionInput[] | RevisionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutSubmissionInput | RevisionCreateOrConnectWithoutSubmissionInput[]
    upsert?: RevisionUpsertWithWhereUniqueWithoutSubmissionInput | RevisionUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: RevisionCreateManySubmissionInputEnvelope
    set?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    disconnect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    delete?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    update?: RevisionUpdateWithWhereUniqueWithoutSubmissionInput | RevisionUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: RevisionUpdateManyWithWhereWithoutSubmissionInput | RevisionUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
  }

  export type RevisionUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<RevisionCreateWithoutSubmissionInput, RevisionUncheckedCreateWithoutSubmissionInput> | RevisionCreateWithoutSubmissionInput[] | RevisionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutSubmissionInput | RevisionCreateOrConnectWithoutSubmissionInput[]
    upsert?: RevisionUpsertWithWhereUniqueWithoutSubmissionInput | RevisionUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: RevisionCreateManySubmissionInputEnvelope
    set?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    disconnect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    delete?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    update?: RevisionUpdateWithWhereUniqueWithoutSubmissionInput | RevisionUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: RevisionUpdateManyWithWhereWithoutSubmissionInput | RevisionUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
  }

  export type ProblemCreateNestedOneWithoutSessionsInput = {
    create?: XOR<ProblemCreateWithoutSessionsInput, ProblemUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSessionsInput
    connect?: ProblemWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProblemUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<ProblemCreateWithoutSessionsInput, ProblemUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSessionsInput
    upsert?: ProblemUpsertWithoutSessionsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutSessionsInput, ProblemUpdateWithoutSessionsInput>, ProblemUncheckedUpdateWithoutSessionsInput>
  }

  export type SubmissionCreateNestedOneWithoutRevisionsInput = {
    create?: XOR<SubmissionCreateWithoutRevisionsInput, SubmissionUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: SubmissionCreateOrConnectWithoutRevisionsInput
    connect?: SubmissionWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type SubmissionUpdateOneRequiredWithoutRevisionsNestedInput = {
    create?: XOR<SubmissionCreateWithoutRevisionsInput, SubmissionUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: SubmissionCreateOrConnectWithoutRevisionsInput
    upsert?: SubmissionUpsertWithoutRevisionsInput
    connect?: SubmissionWhereUniqueInput
    update?: XOR<XOR<SubmissionUpdateToOneWithWhereWithoutRevisionsInput, SubmissionUpdateWithoutRevisionsInput>, SubmissionUncheckedUpdateWithoutRevisionsInput>
  }

  export type ProblemCreateNestedOneWithoutMockInterviewsInput = {
    create?: XOR<ProblemCreateWithoutMockInterviewsInput, ProblemUncheckedCreateWithoutMockInterviewsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutMockInterviewsInput
    connect?: ProblemWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProblemUpdateOneRequiredWithoutMockInterviewsNestedInput = {
    create?: XOR<ProblemCreateWithoutMockInterviewsInput, ProblemUncheckedCreateWithoutMockInterviewsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutMockInterviewsInput
    upsert?: ProblemUpsertWithoutMockInterviewsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutMockInterviewsInput, ProblemUpdateWithoutMockInterviewsInput>, ProblemUncheckedUpdateWithoutMockInterviewsInput>
  }

  export type MilestoneCreateNestedManyWithoutGoalInput = {
    create?: XOR<MilestoneCreateWithoutGoalInput, MilestoneUncheckedCreateWithoutGoalInput> | MilestoneCreateWithoutGoalInput[] | MilestoneUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutGoalInput | MilestoneCreateOrConnectWithoutGoalInput[]
    createMany?: MilestoneCreateManyGoalInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type MilestoneUncheckedCreateNestedManyWithoutGoalInput = {
    create?: XOR<MilestoneCreateWithoutGoalInput, MilestoneUncheckedCreateWithoutGoalInput> | MilestoneCreateWithoutGoalInput[] | MilestoneUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutGoalInput | MilestoneCreateOrConnectWithoutGoalInput[]
    createMany?: MilestoneCreateManyGoalInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type MilestoneUpdateManyWithoutGoalNestedInput = {
    create?: XOR<MilestoneCreateWithoutGoalInput, MilestoneUncheckedCreateWithoutGoalInput> | MilestoneCreateWithoutGoalInput[] | MilestoneUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutGoalInput | MilestoneCreateOrConnectWithoutGoalInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutGoalInput | MilestoneUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: MilestoneCreateManyGoalInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutGoalInput | MilestoneUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutGoalInput | MilestoneUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type MilestoneUncheckedUpdateManyWithoutGoalNestedInput = {
    create?: XOR<MilestoneCreateWithoutGoalInput, MilestoneUncheckedCreateWithoutGoalInput> | MilestoneCreateWithoutGoalInput[] | MilestoneUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutGoalInput | MilestoneCreateOrConnectWithoutGoalInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutGoalInput | MilestoneUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: MilestoneCreateManyGoalInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutGoalInput | MilestoneUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutGoalInput | MilestoneUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type GoalCreateNestedOneWithoutMilestonesInput = {
    create?: XOR<GoalCreateWithoutMilestonesInput, GoalUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: GoalCreateOrConnectWithoutMilestonesInput
    connect?: GoalWhereUniqueInput
  }

  export type GoalUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: XOR<GoalCreateWithoutMilestonesInput, GoalUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: GoalCreateOrConnectWithoutMilestonesInput
    upsert?: GoalUpsertWithoutMilestonesInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutMilestonesInput, GoalUpdateWithoutMilestonesInput>, GoalUncheckedUpdateWithoutMilestonesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ProblemTagCreateWithoutProblemInput = {
    tag: string
  }

  export type ProblemTagUncheckedCreateWithoutProblemInput = {
    id?: number
    tag: string
  }

  export type ProblemTagCreateOrConnectWithoutProblemInput = {
    where: ProblemTagWhereUniqueInput
    create: XOR<ProblemTagCreateWithoutProblemInput, ProblemTagUncheckedCreateWithoutProblemInput>
  }

  export type ProblemTagCreateManyProblemInputEnvelope = {
    data: ProblemTagCreateManyProblemInput | ProblemTagCreateManyProblemInput[]
  }

  export type ProblemCompanyCreateWithoutProblemInput = {
    company: CompanyCardCreateNestedOneWithoutProblemsInput
  }

  export type ProblemCompanyUncheckedCreateWithoutProblemInput = {
    id?: number
    companyId: number
  }

  export type ProblemCompanyCreateOrConnectWithoutProblemInput = {
    where: ProblemCompanyWhereUniqueInput
    create: XOR<ProblemCompanyCreateWithoutProblemInput, ProblemCompanyUncheckedCreateWithoutProblemInput>
  }

  export type ProblemCompanyCreateManyProblemInputEnvelope = {
    data: ProblemCompanyCreateManyProblemInput | ProblemCompanyCreateManyProblemInput[]
  }

  export type ProblemPatternCreateWithoutProblemInput = {
    pattern: PatternCreateNestedOneWithoutProblemsInput
  }

  export type ProblemPatternUncheckedCreateWithoutProblemInput = {
    id?: number
    patternId: number
  }

  export type ProblemPatternCreateOrConnectWithoutProblemInput = {
    where: ProblemPatternWhereUniqueInput
    create: XOR<ProblemPatternCreateWithoutProblemInput, ProblemPatternUncheckedCreateWithoutProblemInput>
  }

  export type ProblemPatternCreateManyProblemInputEnvelope = {
    data: ProblemPatternCreateManyProblemInput | ProblemPatternCreateManyProblemInput[]
  }

  export type SubmissionCreateWithoutProblemInput = {
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
    revisions?: RevisionCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateWithoutProblemInput = {
    id?: number
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
    revisions?: RevisionUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionCreateOrConnectWithoutProblemInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput>
  }

  export type SubmissionCreateManyProblemInputEnvelope = {
    data: SubmissionCreateManyProblemInput | SubmissionCreateManyProblemInput[]
  }

  export type SessionCreateWithoutProblemInput = {
    startedAt: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    notes?: string | null
  }

  export type SessionUncheckedCreateWithoutProblemInput = {
    id?: number
    startedAt: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    notes?: string | null
  }

  export type SessionCreateOrConnectWithoutProblemInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutProblemInput, SessionUncheckedCreateWithoutProblemInput>
  }

  export type SessionCreateManyProblemInputEnvelope = {
    data: SessionCreateManyProblemInput | SessionCreateManyProblemInput[]
  }

  export type MockInterviewCreateWithoutProblemInput = {
    date?: Date | string
    timeLimit?: number
    timeTakenSeconds?: number | null
    patternRecognitionSeconds?: number | null
    solved?: boolean
    explanationScore?: number | null
    codeQualityScore?: number | null
    overallScore?: number | null
    notes?: string | null
  }

  export type MockInterviewUncheckedCreateWithoutProblemInput = {
    id?: number
    date?: Date | string
    timeLimit?: number
    timeTakenSeconds?: number | null
    patternRecognitionSeconds?: number | null
    solved?: boolean
    explanationScore?: number | null
    codeQualityScore?: number | null
    overallScore?: number | null
    notes?: string | null
  }

  export type MockInterviewCreateOrConnectWithoutProblemInput = {
    where: MockInterviewWhereUniqueInput
    create: XOR<MockInterviewCreateWithoutProblemInput, MockInterviewUncheckedCreateWithoutProblemInput>
  }

  export type MockInterviewCreateManyProblemInputEnvelope = {
    data: MockInterviewCreateManyProblemInput | MockInterviewCreateManyProblemInput[]
  }

  export type ProblemTagUpsertWithWhereUniqueWithoutProblemInput = {
    where: ProblemTagWhereUniqueInput
    update: XOR<ProblemTagUpdateWithoutProblemInput, ProblemTagUncheckedUpdateWithoutProblemInput>
    create: XOR<ProblemTagCreateWithoutProblemInput, ProblemTagUncheckedCreateWithoutProblemInput>
  }

  export type ProblemTagUpdateWithWhereUniqueWithoutProblemInput = {
    where: ProblemTagWhereUniqueInput
    data: XOR<ProblemTagUpdateWithoutProblemInput, ProblemTagUncheckedUpdateWithoutProblemInput>
  }

  export type ProblemTagUpdateManyWithWhereWithoutProblemInput = {
    where: ProblemTagScalarWhereInput
    data: XOR<ProblemTagUpdateManyMutationInput, ProblemTagUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemTagScalarWhereInput = {
    AND?: ProblemTagScalarWhereInput | ProblemTagScalarWhereInput[]
    OR?: ProblemTagScalarWhereInput[]
    NOT?: ProblemTagScalarWhereInput | ProblemTagScalarWhereInput[]
    id?: IntFilter<"ProblemTag"> | number
    problemId?: IntFilter<"ProblemTag"> | number
    tag?: StringFilter<"ProblemTag"> | string
  }

  export type ProblemCompanyUpsertWithWhereUniqueWithoutProblemInput = {
    where: ProblemCompanyWhereUniqueInput
    update: XOR<ProblemCompanyUpdateWithoutProblemInput, ProblemCompanyUncheckedUpdateWithoutProblemInput>
    create: XOR<ProblemCompanyCreateWithoutProblemInput, ProblemCompanyUncheckedCreateWithoutProblemInput>
  }

  export type ProblemCompanyUpdateWithWhereUniqueWithoutProblemInput = {
    where: ProblemCompanyWhereUniqueInput
    data: XOR<ProblemCompanyUpdateWithoutProblemInput, ProblemCompanyUncheckedUpdateWithoutProblemInput>
  }

  export type ProblemCompanyUpdateManyWithWhereWithoutProblemInput = {
    where: ProblemCompanyScalarWhereInput
    data: XOR<ProblemCompanyUpdateManyMutationInput, ProblemCompanyUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemCompanyScalarWhereInput = {
    AND?: ProblemCompanyScalarWhereInput | ProblemCompanyScalarWhereInput[]
    OR?: ProblemCompanyScalarWhereInput[]
    NOT?: ProblemCompanyScalarWhereInput | ProblemCompanyScalarWhereInput[]
    id?: IntFilter<"ProblemCompany"> | number
    problemId?: IntFilter<"ProblemCompany"> | number
    companyId?: IntFilter<"ProblemCompany"> | number
  }

  export type ProblemPatternUpsertWithWhereUniqueWithoutProblemInput = {
    where: ProblemPatternWhereUniqueInput
    update: XOR<ProblemPatternUpdateWithoutProblemInput, ProblemPatternUncheckedUpdateWithoutProblemInput>
    create: XOR<ProblemPatternCreateWithoutProblemInput, ProblemPatternUncheckedCreateWithoutProblemInput>
  }

  export type ProblemPatternUpdateWithWhereUniqueWithoutProblemInput = {
    where: ProblemPatternWhereUniqueInput
    data: XOR<ProblemPatternUpdateWithoutProblemInput, ProblemPatternUncheckedUpdateWithoutProblemInput>
  }

  export type ProblemPatternUpdateManyWithWhereWithoutProblemInput = {
    where: ProblemPatternScalarWhereInput
    data: XOR<ProblemPatternUpdateManyMutationInput, ProblemPatternUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemPatternScalarWhereInput = {
    AND?: ProblemPatternScalarWhereInput | ProblemPatternScalarWhereInput[]
    OR?: ProblemPatternScalarWhereInput[]
    NOT?: ProblemPatternScalarWhereInput | ProblemPatternScalarWhereInput[]
    id?: IntFilter<"ProblemPattern"> | number
    problemId?: IntFilter<"ProblemPattern"> | number
    patternId?: IntFilter<"ProblemPattern"> | number
  }

  export type SubmissionUpsertWithWhereUniqueWithoutProblemInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutProblemInput, SubmissionUncheckedUpdateWithoutProblemInput>
    create: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutProblemInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutProblemInput, SubmissionUncheckedUpdateWithoutProblemInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutProblemInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutProblemInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: IntFilter<"Submission"> | number
    problemId?: IntFilter<"Submission"> | number
    attemptNumber?: IntFilter<"Submission"> | number
    timeSpentSeconds?: IntFilter<"Submission"> | number
    status?: StringFilter<"Submission"> | string
    notes?: StringNullableFilter<"Submission"> | string | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    attemptType?: StringFilter<"Submission"> | string
    wasHintUsed?: BoolFilter<"Submission"> | boolean
    mistakeNote?: StringNullableFilter<"Submission"> | string | null
    approachNote?: StringNullableFilter<"Submission"> | string | null
    patternRecognitionSeconds?: IntNullableFilter<"Submission"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutProblemInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutProblemInput, SessionUncheckedUpdateWithoutProblemInput>
    create: XOR<SessionCreateWithoutProblemInput, SessionUncheckedCreateWithoutProblemInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutProblemInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutProblemInput, SessionUncheckedUpdateWithoutProblemInput>
  }

  export type SessionUpdateManyWithWhereWithoutProblemInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutProblemInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: IntFilter<"Session"> | number
    problemId?: IntFilter<"Session"> | number
    startedAt?: DateTimeFilter<"Session"> | Date | string
    endedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    durationSeconds?: IntNullableFilter<"Session"> | number | null
    notes?: StringNullableFilter<"Session"> | string | null
  }

  export type MockInterviewUpsertWithWhereUniqueWithoutProblemInput = {
    where: MockInterviewWhereUniqueInput
    update: XOR<MockInterviewUpdateWithoutProblemInput, MockInterviewUncheckedUpdateWithoutProblemInput>
    create: XOR<MockInterviewCreateWithoutProblemInput, MockInterviewUncheckedCreateWithoutProblemInput>
  }

  export type MockInterviewUpdateWithWhereUniqueWithoutProblemInput = {
    where: MockInterviewWhereUniqueInput
    data: XOR<MockInterviewUpdateWithoutProblemInput, MockInterviewUncheckedUpdateWithoutProblemInput>
  }

  export type MockInterviewUpdateManyWithWhereWithoutProblemInput = {
    where: MockInterviewScalarWhereInput
    data: XOR<MockInterviewUpdateManyMutationInput, MockInterviewUncheckedUpdateManyWithoutProblemInput>
  }

  export type MockInterviewScalarWhereInput = {
    AND?: MockInterviewScalarWhereInput | MockInterviewScalarWhereInput[]
    OR?: MockInterviewScalarWhereInput[]
    NOT?: MockInterviewScalarWhereInput | MockInterviewScalarWhereInput[]
    id?: IntFilter<"MockInterview"> | number
    problemId?: IntFilter<"MockInterview"> | number
    date?: DateTimeFilter<"MockInterview"> | Date | string
    timeLimit?: IntFilter<"MockInterview"> | number
    timeTakenSeconds?: IntNullableFilter<"MockInterview"> | number | null
    patternRecognitionSeconds?: IntNullableFilter<"MockInterview"> | number | null
    solved?: BoolFilter<"MockInterview"> | boolean
    explanationScore?: IntNullableFilter<"MockInterview"> | number | null
    codeQualityScore?: IntNullableFilter<"MockInterview"> | number | null
    overallScore?: FloatNullableFilter<"MockInterview"> | number | null
    notes?: StringNullableFilter<"MockInterview"> | string | null
  }

  export type ProblemCreateWithoutCompaniesInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternCreateNestedManyWithoutProblemInput
    submissions?: SubmissionCreateNestedManyWithoutProblemInput
    sessions?: SessionCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutCompaniesInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagUncheckedCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternUncheckedCreateNestedManyWithoutProblemInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    sessions?: SessionUncheckedCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutCompaniesInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutCompaniesInput, ProblemUncheckedCreateWithoutCompaniesInput>
  }

  export type CompanyCardCreateWithoutProblemsInput = {
    name: string
    icon?: string
    targetProblems?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCardUncheckedCreateWithoutProblemsInput = {
    id?: number
    name: string
    icon?: string
    targetProblems?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCardCreateOrConnectWithoutProblemsInput = {
    where: CompanyCardWhereUniqueInput
    create: XOR<CompanyCardCreateWithoutProblemsInput, CompanyCardUncheckedCreateWithoutProblemsInput>
  }

  export type ProblemUpsertWithoutCompaniesInput = {
    update: XOR<ProblemUpdateWithoutCompaniesInput, ProblemUncheckedUpdateWithoutCompaniesInput>
    create: XOR<ProblemCreateWithoutCompaniesInput, ProblemUncheckedCreateWithoutCompaniesInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutCompaniesInput, ProblemUncheckedUpdateWithoutCompaniesInput>
  }

  export type ProblemUpdateWithoutCompaniesInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUpdateManyWithoutProblemNestedInput
    sessions?: SessionUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUncheckedUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type CompanyCardUpsertWithoutProblemsInput = {
    update: XOR<CompanyCardUpdateWithoutProblemsInput, CompanyCardUncheckedUpdateWithoutProblemsInput>
    create: XOR<CompanyCardCreateWithoutProblemsInput, CompanyCardUncheckedCreateWithoutProblemsInput>
    where?: CompanyCardWhereInput
  }

  export type CompanyCardUpdateToOneWithWhereWithoutProblemsInput = {
    where?: CompanyCardWhereInput
    data: XOR<CompanyCardUpdateWithoutProblemsInput, CompanyCardUncheckedUpdateWithoutProblemsInput>
  }

  export type CompanyCardUpdateWithoutProblemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    targetProblems?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCardUncheckedUpdateWithoutProblemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    targetProblems?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemCreateWithoutTagsInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    companies?: ProblemCompanyCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternCreateNestedManyWithoutProblemInput
    submissions?: SubmissionCreateNestedManyWithoutProblemInput
    sessions?: SessionCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutTagsInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    companies?: ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternUncheckedCreateNestedManyWithoutProblemInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    sessions?: SessionUncheckedCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutTagsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutTagsInput, ProblemUncheckedCreateWithoutTagsInput>
  }

  export type ProblemUpsertWithoutTagsInput = {
    update: XOR<ProblemUpdateWithoutTagsInput, ProblemUncheckedUpdateWithoutTagsInput>
    create: XOR<ProblemCreateWithoutTagsInput, ProblemUncheckedCreateWithoutTagsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutTagsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutTagsInput, ProblemUncheckedUpdateWithoutTagsInput>
  }

  export type ProblemUpdateWithoutTagsInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    companies?: ProblemCompanyUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUpdateManyWithoutProblemNestedInput
    sessions?: SessionUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    companies?: ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemPatternCreateWithoutPatternInput = {
    problem: ProblemCreateNestedOneWithoutPatternsInput
  }

  export type ProblemPatternUncheckedCreateWithoutPatternInput = {
    id?: number
    problemId: number
  }

  export type ProblemPatternCreateOrConnectWithoutPatternInput = {
    where: ProblemPatternWhereUniqueInput
    create: XOR<ProblemPatternCreateWithoutPatternInput, ProblemPatternUncheckedCreateWithoutPatternInput>
  }

  export type ProblemPatternCreateManyPatternInputEnvelope = {
    data: ProblemPatternCreateManyPatternInput | ProblemPatternCreateManyPatternInput[]
  }

  export type ProblemPatternUpsertWithWhereUniqueWithoutPatternInput = {
    where: ProblemPatternWhereUniqueInput
    update: XOR<ProblemPatternUpdateWithoutPatternInput, ProblemPatternUncheckedUpdateWithoutPatternInput>
    create: XOR<ProblemPatternCreateWithoutPatternInput, ProblemPatternUncheckedCreateWithoutPatternInput>
  }

  export type ProblemPatternUpdateWithWhereUniqueWithoutPatternInput = {
    where: ProblemPatternWhereUniqueInput
    data: XOR<ProblemPatternUpdateWithoutPatternInput, ProblemPatternUncheckedUpdateWithoutPatternInput>
  }

  export type ProblemPatternUpdateManyWithWhereWithoutPatternInput = {
    where: ProblemPatternScalarWhereInput
    data: XOR<ProblemPatternUpdateManyMutationInput, ProblemPatternUncheckedUpdateManyWithoutPatternInput>
  }

  export type ProblemCompanyCreateWithoutCompanyInput = {
    problem: ProblemCreateNestedOneWithoutCompaniesInput
  }

  export type ProblemCompanyUncheckedCreateWithoutCompanyInput = {
    id?: number
    problemId: number
  }

  export type ProblemCompanyCreateOrConnectWithoutCompanyInput = {
    where: ProblemCompanyWhereUniqueInput
    create: XOR<ProblemCompanyCreateWithoutCompanyInput, ProblemCompanyUncheckedCreateWithoutCompanyInput>
  }

  export type ProblemCompanyCreateManyCompanyInputEnvelope = {
    data: ProblemCompanyCreateManyCompanyInput | ProblemCompanyCreateManyCompanyInput[]
  }

  export type ProblemCompanyUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ProblemCompanyWhereUniqueInput
    update: XOR<ProblemCompanyUpdateWithoutCompanyInput, ProblemCompanyUncheckedUpdateWithoutCompanyInput>
    create: XOR<ProblemCompanyCreateWithoutCompanyInput, ProblemCompanyUncheckedCreateWithoutCompanyInput>
  }

  export type ProblemCompanyUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ProblemCompanyWhereUniqueInput
    data: XOR<ProblemCompanyUpdateWithoutCompanyInput, ProblemCompanyUncheckedUpdateWithoutCompanyInput>
  }

  export type ProblemCompanyUpdateManyWithWhereWithoutCompanyInput = {
    where: ProblemCompanyScalarWhereInput
    data: XOR<ProblemCompanyUpdateManyMutationInput, ProblemCompanyUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ProblemCreateWithoutPatternsInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyCreateNestedManyWithoutProblemInput
    submissions?: SubmissionCreateNestedManyWithoutProblemInput
    sessions?: SessionCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutPatternsInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagUncheckedCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    sessions?: SessionUncheckedCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutPatternsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutPatternsInput, ProblemUncheckedCreateWithoutPatternsInput>
  }

  export type PatternCreateWithoutProblemsInput = {
    name: string
    category: string
    description?: string | null
  }

  export type PatternUncheckedCreateWithoutProblemsInput = {
    id?: number
    name: string
    category: string
    description?: string | null
  }

  export type PatternCreateOrConnectWithoutProblemsInput = {
    where: PatternWhereUniqueInput
    create: XOR<PatternCreateWithoutProblemsInput, PatternUncheckedCreateWithoutProblemsInput>
  }

  export type ProblemUpsertWithoutPatternsInput = {
    update: XOR<ProblemUpdateWithoutPatternsInput, ProblemUncheckedUpdateWithoutPatternsInput>
    create: XOR<ProblemCreateWithoutPatternsInput, ProblemUncheckedCreateWithoutPatternsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutPatternsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutPatternsInput, ProblemUncheckedUpdateWithoutPatternsInput>
  }

  export type ProblemUpdateWithoutPatternsInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUpdateManyWithoutProblemNestedInput
    sessions?: SessionUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutPatternsInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUncheckedUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type PatternUpsertWithoutProblemsInput = {
    update: XOR<PatternUpdateWithoutProblemsInput, PatternUncheckedUpdateWithoutProblemsInput>
    create: XOR<PatternCreateWithoutProblemsInput, PatternUncheckedCreateWithoutProblemsInput>
    where?: PatternWhereInput
  }

  export type PatternUpdateToOneWithWhereWithoutProblemsInput = {
    where?: PatternWhereInput
    data: XOR<PatternUpdateWithoutProblemsInput, PatternUncheckedUpdateWithoutProblemsInput>
  }

  export type PatternUpdateWithoutProblemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatternUncheckedUpdateWithoutProblemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProblemCreateWithoutSubmissionsInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternCreateNestedManyWithoutProblemInput
    sessions?: SessionCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutSubmissionsInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagUncheckedCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternUncheckedCreateNestedManyWithoutProblemInput
    sessions?: SessionUncheckedCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutSubmissionsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
  }

  export type RevisionCreateWithoutSubmissionInput = {
    intervalLevel?: number
    nextReviewDate: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    wasSuccessful?: boolean | null
    timeSpentSeconds?: number | null
    solvedWithoutHint?: boolean | null
    confidenceLevel?: number | null
    difficultyRating?: number | null
    notes?: string | null
    previousRevisionId?: number | null
  }

  export type RevisionUncheckedCreateWithoutSubmissionInput = {
    id?: number
    intervalLevel?: number
    nextReviewDate: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    wasSuccessful?: boolean | null
    timeSpentSeconds?: number | null
    solvedWithoutHint?: boolean | null
    confidenceLevel?: number | null
    difficultyRating?: number | null
    notes?: string | null
    previousRevisionId?: number | null
  }

  export type RevisionCreateOrConnectWithoutSubmissionInput = {
    where: RevisionWhereUniqueInput
    create: XOR<RevisionCreateWithoutSubmissionInput, RevisionUncheckedCreateWithoutSubmissionInput>
  }

  export type RevisionCreateManySubmissionInputEnvelope = {
    data: RevisionCreateManySubmissionInput | RevisionCreateManySubmissionInput[]
  }

  export type ProblemUpsertWithoutSubmissionsInput = {
    update: XOR<ProblemUpdateWithoutSubmissionsInput, ProblemUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutSubmissionsInput, ProblemUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProblemUpdateWithoutSubmissionsInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUpdateManyWithoutProblemNestedInput
    sessions?: SessionUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutSubmissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUncheckedUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type RevisionUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: RevisionWhereUniqueInput
    update: XOR<RevisionUpdateWithoutSubmissionInput, RevisionUncheckedUpdateWithoutSubmissionInput>
    create: XOR<RevisionCreateWithoutSubmissionInput, RevisionUncheckedCreateWithoutSubmissionInput>
  }

  export type RevisionUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: RevisionWhereUniqueInput
    data: XOR<RevisionUpdateWithoutSubmissionInput, RevisionUncheckedUpdateWithoutSubmissionInput>
  }

  export type RevisionUpdateManyWithWhereWithoutSubmissionInput = {
    where: RevisionScalarWhereInput
    data: XOR<RevisionUpdateManyMutationInput, RevisionUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type RevisionScalarWhereInput = {
    AND?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
    OR?: RevisionScalarWhereInput[]
    NOT?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
    id?: IntFilter<"Revision"> | number
    submissionId?: IntFilter<"Revision"> | number
    intervalLevel?: IntFilter<"Revision"> | number
    nextReviewDate?: DateTimeFilter<"Revision"> | Date | string
    completed?: BoolFilter<"Revision"> | boolean
    completedAt?: DateTimeNullableFilter<"Revision"> | Date | string | null
    wasSuccessful?: BoolNullableFilter<"Revision"> | boolean | null
    timeSpentSeconds?: IntNullableFilter<"Revision"> | number | null
    solvedWithoutHint?: BoolNullableFilter<"Revision"> | boolean | null
    confidenceLevel?: IntNullableFilter<"Revision"> | number | null
    difficultyRating?: IntNullableFilter<"Revision"> | number | null
    notes?: StringNullableFilter<"Revision"> | string | null
    previousRevisionId?: IntNullableFilter<"Revision"> | number | null
  }

  export type ProblemCreateWithoutSessionsInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternCreateNestedManyWithoutProblemInput
    submissions?: SubmissionCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutSessionsInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagUncheckedCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternUncheckedCreateNestedManyWithoutProblemInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    mockInterviews?: MockInterviewUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutSessionsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutSessionsInput, ProblemUncheckedCreateWithoutSessionsInput>
  }

  export type ProblemUpsertWithoutSessionsInput = {
    update: XOR<ProblemUpdateWithoutSessionsInput, ProblemUncheckedUpdateWithoutSessionsInput>
    create: XOR<ProblemCreateWithoutSessionsInput, ProblemUncheckedCreateWithoutSessionsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutSessionsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutSessionsInput, ProblemUncheckedUpdateWithoutSessionsInput>
  }

  export type ProblemUpdateWithoutSessionsInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUncheckedUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    mockInterviews?: MockInterviewUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type SubmissionCreateWithoutRevisionsInput = {
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
    problem: ProblemCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutRevisionsInput = {
    id?: number
    problemId: number
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
  }

  export type SubmissionCreateOrConnectWithoutRevisionsInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutRevisionsInput, SubmissionUncheckedCreateWithoutRevisionsInput>
  }

  export type SubmissionUpsertWithoutRevisionsInput = {
    update: XOR<SubmissionUpdateWithoutRevisionsInput, SubmissionUncheckedUpdateWithoutRevisionsInput>
    create: XOR<SubmissionCreateWithoutRevisionsInput, SubmissionUncheckedCreateWithoutRevisionsInput>
    where?: SubmissionWhereInput
  }

  export type SubmissionUpdateToOneWithWhereWithoutRevisionsInput = {
    where?: SubmissionWhereInput
    data: XOR<SubmissionUpdateWithoutRevisionsInput, SubmissionUncheckedUpdateWithoutRevisionsInput>
  }

  export type SubmissionUpdateWithoutRevisionsInput = {
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    problem?: ProblemUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutRevisionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProblemCreateWithoutMockInterviewsInput = {
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternCreateNestedManyWithoutProblemInput
    submissions?: SubmissionCreateNestedManyWithoutProblemInput
    sessions?: SessionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutMockInterviewsInput = {
    id?: number
    platform: string
    problemId: string
    title: string
    difficulty: string
    url?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: string
    tags?: ProblemTagUncheckedCreateNestedManyWithoutProblemInput
    companies?: ProblemCompanyUncheckedCreateNestedManyWithoutProblemInput
    patterns?: ProblemPatternUncheckedCreateNestedManyWithoutProblemInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    sessions?: SessionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutMockInterviewsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutMockInterviewsInput, ProblemUncheckedCreateWithoutMockInterviewsInput>
  }

  export type ProblemUpsertWithoutMockInterviewsInput = {
    update: XOR<ProblemUpdateWithoutMockInterviewsInput, ProblemUncheckedUpdateWithoutMockInterviewsInput>
    create: XOR<ProblemCreateWithoutMockInterviewsInput, ProblemUncheckedCreateWithoutMockInterviewsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutMockInterviewsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutMockInterviewsInput, ProblemUncheckedUpdateWithoutMockInterviewsInput>
  }

  export type ProblemUpdateWithoutMockInterviewsInput = {
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUpdateManyWithoutProblemNestedInput
    sessions?: SessionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutMockInterviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    tags?: ProblemTagUncheckedUpdateManyWithoutProblemNestedInput
    companies?: ProblemCompanyUncheckedUpdateManyWithoutProblemNestedInput
    patterns?: ProblemPatternUncheckedUpdateManyWithoutProblemNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type MilestoneCreateWithoutGoalInput = {
    title: string
    description?: string | null
    targetValue: number
    dueDate: Date | string
    completed?: boolean
    completedDate?: Date | string | null
    completionNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUncheckedCreateWithoutGoalInput = {
    id?: number
    title: string
    description?: string | null
    targetValue: number
    dueDate: Date | string
    completed?: boolean
    completedDate?: Date | string | null
    completionNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneCreateOrConnectWithoutGoalInput = {
    where: MilestoneWhereUniqueInput
    create: XOR<MilestoneCreateWithoutGoalInput, MilestoneUncheckedCreateWithoutGoalInput>
  }

  export type MilestoneCreateManyGoalInputEnvelope = {
    data: MilestoneCreateManyGoalInput | MilestoneCreateManyGoalInput[]
  }

  export type MilestoneUpsertWithWhereUniqueWithoutGoalInput = {
    where: MilestoneWhereUniqueInput
    update: XOR<MilestoneUpdateWithoutGoalInput, MilestoneUncheckedUpdateWithoutGoalInput>
    create: XOR<MilestoneCreateWithoutGoalInput, MilestoneUncheckedCreateWithoutGoalInput>
  }

  export type MilestoneUpdateWithWhereUniqueWithoutGoalInput = {
    where: MilestoneWhereUniqueInput
    data: XOR<MilestoneUpdateWithoutGoalInput, MilestoneUncheckedUpdateWithoutGoalInput>
  }

  export type MilestoneUpdateManyWithWhereWithoutGoalInput = {
    where: MilestoneScalarWhereInput
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyWithoutGoalInput>
  }

  export type MilestoneScalarWhereInput = {
    AND?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    OR?: MilestoneScalarWhereInput[]
    NOT?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    id?: IntFilter<"Milestone"> | number
    goalId?: IntFilter<"Milestone"> | number
    title?: StringFilter<"Milestone"> | string
    description?: StringNullableFilter<"Milestone"> | string | null
    targetValue?: IntFilter<"Milestone"> | number
    dueDate?: DateTimeFilter<"Milestone"> | Date | string
    completed?: BoolFilter<"Milestone"> | boolean
    completedDate?: DateTimeNullableFilter<"Milestone"> | Date | string | null
    completionNote?: StringNullableFilter<"Milestone"> | string | null
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
  }

  export type GoalCreateWithoutMilestonesInput = {
    title: string
    description?: string | null
    type: string
    targetValue: number
    currentValue?: number
    unit?: string
    startDate?: Date | string
    deadline: Date | string
    status?: string
    priority?: string
    targetPattern?: string | null
    targetCompany?: string | null
    targetDifficulty?: string | null
    completedAt?: Date | string | null
    lastProgressUpdate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUncheckedCreateWithoutMilestonesInput = {
    id?: number
    title: string
    description?: string | null
    type: string
    targetValue: number
    currentValue?: number
    unit?: string
    startDate?: Date | string
    deadline: Date | string
    status?: string
    priority?: string
    targetPattern?: string | null
    targetCompany?: string | null
    targetDifficulty?: string | null
    completedAt?: Date | string | null
    lastProgressUpdate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalCreateOrConnectWithoutMilestonesInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutMilestonesInput, GoalUncheckedCreateWithoutMilestonesInput>
  }

  export type GoalUpsertWithoutMilestonesInput = {
    update: XOR<GoalUpdateWithoutMilestonesInput, GoalUncheckedUpdateWithoutMilestonesInput>
    create: XOR<GoalCreateWithoutMilestonesInput, GoalUncheckedCreateWithoutMilestonesInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutMilestonesInput, GoalUncheckedUpdateWithoutMilestonesInput>
  }

  export type GoalUpdateWithoutMilestonesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    currentValue?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    targetPattern?: NullableStringFieldUpdateOperationsInput | string | null
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    targetDifficulty?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastProgressUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateWithoutMilestonesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    currentValue?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    targetPattern?: NullableStringFieldUpdateOperationsInput | string | null
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    targetDifficulty?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastProgressUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemTagCreateManyProblemInput = {
    id?: number
    tag: string
  }

  export type ProblemCompanyCreateManyProblemInput = {
    id?: number
    companyId: number
  }

  export type ProblemPatternCreateManyProblemInput = {
    id?: number
    patternId: number
  }

  export type SubmissionCreateManyProblemInput = {
    id?: number
    attemptNumber: number
    timeSpentSeconds: number
    status: string
    notes?: string | null
    submittedAt: Date | string
    createdAt?: Date | string
    attemptType?: string
    wasHintUsed?: boolean
    mistakeNote?: string | null
    approachNote?: string | null
    patternRecognitionSeconds?: number | null
  }

  export type SessionCreateManyProblemInput = {
    id?: number
    startedAt: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    notes?: string | null
  }

  export type MockInterviewCreateManyProblemInput = {
    id?: number
    date?: Date | string
    timeLimit?: number
    timeTakenSeconds?: number | null
    patternRecognitionSeconds?: number | null
    solved?: boolean
    explanationScore?: number | null
    codeQualityScore?: number | null
    overallScore?: number | null
    notes?: string | null
  }

  export type ProblemTagUpdateWithoutProblemInput = {
    tag?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemTagUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemTagUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemCompanyUpdateWithoutProblemInput = {
    company?: CompanyCardUpdateOneRequiredWithoutProblemsNestedInput
  }

  export type ProblemCompanyUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemCompanyUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemPatternUpdateWithoutProblemInput = {
    pattern?: PatternUpdateOneRequiredWithoutProblemsNestedInput
  }

  export type ProblemPatternUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    patternId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemPatternUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    patternId?: IntFieldUpdateOperationsInput | number
  }

  export type SubmissionUpdateWithoutProblemInput = {
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    revisions?: RevisionUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    revisions?: RevisionUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    attemptNumber?: IntFieldUpdateOperationsInput | number
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptType?: StringFieldUpdateOperationsInput | string
    wasHintUsed?: BoolFieldUpdateOperationsInput | boolean
    mistakeNote?: NullableStringFieldUpdateOperationsInput | string | null
    approachNote?: NullableStringFieldUpdateOperationsInput | string | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutProblemInput = {
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MockInterviewUpdateWithoutProblemInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MockInterviewUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MockInterviewUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    timeTakenSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    patternRecognitionSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solved?: BoolFieldUpdateOperationsInput | boolean
    explanationScore?: NullableIntFieldUpdateOperationsInput | number | null
    codeQualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    overallScore?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProblemPatternCreateManyPatternInput = {
    id?: number
    problemId: number
  }

  export type ProblemPatternUpdateWithoutPatternInput = {
    problem?: ProblemUpdateOneRequiredWithoutPatternsNestedInput
  }

  export type ProblemPatternUncheckedUpdateWithoutPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemPatternUncheckedUpdateManyWithoutPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemCompanyCreateManyCompanyInput = {
    id?: number
    problemId: number
  }

  export type ProblemCompanyUpdateWithoutCompanyInput = {
    problem?: ProblemUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type ProblemCompanyUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
  }

  export type ProblemCompanyUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
  }

  export type RevisionCreateManySubmissionInput = {
    id?: number
    intervalLevel?: number
    nextReviewDate: Date | string
    completed?: boolean
    completedAt?: Date | string | null
    wasSuccessful?: boolean | null
    timeSpentSeconds?: number | null
    solvedWithoutHint?: boolean | null
    confidenceLevel?: number | null
    difficultyRating?: number | null
    notes?: string | null
    previousRevisionId?: number | null
  }

  export type RevisionUpdateWithoutSubmissionInput = {
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RevisionUncheckedUpdateWithoutSubmissionInput = {
    id?: IntFieldUpdateOperationsInput | number
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RevisionUncheckedUpdateManyWithoutSubmissionInput = {
    id?: IntFieldUpdateOperationsInput | number
    intervalLevel?: IntFieldUpdateOperationsInput | number
    nextReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wasSuccessful?: NullableBoolFieldUpdateOperationsInput | boolean | null
    timeSpentSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    solvedWithoutHint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    confidenceLevel?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    previousRevisionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MilestoneCreateManyGoalInput = {
    id?: number
    title: string
    description?: string | null
    targetValue: number
    dueDate: Date | string
    completed?: boolean
    completedDate?: Date | string | null
    completionNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateWithoutGoalInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateWithoutGoalInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyWithoutGoalInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completionNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProblemCountOutputTypeDefaultArgs instead
     */
    export type ProblemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProblemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatternCountOutputTypeDefaultArgs instead
     */
    export type PatternCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatternCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyCardCountOutputTypeDefaultArgs instead
     */
    export type CompanyCardCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyCardCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubmissionCountOutputTypeDefaultArgs instead
     */
    export type SubmissionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubmissionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoalCountOutputTypeDefaultArgs instead
     */
    export type GoalCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoalCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProblemDefaultArgs instead
     */
    export type ProblemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProblemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProblemCompanyDefaultArgs instead
     */
    export type ProblemCompanyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProblemCompanyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProblemTagDefaultArgs instead
     */
    export type ProblemTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProblemTagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatternDefaultArgs instead
     */
    export type PatternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatternDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyCardDefaultArgs instead
     */
    export type CompanyCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyCardDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProblemPatternDefaultArgs instead
     */
    export type ProblemPatternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProblemPatternDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubmissionDefaultArgs instead
     */
    export type SubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubmissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RevisionDefaultArgs instead
     */
    export type RevisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RevisionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MockInterviewDefaultArgs instead
     */
    export type MockInterviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MockInterviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyProgressDefaultArgs instead
     */
    export type DailyProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyProgressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoalDefaultArgs instead
     */
    export type GoalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MilestoneDefaultArgs instead
     */
    export type MilestoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MilestoneDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}