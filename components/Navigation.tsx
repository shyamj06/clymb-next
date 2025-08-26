'use client'

import { useState, useEffect } from 'react'
import { Instagram, Linkedin, Menu, X } from 'lucide-react';
import svgPaths from "../imports/svg-y5z4886nhe";

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
            <Linkedin className={`w-6 h-6 ${hasBackground ? 'text-[#0d3543]' : 'text-[#ffffff]'}`} />
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
                <Linkedin className="w-5 h-5" />
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
              <Linkedin className="w-6 h-6" />
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