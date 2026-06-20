# AlgoMetrics

AlgoMetrics - Interview Preparation Analytics Dashboard for competitive programming practice with FAANG-level tracking and goal management.

## Features

### 🎯 Core Tracking
- **Problem Logging**: Track LeetCode, Codeforces, and other platforms
- **Pattern Recognition Drill**: Practice identifying algorithmic patterns in under 2 minutes
- **Time Tracking**: Built-in timer for solving sessions
- **Submission History**: Complete history with notes, approaches, and mistakes

### 📊 Analytics & Intelligence
- **Interview Readiness Score**: Data-driven assessment of interview preparedness
- **Pattern Mastery Tracking**: Confidence levels for each algorithmic pattern
- **Weakness Detection**: Automatically identifies weak areas and provides recommendations
- **Company Readiness**: Track preparation for specific companies (Amazon, Google, Meta, etc.)
- **Time Performance**: Compare solving times against FAANG benchmarks

### 🎯 Goals & Milestones
- **Structured Goal Setting**: Create measurable goals (problem count, streaks, pattern mastery)
- **Progress Tracking**: Real-time progress with velocity and on-track detection
- **Milestone Checkpoints**: Break large goals into manageable milestones
- **Smart Projections**: AI-powered completion date predictions

### 🔄 Spaced Repetition
- **Auto Review Scheduler**: Optimized revision intervals (1, 3, 7, 14, 30, 60 days)
- **Revision Queue**: Daily list of problems due for review
- **Performance Tracking**: Track improvement on revisited problems

### 🎭 Mock Interviews
- **Timed Simulations**: 45-minute interview practice sessions
- **Evaluation Metrics**: Track completion, time, explanation, and code quality
- **History Tracking**: Monitor improvement over multiple mock sessions

### 📈 Progress & Consistency
- **Daily Streaks**: Track consecutive days of practice
- **Weekly Progress**: Problems solved, patterns improved, time spent
- **Activity Heatmap**: Visual representation of practice consistency

## Development

```bash
npm install
cp .env.example .env
# set AUTH_SECRET and database credentials in .env
npx prisma migrate dev  # Setup database
npm run dev
```

For an auth secret, use any securely generated string with 32+ characters.

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma (ORM)
- SQLite/PostgreSQL (Database)
- Shadcn UI (Components)
- Recharts (Charts)

## Project Structure

```
dashboard/
├── app/           # Next.js app router pages
├── components/    # React components
├── lib/           # Utility functions
├── types/         # TypeScript types
├── prisma/        # Database schema and migrations
└── public/        # Static assets
```

## Status

✅ **Phase 1: Foundation** - Next.js setup, database schema, Prisma ORM
✅ **Phase 2: API Layer** - 15+ API endpoints for analytics, goals, patterns
✅ **Phase 3: Core Features** - Pattern recognition drill, Goals & Milestones
⏳ **Phase 4: UI Polish** - Dashboard refinements, mobile optimization
⏳ **Phase 5: Advanced Features** - Smart recommendations, pattern confusion matrix

## Documentation

- **[REQUIREMENTS.md](./REQUIREMENTS.md)** - Complete product requirements and wireframes
- **[PATTERN_RECOGNITION_DRILL.md](./PATTERN_RECOGNITION_DRILL.md)** - Pattern recognition speed drill feature
- **[GOALS_AND_MILESTONES.md](./GOALS_AND_MILESTONES.md)** - Goals and milestone tracking system

## Pages

- `/dashboard` - Main analytics hub with 8 insight cards
- `/problems` - Problem list with filtering by company, difficulty, pattern
- `/problems/[id]` - Problem details with timer and pattern drill
- `/patterns` - Pattern categorization and statistics
- `/company` - Company-specific readiness dashboard
- `/revision` - Spaced repetition scheduler
- `/mock` - Mock interview interface
- `/goals` - Goals and milestones tracking
- `/analytics` - Advanced analytics and recommendations
