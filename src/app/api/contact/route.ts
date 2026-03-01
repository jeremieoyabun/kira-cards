import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!email || !name || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    // Send transactional email via Brevo
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Kira Cards Website', email: 'contact@kira-cards.com' },
        to: [{ email: 'contact@kira-cards.com' }],
        replyTo: { email, name },
        subject: `[Kira Cards] New message from ${name}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      return NextResponse.json({ error: data.message || 'Brevo error' }, { status: 500 })
    }

    // Also add contact to Brevo list
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name },
        listIds: [parseInt(process.env.BREVO_LIST_ID || '2')],
        updateEnabled: true,
      }),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
