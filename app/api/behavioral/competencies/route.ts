// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/behavioral/competencies - List all competencies / leadership principles
export async function GET() {
  try {
    const competencies = await prisma.competency.findMany({
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
      select: { id: true, name: true, type: true, company: true, description: true },
    })
    return NextResponse.json({ competencies })
  } catch (error) {
    console.error('Error fetching competencies:', error)
    return NextResponse.json({ error: 'Failed to fetch competencies' }, { status: 500 })
  }
}
