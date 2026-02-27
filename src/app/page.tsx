'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Nav scroll
    const nav = document.getElementById('mainNav')
    const whiteSections = document.querySelectorAll('.section-white')
    
    const handleScroll = () => {
      if (!nav) return
      const nb = nav.getBoundingClientRect().bottom
      let onWhite = false
      whiteSections.forEach(s => {
        const r = s.getBoundingClientRect()
        if (r.top < nb && r.bottom > 0) onWhite = true
      })
      nav.classList.toggle('scrolled', onWhite)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Boosters 3D
    document.querySelectorAll('.booster').forEach(b => {
      const el = b as HTMLElement
      const h = el.querySelector('.booster-holo') as HTMLElement
      const l = el.querySelector('.booster-light') as HTMLElement
      let raf: number

      el.addEventListener('mouseenter', () => el.classList.add('active'))
      el.addEventListener('mouseleave', () => {
        el.classList.remove('active')
        el.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)'
        el.style.transform = ''
        setTimeout(() => (el.style.transition = ''), 600)
      })
      el.addEventListener('mousemove', (e: MouseEvent) => {
        if (raf) cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const rc = el.getBoundingClientRect()
          const x = (e.clientX - rc.left) / rc.width
          const y = (e.clientY - rc.top) / rc.height
          const tX = (0.5 - y) * 30
          const tY = (x - 0.5) * 30
          const br = parseFloat(el.dataset.baseRotate || '0')
          el.style.transition = 'none'
          el.style.transform = `rotate(${br * 0.3}deg) rotateX(${tX}deg) rotateY(${tY}deg) scale(1.15) translateZ(50px)`
          const a = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI)
          h?.style.setProperty('--holo-x', x * 100 + '%')
          h?.style.setProperty('--holo-y', y * 100 + '%')
          h?.style.setProperty('--holo-angle', a + 'deg')
          l?.style.setProperty('--lx', x * 100 + '%')
          l?.style.setProperty('--ly', y * 100 + '%')
        })
      })
    })

    // Parallax
    const fan = document.getElementById('boostersFan')
    const hero = document.getElementById('heroSection')
    hero?.addEventListener('mousemove', (e: MouseEvent) => {
      if (!fan) return
      const r = hero.getBoundingClientRect()
      const cx = (e.clientX - r.left) / r.width - 0.5
      const cy = (e.clientY - r.top) / r.height - 0.5
      fan.style.transform = `translate(${cx * 15}px, ${cy * 10}px)`
    })

    // Particles
    const cv = canvasRef.current
    if (cv) {
      const ctx = cv.getContext('2d')!
      const resize = () => { cv.width = innerWidth; cv.height = innerHeight }
      resize()
      window.addEventListener('resize', resize)

      const cols = ['#c850ff', '#4d9fff', '#50ddb6', '#ffe150', '#ff6b8a']
      const pts = Array.from({ length: 35 }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        s: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        c: cols[~~(Math.random() * cols.length)],
        o: Math.random() * 0.25 + 0.05,
        p: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.012 + 0.004,
      }))

      let animId: number
      const draw = () => {
        ctx.clearRect(0, 0, cv.width, cv.height)
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy; p.p += p.ps
          if (p.x < 0) p.x = cv.width
          if (p.x > cv.width) p.x = 0
          if (p.y < 0) p.y = cv.height
          if (p.y > cv.height) p.y = 0
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
          ctx.fillStyle = p.c
          ctx.globalAlpha = p.o * (0.5 + 0.5 * Math.sin(p.p))
          ctx.fill()
        }
        ctx.globalAlpha = 1
        animId = requestAnimationFrame(draw)
      }
      draw()

      // Scroll animations
      const fadeEls = document.querySelectorAll(
        '.bento-card,.about-text,.about-visual,.contact-left,.contact-form,.notify-inner'
      )
      fadeEls.forEach(el => {
        const e = el as HTMLElement
        e.style.opacity = '0'
        e.style.transform = 'translateY(30px)'
        e.style.transition = 'opacity .8s ease-out, transform .8s ease-out'
      })
      const fadeIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).style.opacity = '1'
            ;(e.target as HTMLElement).style.transform = 'translateY(0)'
            fadeIO.unobserve(e.target)
          }
        })
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
      fadeEls.forEach(el => fadeIO.observe(el))
      document.querySelectorAll('.bento-card').forEach((c, i) => {
        ;(c as HTMLElement).style.transitionDelay = (i * 0.1) + 's'
      })

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', resize)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <nav id="mainNav">
        <a className="nav-logo" href="#"><svg viewBox="0 0 32 32" fill="none"><defs><linearGradient id="nH" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c850ff"/><stop offset="25%" stopColor="#4d9fff"/><stop offset="50%" stopColor="#50ddb6"/><stop offset="75%" stopColor="#ffe150"/><stop offset="100%" stopColor="#ff6b8a"/></linearGradient></defs><rect x="7" y="2.5" width="18" height="25" rx="2.5" stroke="url(#nH)" strokeWidth="1.2" fill="none" transform="rotate(-10 16 16)"/><rect x="7" y="2.5" width="18" height="25" rx="2.5" stroke="url(#nH)" strokeWidth="1.2" fill="none" transform="rotate(5 16 16)"/><rect x="7" y="2.5" width="18" height="25" rx="2.5" fill="url(#nH)" opacity="0.1"/><path d="M16 10.5L17 13.2L20 13.4L17.8 15.3L18.4 18.2L16 16.8L13.6 18.2L14.2 15.3L12 13.4L15 13.2Z" fill="url(#nH)" opacity="0.7"/></svg><span className="nav-wordmark">KIRA CARDS</span></a>
        <div className="nav-links"><a href="#features">Features</a><a href="#about">About</a><a href="#contact">Contact</a><a href="#notify" className="nav-cta">Get Notified</a></div>
      </nav>
      
      {/* ===== HERO ===== */}
      <section className="hero" id="heroSection">
        <div className="hero-bg"><div className="aurora au-1"></div><div className="aurora au-2"></div><div className="aurora au-3"></div><div className="aurora au-4"></div><div className="aurora au-5"></div></div>
        <div className="hero-grid"></div><div className="grain"></div><div className="vignette"></div><canvas id="particles" ref={canvasRef} />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge"><span className="pulse-dot"></span>Launching Soon</div>
            <h1 className="hero-title"><span className="white">KIRA</span><br /><span className="holo">CARDS</span></h1>
            <div className="hero-sub">Official TCG Retailer</div>
            <p className="hero-desc">Your authorized destination for Pokemon & One Piece Trading Card Games. Authentic products, official distribution, premium experience.</p>
            <div className="hero-actions">
              <a href="#notify" className="btn-slide">
                <div className="btn-slide-track"></div>
                <div className="btn-slide-orb"><span className="btn-slide-dot"></span><svg className="btn-slide-arrow" viewBox="0 0 22 22" fill="none"><path d="M5 11h12M12 6l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="btn-slide-texts"><span className="btn-slide-text btn-text-default">Get Early Access</span><span className="btn-slide-text btn-text-hover">{"Let's Go!"}</span></div>
                <div className="btn-slide-underglow"></div>
              </a>
              <a href="#features" className="btn-ghost">Learn More</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="boosters-fan" id="boostersFan">
              <div className="floor-glow"></div>
              <div className="booster booster-1" data-base-rotate="-20"><img src="/images/booster-pokemon-jp.webp" alt="Pokemon Booster" /><div className="booster-holo"></div><div className="booster-light"></div></div>
              <div className="booster booster-2" data-base-rotate="22"><img src="/images/booster-pokemon-sm.webp" alt="Pokemon Booster" /><div className="booster-holo"></div><div className="booster-light"></div></div>
              <div className="booster booster-3" data-base-rotate="0"><img src="/images/booster-pokemon-en.webp" alt="Pokemon Booster" /><div className="booster-holo"></div><div className="booster-light"></div></div>
              <div className="booster booster-4" data-base-rotate="10"><img src="/images/booster-onepiece.webp" alt="One Piece Booster" /><div className="booster-holo"></div><div className="booster-light"></div></div>
              <div className="sparkles">
                <div className="sparkle" style={{"width":"3px","height":"3px","top":"5%","left":"12%","background":"var(--h1)","--dur":"3s","--delay":"0s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"4px","height":"4px","top":"12%","right":"10%","background":"var(--h2)","--dur":"4s","--delay":".5s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"2px","height":"2px","bottom":"22%","left":"8%","background":"var(--h3)","--dur":"3.5s","--delay":"1s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"3px","height":"3px","top":"50%","right":"12%","background":"var(--h4)","--dur":"5s","--delay":"1.5s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"4px","height":"4px","bottom":"10%","right":"28%","background":"var(--h5)","--dur":"4s","--delay":"2s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"2px","height":"2px","top":"8%","left":"42%","background":"var(--h2)","--dur":"3s","--delay":".8s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"3px","height":"3px","bottom":"38%","left":"4%","background":"var(--h5)","--dur":"4.5s","--delay":"1.2s"} as React.CSSProperties}></div>
                <div className="sparkle" style={{"width":"3px","height":"3px","top":"32%","right":"5%","background":"var(--h1)","--dur":"3.2s","--delay":".3s"} as React.CSSProperties}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator"><span>Scroll</span><div className="scroll-line"></div></div>
      </section>
      
      {/* ===== WHY KIRA CARDS — BENTO ===== */}
      <section className="section-white" id="features">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-overline">Why Kira Cards</span>
            <h2>The TCG experience<br />Thailand deserves</h2>
            <p>Premium products, official channels, and a shopping experience built for the community.</p>
          </div>
          <div className="bento">
            {/* Row 1: wide + single */}
            <div className="bento-card bc-wide">
              <div className="bc-icon bc-icon-dark"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3 style={{"color":"#fff"}}>100% Authentic & Authorized</h3>
              <p>Every product sourced directly through official distribution channels. Guaranteed genuine, sealed, and sourced with full brand compliance. No grey market, no fakes — ever.</p>
              <div className="brands-bento" style={{"marginTop":"28px"}}>
                <img src="/images/logo-pokemon.png" alt="Pokemon TCG" style={{"height":"28px","filter":"brightness(1.2)","opacity":".6"}} />
                <img src="/images/logo-onepiece.webp" alt="One Piece Card Game" style={{"height":"28px","opacity":".4"}} />
              </div>
            </div>
            <div className="bento-card bc-accent">
              <div className="bc-icon bc-icon-white"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
              <h3>Fast Delivery</h3>
              <p>Nationwide shipping across Thailand with secure packaging to protect every card.</p>
            </div>
      
            {/* Row 2: single + single + single */}
            <div className="bento-card bc-feature">
              <div className="bc-icon bc-icon-light"><svg viewBox="0 0 24 24" fill="none" stroke="#c850ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
              <h3>English Edition</h3>
              <p>Specializing in English-language TCG products for Thailand's growing community.</p>
            </div>
            <div className="bento-card bc-feature">
              <div className="bc-icon bc-icon-pink"><svg viewBox="0 0 24 24" fill="none" stroke="#ff6b8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/></svg></div>
              <h3>Collector Focused</h3>
              <p>Booster boxes, elite trainer boxes, and premium collections curated for serious collectors.</p>
            </div>
            <div className="bento-card bc-feature">
              <div className="bc-icon bc-icon-green"><svg viewBox="0 0 24 24" fill="none" stroke="#50ddb6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <h3>Online & In-Store</h3>
              <p>Shop online with delivery or visit our retail location in Phuket, Thailand.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===== ABOUT ===== */}
      <section className="section-dark" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-visual-glow"></div>
              <div className="about-logos">
                <img src="/images/logo-pokemon.png" alt="Pokemon TCG" style={{"height":"36px"}} />
                <div className="about-divider"></div>
                <img src="/images/logo-onepiece.webp" alt="One Piece Card Game" style={{"height":"36px"}} />
              </div>
            </div>
            <div className="about-text">
              <span className="section-overline">About Us</span>
              <h2>Built for collectors,<br />by collectors</h2>
              <p>Kira Cards is Thailand's newest authorized TCG retailer, dedicated to bringing official English-language Pokémon and One Piece trading card products to collectors and players across the country.</p>
              <p>We operate through official distribution channels, ensuring every product is genuine, properly priced, and sourced with full brand compliance.</p>
              <div className="about-badges">
                <div className="about-badge">🇹🇭 Based in Phuket</div>
                <div className="about-badge">📦 Nationwide Shipping</div>
                <div className="about-badge">✨ Official Distributor</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===== NOTIFY CTA ===== */}
      <section className="notify-section" id="notify">
        <div className="notify-aurora notify-au1"></div>
        <div className="notify-aurora notify-au2"></div>
        <div className="notify-inner">
          <span className="section-overline" style={{"textAlign":"center","marginBottom":"20px"}}>Early Access</span>
          <h2>Be the first to know</h2>
          <p>Get notified when we launch and receive exclusive early access to our first product drops.</p>
          <div className="notify-form">
            <input className="notify-input" type="email" placeholder="Enter your email" />
            <button className="notify-btn">Notify Me</button>
          </div>
        </div>
      </section>
      
      {/* ===== CONTACT ===== */}
      <section className="section-white" id="contact">
        <div className="section-inner">
          <div className="contact-grid">
            <div className="contact-left">
              <span className="section-overline">Get in Touch</span>
              <h2>Let's talk cards</h2>
              <p>Have questions about our products, distribution, or wholesale inquiries? We'd love to hear from you.</p>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <div className="contact-item-text"><strong>Location</strong>Phuket, Thailand 🇹🇭</div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                  <div className="contact-item-text"><strong>Email</strong>hello@kiracards.com</div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <input type="text" placeholder="Your name" />
              <input type="email" placeholder="Your email" />
              <textarea placeholder="Your message" />
              <button type="submit">Send Message</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===== FOOTER ===== */}
      <footer>
        <div className="footer-inner">
          <div className="footer-copy">© 2026 Kira Cards. All rights reserved.</div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>    </>
  )
}
