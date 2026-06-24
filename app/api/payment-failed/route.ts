import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { payments } from "@/db/schema";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type PaymentFailedBody = {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  error?: {
    description?: unknown;
    reason?: unknown;
  };
};

function cleanText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 500) : fallback;
}

export async function POST(request: Request) {
  let body: PaymentFailedBody;

  try {
    body = (await request.json()) as PaymentFailedBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId =
    typeof body.razorpay_order_id === "string" ? body.razorpay_order_id.trim() : "";

  if (!orderId) {
    return NextResponse.json({ error: "Missing Razorpay order id." }, { status: 400 });
  }

  const failureReason = cleanText(
    body.error?.description ?? body.error?.reason,
    "Payment failed or was cancelled."
  );

  await db
    .update(payments)
    .set({
      razorpayPaymentId:
        typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : null,
      status: "failed",
      failureReason,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(payments.razorpayOrderId, orderId));

  return NextResponse.json({ success: true });
}
