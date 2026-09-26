import { Prisma, type PrismaClient } from '@prisma/client';
import { CreateValidationError, validateCreate, type CreateKind } from '../system-design-create';

// Use the unextended client: all parent, relationship and join ownership is explicit.
export async function createSystemDesignRecord(db: PrismaClient, userId: string, kind: CreateKind, body: unknown) {
  const input = validateCreate(kind, body);
  for (let attempt = 0; ; attempt++) {
    try {
      return await db.$transaction(async tx => {
        if (kind === 'topic') {
          const data = validateCreate('topic', input);
          const existing = await tx.systemDesignTopic.findFirst({ where: { userId, name: data.name } });
          if (existing) throw new CreateValidationError({ name: 'A topic with this name already exists.' }, 409, existing.id);
          return { topic: await tx.systemDesignTopic.create({ data: { ...data, userId } }) };
        }
        const { topicIds, companyIds, ...data } = validateCreate('question', input);
        const existing = await tx.systemDesignQuestion.findFirst({ where: { userId, slug: data.slug } });
        if (existing) throw new CreateValidationError({ slug: 'This slug is already in use. Choose another, or view the existing question.' }, 409, existing.id);
        const [topics, companies] = await Promise.all([
          tx.systemDesignTopic.count({ where: { userId, id: { in: topicIds } } }),
          tx.companyCard.count({ where: { userId, id: { in: companyIds } } }),
        ]);
        const fields: Record<string, string> = {};
        if (topics !== topicIds.length) fields.topicIds = 'One or more topics are unavailable. Reload the options and select again.';
        if (companies !== companyIds.length) fields.companyIds = 'One or more companies are unavailable. Reload the options and select again.';
        if (Object.keys(fields).length) throw new CreateValidationError(fields);
        const question = await tx.systemDesignQuestion.create({
          data: { ...data, userId,
            topics: { create: topicIds.map(topicId => ({ topicId, userId })) },
            companies: { create: companyIds.map(companyId => ({ companyId, userId })) },
          },
          include: { topics: { include: { topic: true } }, companies: { include: { company: { select: { id: true, name: true } } } } },
        });
        return { question };
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 10000, timeout: 15000 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2034' && attempt < 2) continue;
        if (error.code === 'P2002') throw new CreateValidationError({ [kind === 'topic' ? 'name' : 'slug']: 'This value is already in use.' }, 409);
      }
      throw error;
    }
  }
}
