import { FaInstagram, FaFacebook, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sky-100 bg-sky-50/60 pt-14 pb-8 text-slate-600">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Company */}
          <div className="text-center md:text-left">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Blue Line Surf School</h2>
            <p className="mx-auto max-w-sm text-sm leading-relaxed md:mx-0">
              Expert instruction for every level. Whether you are a beginner or refining your
              skills, we will help you catch the perfect wave.
            </p>
            <div className="mt-5 flex justify-center gap-4 md:justify-start">
              {[
                { href: 'https://www.instagram.com', label: 'Instagram', Icon: FaInstagram },
                { href: 'https://www.facebook.com', label: 'Facebook', Icon: FaFacebook },
                { href: 'https://www.twitter.com', label: 'Twitter', Icon: FaTwitter },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-slate-400 transition-colors hover:text-sky-600"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="text-center md:text-left">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Quick links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
              <Link href="/lessons" className="hover:text-sky-600 transition-colors">Lessons</Link>
              <Link href="/bookings" className="hover:text-sky-600 transition-colors">My bookings</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Contact us</h3>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start justify-center gap-3 md:justify-start">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-sky-500" size={14} />
                <p>No 65, Yakdehimulla Road, Unawatuna 80600</p>
              </div>
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <FaPhone className="shrink-0 text-sky-500" size={14} />
                <p>+94 766 690 504</p>
              </div>
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <FaEnvelope className="shrink-0 text-sky-500" size={14} />
                <a href="mailto:info@bluelinesurf.com" className="hover:text-sky-600 transition-colors">
                  info@bluelinesurf.com
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-sky-100 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {currentYear} Blueline Surf School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
