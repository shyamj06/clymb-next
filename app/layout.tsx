import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Fetch Home data from Prepr
async function fetchHomeData(): Promise<{ page_title: string; meta_description: string }> {
  const query = `
    query {
      Home {
        page_title
        meta_description
      }
    }
  `

  try {
    const res = await fetch(
      "https://graphql.prepr.io/ac_00ecc388693bf1996a98371fd9c42b35e6103b39be7cf844406872b6c05f1743",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PREPR_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`)
    }

    const json = await res.json()
    return json.data.Home
  } catch (error) {
    console.error('Error fetching Home data:', error)
    // Fallback values
    return {
      page_title: 'Clymbb - Modern Business Solutions',
      meta_description: 'Clymb is a cutting-edge agency specializing in innovative SaaS solutions. We empower businesses to innovate.'
    }
  }
}

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const homeData = await fetchHomeData()
  
  return {
    title: homeData.page_title,
    description: homeData.meta_description,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
