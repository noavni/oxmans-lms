import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { lessonId, completed = true } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required." },
        { status: 400 }
      );
    }

    // Verify the lesson exists and the user has purchased the course
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        chapter: {
          include: {
            course: {
              include: {
                purchases: {
                  where: { userId: session.user.id },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found." },
        { status: 404 }
      );
    }

    const hasPurchase = lesson.chapter.course.purchases.length > 0;

    if (!hasPurchase && !lesson.isFree) {
      return NextResponse.json(
        { error: "You must purchase this course to track progress." },
        { status: 403 }
      );
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      create: {
        userId: session.user.id,
        lessonId,
        completed,
      },
      update: {
        completed,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("[PROGRESS]", error);
    return NextResponse.json(
      { error: "Failed to update progress." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    const completedLessons = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
        completed: true,
        lesson: {
          chapter: {
            courseId,
          },
        },
      },
      select: { lessonId: true },
    });

    return NextResponse.json({
      completedLessonIds: completedLessons.map((p) => p.lessonId),
    });
  } catch (error) {
    console.error("[PROGRESS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch progress." },
      { status: 500 }
    );
  }
}
