'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Menu,
  LogOut,
  LogIn,
  ChevronDown,
  Home,
  BookOpen,
  CalendarCheck,
} from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg py-2 backdrop-blur-sm bg-opacity-95'
          : 'bg-gradient-to-r from-blue-600/90 to-teal-500/90 py-4 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-6 border border-white/30 fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgba(137, 132, 239, 0.5)' }}
      >
        {/* Logo */}
        <div className="shrink-0">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="max-w-[80px] max-h-[80px] md:max-w-[120px] md:max-h-[120px] mr-3 rounded-full"
          />
        </div>

        {/* Centered Navigation Tabs */}
        <nav className="flex-1 flex justify-end">
          <div className="flex items-center space-x-4 bg-white/10 rounded-full px-4 py-1 backdrop-blur-md shadow-inner w-[500px]">
            <Link
              href="/"
              className="flex items-center justify-center gap-1 text-white font-semibold px-4 py-2 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 flex-grow text-center no-underline w-[100px] h-[35px]"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link
              href="/lessons"
              className="flex items-center justify-center gap-1 text-white font-semibold px-4 py-2 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 flex-grow text-center no-underline w-[100px] h-[35px]"
            >
              <BookOpen size={18} />
              <span>Lessons</span>
            </Link>

            {session && (
              <Link
                href="/bookings"
                className="flex items-center justify-center gap-1 text-white font-semibold px-4 py-2 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 flex-grow text-center no-underline w-[100px] h-[35px]"
              >
                <CalendarCheck size={18} />
                <span>My Bookings</span>
              </Link>
            )}
          </div>
        </nav>


        {/* Auth Section */}
        <div className="shrink-0 justify-end flex items-center gap-4">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center gap-1 text-white font-semibold px-4 pr-6 py-2 rounded-full transition-colors duration-200 ease-in-out border border-white/30 hover:bg-yellow-100/20 hover:border-yellow-300 flex-grow text-center no-underline w-[150px] h-[35px]"
              >
                Logged Out
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-[10px] top-[50px] mt-2 w-48 bg-blacks rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{session.user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center"
                  >
                    <LogOut size={16} className="mr-2 text-blue-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center"
            >
              <LogIn size={18} className="mr-2" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
