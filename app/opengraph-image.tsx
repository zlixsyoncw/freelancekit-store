import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FreelanceKit — The Complete Business OS for Freelancers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0f0720',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Purple orb top-right */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            top: -200,
            right: -100,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(126,34,206,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Amber orb bottom-left */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            bottom: -150,
            left: -50,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo top-right */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: '#7e22ce',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="12" height="2" rx="1" fill="white" />
              <rect x="3" y="11" width="8" height="2" rx="1" fill="white" />
              <rect x="3" y="16" width="10" height="2" rx="1" fill="white" />
            </svg>
          </div>
          <span style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>FreelanceKit</span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0 80px',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: '#7e22ce',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              padding: '6px 16px',
              borderRadius: 100,
              marginBottom: 28,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Digital Products
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.05,
              maxWidth: 800,
              marginBottom: 24,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>The Complete Business OS</span>
            <span>
              {'for '}
              <span style={{ color: '#f59e0b' }}>Freelancers.</span>
            </span>
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: 22,
              color: '#c4b5fd',
              maxWidth: 620,
              lineHeight: 1.5,
              marginBottom: 48,
            }}
          >
            Notion templates and AI prompts that help you land clients, deliver great work, and get paid.
          </div>

          {/* Product pills */}
          <div style={{ display: 'flex', gap: 16 }}>
            {['Freelancer OS — $29', 'AI Prompt Pack — $17', 'Full Bundle — $49'].map((label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 15,
                  fontWeight: 600,
                  padding: '10px 20px',
                  borderRadius: 100,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
