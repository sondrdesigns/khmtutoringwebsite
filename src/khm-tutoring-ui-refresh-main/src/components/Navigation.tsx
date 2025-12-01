import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import khmLogo from "@/assets/khm-logo.png";

interface NavigationProps {
  onLoginClick: () => void;
}

export const Navigation = ({ onLoginClick }: NavigationProps) => {
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
          ? "bg-background/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3">
            <img 
              src={khmLogo} 
              alt="KHM Tutoring Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-foreground leading-tight">
                KHM Tutoring
              </span>
              <span className="text-xs text-muted-foreground italic">
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={onLoginClick}
              variant="default"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Profile / Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
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
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-all duration-200 font-medium"
                  activeClassName="text-primary bg-primary/10"
                >
                  {item.label}
                </NavLink>
              ))}
              <Button
                onClick={() => {
                  onLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                variant="default"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold mt-2"
              >
                Profile / Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
