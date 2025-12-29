import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { NavLink } from "./NavLink";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import logoImage from "../assets/khm-tutoring-logo.png";

// Move static data outside component
const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/educators", label: "Educators" },
  { to: "/contact", label: "Contact Us" },
];

// Throttle function for scroll events
function throttle<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  }) as T;
}

export const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md py-3 border-b border-primary/10"
          : "bg-background/95 backdrop-blur-md py-5 md:bg-transparent md:backdrop-blur-none border-b border-primary/5"
      )}
      style={{ willChange: isScrolled ? 'transform, backdrop-filter' : 'auto' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 sm:space-x-4" onClick={closeMobileMenu}>
            <img 
              src={logoImage} 
              alt="KHM Tutoring Logo - Expert Tutors in Hawaii and Honolulu" 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              loading="eager"
              width={64}
              height={64}
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl sm:text-2xl md:text-2xl text-foreground leading-tight">
                KHM Tutoring
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground italic hidden sm:inline">
                Take it higher
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium border border-transparent hover:border-primary/20"
                activeClassName="text-primary border-primary/30 shadow-lg"
                activeStyle={{ backgroundColor: '#DBEAFE' }}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[72px] bg-background/98 backdrop-blur-xl shadow-2xl border-t border-primary/20 bg-gradient-to-b from-background to-primary/5 animate-fade-in max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={closeMobileMenu}
                    className="px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-200 font-medium text-lg border border-transparent hover:border-primary/20"
                    activeClassName="text-primary border-primary/30 shadow-lg"
                    activeStyle={{ backgroundColor: '#DBEAFE' }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});