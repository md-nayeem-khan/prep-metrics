// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/milestones/[id] - Update milestone
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const milestoneId = parseInt(id);

    if (Number.isNaN(milestoneId)) {
      return NextResponse.json({ error: 'Invalid milestone id' }, { status: 400 });
    }

    const body = await request.json();

    const {
      title,
      description,
      dueDate,
      targetValue,
      completed,
      completionNote
    } = body;

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (targetValue !== undefined) updateData.targetValue = targetValue;
    
    if (completed !== undefined) {
      updateData.completed = completed;
      if (completed) {
        updateData.completedDate = new Date();
        if (completionNote !== undefined) {
          updateData.completionNote = completionNote;
        }
      } else {
        updateData.completedDate = null;
        if (completionNote !== undefined) {
          updateData.completionNote = completionNote;
        }
      }
    } else if (completionNote !== undefined) {
      updateData.completionNote = completionNote;
    }

    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: updateData
    });

    return NextResponse.json({ milestone });
  } catch (error) {
    console.error('Error updating milestone:', error);
    return NextResponse.json(
      { error: 'Failed to update milestone' },
      { status: 500 }
    );
  }
}

// DELETE /api/milestones/[id] - Delete milestone
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const milestoneId = parseInt(id);

    if (Number.isNaN(milestoneId)) {
      return NextResponse.json({ error: 'Invalid milestone id' }, { status: 400 });
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
      select: { id: true, goalId: true }
    });

    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }

    const totalMilestones = await prisma.milestone.count({
      where: { goalId: milestone.goalId }
    });

    if (totalMilestones <= 1) {
      return NextResponse.json(
        { error: 'A goal must have at least one milestone' },
        { status: 400 }
      );
    }

    await prisma.milestone.delete({
      where: { id: milestoneId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting milestone:', error);
    return NextResponse.json(
      { error: 'Failed to delete milestone' },
      { status: 500 }
    );
  }
}
