'use client';

import { useState, useEffect, useCallback } from 'react';
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

function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, wait: number): T {
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

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-background shadow-md py-3 border-b border-border'
          : 'bg-background py-5 border-b border-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4" onClick={closeMobileMenu}>
            <Image 
              src="/images/khm-tutoring-logo.png"
              alt="KHM Tutoring Logo - Expert Tutors in Hawaii and Honolulu" 
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl sm:text-2xl md:text-2xl text-foreground leading-tight">
                KHM Tutoring
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground italic hidden sm:inline">
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
                    'px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium border border-transparent hover:border-primary/20',
                    isActive && 'text-primary border-primary/30 shadow-lg'
                  )}
                  style={isActive ? { backgroundColor: '#DBEAFE' } : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
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
          <div className="md:hidden fixed inset-x-0 top-[72px] bg-background shadow-lg border-t border-border max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-200 font-medium text-lg border border-transparent hover:border-primary/20',
                        isActive && 'text-primary border-primary/30 shadow-lg'
                      )}
                      style={isActive ? { backgroundColor: '#DBEAFE' } : undefined}
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
