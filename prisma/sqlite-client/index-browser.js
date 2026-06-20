
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.ProblemScalarFieldEnum = {
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

exports.Prisma.ProblemCompanyScalarFieldEnum = {
  id: 'id',
  problemId: 'problemId',
  companyId: 'companyId'
};

exports.Prisma.ProblemTagScalarFieldEnum = {
  id: 'id',
  problemId: 'problemId',
  tag: 'tag'
};

exports.Prisma.PatternScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  description: 'description'
};

exports.Prisma.CompanyCardScalarFieldEnum = {
  id: 'id',
  name: 'name',
  icon: 'icon',
  targetProblems: 'targetProblems',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProblemPatternScalarFieldEnum = {
  id: 'id',
  problemId: 'problemId',
  patternId: 'patternId'
};

exports.Prisma.SubmissionScalarFieldEnum = {
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

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  problemId: 'problemId',
  startedAt: 'startedAt',
  endedAt: 'endedAt',
  durationSeconds: 'durationSeconds',
  notes: 'notes'
};

exports.Prisma.RevisionScalarFieldEnum = {
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

exports.Prisma.MockInterviewScalarFieldEnum = {
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

exports.Prisma.DailyProgressScalarFieldEnum = {
  id: 'id',
  date: 'date',
  problemsSolved: 'problemsSolved',
  totalTimeSpent: 'totalTimeSpent',
  patternsWorked: 'patternsWorked',
  mockInterviews: 'mockInterviews',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GoalScalarFieldEnum = {
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

exports.Prisma.MilestoneScalarFieldEnum = {
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
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

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
