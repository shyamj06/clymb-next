'use client'

const logos = [
  { name: 'Casper', image: '/assets/clients/1-casper.svg' },
  { name: 'Vito', image: '/assets/clients/2-vito.svg' },
  { name: 'Broox', image: '/assets/clients/3-broox.svg' },
  { name: 'Files', image: '/assets/clients/4-files.svg' },
  { name: 'Jadu', image: '/assets/clients/5-jadu.svg' },
  { name: 'Ducca', image: '/assets/clients/6-ducca.svg' },
];

export default function ClientsSection() {
  return (
    <section id="clients" className="bg-[#ffffff] py-20 lg:py-40">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center gap-8 lg:gap-16">
          <h2 
            className="text-[32px] sm:text-[40px] lg:text-[48px] tracking-[0.64px] lg:tracking-[0.96px] font-['Zain'] font-medium text-center"
            style={{
              background: 'linear-gradient(255deg, #6F9CE6 9.17%, #2FABD8 92.92%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Brands we're proud to support
          </h2>
          
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-24 lg:h-32"
                >
                  <img 
                    src={logo.image} 
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
