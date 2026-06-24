"use client";

import Script from "next/script";
import { ArrowUpRight, CreditCard, HeartHandshake } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { T, useGT } from "gt-next/client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { FloatingInput } from "@/app/components/floating-input";

type CheckoutStatus = "idle" | "loading";

type CreateOrderResponse = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailedResponse = {
  error?: {
    description?: string;
    reason?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
  modal: {
    ondismiss: () => void;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: "payment.failed", callback: (response: RazorpayFailedResponse) => void) => void;
    };
  }
}

const quickAmounts = [501, 1100, 2100, 5100];

type FieldErrors = {
  donorName?: string;
};

export default function DonateCheckout() {
  const gt = useGT();
  const [scriptReady, setScriptReady] = useState(false);
  const [amount, setAmount] = useState("1101");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const paymentToastId = useRef<string | number | undefined>(undefined);

  const amountInPaise = useMemo(() => {
    const rupees = Number(amount);
    return Number.isFinite(rupees) ? Math.round(rupees * 100) : 0;
  }, [amount]);

  async function verifyPayment(response: RazorpaySuccessResponse) {
    const verifyResponse = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });

    if (!verifyResponse.ok) {
      const result = (await verifyResponse.json().catch(() => null)) as { error?: string } | null;
      throw new Error(result?.error ?? gt("Payment verification failed."));
    }
  }

  async function recordFailedPayment(response: RazorpayFailedResponse, orderId: string) {
    await fetch("/api/payment-failed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: response.error?.metadata?.order_id ?? orderId,
        razorpay_payment_id: response.error?.metadata?.payment_id,
        error: response.error,
      }),
    }).catch(() => {});
  }

  function handleAnonymousChange(nextAnonymousState: boolean) {
    setIsAnonymous(nextAnonymousState);
    setStatus("idle");

    if (nextAnonymousState) {
      setFieldErrors((current) => ({ ...current, donorName: undefined }));
    }
  }

  function showPaymentLoading(message: string) {
    paymentToastId.current = toast.loading(message, { id: paymentToastId.current });
  }

  function settlePaymentToast(
    type: "success" | "error" | "info",
    message: string
  ) {
    const toastId = paymentToastId.current;
    toast[type](message, { id: toastId });
    paymentToastId.current = undefined;
  }

  function dismissPaymentToast() {
    if (paymentToastId.current !== undefined) {
      toast.dismiss(paymentToastId.current);
      paymentToastId.current = undefined;
    }
  }

  function validateFields() {
    const nextErrors: FieldErrors = {};

    if (!isAnonymous && donorName.trim().length === 0) {
      nextErrors.donorName = gt("Please add your name.");
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: undefined };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (amountInPaise < 100) {
      toast.error(gt("Enter a donation amount of at least ₹1."));
      return;
    }

    if (!validateFields()) {
      requestAnimationFrame(() => document.getElementById("donor-name")?.focus());
      return;
    }

    if (!window.Razorpay || !scriptReady) {
      toast.error(gt("Payment system is still loading. Please try again in a moment."));
      return;
    }

    const finalDonorName = isAnonymous ? gt("Anonymous") : donorName.trim();
    const finalDonorEmail = isAnonymous ? "" : donorEmail.trim();
    const finalDonorPhone = isAnonymous ? "" : donorPhone.trim();
    const finalMessage = message.trim();

    setStatus("loading");
    showPaymentLoading(gt("Opening secure Razorpay checkout…"));

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          donorName: finalDonorName,
          donorEmail: finalDonorEmail,
          donorPhone: finalDonorPhone,
          message: finalMessage,
        }),
      });

      const order = (await orderResponse.json()) as CreateOrderResponse & { error?: string };

      if (!orderResponse.ok) {
        throw new Error(order.error ?? gt("Could not create the payment order."));
      }

      let hasCheckoutOutcome = false;

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Sitaram Seva Sansthan",
        description: gt("Donation for Sitaram Seva Sansthan"),
        order_id: order.orderId,
        prefill: {
          name: finalDonorName,
          email: finalDonorEmail,
          contact: finalDonorPhone,
        },
        notes: {
          message: finalMessage,
        },
        theme: {
          color: "#db2777",
        },
        handler: async (response) => {
          hasCheckoutOutcome = true;
          setStatus("loading");
          showPaymentLoading(gt("Verifying your payment…"));

          try {
            await verifyPayment(response);
            setStatus("idle");
            settlePaymentToast("success", gt("Thank you. Your donation was received successfully."));
          } catch (error) {
            setStatus("idle");
            settlePaymentToast(
              "error",
              error instanceof Error
                ? error.message
                : gt("Payment verification failed. Please contact us if money was debited.")
            );
          }
        },
        modal: {
          ondismiss: () => {
            if (hasCheckoutOutcome) return;

            setStatus("idle");
            dismissPaymentToast();
            toast.info(gt("Checkout was closed before payment."));
          },
        },
      });

      checkout.on("payment.failed", async (response) => {
        hasCheckoutOutcome = true;
        void recordFailedPayment(response, order.orderId);
        setStatus("idle");
        settlePaymentToast(
          "error",
          response.error?.description ?? gt("Payment failed. Please try again later.")
        );
      });

      checkout.open();
      setStatus("idle");
      settlePaymentToast("success", gt("Secure checkout is ready."));
    } catch (error) {
      setStatus("idle");
      settlePaymentToast(
        "error",
        error instanceof Error ? error.message : gt("Could not start the payment.")
      );
    }
  }

  const isBusy = status === "loading";

  return (
    <section id="donate-checkout" className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-pink-200 bg-white/95 p-4 shadow-[0_18px_48px_rgba(157,23,77,0.12)] sm:p-5 md:p-7">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => {
          setStatus("idle");
          toast.error(gt("Could not load Razorpay checkout. Please refresh the page."));
        }}
      />

      <div className="flex items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-pink-100 text-pink-700">
          <HeartHandshake className="size-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-extrabold text-pink-800 sm:text-3xl md:text-4xl">
            <T>Donate Online</T>
          </h2>
          <p className="mt-1 font-mono text-xs font-semibold leading-relaxed text-pink-700 sm:text-sm">
            <T>Use cards, UPI, net banking or wallets to donate securely.</T>
          </p>
        </div>
      </div>

      <form className="mt-6 space-y-4 md:space-y-8" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="font-mono text-sm font-extrabold text-pink-800" htmlFor="donation-amount">
            <T>Donation Amount</T>
          </label>
          <div className="mt-2 flex rounded-xl border-2 border-pink-200 bg-pink-50 px-4 py-2 focus-within:border-pink-600 focus-within:ring-2 focus-within:ring-pink-100">
            <span className="font-mono text-xl font-extrabold text-pink-700 sm:text-2xl">₹</span>
            <Input
              id="donation-amount"
              min={1}
              step={1}
              inputMode="numeric"
              name="donationAmount"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="h-auto border-0 bg-transparent px-2 py-0 font-mono text-xl font-extrabold text-pink-800 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-2xl"
              required
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(String(quickAmount))}
                className="cursor-pointer rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 font-mono text-xs font-extrabold text-pink-700 transition-[transform,box-shadow,background-color,border-color,color] duration-150 hover:border-pink-500 hover:bg-gradient-to-b hover:from-pink-700 hover:to-pink-500 hover:text-white active:scale-[0.96] active:shadow-inner sm:text-sm"
              >
                ₹{quickAmount}
              </button>
            ))}
          </div>
        </div>

        <div className="text-shadow-sm rounded-2xl  bg-white border-2 border-r-4 border-b-4 border-pink-400  p-4">
          <label className="flex min-h-10 cursor-pointer items-center gap-3 font-mono text-sm font-extrabold text-pink-800">
            <input
              id="donation-anonymous"
              type="checkbox"
              checked={isAnonymous}
              onChange={(event) => handleAnonymousChange(event.target.checked)}
              className="size-5 shrink-0 cursor-pointer rounded border-2 border-pink-600 accent-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
            />
            <span><T>Donate anonymously</T></span>
          </label>
          <p className="flex items-center gap-1 mt-2 font-mono text-xs font-semibold leading-relaxed text-pink-700 "> 
           🌟 <T> Anonymous donations are recorded without your personal details.</T>
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {!isAnonymous && (
            <div className="sm:col-span-2">
              <FloatingInput
                label={
                  <>
                    <sup className="text-red-500">* </sup><T>Full name</T> 
                  </>
                }
                value={donorName}
                id="donor-name"
                name="donorName"
                autoComplete="name"
                onChange={(event) => {
                  setDonorName(event.target.value);
                  clearFieldError("donorName");
                }}
                error={fieldErrors.donorName}
                className="rounded-xl border-pink-200 bg-white font-mono font-semibold text-pink-900"
              />
            </div>
          )}

          {!isAnonymous && (
            <>
              <div>
                <FloatingInput
                  label={<T>Phone number (Optional)</T>}
                  value={donorPhone}
                  name="donorPhone"
                  autoComplete="tel"
                  onChange={(event) => setDonorPhone(event.target.value)}
                  inputMode="tel"
                  className="rounded-xl border-pink-200 bg-white font-mono font-semibold text-pink-900"
                />
              </div>
              <div>
                <FloatingInput
                  label={<T>Email address (Optional)</T>}
                  value={donorEmail}
                  name="donorEmail"
                  autoComplete="email"
                  spellCheck={false}
                  onChange={(event) => setDonorEmail(event.target.value)}
                  inputMode="email"
                  type="email"
                  className="rounded-xl border-pink-200 bg-white font-mono font-semibold text-pink-900"
                />
              </div>
            </>
          )}

          <div className="sm:col-span-2">
            <FloatingInput
              label={<T>Message, dedication, or note</T>}
              value={message}
              name="donorMessage"
              autoComplete="off"
              onChange={(event) => setMessage(event.target.value)}
              className="rounded-xl border-pink-200 bg-white font-mono font-semibold text-pink-900"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isBusy}
          className="h-12 w-full cursor-pointer rounded-xl bg-gradient-to-b from-pink-500 to-pink-700 px-5 py-5 font-serif text-xl font-extrabold text-white shadow-lg shadow-pink-700/20 hover:bg-pink-800 sm:h-13 sm:px-6 sm:py-6 sm:text-2xl" 
        >
          <CreditCard className="size-5" aria-hidden="true" />
          {isBusy ? <T>Opening Checkout…</T> : <T>Pay Securely</T>}
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </Button>
      </form>
      <div className="mt-6 flex items-center justify-center gap-2 border-t border-pink-100 pt-4 font-mono text-xs font-bold text-pink-700">
        <span><T>Securely processed by</T></span>
        <Image
          src="/razorpay-icon.png"
          alt="Razorpay"
          width={88}
          height={26}
          className="h-auto w-[88px]"
        />
      </div>
    </section>
  );
}
