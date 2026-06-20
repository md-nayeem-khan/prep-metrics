// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/behavioral/[id] - Full question detail with rich content + attempts
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const questionId = parseInt(id)

    const question = await prisma.behavioralQuestion.findUnique({
      where: { id: questionId },
      include: {
        competencies: { include: { competency: { select: { id: true, name: true, type: true, company: true } } } },
        companies: { include: { company: { select: { id: true, name: true } } } },
        stories: { include: { story: { select: { id: true, title: true, strengthRating: true } } } },
        attempts: { orderBy: { submittedAt: 'desc' }, include: { story: { select: { id: true, title: true } } } },
      },
    })

    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

    return NextResponse.json({
      question: {
        ...question,
        competencies: question.competencies.map((c) => ({ id: c.competency.id, name: c.competency.name, type: c.competency.type, company: c.competency.company })),
        companies: question.companies.map((c) => c.company.name),
        companyIds: question.companies.map((c) => c.company.id),
        linkedStories: question.stories.map((s) => s.story),
      },
    })
  } catch (error) {
    console.error('Error fetching behavioral question:', error)
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 })
  }
}

// PATCH /api/behavioral/[id]
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const questionId = parseInt(id)
    const body = await request.json()
    const { competencyIds, companyIds, ...fields } = body

    const allowed = ['prompt', 'category', 'difficulty', 'whatTheyAssess', 'exemplarAnswer', 'followUps', 'notes', 'source']
    const data: any = {}
    for (const key of allowed) if (key in fields) data[key] = fields[key]

    await prisma.behavioralQuestion.update({ where: { id: questionId }, data })

    if (Array.isArray(competencyIds)) {
      await prisma.behavioralQuestionCompetency.deleteMany({ where: { questionId } })
      await prisma.behavioralQuestionCompetency.createMany({ data: competencyIds.map((competencyId: number) => ({ questionId, competencyId })) })
    }
    if (Array.isArray(companyIds)) {
      await prisma.behavioralQuestionCompany.deleteMany({ where: { questionId } })
      await prisma.behavioralQuestionCompany.createMany({ data: companyIds.map((companyId: number) => ({ questionId, companyId })) })
    }

    const updated = await prisma.behavioralQuestion.findUnique({
      where: { id: questionId },
      include: { competencies: { include: { competency: true } }, companies: { include: { company: true } } },
    })
    return NextResponse.json({ question: updated })
  } catch (error) {
    console.error('Error updating behavioral question:', error)
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 })
  }
}

// DELETE /api/behavioral/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.behavioralQuestion.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting behavioral question:', error)
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 })
  }
}
