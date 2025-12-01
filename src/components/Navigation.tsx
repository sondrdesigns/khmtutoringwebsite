import { useState, useEffect } from "react";
import { NavLink } from "./NavLink";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import logoImage from "figma:asset/9dd0cc8891b8db9b815fdcb7342d12e827711047.png";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/educators", label: "Educators" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md py-3"
          : "bg-background/95 backdrop-blur-md py-5 md:bg-transparent md:backdrop-blur-none"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src={logoImage} 
              alt="KHM Tutoring Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-foreground leading-tight">
                KHM Tutoring
              </span>
              <span className="text-xs text-muted-foreground italic hidden sm:inline">
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
                className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all duration-200 font-medium"
                activeClassName="text-primary bg-primary/10"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors z-50"
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
          <div className="md:hidden fixed inset-x-0 top-[72px] bg-background/98 backdrop-blur-xl shadow-2xl border-t border-border animate-fade-in max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-all duration-200 font-medium text-lg"
                    activeClassName="text-primary bg-primary/10"
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
};