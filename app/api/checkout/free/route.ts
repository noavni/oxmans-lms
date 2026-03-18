import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required." }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
      select: { id: true, price: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    if (course.price !== 0) {
      return NextResponse.json({ error: "This course is not free." }, { status: 400 });
    }

    await prisma.purchase.upsert({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      create: { userId: session.user.id, courseId },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[FREE_ENROLL]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
