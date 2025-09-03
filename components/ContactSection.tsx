'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import GoogleMap from './GoogleMap'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    //company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Handle pre-filled message from URL parameters and custom events
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const message = urlParams.get('message')
    if (message) {
      setFormData(prev => ({ ...prev, message: decodeURIComponent(message) }))
      // Clear the URL parameter after setting the message
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash)
    }

    // Listen for custom prefill events
    const handlePrefillMessage = (event: CustomEvent) => {
      setFormData(prev => ({ ...prev, message: event.detail.message }))
    }

    window.addEventListener('prefillMessage', handlePrefillMessage as EventListener)
    
    return () => {
      window.removeEventListener('prefillMessage', handlePrefillMessage as EventListener)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id'
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

      // Template parameters for EmailJS
      const templateParams = {
        to_email: 'clymb@icloud.com', // Hidden recipient
        from_name: formData.name,
        from_email: formData.email,
        //company: formData.company || '',
        subject: `Contact Form: ${formData.name}`,
        //subject: `Contact Form: ${formData.name}${formData.company ? ` (${formData.company})` : ''}`,
        message: formData.message,
        reply_to: formData.email
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      console.log('Email sent successfully:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Set to true to enable Google Maps, false for placeholder
  const useGoogleMaps = true

  return (
    <section id="contact" className="relative bg-[#ffffff] w-full">
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Form section */}
      <div className="relative bg-[#e3f2f8] w-full lg:flex-1 lg:max-w-[560px] px-4 sm:px-8 lg:px-16 py-8 lg:py-16 flex flex-col justify-between min-h-[80vh] lg:min-h-screen">
        <div className="space-y-8 lg:space-y-16">
          <div className="space-y-6 lg:space-y-8">
            <h2 
              className="text-[32px] sm:text-[40px] lg:text-[48px] tracking-[0.64px] lg:tracking-[0.96px] font-['Zain'] font-medium text-center sm:text-left"
              style={{
                background: 'linear-gradient(255deg, #6F9CE6 9.17%, #2FABD8 92.92%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Get in touch
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <h3 className="text-[#2fabd8] text-[24px] sm:text-[28px] lg:text-[32px] tracking-[0.48px] lg:tracking-[0.64px] font-['Zain'] font-medium">Send a message</h3>
                <p className="text-[#0d3543] text-[18px] sm:text-[20px] lg:text-[24px] tracking-[0.36px] lg:tracking-[0.48px] leading-[22px] lg:leading-[25px] font-['Zain'] font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit lorum ipsum.
                </p>
              </div>
              
              <div className="space-y-3 lg:space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-[50px] lg:h-[60px] bg-[#ffffff] rounded-[20px] px-6 lg:px-8 py-3 lg:py-4 text-[14px] lg:text-[16px] placeholder-[#a9cad5] border-0 focus:outline-none focus:ring-2 focus:ring-[#2fabd8] font-['Zain'] font-light"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-[50px] lg:h-[60px] bg-[#ffffff] rounded-[20px] px-6 lg:px-8 py-3 lg:py-4 text-[14px] lg:text-[16px] placeholder-[#a9cad5] border-0 focus:outline-none focus:ring-2 focus:ring-[#2fabd8] font-['Zain'] font-light"
                />
                
                {/* <input
                  type="text"
                  name="company"
                  placeholder="Your company (optional)"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full h-[50px] lg:h-[60px] bg-[#ffffff] rounded-[20px] px-6 lg:px-8 py-3 lg:py-4 text-[14px] lg:text-[16px] placeholder-[#a9cad5] border-0 focus:outline-none focus:ring-2 focus:ring-[#2fabd8] font-['Zain'] font-light"
                /> */}
                
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full h-[100px] lg:h-[120px] bg-[#ffffff] rounded-[20px] px-6 lg:px-8 py-4 lg:py-5 text-[14px] lg:text-[16px] placeholder-[#a9cad5] border-0 resize-none focus:outline-none focus:ring-2 focus:ring-[#2fabd8] font-['Zain'] font-light"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-[#ffffff] text-[18px] sm:text-[20px] lg:text-[24px] tracking-[0.36px] lg:tracking-[0.48px] px-6 lg:px-7 py-3 lg:py-4 rounded-[32px] transition-colors font-['Zain'] font-light ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#fc4f29] hover:bg-[#e63e1f] cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Get in touch'}
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-['Zain']">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-['Zain']">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
          
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h3 className="text-[#2fabd8] text-[24px] sm:text-[28px] lg:text-[32px] tracking-[0.48px] lg:tracking-[0.64px] mb-2 font-['Zain'] font-medium">Visit us</h3>
              <div className="text-[#0d3543] text-[18px] sm:text-[20px] lg:text-[24px] tracking-[0.36px] lg:tracking-[0.48px] leading-[22px] lg:leading-[25px] font-['Zain'] font-light">
                <p>Wilgenweg 22C</p>
                <p>1031 HV, Amsterdam</p>
                <p>The Netherlands</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-[#2fabd8] text-[24px] sm:text-[28px] lg:text-[32px] tracking-[0.48px] lg:tracking-[0.64px] mb-2 font-['Zain'] font-medium">Call or email us</h3>
              <div className="text-[#0d3543] text-[18px] sm:text-[20px] lg:text-[24px] tracking-[0.36px] lg:tracking-[0.48px] leading-[22px] lg:leading-[25px] font-['Zain'] font-light">
                <p>Phone: +31 (0) 20 24 24 24</p>
                <p>Requests: hello@clymb.com</p>
                <p>Support: support@clymb.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright positioned absolutely at bottom - Only visible on desktop */}
        <div 
          className="absolute text-[#2fabd8] text-[24px] tracking-[0.48px] leading-[25px] font-['Zain'] font-light left-16 hidden lg:block"
          style={{ bottom: '10px' }}
        >
          © Clymb 2025
        </div>
      </div>

      {/* Map section */}
      {useGoogleMaps ? (
        <GoogleMap
          className="w-full lg:flex-1 h-[400px] sm:h-[500px] lg:h-auto lg:min-h-full"
          center={{ lat: 52.39267934458147, lng: 4.911611576570298 }}
          zoom={15}
          markerTitle="Clymb Office Location"
        />
      ) : (
        <div className="w-full lg:flex-1 h-[400px] sm:h-[500px] lg:h-auto lg:min-h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-gray-600 font-zain">Google Maps Integration</p>
            <p className="text-sm text-gray-500 font-zain">Amsterdam, Netherlands</p>
          </div>
        </div>
      )}
    </div>
    
    {/* Copyright below map on mobile */}
    <div className="lg:hidden bg-[#ffffff] px-4 py-6 text-center">
      <div className="text-[#2fabd8] text-[18px] sm:text-[20px] tracking-[0.36px] leading-[22px] font-['Zain'] font-light">
        © Clymb 2025
      </div>
    </div>
  </section>
  )
}
