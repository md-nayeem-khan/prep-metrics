import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const USER_SCOPED_MODELS = new Set([
  'Problem',
  'ProblemCompany',
  'ProblemTag',
  'Pattern',
  'CompanyCard',
  'ProblemPattern',
  'Submission',
  'Session',
  'Revision',
  'MockInterview',
  'DailyProgress',
  'Goal',
  'Milestone',
  // System Design track
  'SystemDesignQuestion',
  'SystemDesignTopic',
  'SDQuestionTopic',
  'SDQuestionCompany',
  'SystemDesignAttempt',
  'SystemDesignRevision',
  // Behavioral track
  'BehavioralQuestion',
  'Competency',
  'StarStory',
  'BehavioralQuestionCompetency',
  'BehavioralQuestionCompany',
  'StoryCompetency',
  'StoryQuestion',
  'BehavioralAttempt',
  'BehavioralRevision',
]);

function modelDelegateName(model: string): string {
  return model.charAt(0).toLowerCase() + model.slice(1);
}

function mergeUserWhere(where: unknown, userId: string): Record<string, unknown> {
  if (!where) {
    return { userId };
  }

  return {
    AND: [where, { userId }],
  };
}

function injectUserId(data: unknown, userId: string): unknown {
  if (Array.isArray(data)) {
    return data.map((item) => injectUserId(item, userId));
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    if (!record.userId) {
      return { ...record, userId };
    }
  }

  return data;
}

async function getCurrentUserId(): Promise<string | null> {
  try {
    const requestHeaders = await headers();
    return requestHeaders.get('x-authenticated-user-id');
  } catch {
    return null;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const basePrisma = globalForPrisma.prisma ?? new PrismaClient();

export const authPrisma = basePrisma;

export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (!model || !USER_SCOPED_MODELS.has(model)) {
          return query(args);
        }

        const userId = await getCurrentUserId();
        if (!userId) {
          throw new Error('No authenticated user in request context');
        }

        const delegate = (basePrisma as unknown as Record<string, unknown>)[modelDelegateName(model)] as Record<string, (input: unknown) => Promise<unknown>>;
        const mutableArgs = (args ?? {}) as Record<string, unknown>;

        if (operation === 'create') {
          mutableArgs.data = injectUserId(mutableArgs.data, userId);
          return query(mutableArgs);
        }

        if (operation === 'createMany') {
          mutableArgs.data = injectUserId(mutableArgs.data, userId);
          return query(mutableArgs);
        }

        if (operation === 'findUnique') {
          return delegate.findFirst({
            ...(mutableArgs as Record<string, unknown>),
            where: mergeUserWhere(mutableArgs.where, userId),
          });
        }

        if (operation === 'findUniqueOrThrow') {
          return delegate.findFirstOrThrow({
            ...(mutableArgs as Record<string, unknown>),
            where: mergeUserWhere(mutableArgs.where, userId),
          });
        }

        if (operation === 'findFirst' || operation === 'findFirstOrThrow' || operation === 'findMany' || operation === 'count' || operation === 'aggregate' || operation === 'groupBy') {
          mutableArgs.where = mergeUserWhere(mutableArgs.where, userId);
          return query(mutableArgs);
        }

        if (operation === 'update' || operation === 'delete' || operation === 'upsert') {
          const record = await delegate.findFirst({
            where: mergeUserWhere(mutableArgs.where, userId),
            select: { id: true },
          });

          if (!record) {
            throw new Error('Record not found for the authenticated user');
          }

          if (operation === 'upsert') {
            mutableArgs.create = injectUserId(mutableArgs.create, userId);
            mutableArgs.update = injectUserId(mutableArgs.update, userId);
          }

          return query(mutableArgs);
        }

        if (operation === 'updateMany' || operation === 'deleteMany') {
          mutableArgs.where = mergeUserWhere(mutableArgs.where, userId);
          return query(mutableArgs);
        }

        return query(args);
      },
    },
  },
}) as unknown as PrismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = basePrisma;
