import { Poppins } from 'next/font/google';
import { NextAuthProvider } from '../components/auth/NextAuthProvider';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import '../styles/globals.css';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'] 
});

export const metadata = {
  title: 'WaveCatcher - Surf Lesson Booking',
  description: 'Book your surf lessons online with our professional instructors',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen bg-gradient-to-br from-teal-50 to-blue-50`}>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
              {children}
            </main>
            
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}