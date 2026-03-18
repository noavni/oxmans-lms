import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No Stripe signature found." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    console.error("[WEBHOOK] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const { courseId, userId } = session.metadata ?? {};

        if (!courseId || !userId) {
          console.error("[WEBHOOK] Missing metadata in session:", session.id);
          break;
        }

        // Create purchase record (upsert to handle duplicate webhook deliveries)
        await prisma.purchase.upsert({
          where: {
            userId_courseId: { userId, courseId },
          },
          create: {
            userId,
            courseId,
            stripeSessionId: session.id,
          },
          update: {
            stripeSessionId: session.id,
          },
        });

        console.log(
          `[WEBHOOK] Purchase created: user=${userId}, course=${courseId}`
        );
        break;
      }

      case "payment_intent.succeeded": {
        // Additional handling if needed
        break;
      }

      default:
        console.log(`[WEBHOOK] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[WEBHOOK] Handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 }
    );
  }
}

// Stripe needs the raw body — disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
