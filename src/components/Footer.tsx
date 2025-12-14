import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import logoImage from "../assets/khm-tutoring-logo-footer.png";

// Move static data outside component
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/educators", label: "Educators" },
  { to: "/contact", label: "Contact Us" },
];

const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/khmtutoring",
      color: "hover:text-pink-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/khmtutoring",
      color: "hover:text-blue-400",
    },
    {
      name: "Yelp",
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.271 17.669c.028.635.36 3.947.572 4.967.163.781.928 1.092 1.464.722.374-.258 2.641-1.827 3.307-2.294.502-.351.608-.957.288-1.485-.216-.357-1.487-2.145-1.949-2.749-.462-.604-1.134-.729-1.745-.301-.612.427-1.924 1.326-1.937 1.14zm-1.257-3.621c.31.539 3.299 1.833 4.247 2.158.726.249 1.426-.205 1.543-.852.082-.453.58-3.201.77-4.243.142-.782-.42-1.277-1.092-1.214-.453.042-3.172.284-4.193.42-.797.106-1.134.76-.929 1.427.103.334.373 1.164.654 2.304zm-6.039-2.213c.407.218 3.63 1.945 4.555 2.434.709.375 1.52-.03 1.69-.723.119-.483.844-3.422 1.119-4.535.207-.836-.255-1.43-.899-1.458-.434-.019-3.06-.134-4.042-.178-.766-.034-1.276.469-1.287 1.134-.006.422.065 2.369.129 3.188.034.439.305.872.735 1.138zm1.958 8.253c.194.398 1.373 2.371 1.819 3.14.342.588 1.053.721 1.613.338.391-.267 2.765-1.909 3.66-2.53.672-.466.751-1.13.21-1.698-.366-.383-2.576-2.713-3.395-3.571-.651-.682-1.407-.633-1.964-.04-.557.593-1.943 2.027-1.943 2.027s-.229.774 0 1.334z" />
        </svg>
      ),
      url: "https://www.yelp.com/biz/khm-tutoring",
      color: "hover:text-red-500",
    },
];

export const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-primary text-white w-full" style={{ width: '100vw', maxWidth: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      {/* Main Footer Content */}
      <div className="w-full container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start text-center md:text-left">
          {/* Left - Navigation Links */}
          <div className="space-y-3 md:space-y-4">
            {navLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 justify-center md:justify-start"
                >
                  <span className="w-2 h-2 bg-white rounded-full"></span>
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
              className="w-40 md:w-48 h-auto object-contain"
              loading="lazy"
              width={192}
              height={192}
            />
          </div>

          {/* Right - Contact Information */}
          <div className="space-y-3 md:space-y-4 md:text-right">
            <div>
              <p className="text-white text-sm md:text-base break-all">
                Email: khmtutoring1@gmail.com
              </p>
            </div>
            <div>
              <p className="text-white text-sm md:text-base">
                Phone: (808) 123-4567
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm md:text-base font-semibold">
                Serving Honolulu, Oahu & All of Hawaii
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm md:text-base">
                Monday – Friday: 3 pm – 9 pm
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm md:text-base">
                Saturday – Sunday: 10 am – 10 pm
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 transition-all duration-200 transform hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full border-t border-white/10">
        <div className="container mx-auto px-4 py-3 md:py-4">
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