import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/revisions/[id] - Get a single revision
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const revisionId = parseInt(id)

    if (isNaN(revisionId)) {
      return NextResponse.json(
        { error: 'Invalid revision ID' },
        { status: 400 }
      )
    }

    const revision = await prisma.revision.findUnique({
      where: { id: revisionId },
      include: {
        submission: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                platform: true,
                source: true,
                url: true
              }
            }
          }
        }
      }
    })

    if (!revision) {
      return NextResponse.json(
        { error: 'Revision not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(revision)
  } catch (error) {
    console.error('Error fetching revision:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revision' },
      { status: 500 }
    )
  }
}

// PUT /api/revisions/[id] - Update a revision (mark as completed, etc.)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const revisionId = parseInt(id)
    const body = await request.json()

    if (isNaN(revisionId)) {
      return NextResponse.json(
        { error: 'Invalid revision ID' },
        { status: 400 }
      )
    }

    const { completed, quality, nextReviewDate, intervalLevel } = body

    // If marking as completed, update the review date for next interval
    const updateData: any = {}
    
    if (completed !== undefined) {
      updateData.completed = completed
      updateData.lastReviewedAt = new Date()
    }
    
    if (quality !== undefined) updateData.quality = quality
    if (nextReviewDate !== undefined) updateData.nextReviewDate = new Date(nextReviewDate)
    if (intervalLevel !== undefined) updateData.intervalLevel = intervalLevel

    const revision = await prisma.revision.update({
      where: { id: revisionId },
      data: updateData,
      include: {
        submission: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(revision)
  } catch (error) {
    console.error('Error updating revision:', error)
    return NextResponse.json(
      { error: 'Failed to update revision' },
      { status: 500 }
    )
  }
}

// DELETE /api/revisions/[id] - Delete a revision
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const revisionId = parseInt(id)

    if (isNaN(revisionId)) {
      return NextResponse.json(
        { error: 'Invalid revision ID' },
        { status: 400 }
      )
    }

    await prisma.revision.delete({
      where: { id: revisionId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting revision:', error)
    return NextResponse.json(
      { error: 'Failed to delete revision' },
      { status: 500 }
    )
  }
}
