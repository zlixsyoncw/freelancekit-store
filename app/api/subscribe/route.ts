import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL ?? 'hello@freelancekit.co'

    // If no Resend key, log and return success (graceful no-op for local dev)
    if (!resendKey) {
      console.log(`[subscribe] No RESEND_API_KEY set. Would have subscribed: ${email} (source: ${source})`)
      return NextResponse.json({
        message: 'You\'re in! Check your inbox for a confirmation.',
      })
    }

    // Add contact to Resend audience
    // TODO: Replace 'YOUR_AUDIENCE_ID' with your Resend audience ID
    // Found at: https://resend.com/audiences → create an audience → copy the ID
    const audienceId = process.env.RESEND_AUDIENCE_ID ?? 'YOUR_AUDIENCE_ID'

    const resendRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        data: { source: source ?? 'website' },
      }),
    })

    if (!resendRes.ok) {
      const err = await resendRes.text()
      console.error('[subscribe] Resend error:', err)
      // Still return success to the user — don't expose internal errors
      return NextResponse.json({ message: 'You\'re subscribed! Talk soon.' })
    }

    // Send welcome email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `FreelanceKit <${fromEmail}>`,
        to: [email],
        subject: 'Welcome to FreelanceKit — here\'s what to expect',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1523;">
            <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 12px;">You're in. 👋</h1>
            <p style="color: #5a5249; line-height: 1.7;">
              Thanks for joining the FreelanceKit list. Every week you'll get one piece of actionable
              advice on running a better freelance business — pricing tactics, client scripts,
              system setups, and more.
            </p>
            <p style="color: #5a5249; line-height: 1.7;">
              While you're here, check out our products — Notion templates and AI prompt packs
              that help you manage clients, close projects, and get paid faster.
            </p>
            <a
              href="https://freelancekit.co/shop"
              style="display: inline-block; background: #7e22ce; color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; margin: 16px 0;"
            >
              Browse products →
            </a>
            <p style="color: #9c8e7e; font-size: 13px; margin-top: 32px;">
              You're receiving this because you signed up at freelancekit.co.
              <a href="{{{unsubscribe_url}}}" style="color: #9c8e7e;">Unsubscribe any time.</a>
            </p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ message: 'You\'re in! Check your inbox.' })
  } catch (error) {
    console.error('[subscribe] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
