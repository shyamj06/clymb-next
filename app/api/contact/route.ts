import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, from, subject, message, name, company } = body

    // Validate required fields
    if (!from || !message || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, we'll just log the email data
    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    // - Resend
    // - EmailJS (client-side)
    
    console.log('Contact form submission:', {
      to: 'clymb@icloud.com', // Hidden recipient
      from,
      subject,
      message,
      name,
      company,
      timestamp: new Date().toISOString()
    })

    // Send email using the email service
    const emailSent = await sendEmail({
      to: 'clymb@icloud.com', // Hidden recipient
      from: from,
      subject: subject,
      message: message,
      name: name,
      company: company
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
