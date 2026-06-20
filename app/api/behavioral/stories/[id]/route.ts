// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/behavioral/stories/[id] - Update a STAR story + its mappings
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const storyId = parseInt(id)
    const body = await request.json()
    const { competencyIds, questionIds, ...fields } = body

    const allowed = ['title', 'situation', 'task', 'action', 'result', 'metrics', 'tags', 'strengthRating']
    const data: any = {}
    for (const key of allowed) if (key in fields) data[key] = fields[key]

    await prisma.starStory.update({ where: { id: storyId }, data })

    if (Array.isArray(competencyIds)) {
      await prisma.storyCompetency.deleteMany({ where: { storyId } })
      await prisma.storyCompetency.createMany({ data: competencyIds.map((competencyId: number) => ({ storyId, competencyId })) })
    }
    if (Array.isArray(questionIds)) {
      await prisma.storyQuestion.deleteMany({ where: { storyId } })
      await prisma.storyQuestion.createMany({ data: questionIds.map((questionId: number) => ({ storyId, questionId })) })
    }

    const updated = await prisma.starStory.findUnique({
      where: { id: storyId },
      include: { competencies: { include: { competency: true } } },
    })
    return NextResponse.json({ story: updated })
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
  }
}

// DELETE /api/behavioral/stories/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.starStory.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
