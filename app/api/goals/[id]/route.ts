// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/goals/[id] - Get single goal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = parseInt(id);

    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
      include: {
        milestones: {
          orderBy: { dueDate: 'asc' }
        }
      }
    });

    if (!goal) {
      return NextResponse.json(
        { error: 'Goal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ goal });
  } catch (error) {
    console.error('Error fetching goal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goal' },
      { status: 500 }
    );
  }
}

// PATCH /api/goals/[id] - Update goal
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = parseInt(id);
    const body = await request.json();

    const {
      title,
      description,
      type,
      targetValue,
      currentValue,
      unit,
      startDate,
      deadline,
      status,
      priority,
      targetPattern,
      targetCompany,
      targetDifficulty
    } = body;

    const updateData: any = { lastProgressUpdate: new Date() };
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (targetValue !== undefined) updateData.targetValue = targetValue;
    if (currentValue !== undefined) updateData.currentValue = currentValue;
    if (unit !== undefined) updateData.unit = unit;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (deadline !== undefined) updateData.deadline = new Date(deadline);
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'completed') {
        updateData.completedAt = new Date();
      }
    }
    if (priority !== undefined) updateData.priority = priority;
    if (targetPattern !== undefined) updateData.targetPattern = targetPattern;
    if (targetCompany !== undefined) updateData.targetCompany = targetCompany;
    if (targetDifficulty !== undefined) updateData.targetDifficulty = targetDifficulty;

    const goal = await prisma.goal.update({
      where: { id: goalId },
      data: updateData,
      include: {
        milestones: true
      }
    });

    return NextResponse.json({ goal });
  } catch (error) {
    console.error('Error updating goal:', error);
    return NextResponse.json(
      { error: 'Failed to update goal' },
      { status: 500 }
    );
  }
}

// DELETE /api/goals/[id] - Delete goal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = parseInt(id);

    await prisma.goal.delete({
      where: { id: goalId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json(
      { error: 'Failed to delete goal' },
      { status: 500 }
    );
  }
}
