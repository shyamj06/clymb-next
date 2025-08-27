'use client'

import { useState, useEffect } from 'react'

const ChevronLeft = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

type CaseItem = {
  title: string
  summary: string
  thumbnail?: {
    url: string
  } | null
}

// Fetch data from Prepr
async function fetchCases(): Promise<CaseItem[]> {
  const query = `
    query {
      Cases {
        items {
          title
          summary
          thumbnail {
            url
          }
        }
      }
    }
  `

  const res = await fetch(
    "https://graphql.prepr.io/ac_fd43e44bc05504b9fe054ad6e7bc115a4272d8df4bffe8f274aee085686b4b31",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PREPR_ACCESS_TOKEN}`, // use env variable
      },
      body: JSON.stringify({ query }),
    }
  )

  const json = await res.json()
  return json.data.Cases.items
}

export default function CasesSection() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)

  // Fetch CMS cases
  useEffect(() => {
    fetchCases().then(setCases).catch(console.error)
  }, [])

  // Responsive layout
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
    if (cases.length === 0) return []
    const startIndex = currentIndex
    const visibleCases = []
    for (let i = 0; i < cardsToShow; i++) {
      const index = (startIndex + i) % cases.length
      visibleCases.push(cases[index])
    }
    return visibleCases
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % cases.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length)

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
              WebkitTextFillColor: 'transparent',
            }}
          >
            See our work
          </h2>

          {/* Carousel */}
          <div className="flex items-center gap-4 sm:gap-6 w-full max-w-7xl justify-center">
            <button onClick={prevSlide} className="hover:text-[#fc4f29] transition-colors p-2">
              <ChevronLeft size={cardsToShow === 1 ? 28 : cardsToShow === 2 ? 32 : 36} />
            </button>

            <div
              className={`grid gap-4 sm:gap-6 flex-1 justify-items-center ${
                cardsToShow === 1
                  ? 'grid-cols-1 max-w-sm'
                  : cardsToShow === 2
                  ? 'grid-cols-2 max-w-4xl'
                  : 'grid-cols-3 max-w-6xl'
              }`}
            >
              {getVisibleCases().map((caseItem, index) => (
                <div
                  key={`${currentIndex}-${index}`}
                  className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow duration-300 w-full max-w-[380px]"
                >
                  {/* Thumbnail with placeholder */}
                  <div
                    className="w-full h-40 bg-center bg-cover bg-no-repeat rounded-t-xl"
                    style={{
                      backgroundImage: caseItem.thumbnail?.url
                        ? `url('${caseItem.thumbnail.url}')`
                        : "url('https://via.placeholder.com/400x300?text=No+Image')",
                    }}
                  />

                  <div className="flex flex-col gap-6 p-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#0d3543] text-[24px] font-medium font-['Zain'] tracking-[0.48px]">
                        {caseItem.title}
                      </h3>
                      <p className="text-black text-[18px] font-light font-['Zain'] leading-[22px] tracking-[0.36px]">
                        {caseItem.summary}
                      </p>
                    </div>

                    <button
                      className="bg-[#fc4f29] text-white text-[20px] px-6 py-3 rounded-[32px] hover:bg-[#e63e1f] transition-colors font-light font-['Zain']"
                    >
                      Request case
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={nextSlide} className="hover:text-[#fc4f29] transition-colors p-2">
              <ChevronRight size={cardsToShow === 1 ? 28 : cardsToShow === 2 ? 32 : 36} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
