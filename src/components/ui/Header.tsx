'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaWhatsapp, FaTimes, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { Link as ScrollLink } from 'react-scroll';

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isGalleryOrVideosPage = pathname === '/gallery' || pathname === '/videos';

  const navLinks = isGalleryOrVideosPage
    ? [
        { href: "/", label: "Home", type: "page" },
        { href: "/lessons", label: "Lessons", type: "page" },
        { href: "/gallery", label: "Gallery", type: "page" },
        { href: "/videos", label: "Videos", type: "page" },
        ...(session ? [{ href: "/bookings", label: "Bookings", type: "page" }] : []),
      ]
    : [
        { href: "/lessons", label: "Lessons", type: "page" },
        { href: "about", label: "About", type: "scroll" },
        { href: "contact", label: "Contact", type: "scroll" },
        { href: "/gallery", label: "Gallery", type: "page" },
        { href: "/videos", label: "Videos", type: "page" },
        ...(session ? [{ href: "/bookings", label: "Bookings", type: "page" }] : []),
      ];

  const renderNavLink = (link: { href: string; label: string; type: string }) => {
    if (link.type === "page") {
      return (
        <Link
          key={link.href}
          href={link.href}
          className={`cursor-pointer w-32 h-8 flex items-center justify-center font-medium text-xl transition-all duration-300 px-4 py-2 rounded-md ${
            scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-black hover:text-blue-200'
          }`}
        >
          {link.label}
        </Link>
      );
    }
    
    return (
      <ScrollLink
        key={link.href}
        to={link.href}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className={`cursor-pointer w-32 h-8 flex items-center justify-center font-medium text-xl transition-all duration-300 px-4 py-2 rounded-md ${
          scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-black hover:text-blue-200'
        }`}
      >
        {link.label}
      </ScrollLink>
    );
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-transparent backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="relative w-12 h-12 lg:w-16 lg:h-16">
              <Image
                src="/images/logo.jpg"
                alt="Surf Booking Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-600 hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(renderNavLink)}

            {session ? (
              <button
                onClick={() => signOut()}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium ${
                  scrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700 backdrop-blur-sm'
                }`}
                aria-label="Sign out"
              >
                <FaSignOutAlt size={20} />
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium ${
                  scrolled
                    ? 'bg-gray-200 text-black hover:bg-blue-700'
                    : 'bg-white text-black hover:bg-blue-700 backdrop-blur-sm'
                }`}
              >
                Sign In
              </button>
            )}

            {!isGalleryOrVideosPage && (
              <Link 
                href="https://wa.me/+94778244442"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium ${
                  scrolled
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-green-500 text-white hover:bg-green-600 backdrop-blur-sm'
                }`}
              >
                <FaWhatsapp className="text-xl" />
                <span>Book Now</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 shadow-xl bg-white">
              {navLinks.map((link) => (
                link.type === "page" ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 cursor-pointer font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <ScrollLink
                    key={link.href}
                    to={link.href}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 cursor-pointer font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </ScrollLink>
                )
              ))}
              
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2 font-medium"
                >
                  <FaSignOutAlt size={20} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn('google');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2 font-medium"
                >
                  Sign In
                </button>
              )}

              {!isGalleryOrVideosPage && (
                <Link 
                  href="https://wa.me/+94778244442"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors mt-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Book Now</span>
                </Link>
              )}
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  );
}