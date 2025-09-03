'use client'

export default function ServicesSection() {
  const services = [
    {
      title: 'Headless CMS',
      description: 'Comprehensive digital transformation strategies that align with your business goals.',
      icon: '🎯',
      features: ['Market Analysis', 'Competitive Research', 'Growth Planning']
    },
    {
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      icon: '💻',
      features: ['React/Next.js', 'Responsive Design', 'Performance Optimization']
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that engage your users.',
      icon: '📱',
      features: ['iOS & Android', 'Cross-platform', 'App Store Optimization']
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and DevOps solutions for modern businesses.',
      icon: '☁️',
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Monitoring & Security']
    },
  ]

  return (
    <section id="services" className="py-40" style={{ background: 'var(--Background-Gradient, linear-gradient(249deg, #CEF1FC 17.43%, #E3F2F8 52.1%, #C5F0FF 86.76%))' }}>
    <div className="container mx-auto px-8">
      <div className="flex flex-col items-center gap-12">
        <h2 
          className="text-[32px] sm:text-[40px] lg:text-[48px] tracking-[0.64px] lg:tracking-[0.96px] font-['Zain'] font-medium text-center"
          style={{
            background: 'linear-gradient(255deg, #6F9CE6 9.17%, #2FABD8 92.92%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          What we can do for you
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#ffffff] p-8 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] flex flex-col items-center gap-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#6F9CE6] to-[#2FABD8] rounded-full flex items-center justify-center text-[24px]">
                  {service.icon}
                </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-[#0d3543] text-[24px] tracking-[0.48px] font-['Zain'] font-medium">
                  {service.title}
                </h3>
                <p className="text-[#0d3543] text-[24px] tracking-[0.48px] opacity-80 leading-[25px] font-['Zain'] font-light">
                  {service.description}
                </p>
              </div>
              
              <button 
                className="bg-[#fc4f29] text-[#ffffff] text-[24px] tracking-[0.48px] px-7 py-4 rounded-[32px] hover:bg-[#e63e1f] transition-colors font-['Zain'] font-light"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get in touch
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}
