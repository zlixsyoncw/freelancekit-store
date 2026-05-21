'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

interface EmailCaptureProps {
  variant?: 'light' | 'dark'
  placeholder?: string
  buttonText?: string
  source?: string
}

export default function EmailCapture({
  variant = 'light',
  placeholder = 'you@example.com',
  buttonText = 'Subscribe',
  source = 'footer',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Track event
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('email-signup', { props: { source } })
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'You\'re in! Check your inbox.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const inputClass =
    variant === 'dark'
      ? 'bg-white/10 border-white/20 text-white placeholder:text-sand-500 focus:border-brand-400'
      : 'bg-white border-sand-300 text-ink placeholder:text-sand-400 focus:border-brand-500'

  const buttonClass =
    variant === 'dark'
      ? 'bg-brand-500 hover:bg-brand-400 text-white'
      : 'bg-brand-600 hover:bg-brand-700 text-white'

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <CheckCircle className="w-4 h-4 shrink-0" />
        <span>{message}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <label htmlFor="email-input" className="sr-only">
        Email address
      </label>
      <input
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        disabled={status === 'loading'}
        className={`flex-1 px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${inputClass}`}
      />
      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${buttonClass} disabled:opacity-50`}
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {buttonText}
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1 w-full">{message}</p>
      )}
    </form>
  )
}
