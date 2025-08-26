'use client'

import { useState, useEffect } from 'react'

const logos = [
    { name: 'Company 1', text: 'CASPER' },
    { name: 'Company 2', text: 'VITO' },
    { name: 'Company 3', text: 'BROOX' },
    { name: 'Company 4', text: 'FILES' },
    { name: 'Company 5', text: 'JADU' },
    { name: 'Company 6', text: 'DUCCA' },
  ];

export default function ClientsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 4) % logos.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    const getVisibleLogos = () => {
      const visible = [];
      for (let i = 0; i < 4; i++) {
        const index = (currentIndex + i) % logos.length;
        visible.push({ ...logos[index], displayIndex: i });
      }
      return visible;
    };
  return (
    <section id="clients" className="bg-[#ffffff] py-20 lg:py-40">
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex flex-col items-center gap-8 lg:gap-16">
        <h2 
          className="text-[32px] sm:text-[40px] lg:text-[48px] tracking-[0.64px] lg:tracking-[0.96px] font-['Zain'] font-medium text-center sm:text-left"
          style={{
            background: 'linear-gradient(255deg, #6F9CE6 9.17%, #2FABD8 92.92%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Brands we're proud to support
        </h2>
        
        <div className="w-full max-w-6xl overflow-hidden">
          <div
            key={currentIndex}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 transition-all duration-800 ease-in-out"
          >
            {getVisibleLogos().map((logo, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="bg-[#f8f9fa] rounded-xl p-8 lg:p-12 flex items-center justify-center h-32 lg:h-40 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <span className="text-[#0d3543] text-[18px] sm:text-[20px] lg:text-[24px] tracking-[0.36px] lg:tracking-[0.48px] opacity-60 font-['Zain'] font-medium">
                  {logo.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
