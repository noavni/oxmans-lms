import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const session = await auth();

    const course = await prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
      include: {
        chapters: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                description: true,
                duration: true,
                position: true,
                isFree: true,
                videoUrl: true,
              },
              orderBy: { position: "asc" },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Check if user has purchased
    let isPurchased = false;
    if (session?.user?.id) {
      const purchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },
      });
      isPurchased = !!purchase;
    }

    // Strip video URLs from non-free lessons if not purchased
    const sanitizedCourse = {
      ...course,
      isPurchased,
      chapters: course.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson) => ({
          ...lesson,
          videoUrl:
            isPurchased || lesson.isFree ? lesson.videoUrl : null,
        })),
      })),
    };

    return NextResponse.json(sanitizedCourse);
  } catch (error) {
    console.error("[COURSE_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch course." },
      { status: 500 }
    );
  }
}
