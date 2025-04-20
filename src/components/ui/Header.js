'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu if screen size changes to desktop
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg py-2 backdrop-blur-sm bg-opacity-95'
          : 'bg-gradient-to-r from-blue-600/90 to-teal-500/90 py-4 backdrop-blur-sm'
      }`}
    >
      {/* Desktop Header */}
      <div 
        className="container px-4 sm:px-6 flex items-center justify-between gap-6 fixed top-[0px] left-0 right-[0px] z-50"
        style={{
          backgroundColor: scrolled
            ? 'rgba(243, 237, 237, 0.8)'  // When scrolled
            : 'rgba(193, 226, 238, 0)', // At top
        }}
      >
        <div className="flex items-center justify-between w-1/1">
          {/* Logo */}
          <div className="shrink-0 w-1 pl-4" >
            <div className="relative max-w-[60px] max-h-[60px] md:max-w-[80px] md:max-h-[80px] lg:max-w-[120px] lg:max-h-[120px]">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={120}
                height={120}
                className="rounded-full"
                priority
              />
            </div>
          </div>

          <div className="shrink-0 w-1 pl-4">
            {/* Mobile Menu Button - Fixed position on the right */}
            <button 
              className="block md:hidden p-2 mr-2 rounded-md z-50 border border-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)'
              }}
            >
              {mobileMenuOpen ? (
                <X size={24} color={scrolled ? 'white' : 'black'} />
              ) : (
                <Menu size={24} color={scrolled ? 'white' : 'black'} />
              )}
            </button>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex flex-1 justify-end">
            <div className="flex items-center space-x-4 bg-white/10 rounded-full px-4 py-1 backdrop-blur-md shadow-inner w-[400px]">
              <div className="md:flex items-center gap-2 w-[120px]">
                <Link
                  href="/"
                  className={`flex items-center justify-center font-semibold px-4 py-2 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 flex-grow text-center no-underline w-[100px] h-[35px] ${
                    scrolled ? 'bg-black' : 'bg-[rgb(247,247,247)]'
                  }`}
                >
                  <Home size={18} color={scrolled ? 'white' : 'black'} />
                  <span
                    className={`ml-1 transition-colors duration-300 ${
                      scrolled ? 'text-white' : 'text-black'
                    }`}
                    style={{
                      color: scrolled ? 'white' : 'black', // This enforces the color
                    }}
                  >
                    Home
                  </span>
                </Link>
              </div>

              <div className="md:flex items-center gap-2 w-[120px]">
                <Link
                  href="/lessons"
                  className={`flex items-center justify-center font-semibold px-4 py-2 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 flex-grow text-center no-underline w-[100px] h-[35px] ${
                    scrolled ? 'bg-black' : 'bg-[rgb(247,247,247)]'
                  }`}
                >
                  <BookOpen size={18} color={scrolled ? 'white' : 'black'} />
                  <span
                    className={`ml-1 transition-colors duration-300 ${
                      scrolled ? 'text-white' : 'text-black'
                    }`}
                    style={{
                      color: scrolled ? 'white' : 'black', // This enforces the color
                    }}
                  >
                    Lessons
                  </span>
                </Link>
              </div>

              {session && (
                <div className="md:flex items-center gap-2 w-[120px]">
                  <Link
                    href="/bookings"
                    className={`flex items-center justify-center font-semibold px-4 py-2 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 flex-grow text-center no-underline w-[150px] h-[35px] ${
                      scrolled ? 'bg-black' : 'bg-[rgb(247,247,247)]'
                    }`}
                  >
                    <CalendarCheck size={18} color={scrolled ? 'white' : 'black'} />
                    <span
                      className={`ml-1 transition-colors duration-300 ${
                        scrolled ? 'text-white' : 'text-black'
                      }`}
                      style={{
                        color: scrolled ? 'white' : 'black', // This enforces the color
                      }}
                    >
                      My Bookings
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Auth - Hidden on mobile */}
          <div className="hidden md:flex shrink-0 justify-end items-center gap-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center justify-center gap-1 font-semibold px-4 py-2 rounded-full transition-all border flex-grow text-center no-underline w-[100px] h-[35px] ${
                    scrolled
                      ? 'text-white bg-black border-white/30 hover:bg-white/20 hover:border-yellow-300'
                      : 'text-black bg-[rgb(247,247,247)] border-gray-300 hover:bg-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div>Profile</div>
                  <ChevronDown
                    size={16}
                    color={scrolled ? 'white' : 'black'}
                    className={`transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-[10px] top-[50px] mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className={`flex items-center justify-center gap-1 font-semibold px-4 py-2 rounded-full transition-all border flex-grow text-center no-underline w-[100px] h-[35px] ${
                          scrolled
                            ? 'text-white bg-black border-white/30 hover:bg-white/20 hover:border-yellow-300'
                            : 'text-black bg-[rgb(247,247,247)] border-gray-300 hover:bg-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <LogOut
                          size={16}
                          color={scrolled ? 'white' : 'black'}
                          className="mr-2"
                        />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className={`flex items-center justify-center gap-1 font-semibold px-4 py-2 rounded-full transition-all border flex-grow text-center no-underline w-[100px] h-[35px] ${
                  scrolled
                    ? 'text-white bg-black border-white/30 hover:bg-white/20 hover:border-yellow-300'
                    : 'text-black bg-[rgb(247,247,247)] border-gray-300 hover:bg-gray-200 hover:border-yellow-300'
                }`}
              >
                <LogIn size={18} color={scrolled ? 'white' : 'black'} className="mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Fixed position with higher z-index */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-0 right-[10px] top-[60px] "
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // At top
            paddingTop: '10px' // Space for the header
          }}
        >
          <div className="flex flex-col space-y-4 p-5">
            {/* Mobile Navigation Links */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center justify-center font-semibold px-4 py-3 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 w-full ${
                scrolled ? 'bg-blue-600' : 'bg-[rgb(247,247,247)]'
              }`}
            >
              <Home size={20} color= 'black' className="mr-2" />
              <span
                style={{
                  color:'black',
                }}
              >
                Home
              </span>
            </Link>
            
            <Link
              href="/lessons"
              onClick={closeMobileMenu}
              className={`flex items-center justify-center font-semibold px-4 py-3 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 w-full ${
                scrolled ? 'bg-blue-600' : 'bg-[rgb(247,247,247)]'
              }`}
            >
              <BookOpen size={20} color='black' className="mr-2" />
              <span
                style={{
                  color:'black',
                }}
              >
                Lessons
              </span>
            </Link>
            
            {session && (
              <Link
                href="/bookings"
                onClick={closeMobileMenu}
                className={`flex items-center justify-center font-semibold px-4 py-3 rounded-full transition-all border border-white/30 hover:bg-white/20 hover:border-yellow-300 w-full ${
                  scrolled ? 'bg-blue-600' : 'bg-[rgb(247,247,247)]'
                }`}
              >
                <CalendarCheck size={20} color='black' className="mr-2" />
                <span
                  style={{
                    color: 'black',
                  }}
                >
                  My Bookings
                </span>
              </Link>
            )}
            
            {/* Mobile Auth Section */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              {session ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${scrolled ? 'bg-gray-800' : 'bg-white/20'}`}>
                    <p className={`font-medium ${scrolled ? 'text-white' : 'text-gray-800'}`}>
                      {session.user?.name || 'User'}
                    </p>
                    <p className={`text-sm ${scrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                      {session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                    className={`flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-full transition-all border w-full ${
                      scrolled 
                        ? 'bg-red-600 text-white border-red-700 hover:bg-red-700' 
                        : 'bg-red-500 text-white border-red-600 hover:bg-red-600'
                    }`}
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn('google');
                    closeMobileMenu();
                  }}
                  className={`flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-full transition-all border w-full ${
                    scrolled 
                      ? 'bg-teal-600 text-white border-teal-700 hover:bg-teal-700' 
                      : 'bg-teal-500 text-white border-teal-600 hover:bg-teal-600'
                  }`}
                >
                  <LogIn size={20} />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}