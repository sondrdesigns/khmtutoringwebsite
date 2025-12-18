import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/khm-tutoring-logo.png";

// Move static data outside component
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/educators", label: "Educators" },
  { to: "/contact", label: "Contact Us" },
];

export const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-primary text-white w-full" style={{ width: '100vw', maxWidth: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      {/* Main Footer Content */}
      <div className="w-full container mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start text-center md:text-left">
          {/* Left - Navigation Links */}
          <div className="space-y-2 md:space-y-2.5">
            {navLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-1.5 justify-center md:justify-start text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center order-first md:order-none">
            <img
              src={logoImage}
              alt="KHM Tutoring - Expert Tutors in Hawaii and Honolulu"
              className="w-32 md:w-36 h-auto object-contain"
              loading="lazy"
              width={144}
              height={144}
            />
          </div>

          {/* Right - Contact Information */}
          <div className="space-y-2 md:space-y-2.5 md:text-right">
            <div>
              <p className="text-white text-xs md:text-sm break-all">
                Email: khmtutoring1@gmail.com
              </p>
            </div>
            <div>
              <p className="text-white text-xs md:text-sm">
                Phone: (808) 381-7856
              </p>
            </div>
            <div>
              <p className="text-white/80 text-xs md:text-sm font-semibold">
                Serving Honolulu, Oahu & All of Hawaii
              </p>
            </div>
            <div>
              <p className="text-white/80 text-xs md:text-sm">
                Monday – Friday: 3 pm – 9 pm
              </p>
            </div>
            <div>
              <p className="text-white/80 text-xs md:text-sm">
                Saturday – Sunday: 10 am – 10 pm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full border-t border-white/10">
        <div className="container mx-auto px-4 py-2 md:py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-center text-white/60 text-xs md:text-sm">
              © Copyright {currentYear} KHM Tutoring. All Rights Reserved.
            </p>
            <p className="text-center text-white/60 text-xs md:text-sm">
              Site by{" "}
              <a
                href="https://www.sondrdesigns.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors underline underline-offset-2"
              >
                Sondr Designs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});