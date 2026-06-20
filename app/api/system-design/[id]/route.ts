// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/system-design/[id] - Full question detail (with rich content + attempts)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const questionId = parseInt(id)

    const question = await prisma.systemDesignQuestion.findUnique({
      where: { id: questionId },
      include: {
        topics: { include: { topic: true } },
        companies: { include: { company: { select: { id: true, name: true, icon: true } } } },
        attempts: { orderBy: { submittedAt: 'desc' } },
      },
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    return NextResponse.json({
      question: {
        ...question,
        topics: question.topics.map((t) => ({ id: t.topic.id, name: t.topic.name, category: t.topic.category })),
        companies: question.companies.map((c) => c.company.name),
        companyIds: question.companies.map((c) => c.company.id),
      },
    })
  } catch (error) {
    console.error('Error fetching system design question:', error)
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 })
  }
}

// PATCH /api/system-design/[id] - Update question (notes, content, tags)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const questionId = parseInt(id)
    const body = await request.json()

    const { topicIds, companyIds, ...fields } = body

    const allowed = [
      'title', 'difficulty', 'category', 'prompt', 'functionalRequirements',
      'nonFunctionalRequirements', 'estimationNotes', 'referenceSolution',
      'commonPitfalls', 'url', 'notes', 'source',
    ]
    const data: any = {}
    for (const key of allowed) {
      if (key in fields) data[key] = fields[key]
    }

    await prisma.systemDesignQuestion.update({ where: { id: questionId }, data })

    if (Array.isArray(topicIds)) {
      await prisma.sDQuestionTopic.deleteMany({ where: { questionId } })
      await prisma.sDQuestionTopic.createMany({ data: topicIds.map((topicId: number) => ({ questionId, topicId })) })
    }
    if (Array.isArray(companyIds)) {
      await prisma.sDQuestionCompany.deleteMany({ where: { questionId } })
      await prisma.sDQuestionCompany.createMany({ data: companyIds.map((companyId: number) => ({ questionId, companyId })) })
    }

    const updated = await prisma.systemDesignQuestion.findUnique({
      where: { id: questionId },
      include: {
        topics: { include: { topic: true } },
        companies: { include: { company: { select: { id: true, name: true } } } },
      },
    })

    return NextResponse.json({ question: updated })
  } catch (error) {
    console.error('Error updating system design question:', error)
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 })
  }
}

// DELETE /api/system-design/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.systemDesignQuestion.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting system design question:', error)
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 })
  }
}
