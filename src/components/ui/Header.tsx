'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaWhatsapp, FaTimes, FaBars } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

type NavLink = { href: string; label: string; type: 'page' | 'scroll' };

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when the route changes.
  useEffect(() => setIsOpen(false), [pathname]);

  const onHome = pathname === '/';

  const navLinks: NavLink[] = onHome
    ? [
        { href: '/lessons', label: 'Lessons', type: 'page' },
        { href: 'about', label: 'About', type: 'scroll' },
        { href: 'contact', label: 'Contact', type: 'scroll' },
        { href: '/gallery', label: 'Gallery', type: 'page' },
        { href: '/videos', label: 'Videos', type: 'page' },
        ...(session ? [{ href: '/bookings', label: 'Bookings', type: 'page' as const }] : []),
      ]
    : [
        { href: '/', label: 'Home', type: 'page' },
        { href: '/lessons', label: 'Lessons', type: 'page' },
        { href: '/gallery', label: 'Gallery', type: 'page' },
        { href: '/videos', label: 'Videos', type: 'page' },
        ...(session ? [{ href: '/bookings', label: 'Bookings', type: 'page' as const }] : []),
      ];

  const linkClass =
    'px-3 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 rounded-md transition-colors duration-200 cursor-pointer';

  const renderDesktopLink = (link: NavLink) =>
    link.type === 'page' ? (
      <Link key={link.href} href={link.href} className={linkClass}>
        {link.label}
      </Link>
    ) : (
      <ScrollLink
        key={link.href}
        to={link.href}
        spy
        smooth
        offset={-80}
        duration={500}
        className={linkClass}
      >
        {link.label}
      </ScrollLink>
    );

  const renderMobileLink = (link: NavLink) =>
    link.type === 'page' ? (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
      >
        {link.label}
      </Link>
    ) : (
      <ScrollLink
        key={link.href}
        to={link.href}
        spy
        smooth
        offset={-80}
        duration={500}
        onClick={() => setIsOpen(false)}
        className="block cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
      >
        {link.label}
      </ScrollLink>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 bg-white transition-shadow duration-300 ${
        scrolled ? 'border-b border-sky-100 shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-custom flex h-full items-center justify-between">
        <Link href="/" className="flex items-center no-underline" aria-label="Home">
          <div className="relative h-11 w-11">
            <Image src="/images/logo.jpg" alt="Surf Booking Logo" fill className="rounded-full object-cover" priority />
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(renderDesktopLink)}

          <div className="ml-3 flex items-center gap-2">
            {session ? (
              <button onClick={() => signOut()} className="btn-secondary !px-4 !py-2" aria-label="Sign out">
                Sign out
              </button>
            ) : (
              <button onClick={() => signIn('google')} className="btn-secondary !px-4 !py-2">
                Sign in
              </button>
            )}

            <Link
              href="https://wa.me/+94778244442"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2"
            >
              <FaWhatsapp className="text-base" />
              <span>Book now</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-sky-50 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {/* Mobile navigation panel */}
      {isOpen && (
        <div className="absolute inset-x-0 top-20 border-b border-sky-100 bg-white shadow-md md:hidden">
          <div className="container-custom space-y-1 py-4">
            {navLinks.map(renderMobileLink)}
            <div className="flex flex-col gap-2 pt-3">
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="btn-secondary w-full"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn('google');
                    setIsOpen(false);
                  }}
                  className="btn-secondary w-full"
                >
                  Sign in
                </button>
              )}
              <Link
                href="https://wa.me/+94778244442"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full"
              >
                <FaWhatsapp className="text-base" />
                <span>Book now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
