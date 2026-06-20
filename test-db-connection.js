// Quick database connection test
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...\n')
    
    // Test 1: Basic query
    const problemCount = await prisma.problem.count()
    console.log('✅ Connection successful!')
    console.log(`   - Problems in database: ${problemCount}`)
    
    // Test 2: Count all tables
    const submissionCount = await prisma.submission.count()
    const patternCount = await prisma.pattern.count()
    const revisionCount = await prisma.revision.count()
    const mockInterviewCount = await prisma.mockInterview.count()
    const dailyProgressCount = await prisma.dailyProgress.count()
    
    console.log('\n📊 Database Statistics:')
    console.log(`   - Problems: ${problemCount}`)
    console.log(`   - Submissions: ${submissionCount}`)
    console.log(`   - Patterns: ${patternCount}`)
    console.log(`   - Revisions: ${revisionCount}`)
    console.log(`   - Mock Interviews: ${mockInterviewCount}`)
    console.log(`   - Daily Progress Records: ${dailyProgressCount}`)
    
    // Test 3: Get a sample submission with relations
    const sampleSubmission = await prisma.submission.findFirst({
      include: {
        problem: {
          include: {
            patterns: {
              include: {
                pattern: true
              }
            }
          }
        }
      }
    })
    
    if (sampleSubmission) {
      console.log('\n🔬 Sample Data Structure:')
      console.log(`   - Problem: ${sampleSubmission.problem.title}`)
      console.log(`   - Status: ${sampleSubmission.status}`)
      console.log(`   - Time Spent: ${Math.round(sampleSubmission.timeSpentSeconds / 60)} minutes`)
      console.log(`   - Hint Used: ${sampleSubmission.wasHintUsed ? 'Yes' : 'No'}`)
      if (sampleSubmission.problem.patterns.length > 0) {
        console.log(`   - Pattern: ${sampleSubmission.problem.patterns[0].pattern.name}`)
      }
    }
    
    // Test 4: Check if readiness calculation works
    const recentSubmissions = await prisma.submission.findMany({
      where: { status: 'solved' },
      take: 5,
      orderBy: { submittedAt: 'desc' }
    })
    
    console.log('\n📈 Recent Activity:')
    console.log(`   - Recent solved problems: ${recentSubmissions.length}`)
    if (recentSubmissions.length > 0) {
      const avgTime = recentSubmissions.reduce((sum, s) => sum + s.timeSpentSeconds, 0) / recentSubmissions.length
      console.log(`   - Average time: ${Math.round(avgTime / 60)} minutes`)
    }
    
    console.log('\n✨ Database is fully connected and operational!')
    console.log('\n💡 Next steps:')
    console.log('   1. Start the dev server: npm run dev')
    console.log('   2. Visit: http://localhost:3000/dashboard')
    console.log('   3. Add some problems to test the features!')
    
  } catch (error) {
    console.error('\n❌ Database connection failed!')
    console.error('Error:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('   1. Check if DATABASE_URL is set in .env file')
    console.error('   2. Run: npx prisma migrate dev')
    console.error('   3. Run: npx prisma generate')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
