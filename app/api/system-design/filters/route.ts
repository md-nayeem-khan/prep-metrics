// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/system-design/filters - Topics, categories, and companies for filter UI
export async function GET() {
  try {
    const [topics, companies, categories] = await Promise.all([
      prisma.systemDesignTopic.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] }),
      prisma.companyCard.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, icon: true } }),
      prisma.systemDesignQuestion.findMany({ distinct: ['category'], select: { category: true }, orderBy: { category: 'asc' } }),
    ])

    return NextResponse.json({
      topics: topics.map((t) => ({ id: t.id, name: t.name, category: t.category })),
      companies,
      categories: categories.map((c) => c.category),
    })
  } catch (error) {
    console.error('Error fetching system design filters:', error)
    return NextResponse.json({ error: 'Failed to fetch filters' }, { status: 500 })
  }
}
