// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const companyId = parseInt(id)

    if (Number.isNaN(companyId)) {
      return NextResponse.json({ error: 'Invalid company id' }, { status: 400 })
    }

    const body = await request.json()
    const values: any[] = []

    const existing = await prisma.companyCard.findUnique({
      where: { id: companyId },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    if (body?.name !== undefined) {
      const nextName = body.name?.trim()
      if (!nextName) {
        return NextResponse.json({ error: 'Company name cannot be empty' }, { status: 400 })
      }

      const duplicate = await prisma.companyCard.findFirst({
        where: {
          id: { not: companyId },
          name: { equals: nextName, mode: 'insensitive' },
        },
        select: { id: true },
      })

      if (duplicate) {
        return NextResponse.json(
          { error: 'A company with this name already exists' },
          { status: 409 }
        )
      }
      values.push({ name: nextName })
    }

    if (body?.icon !== undefined) {
      const nextIcon = body.icon?.trim()
      values.push({ icon: nextIcon || '🏢' })
    }

    if (body?.targetProblems !== undefined) {
      const nextTarget = Number(body.targetProblems)
      if (!Number.isFinite(nextTarget) || nextTarget < 0) {
        return NextResponse.json(
          { error: 'Target problems must be a non-negative number' },
          { status: 400 }
        )
      }
      values.push({ targetProblems: Math.round(nextTarget) })
    }

    if (values.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const data = Object.assign({}, ...values)

    const company = await prisma.companyCard.update({
      where: { id: companyId },
      data,
    })

    return NextResponse.json({ company })
  } catch (error) {
    console.error('Error updating company:', error)

    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const companyId = parseInt(id)

    if (Number.isNaN(companyId)) {
      return NextResponse.json({ error: 'Invalid company id' }, { status: 400 })
    }

    const existing = await prisma.companyCard.findUnique({
      where: { id: companyId },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const links = await prisma.problemCompany.count({
      where: { companyId },
    })

    if (links > 0) {
      return NextResponse.json(
        { error: 'Cannot delete company with linked problems' },
        { status: 409 }
      )
    }

    await prisma.companyCard.delete({ where: { id: companyId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting company:', error)

    return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 })
  }
}
