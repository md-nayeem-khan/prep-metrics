// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/behavioral/filters - Competencies, categories, companies for filter UI
export async function GET() {
  try {
    const [competencies, companies, categories] = await Promise.all([
      prisma.competency.findMany({ orderBy: [{ type: 'asc' }, { name: 'asc' }], select: { id: true, name: true, type: true, company: true } }),
      prisma.companyCard.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, icon: true } }),
      prisma.behavioralQuestion.findMany({ distinct: ['category'], select: { category: true }, orderBy: { category: 'asc' } }),
    ])

    return NextResponse.json({
      competencies,
      companies,
      categories: categories.map((c) => c.category),
    })
  } catch (error) {
    console.error('Error fetching behavioral filters:', error)
    return NextResponse.json({ error: 'Failed to fetch filters' }, { status: 500 })
  }
}
