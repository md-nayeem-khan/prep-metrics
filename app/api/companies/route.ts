import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const companies = await prisma.companyCard.findMany({
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ companies })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = body?.name?.trim()
    const icon = body?.icon?.trim() || '🏢'
    const targetProblems = Number(body?.targetProblems)

    if (!name) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 })
    }

    if (!Number.isFinite(targetProblems) || targetProblems < 0) {
      return NextResponse.json(
        { error: 'Target problems must be a non-negative number' },
        { status: 400 }
      )
    }

    const existingByName = await prisma.companyCard.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
      },
      select: { id: true },
    })

    if (existingByName) {
      return NextResponse.json(
        { error: 'A company with this name already exists' },
        { status: 409 }
      )
    }

    const company = await prisma.companyCard.create({
      data: {
        name,
        icon,
        targetProblems: Math.round(targetProblems),
      },
    })

    return NextResponse.json({ company }, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)

    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
  }
}
