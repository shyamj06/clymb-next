'use client'

import { useCallback, useState, useEffect } from 'react'
import svgPaths from "../imports/svg-clymb-logo";

// Fetch Intro data from Prepr (stored in Home model)
async function fetchIntroData(): Promise<{ headline: string; cta: string; scroll_cta: string }> {
  const query = `
    query {
      Home {
        headline
        cta
        scroll_cta
      }
    }
  `

  const apiToken = process.env.NEXT_PUBLIC_PREPR_ACCESS_TOKEN
  if (!apiToken) {
    throw new Error('NEXT_PUBLIC_PREPR_ACCESS_TOKEN environment variable is not set')
  }

  try {
    const res = await fetch(
      "https://graphql.prepr.io/ac_00ecc388693bf1996a98371fd9c42b35e6103b39be7cf844406872b6c05f1743",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ query }),
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch: ${res.status} - ${errorText}`)
    }

    const json = await res.json()
    
    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    if (!json.data?.Home) {
      throw new Error('No Home data found in Prepr response')
    }

    return json.data.Home
  } catch (error) {
    console.error('Error fetching Intro data:', error)
    throw error
  }
}

export default function IntroSection() {
  const [introData, setIntroData] = useState<{
    headline: string;
    cta: string;
    scroll_cta: string;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch CMS intro data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchIntroData()
        setIntroData(data)
      } catch (error) {
        console.error('Failed to load intro data:', error)
        // Set fallback data only on error
        setIntroData({
          headline: 'Clymb is a cutting-edge agency specializing in innovative SaaS solutions. We empower businesses to innovate.',
          cta: 'See our work',
          scroll_cta: 'Explore more'
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.getElementById('clients')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section 
      id="intro" 
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right in oklab, #98B8EB 9.17%, #75CCEC 75.38%)'
      }}
    >
      {/* Mountain image overlay on top of gradient */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/assets/mountains-bg.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between items-center px-6 sm:px-8 lg:px-8 py-8 sm:py-12 lg:py-12 z-10">
        <div /> {/* Spacer for navigation */}
        
        {/* Logo and CTA */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 text-center max-w-[90%] sm:max-w-[600px] mx-auto">
          <div className="w-[280px] sm:w-[320px] lg:w-[386px] h-[104px] sm:h-[118px] lg:h-[143px]">
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
          
          <p className="text-[#ffffff] text-[18px] sm:text-[20px] lg:text-[24px] leading-[22px] sm:leading-[24px] lg:leading-[25px] tracking-[0.36px] sm:tracking-[0.4px] lg:tracking-[0.48px] max-w-full font-zain font-light px-4 sm:px-0">
            {isLoading ? 'Loading...' : introData?.headline || 'Clymb is a cutting-edge agency specializing in innovative SaaS solutions. We empower businesses to innovate.'}
          </p>
          
          <button 
            onClick={() => {
              const casesSection = document.getElementById('cases')
              if (casesSection) {
                casesSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-[#fc4f29] text-[#ffffff] text-[18px] sm:text-[20px] lg:text-[24px] tracking-[0.36px] sm:tracking-[0.4px] lg:tracking-[0.48px] px-6 sm:px-7 py-3 sm:py-4 rounded-[32px] hover:bg-[#e63e1f] transition-colors font-zain font-light"
          >
            {isLoading ? 'Loading...' : introData?.cta || 'See our works'}
          </button>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-1.5 text-[#ffffff] hover:opacity-80 transition-opacity font-zain font-light mt-4 sm:mt-0"
        >
          <span className="text-[16px] sm:text-[18px] lg:text-[20px] tracking-[0.32px] sm:tracking-[0.36px] lg:tracking-[0.4px]">
            {isLoading ? 'Loading...' : introData?.scroll_cta || 'Explore more'}
          </span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
