import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'aos/dist/aos.css';
import AOSInit from '@/components/ui/AOSInit';
import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { NextAuthProvider } from '../components/auth/NextAuthProvider';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'] 
});

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
      <body className={`${inter.variable} font-sans ${poppins.className} min-h-screen bg-gradient-to-br from-teal-50 to-blue-50`}>
        <AOSInit />
        <NextAuthProvider>
          <Header />
          <main className="min-h-screen pt-24">
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
} 