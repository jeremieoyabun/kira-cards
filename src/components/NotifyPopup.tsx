'use client'

import { useState } from 'react'

export default function NotifyPopup({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribe = async () => {
    if (!email || loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang: 'en' }),
      })
      if (res.ok) setSuccess(true)
    } catch { /* silent */ }
    setLoading(false)
  }

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>{trigger}</span>
      {open && (
        <div className="notify-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); setSuccess(false) } }}>
          <div className="notify-popup">
            <button className="notify-popup-close" onClick={() => { setOpen(false); setSuccess(false) }}>&times;</button>
            <div className="notify-popup-glow" />
            {success ? (
              <>
                <div className="notify-success-icon">
                  <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none" stroke="url(#sG2)" strokeWidth="2"/><path fill="none" stroke="#50ddb6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l8 8 16-16"/><defs><linearGradient id="sG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c850ff"/><stop offset="100%" stopColor="#50ddb6"/></linearGradient></defs></svg>
                </div>
                <h3>You&apos;re In!</h3>
                <p>We&apos;ll notify you as soon as Kira Cards launches. Stay tuned!</p>
              </>
            ) : (
              <>
                <h3>Get Early Access</h3>
                <p>Be the first to know when Kira Cards launches. Enter your email below.</p>
                <div className="notify-counter">
                  <div className="notify-counter-faces">
                    <img src="/01.webp" alt="" width={32} height={32} loading="lazy" />
                    <img src="/02.webp" alt="" width={32} height={32} loading="lazy" />
                    <img src="/03.webp" alt="" width={32} height={32} loading="lazy" />
                  </div>
                  Join 549 collectors already signed up
                </div>
                <div className="notify-popup-form">
                  <input className="notify-input" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()} />
                  <button className="notify-btn" onClick={handleSubscribe} disabled={loading}>{loading ? 'Sending...' : 'Notify Me'}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
