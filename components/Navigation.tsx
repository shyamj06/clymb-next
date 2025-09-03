'use client'

import { useState, useEffect } from 'react'
import { Instagram, Menu, X } from 'lucide-react';
import svgPaths from "../imports/svg-y5z4886nhe";

// Custom LinkedIn SVG component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19.5 0.5C20.2969 0.5 21 1.20312 21 2.04688V20C21 20.8438 20.2969 21.5 19.5 21.5H1.45312C0.65625 21.5 0 20.8438 0 20V2.04688C0 1.20312 0.65625 0.5 1.45312 0.5H19.5ZM6.32812 18.5V8.51562H3.23438V18.5H6.32812ZM4.78125 7.10938C5.76562 7.10938 6.5625 6.3125 6.5625 5.32812C6.5625 4.34375 5.76562 3.5 4.78125 3.5C3.75 3.5 2.95312 4.34375 2.95312 5.32812C2.95312 6.3125 3.75 7.10938 4.78125 7.10938ZM18 18.5V13.0156C18 10.3438 17.3906 8.23438 14.25 8.23438C12.75 8.23438 11.7188 9.07812 11.2969 9.875H11.25V8.51562H8.29688V18.5H11.3906V13.5781C11.3906 12.2656 11.625 11 13.2656 11C14.8594 11 14.8594 12.5 14.8594 13.625V18.5H18Z" fill="currentColor"/>
  </svg>
)

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('intro');
  const [hasBackground, setHasBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'clients', 'services', 'cases', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Check if we're past the intro section
      const introSection = document.getElementById('intro');
      if (introSection) {
        const introHeight = introSection.offsetHeight;
        setHasBackground(window.scrollY > introHeight - 100);
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { id: 'intro', label: 'Home' },
    { id: 'clients', label: 'Clients' },
    { id: 'services', label: 'Services' },
    { id: 'cases', label: 'Cases' },
    { id: 'contact', label: 'Get in touch' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasBackground ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-4 sm:px-8 pt-8 sm:pt-12 pb-4">
          {/* Left spacer for desktop, hidden on mobile */}
          <div className="opacity-0 hidden lg:block">
            <LinkedInIcon className={`w-6 h-6 ${hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'}`} />
          </div>
          
          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[20px] tracking-[0.4px] transition-all hover:opacity-80 font-['Zain'] font-light ${
                  hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'
                } ${
                  activeSection === item.id ? 'opacity-100' : 'opacity-90'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile: Social Icons (Left) + Hamburger (Right) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Social Icons - Always visible on mobile */}
            <div className="flex items-center gap-4">
              <button 
                className={`transition-opacity hover:opacity-80 ${
                  hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'
                }`}
                style={{ cursor: 'pointer' }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                className={`transition-opacity hover:opacity-80 ${
                  hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'
                }`}
                style={{ cursor: 'pointer' }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              className={`hamburger-button transition-opacity hover:opacity-80 ${
                hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {/* Desktop Social Icons - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 px-3">
            <button 
              className={`transition-opacity hover:opacity-80 ${
                hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'
              }`}
              style={{ cursor: 'pointer' }}
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </button>
            <button 
              className={`transition-opacity hover:opacity-80 ${
                hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'
              }`}
              style={{ cursor: 'pointer' }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6F9CE6] via-[#63C5E9] to-[#5DB4D4]" />
          
          {/* Close button - positioned at top right */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-8 right-4 sm:right-8 z-10 text-white hover:opacity-80 transition-opacity p-2"
            style={{ cursor: 'pointer' }}
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-8">
            {/* Logo */}
            <div className="w-[280px] h-[104px] mb-12">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 386 144">
                <g>
                  <path d={svgPaths.p11e62f00} fill="white" />
                  <path d={svgPaths.p3e16a300} fill="white" />
                  <path d={svgPaths.p298dfc00} fill="white" />
                  <path d={svgPaths.p5d1100} fill="white" />
                  <path d={svgPaths.p2c928100} fill="white" />
                </g>
              </svg>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-[#ffffff] text-[32px] sm:text-[36px] tracking-[0.64px] transition-all hover:opacity-80 font-['Zain'] font-light mobile-menu-item ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-90'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Close text option at bottom */}
            <button
              onClick={closeMobileMenu}
              className="absolute bottom-12 text-white/80 hover:text-white transition-colors text-[18px] tracking-[0.36px] font-['Zain'] font-light"
              style={{ cursor: 'pointer' }}
            >
              Close menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}