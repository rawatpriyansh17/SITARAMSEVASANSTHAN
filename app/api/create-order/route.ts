import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { payments } from "@/db/schema";
import { db } from "@/lib/db";
import { getPublicRazorpayKeyId, getRazorpayClient } from "@/lib/razorpay";

export const runtime = "nodejs";

const MIN_AMOUNT_PAISE = 100;
const MAX_AMOUNT_PAISE = 10_00_000;

type CreateOrderBody = {
  amount?: unknown;
  donorName?: unknown;
  donorEmail?: unknown;
  donorPhone?: unknown;
  message?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function isRazorpayAuthError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { statusCode?: number; error?: { code?: string } };
  return candidate.statusCode === 401 || candidate.error?.code === "BAD_REQUEST_ERROR";
}

export async function POST(request: Request) {
  let body: CreateOrderBody;

  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Number(body.amount);

  if (!Number.isInteger(amount) || amount < MIN_AMOUNT_PAISE) {
    return NextResponse.json(
      { error: "Donation amount must be at least ₹1." },
      { status: 400 }
    );
  }

  if (amount > MAX_AMOUNT_PAISE) {
    return NextResponse.json(
      { error: "Donation amount is higher than the online payment limit." },
      { status: 400 }
    );
  }

  try {
    const razorpay = getRazorpayClient();
    const receipt = `don_${Date.now().toString(36)}_${randomUUID().slice(0, 8)}`;
    const donorName = cleanText(body.donorName, 120);
    const donorEmail = cleanText(body.donorEmail, 160);
    const donorPhone = cleanText(body.donorPhone, 20);
    const message = cleanText(body.message, 500);

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
      notes: {
        donorName: donorName ?? "",
        donorEmail: donorEmail ?? "",
        donorPhone: donorPhone ?? "",
      },
    });

    await db.insert(payments).values({
      id: randomUUID(),
      receipt,
      razorpayOrderId: order.id,
      amount,
      currency: order.currency,
      donorName,
      donorEmail,
      donorPhone,
      message,
      status: "created",
    });

    return NextResponse.json({
      keyId: getPublicRazorpayKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt,
    });
  } catch (error) {
    if (isRazorpayAuthError(error)) {
      return NextResponse.json(
        { error: "Payment gateway authentication failed." },
        { status: 401 }
      );
    }

    console.error("Failed to create Razorpay order", error);
    return NextResponse.json(
      { error: "Could not start the payment. Please try again later." },
      { status: 500 }
    );
  }
}
