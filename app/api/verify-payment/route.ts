import { createHmac, timingSafeEqual } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { payments } from "@/db/schema";
import { db } from "@/lib/db";
import { getRazorpayKeys } from "@/lib/razorpay";

export const runtime = "nodejs";

type VerifyPaymentBody = {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  razorpay_signature?: unknown;
};

function getRequiredString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function signaturesMatch(expected: string, received: string) {
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(request: Request) {
  let body: VerifyPaymentBody;

  try {
    body = (await request.json()) as VerifyPaymentBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = getRequiredString(body.razorpay_order_id);
  const paymentId = getRequiredString(body.razorpay_payment_id);
  const signature = getRequiredString(body.razorpay_signature);

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { error: "Missing payment verification fields." },
      { status: 400 }
    );
  }

  const { keySecret } = getRazorpayKeys();
  const expectedSignature = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (!signaturesMatch(expectedSignature, signature)) {
    await db
      .update(payments)
      .set({
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        status: "signature_mismatch",
        failureReason: "Payment signature verification failed.",
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(payments.razorpayOrderId, orderId));

    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 400 }
    );
  }

  await db
    .update(payments)
    .set({
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
      status: "paid",
      failureReason: null,
      verifiedAt: sql`CURRENT_TIMESTAMP`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(payments.razorpayOrderId, orderId));

  return NextResponse.json({ success: true });
}
