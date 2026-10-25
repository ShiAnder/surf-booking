import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'aos/dist/aos.css';
import AOSInit from '@/components/ui/AOSInit';
import { ReactNode } from 'react';
import { NextAuthProvider } from '../components/auth/NextAuthProvider';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Surf Booking - Your Premier Surf Lesson Booking Platform",
  description: "Experience the best surf lessons with our expertly curated instructors. From beginner basics to advanced techniques, we bring you unforgettable surfing adventures.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans min-h-screen bg-white`}>
        <AOSInit />
        <NextAuthProvider>
          <Header />
          {/* Header is a fixed 80px bar; pages start below it. */}
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
