'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/educators', label: 'Educators' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm py-2.5 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4" onClick={closeMobileMenu}>
            <Image 
              src="/images/khm-tutoring-logo.png"
              alt="KHM Tutoring Logo - Expert Tutors in Hawaii and Honolulu" 
              width={40}
              height={40}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg text-foreground leading-tight">
                KHM Tutoring
              </span>
              <span className="text-[11px] sm:text-xs text-muted-foreground italic hidden sm:inline">
                Take it higher
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium',
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground/80 hover:text-primary'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 rounded-lg z-50"
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
          <div className="md:hidden fixed inset-x-0 top-[60px] bg-background shadow-lg border-t border-border">
            <div className="px-4 py-4">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'px-4 py-3 rounded-lg font-medium text-lg',
                        isActive 
                          ? 'text-primary bg-primary/10' 
                          : 'text-foreground/80'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
