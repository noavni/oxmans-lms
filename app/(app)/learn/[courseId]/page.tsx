import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function LearnCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/learn/${courseId}`);
  }

  const course = await prisma.course.findUnique({
    where: { slug: courseId },
    include: {
      chapters: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
            select: { id: true },
          },
        },
      },
    },
  });

  if (!course) notFound();

  // Verify purchase
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: course.id,
      },
    },
  });

  if (!purchase) {
    redirect(`/courses/${course.slug}`);
  }

  const firstLesson = course.chapters[0]?.lessons[0];
  if (!firstLesson) {
    redirect("/dashboard");
  }

  redirect(`/learn/${courseId}/${firstLesson.id}`);
}
