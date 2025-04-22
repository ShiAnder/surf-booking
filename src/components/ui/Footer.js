import { FaInstagram, FaFacebook, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-700 to-teal-600 text-white pt-12 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-yellow-300 mb-4 flex items-center justify-center md:justify-start">
              Blue Line Surf School
            </h2>
            <p className="text-base mb-6">
              Experience the ultimate surf adventure with our expert instructors.
              Whether you&apos;re a beginner or looking to refine your skills, 
              we&apos;re here to help you catch the perfect wave.
            </p>
            <div className="flex justify-center md:justify-start space-x-5">
              <a
                href="https://www.instagram.com"
                className="text-white hover:text-yellow-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com"
                className="text-white hover:text-yellow-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                className="text-white hover:text-yellow-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6 text-yellow-300">Quick Links</h3>
            <nav className="space-y-4">
              <Link
                href="/"
                className="block text-lg hover:text-yellow-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/lessons"
                className="block text-lg hover:text-yellow-300 transition-colors"
              >
                Lessons
              </Link>
              <Link
                href="/bookings"
                className="block text-lg hover:text-yellow-300 transition-colors"
              >
                My Bookings
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6 text-yellow-300">Contact Us</h3>
            <address className="text-base not-italic space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-3 text-yellow-300" size={20} />
                <p>No 65, Yakdehimulla, Road, Unawatuna 80600</p>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3 text-yellow-300" size={20} />
                <p>+94 766 690 504</p>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-3 text-yellow-300" size={20} />
                <a
                  href="mailto:info@bluelinesurf.com"
                  className="hover:text-yellow-300 transition-colors"
                >
                  info@bluelinesurf.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white border-opacity-20 mt-10 pt-6 text-center text-sm text-white text-opacity-80">
          <p>&copy; {currentYear} Blueline Surf School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}