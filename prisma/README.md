# Prisma Setup Documentation

## Database Configuration

### SQLite (Default - Development)

SQLite is configured by default for local development. Zero configuration required.

```env
DATABASE_URL="file:./dev.db"
```

**Pros:**
- ✅ No setup required
- ✅ File-based database (portable)
- ✅ Perfect for development
- ✅ Fast for small datasets

**Cons:**
- ❌ Not recommended for production
- ❌ Limited concurrency
- ❌ No network access

### PostgreSQL (Production)

For production deployment, switch to PostgreSQL for better performance and scalability.

#### Option 1: Supabase (Recommended)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings > Database
4. Update `.env`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
```

#### Option 2: Neon

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `.env`:

```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require"
```

#### Option 3: Railway

1. Create account at [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Copy connection string
4. Update `.env`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/railway"
```

### Switching from SQLite to PostgreSQL

1. Update `.env` with PostgreSQL connection string
2. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

3. Run migration:

```bash
npx prisma migrate dev --name switch_to_postgres
npx prisma generate
```

## Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Prisma Client Usage

```typescript
import { prisma } from '@/lib/prisma'

// Create
const problem = await prisma.problem.create({
  data: {
    platform: 'leetcode',
    problemId: '1',
    title: 'Two Sum',
    difficulty: 'easy',
  }
})

// Read
const problems = await prisma.problem.findMany({
  where: { platform: 'leetcode' },
  include: { tags: true, patterns: true }
})

// Update
const updated = await prisma.problem.update({
  where: { id: 1 },
  data: { difficulty: 'medium' }
})

// Delete
await prisma.problem.delete({
  where: { id: 1 }
})
```

## Troubleshooting

**Issue:** `PrismaClient is unable to run`
**Solution:** Run `npx prisma generate`

**Issue:** Database connection error
**Solution:** Check DATABASE_URL in `.env` file

**Issue:** Schema changes not applied
**Solution:** Run `npx prisma migrate dev`

---

✅ Prisma setup complete!
