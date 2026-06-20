// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/goals/[id]/milestones - Add a milestone to a goal
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = parseInt(id);

    if (Number.isNaN(goalId)) {
      return NextResponse.json({ error: 'Invalid goal id' }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, dueDate, targetValue } = body;

    if (!title || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields: title, dueDate' },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
      include: { milestones: true }
    });

    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    const safeTargetValue =
      typeof targetValue === 'number' && Number.isFinite(targetValue)
        ? Math.max(1, Math.floor(targetValue))
        : goal.milestones.length + 1;

    const milestone = await prisma.milestone.create({
      data: {
        goalId,
        title,
        description,
        dueDate: new Date(dueDate),
        targetValue: safeTargetValue
      }
    });

    return NextResponse.json({ milestone }, { status: 201 });
  } catch (error) {
    console.error('Error creating milestone:', error);
    return NextResponse.json(
      { error: 'Failed to create milestone' },
      { status: 500 }
    );
  }
}