import Image from "next/image";
import { Banknote, QrCode } from "lucide-react";
import { T, Var } from "gt-next";

import DonateCheckout from "@/app/components/donate-checkout";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Separator } from "@/app/components/ui/separator";

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="mx-auto flex w-full max-w-[80rem] flex-1 px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-7">
        <section className="grid w-full content-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_auto_minmax(22rem,0.85fr)] lg:items-stretch lg:gap-7">
          <DonateCheckout />

          <div className="hidden items-center lg:flex" aria-hidden="true">
            <div className="relative flex h-full items-center">
              <Separator orientation="vertical" className="flex-1 mask-y-from-60% bg-pink-600" />
              <span className="absolute left-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full  bg-gradient-to-b from-pink-600 to-pink-500 font-mono text-xs font-extrabold uppercase text-white shadow-sm">
                <T>or</T>
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-full items-center gap-2 overflow-hidden px-0.5 lg:hidden" aria-hidden="true">
            <Separator className="min-w-0 flex-1 shrink mask-l-from-60% bg-linear-to-l from-pink-700 via-pink-600 to-pink-400" />
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-b from-pink-600 to-pink-500 font-mono text-[10px] font-extrabold uppercase text-white shadow-sm"><T>or</T></span>
            <Separator className="min-w-0 flex-1 shrink mask-r-from-60% bg-linear-to-r from-pink-700 via-pink-600 to-pink-400" />
          </div>

          <aside className="overflow-hidden rounded-3xl border border-pink-200 bg-white/95 shadow-[0_18px_48px_rgba(157,23,77,0.12)]">
            <section className="p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-pink-100 text-pink-700">
                  <QrCode className="size-5" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-lg font-extrabold text-pink-800 sm:text-xl">
                  <T>Scan with any UPI App</T>
                </h2>
              </div>
              <div className="rounded-2xl bg-pink-50 p-3" id="qr-code">
                <Image
                  src="/qr-code.png"
                  alt="Donation QR Code"
                  width={640}
                  height={900}
                  className="mx-auto h-[15rem] w-auto max-w-full object-contain md:h-[17rem]"
                />
              </div>
            </section>

            <Separator className="bg-pink-100" />

            <section id="bank-details" className="p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-pink-100 text-pink-700">
                  <Banknote className="size-5" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-lg font-extrabold text-pink-800 sm:text-xl">
                  <T>Bank Details</T>
                </h2>
              </div>
              <dl className="grid gap-3 font-mono text-xs font-bold text-pink-900 sm:text-sm md:grid-cols-2">
                <div className="rounded-xl bg-pink-50 p-3 md:col-span-2">
                  <dt className="text-pink-600">
                    <T>Account Name</T>
                  </dt>
                  <dd>
                    <Var>सीताराम सेवा संस्थान</Var>
                  </dd>
                </div>
                <div className="rounded-xl bg-pink-50 p-3">
                  <dt className="text-pink-600">
                    <T>Account Number</T>
                  </dt>
                  <dd>
                    <Var>50100749971577</Var>
                  </dd>
                </div>
                <div className="rounded-xl bg-pink-50 p-3">
                  <dt className="text-pink-600">
                    <T>IFSC Code</T>
                  </dt>
                  <dd>
                    <Var>HDFC0001240</Var>
                  </dd>
                </div>
                <div className="rounded-xl bg-pink-50 p-3">
                  <dt className="text-pink-600">
                    <T>Bank Name</T>
                  </dt>
                  <dd>
                    <Var>HDFC Bank</Var>
                  </dd>
                </div>
                <div className="rounded-xl bg-pink-50 p-3 md:col-span-2">
                  <dt className="text-pink-600">
                    <T>Branch</T>
                  </dt>
                  <dd>
                    <Var>Janjeerwala Chouraha Branch, Indore</Var>
                  </dd>
                </div>
              </dl>
            </section>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
