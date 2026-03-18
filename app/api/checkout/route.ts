import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

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
    const { courseId, free } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found." },
        { status: 404 }
      );
    }

    // Check if already purchased
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: "You have already purchased this course.", alreadyPurchased: true },
        { status: 400 }
      );
    }

    // Handle free courses
    if (course.price === 0 || free) {
      if (course.price !== 0 && free) {
        return NextResponse.json(
          { error: "This course is not free." },
          { status: 400 }
        );
      }

      await prisma.purchase.create({
        data: {
          userId: session.user.id,
          courseId: course.id,
        },
      });

      return NextResponse.json({ success: true, slug: course.slug });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: course.currency.toLowerCase(),
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: course.id,
        userId: session.user.id,
      },
      success_url: `${appUrl}/courses/${course.slug}?success=1`,
      cancel_url: `${appUrl}/courses/${course.slug}?canceled=1`,
      customer_email: session.user.email ?? undefined,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
