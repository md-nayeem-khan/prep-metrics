// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const patterns = await prisma.pattern.findMany({
      orderBy: { id: 'asc' }
    })
    return NextResponse.json({ patterns })
  } catch (error) {
    console.error('Error fetching patterns:', error)
    return NextResponse.json({ error: 'Failed to fetch patterns' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = body?.name?.trim()
    const category = body?.category?.trim()
    const description = body?.description?.trim() || null

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      )
    }

    const pattern = await prisma.pattern.create({
      data: {
        name,
        category,
        description,
      },
    })

    return NextResponse.json({ pattern }, { status: 201 })
  } catch (error) {
    console.error('Error creating pattern:', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A pattern with this name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json({ error: 'Failed to create pattern' }, { status: 500 })
  }
}

