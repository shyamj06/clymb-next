'use client'

import { useState, useEffect } from 'react'

// Simple chevron icons using SVG
const ChevronLeft = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CasesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)

  const cases = [
    {
      title: 'Headless CMS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      title: 'Booking System',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      title: 'Invoicing Platform',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/400/300?random=3'
    },
    {
      title: 'E-commerce Solution',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/400/300?random=4'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://picsum.photos/400/300?random=5'
    }
  ]

  // Responsive cards to show
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    updateCardsToShow()
    window.addEventListener('resize', updateCardsToShow)
    return () => window.removeEventListener('resize', updateCardsToShow)
  }, [])

  const getVisibleCases = () => {
    const startIndex = currentIndex
    const visibleCases = []
    
    for (let i = 0; i < cardsToShow; i++) {
      const index = (startIndex + i) % cases.length
      visibleCases.push(cases[index])
    }
    
    return visibleCases
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length)
  }

  return (
    <section id="cases" className="bg-[#ffffff] py-20 lg:py-40">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          <h2 
            className="text-[32px] sm:text-[40px] lg:text-[48px] tracking-[0.64px] lg:tracking-[0.96px] font-['Zain'] font-medium text-center"
            style={{
              background: 'linear-gradient(255deg, #6F9CE6 9.17%, #2FABD8 92.92%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            See our work
          </h2>
          
          {/* Unified Responsive Layout */}
          <div className="flex items-center gap-4 sm:gap-6 w-full max-w-7xl justify-center">
            <button 
              onClick={prevSlide}
              className="text-[#000000] hover:text-[#fc4f29] transition-colors p-2 font-['Zain'] font-light flex-shrink-0"
              style={{ cursor: 'pointer' }}
            >
              <ChevronLeft size={cardsToShow === 1 ? 28 : cardsToShow === 2 ? 32 : 36} />
            </button>
            
            <div className={`grid gap-4 sm:gap-6 flex-1 justify-items-center ${
              cardsToShow === 1 ? 'grid-cols-1 max-w-sm' : 
              cardsToShow === 2 ? 'grid-cols-2 max-w-4xl' : 
              'grid-cols-3 max-w-6xl'
            }`}>
              {getVisibleCases().map((caseItem, index) => (
                <div
                  key={`${currentIndex}-${index}`}
                  className={`bg-[#ffffff] rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow duration-300 w-full ${
                    cardsToShow === 1 ? 'max-w-[280px]' : 
                    cardsToShow === 2 ? 'max-w-[360px]' : 
                    'max-w-[380px]'
                  }`}
                >
                  <div className={`w-full bg-center bg-cover bg-no-repeat rounded-t-xl ${
                    cardsToShow === 1 ? 'h-36' : 
                    cardsToShow === 2 ? 'h-38' : 
                    'h-40'
                  }`} 
                       style={{ backgroundImage: `url('${caseItem.image}')` }} />
                  
                  <div className={`flex flex-col gap-4 ${
                    cardsToShow === 1 ? 'p-4' : 
                    cardsToShow === 2 ? 'p-5' : 
                    'p-6 gap-6'
                  }`}>
                    <div className="flex flex-col gap-2">
                      <h3 className={`text-[#0d3543] tracking-[0.4px] font-['Zain'] font-medium ${
                        cardsToShow === 1 ? 'text-[20px]' : 
                        cardsToShow === 2 ? 'text-[22px] tracking-[0.44px]' : 
                        'text-[24px] tracking-[0.48px]'
                      }`}>
                        {caseItem.title}
                      </h3>
                      <p className={`text-[#000000] tracking-[0.32px] leading-[20px] font-['Zain'] font-light ${
                        cardsToShow === 1 ? 'text-[16px]' : 
                        cardsToShow === 2 ? 'text-[18px] tracking-[0.36px] leading-[22px]' : 
                        'text-[24px] tracking-[0.48px] leading-[25px]'
                      }`}>
                        {caseItem.description}
                      </p>
                    </div>
                    
                    <button 
                      className={`bg-[#fc4f29] text-[#ffffff] tracking-[0.36px] rounded-[32px] hover:bg-[#e63e1f] transition-colors font-['Zain'] font-light ${
                        cardsToShow === 1 ? 'text-[18px] px-6 py-3' : 
                        cardsToShow === 2 ? 'text-[20px] px-6 py-3' : 
                        'text-[24px] tracking-[0.48px] px-7 py-4'
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      Request case
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="text-[#000000] hover:text-[#fc4f29] transition-colors p-2 font-['Zain'] font-light flex-shrink-0"
              style={{ cursor: 'pointer' }}
            >
              <ChevronRight size={cardsToShow === 1 ? 28 : cardsToShow === 2 ? 32 : 36} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
