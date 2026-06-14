import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { LanguageProvider } from '@/app/components/LanguageSwitch'
import { ImageKitWrapper } from "@/lib/imagekit";
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

export const metadata: Metadata = {
  title: "Sitaram Seva Sansthan",
  description: "Sitaram Seva Sansthan-Seva Se Samadhan"
};


import { ProgressBar } from "./components/progress-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ImageKitWrapper>
          <LanguageProvider>
            <ProgressBar className="fixed top-0 left-0 h-1 z-60 bg-white" >
            {children}
            </ProgressBar>
          </LanguageProvider>
        </ImageKitWrapper>
      </body>
    </html>
  );
}
