// Email service utility using EmailJS
import emailjs from '@emailjs/browser'

export interface EmailData {
  to: string
  from: string
  subject: string
  message: string
  name: string
  company?: string
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // EmailJS configuration
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id'
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

    // Template parameters for EmailJS
    const templateParams = {
      to_email: data.to,
      from_name: data.name,
      from_email: data.from,
      company: data.company || '',
      subject: data.subject,
      message: data.message,
      reply_to: data.from
    }

    // Send email using EmailJS
    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    )

    console.log('Email sent successfully:', result)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

function generateEmailHTML(data: EmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2fabd8; border-bottom: 2px solid #2fabd8; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.from}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #2fabd8;">Message:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #2fabd8; border-radius: 4px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>This email was sent from the Clymb contact form.</p>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `
}
