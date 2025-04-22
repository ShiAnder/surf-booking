'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  LogOut,
  LogIn,
  ChevronDown,
  Home,
  BookOpen,
  CalendarCheck,
  Menu,
  X,
  Camera,
  Video
} from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="relative max-w-[60px] max-h-[60px] md:max-w-[80px] md:max-h-[80px] lg:max-w-[120px] lg:max-h-[120px]">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full"
                priority
              />
            </div>
          </div>

          {/* Hamburger toggle (only on mobile) */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {/* Desktop Navigation & Auth */}
          {!isMobile && (
            <div className="flex md:flex-row items-center gap-4 justify-center">
              {/* Navigation */}
              <nav className="order-1 md:order-1 mt-4 md:mt-0 w-full md:w-auto">
                <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2 md:gap-4">
                  <NavLink href="/" label="Home" Icon={Home} scrolled={scrolled} />
                  <NavLink href="/lessons" label="Lessons" Icon={BookOpen} scrolled={scrolled} />
                  <NavLink href="/gallery" label="Gallery" Icon={Camera} scrolled={scrolled} />
                  <NavLink href="/videos" label="Tutorials" Icon={Video} scrolled={scrolled} />
                  {session && <NavLink href="/bookings" label="Bookings" Icon={CalendarCheck} scrolled={scrolled} />}
                </div>
              </nav>

              {/* Auth Section */}
              <div className="order-2 ml-auto">
                <AuthSection session={session} scrolled={scrolled} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-4 md:hidden flex flex-col gap-2 items-center ml-[250px]">
            <NavLink href="/" label="Home" Icon={Home} scrolled={scrolled} onClick={() => setMobileMenuOpen(false)} />
            <NavLink href="/lessons" label="Lessons" Icon={BookOpen} scrolled={scrolled} onClick={() => setMobileMenuOpen(false)} />
            <NavLink href="/gallery" label="Gallery" Icon={Camera} scrolled={scrolled} onClick={() => setMobileMenuOpen(false)} />
            <NavLink href="/videos" label="Tutorials" Icon={Video} scrolled={scrolled} onClick={() => setMobileMenuOpen(false)} />
            {session && (
              <NavLink
                href="/bookings"
                label="Bookings"
                Icon={CalendarCheck}
                scrolled={scrolled}
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            <div className="mt-2">
              <AuthSection session={session} scrolled={scrolled} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} isMobile />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Reusable NavLink Component
function NavLink({ href, label, Icon, scrolled, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-center font-semibold px-4 py-2 transition-all hover:bg-gray hover:border-yellow-300 text-center no-underline w-[110px] h-[35px] ${
        scrolled ? 'bg-black' : 'bg-[rgb(234, 122, 122)]'
      }`}
    >
      <Icon size={18} color={scrolled ? 'white' : 'black'} />
      <span
        className={`ml-1 transition-colors duration-300 ${scrolled ? 'text-white' : 'text-black'}`}
        style={{ color: scrolled ? 'white' : 'black' }}
      >
        {label}
      </span>
    </Link>
  );
}

// Reusable Auth Section Component
function AuthSection({ session, scrolled, userMenuOpen, setUserMenuOpen, isMobile = false }) {
  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={`flex items-center justify-center gap-1 font-semibold px-4 py-2 rounded-full transition-all border text-center no-underline w-[110px] h-[35px] ${
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
          <div className={`absolute mt-2 w-48 bg-white rounded-lg shadow-xl -ml-[130px] py-2 z-50 ${isMobile ? 'left-0' : 'md:right-0'}`}>
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{session.user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={() => {
                  signOut();
                  setUserMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button
        onClick={() => signIn('google')}
        className={`flex items-center justify-center gap-1 font-semibold px-4 py-2 rounded-full transition-all border text-center no-underline w-[110px] h-[35px] ${
          scrolled
            ? 'text-white bg-black border-white/30 hover:bg-white/20 hover:border-yellow-300'
            : 'text-black bg-[rgb(247,247,247)] border-gray-300 hover:bg-gray-200 hover:border-yellow-300'
        }`}
      >
        <LogIn size={18} color={scrolled ? 'white' : 'black'} />
        <span className="ml-1">Sign In</span>
      </button>
    );
  }
}