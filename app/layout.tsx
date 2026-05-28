import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from '@/app/components/LanguageSwitch'
import { ImageKitWrapper } from "@/lib/imagekit";
import { Toaster } from "./components/sonner";
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

import Chatbot from "@/app/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ImageKitWrapper>
          <LanguageProvider>
            <div className="fixed bottom-6 right-6 z-50">
              <Chatbot />
            </div>
            <Toaster 
            position="top-right"/>
            {children}
          </LanguageProvider>
        </ImageKitWrapper>
      </body>
    </html>
  );
}
