// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const patternId = parseInt(id)

    if (Number.isNaN(patternId)) {
      return NextResponse.json({ error: 'Invalid pattern id' }, { status: 400 })
    }

    const body = await request.json()
    const updateData: any = {}

    if (body?.name !== undefined) {
      const nextName = body.name?.trim()
      if (!nextName) {
        return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
      }
      updateData.name = nextName
    }

    if (body?.category !== undefined) {
      const nextCategory = body.category?.trim()
      if (!nextCategory) {
        return NextResponse.json({ error: 'Category cannot be empty' }, { status: 400 })
      }
      updateData.category = nextCategory
    }

    if (body?.description !== undefined) {
      const nextDescription = body.description?.trim()
      updateData.description = nextDescription || null
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const pattern = await prisma.pattern.update({
      where: { id: patternId },
      data: updateData,
    })

    return NextResponse.json({ pattern })
  } catch (error) {
    console.error('Error updating pattern:', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Pattern not found' }, { status: 404 })
      }

      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A pattern with this name already exists' },
          { status: 409 }
        )
      }
    }

    return NextResponse.json({ error: 'Failed to update pattern' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const patternId = parseInt(id)

    if (Number.isNaN(patternId)) {
      return NextResponse.json({ error: 'Invalid pattern id' }, { status: 400 })
    }

    await prisma.pattern.delete({ where: { id: patternId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting pattern:', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Pattern not found' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Failed to delete pattern' }, { status: 500 })
  }
}
