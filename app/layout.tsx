import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ImageKitWrapper } from "@/lib/imagekit";
import { GTProvider } from "gt-next";
import { getLocale, getLocaleDirection } from "gt-next/server";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sitaram Seva Sansthan",
  description: "Sitaram Seva Sansthan-Seva Se Samadhan"
};


import { ProgressBar } from "./components/progress-bar";
import { Toaster } from "./components/ui/sonner";
import { AIAssistant } from "./components/ai-assistant";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={direction} data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <GTProvider>
          <ImageKitWrapper>
            <Toaster
              position="top-right"
              closeButton
            />
            <ProgressBar className="fixed top-0 left-0 h-1 z-60 bg-white">
              {children}
            </ProgressBar>
            <AIAssistant />
          </ImageKitWrapper>
        </GTProvider>
      </body>
    </html>
  );
}
