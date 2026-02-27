'use client'

import { useEffect, useRef, useState } from 'react'

const LAUNCH_DATE = new Date('2026-03-25T00:00:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, LAUNCH_DATE - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState(getTimeLeft)
  const [packState, setPackState] = useState<'idle'|'shaking'|'glowing'|'opening'|'revealed'>('idle')
  const [revealedCard, setRevealedCard] = useState(0)
  const [currentBooster, setCurrentBooster] = useState(0)
  const packCardRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleReady, setTitleReady] = useState(false)
  const [titleText, setTitleText] = useState('KIRA CARDS')

  useEffect(() => {
    const tick = setInterval(() => setTime(getTimeLeft), 1000)
    return () => clearInterval(tick)
  }, [])

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
      const pts = Array.from({ length: 65 }, (_, i) => {
        const isLarge = i < 8
        return {
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          s: isLarge ? Math.random() * 3 + 2.5 : Math.random() * 2 + 0.8,
          vx: (Math.random() - 0.5) * (isLarge ? 0.12 : 0.25),
          vy: (Math.random() - 0.5) * (isLarge ? 0.12 : 0.25),
          c: cols[~~(Math.random() * cols.length)],
          o: isLarge ? Math.random() * 0.3 + 0.2 : Math.random() * 0.35 + 0.1,
          p: Math.random() * Math.PI * 2,
          ps: Math.random() * 0.015 + 0.005,
          glow: isLarge,
        }
      })

      let animId: number
      const draw = () => {
        ctx.clearRect(0, 0, cv.width, cv.height)
        const edge = 40
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy; p.p += p.ps
          if (p.x < -edge) p.x = cv.width + edge
          if (p.x > cv.width + edge) p.x = -edge
          if (p.y < -edge) p.y = cv.height + edge
          if (p.y > cv.height + edge) p.y = -edge
          const fade = Math.min(p.x / edge, (cv.width - p.x) / edge, p.y / edge, (cv.height - p.y) / edge, 1)
          if (fade <= 0) continue
          const alpha = p.o * (0.5 + 0.5 * Math.sin(p.p)) * Math.max(0, fade)
          if (p.glow) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.s * 3, 0, Math.PI * 2)
            ctx.fillStyle = p.c
            ctx.globalAlpha = alpha * 0.15
            ctx.fill()
          }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
          ctx.fillStyle = p.c
          ctx.globalAlpha = alpha
          ctx.fill()
        }
        ctx.globalAlpha = 1
        animId = requestAnimationFrame(draw)
      }
      draw()

      // Scroll animations
      const fadeEls = document.querySelectorAll(
        '.bento-card,.about-text,.about-visual,.contact-left,.contact-form,.notify-inner,.pack-stage'
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
        const card = c as HTMLElement
        card.style.transitionDelay = (i * 0.1) + 's'
        card.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const rc = card.getBoundingClientRect()
          card.style.setProperty('--mx', ((me.clientX - rc.left) / rc.width * 100) + '%')
          card.style.setProperty('--my', ((me.clientY - rc.top) / rc.height * 100) + '%')
        })
      })

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', resize)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const openPack = () => {
    if (packState !== 'idle') return
    setPackState('shaking')
    setTimeout(() => {
      setPackState('glowing')
      setTimeout(() => {
        setPackState('opening')
        setRevealedCard(Math.floor(Math.random() * cards.length))
        setTimeout(() => setPackState('revealed'), 1000)
      }, 1400)
    }, 1500)
  }

  const resetPack = () => {
    setCurrentBooster(Math.floor(Math.random() * boosters.length))
    setPackState('idle')
  }

  // Text scramble effect on hero title
  useEffect(() => {
    const target = 'KIRA CARDS'
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*0123456789'
    let frame = 0
    const maxFrames = 20
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        frame++
        setTitleText(target.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          const revealAt = Math.floor((i / target.length) * maxFrames) + 3
          if (frame >= revealAt) return ch
          return chars[Math.floor(Math.random() * chars.length)]
        }).join(''))
        if (frame >= maxFrames + 3) {
          clearInterval(interval)
          setTitleText(target)
          setTitleReady(true)
        }
      }, 50)
    }, 500)
    return () => clearTimeout(delay)
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? window.scrollY / docH : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const card = packCardRef.current
    if (!card || packState !== 'revealed') return
    const onMove = (e: MouseEvent) => {
      const rc = card.getBoundingClientRect()
      const x = (e.clientX - rc.left) / rc.width
      const y = (e.clientY - rc.top) / rc.height
      const tX = (0.5 - y) * 25
      const tY = (x - 0.5) * 25
      const a = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI)
      card.style.transform = `rotateX(${tX}deg) rotateY(${tY}deg)`
      card.style.setProperty('--hx', (x * 100) + '%')
      card.style.setProperty('--hy', (y * 100) + '%')
      card.style.setProperty('--ha', a + 'deg')
    }
    const onLeave = () => {
      card.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)'
      card.style.transform = ''
      setTimeout(() => card.style.transition = 'none', 500)
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [packState])

  const boosters = [
    '/Boosters/Booster_Pokemon-01.webp', '/Boosters/Booster_Pokemon-02.webp', '/Boosters/Booster_Pokemon-03.webp',
    '/Boosters/Booster_Pokemon-04.webp', '/Boosters/Booster_Pokemon-05.webp',
    '/Boosters/Booster_OP-01.webp', '/Boosters/Booster_OP-02.webp',
    '/Boosters/Booster_OP-03.webp', '/Boosters/Booster_OP-04.webp', '/Boosters/Booster_OP-05.webp',
  ]
  const cards = [
    '/Cards/Card_pokemon-01.webp', '/Cards/Card_pokemon-02.webp', '/Cards/Card_pokemon-03.webp',
    '/Cards/Card_pokemon-04.webp', '/Cards/Card_pokemon-05.webp',
    '/Cards/Card_Pokemon-06.webp', '/Cards/Card_Pokemon-07.webp', '/Cards/Card_Pokemon-08.webp',
    '/Cards/Card_Pokemon-09.webp', '/Cards/Card_Pokemon-10.webp',
    '/Cards/Card_pokemon-11.webp', '/Cards/Card_pokemon-12.webp',
    '/Cards/OP_card-01.webp', '/Cards/OP_card-02.webp', '/Cards/OP_card-03.webp',
    '/Cards/OP_card-04.webp', '/Cards/OP_card-05.webp', '/Cards/OP_card-06.webp',
    '/Cards/OP_card-07.webp', '/Cards/OP_card-08.webp', '/Cards/OP_card-09.webp',
    '/Cards/OP_card-10.webp',
  ]

  return (
    <>
      <div className="scroll-progress-bar" style={{transform: `scaleX(${scrollProgress})`}} />
      <nav id="mainNav">
        <a className="nav-logo" href="#"><svg viewBox="0 0 32 32" fill="none"><defs><linearGradient id="nH" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c850ff"/><stop offset="25%" stopColor="#4d9fff"/><stop offset="50%" stopColor="#50ddb6"/><stop offset="75%" stopColor="#ffe150"/><stop offset="100%" stopColor="#ff6b8a"/></linearGradient></defs><rect x="7" y="2.5" width="18" height="25" rx="2.5" stroke="url(#nH)" strokeWidth="1.2" fill="none" transform="rotate(-10 16 16)"/><rect x="7" y="2.5" width="18" height="25" rx="2.5" stroke="url(#nH)" strokeWidth="1.2" fill="none" transform="rotate(5 16 16)"/><rect x="7" y="2.5" width="18" height="25" rx="2.5" fill="url(#nH)" opacity="0.1"/><path d="M16 10.5L17 13.2L20 13.4L17.8 15.3L18.4 18.2L16 16.8L13.6 18.2L14.2 15.3L12 13.4L15 13.2Z" fill="url(#nH)" opacity="0.7"/></svg><span className="nav-wordmark">KIRA CARDS</span></a>
        <div className="nav-links"><a href="#features">Features</a><a href="#about">About</a><a href="#contact">Contact</a><a href="#notify" className="nav-cta">Get Notified</a></div>
        <button className={`nav-burger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-inner">
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#notify" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>Get Notified</a>
        </div>
      </div>
      
      {/* ===== HERO ===== */}
      <section className="hero" id="heroSection">
        <div className="hero-bg"><div className="aurora au-1"></div><div className="aurora au-2"></div><div className="aurora au-3"></div><div className="aurora au-4"></div><div className="aurora au-5"></div></div>
        <div className="hero-grid"></div><div className="grain"></div><div className="vignette"></div><canvas id="particles" ref={canvasRef} />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge"><span className="pulse-dot"></span>Launching Soon</div>
            <h1 className={`hero-title${titleReady ? ' decoded' : ' decoding'}`}><span className="white">{titleText.slice(0, 4)}</span><br /><span className="holo">{titleText.slice(5)}</span></h1>
            <div className="hero-sub">Official TCG Retailer</div>
            <p className="hero-desc">Your authorized destination for Pokemon & One Piece Trading Card Games. Authentic products, official distribution, premium experience.</p>
            <div className="countdown" suppressHydrationWarning>
              <div className="countdown-block"><span className="countdown-num" suppressHydrationWarning>{String(time.days).padStart(2,'0')}</span><span className="countdown-label">Days</span></div>
              <span className="countdown-sep">:</span>
              <div className="countdown-block"><span className="countdown-num" suppressHydrationWarning>{String(time.hours).padStart(2,'0')}</span><span className="countdown-label">Hours</span></div>
              <span className="countdown-sep">:</span>
              <div className="countdown-block"><span className="countdown-num" suppressHydrationWarning>{String(time.minutes).padStart(2,'0')}</span><span className="countdown-label">Min</span></div>
              <span className="countdown-sep">:</span>
              <div className="countdown-block"><span className="countdown-num" suppressHydrationWarning>{String(time.seconds).padStart(2,'0')}</span><span className="countdown-label">Sec</span></div>
            </div>
            <div className="hero-actions">
              <a href="#notify" className="btn-slide">
                <div className="btn-slide-track"></div>
                <div className="btn-slide-orb"><span className="btn-slide-dot"></span><svg className="btn-slide-arrow" viewBox="0 0 22 22" fill="none"><path d="M5 11h12M12 6l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="btn-slide-texts"><span className="btn-slide-text btn-text-default">Get Early Access</span><span className="btn-slide-text btn-text-hover">{"Let's Go!"}</span></div>
                <div className="btn-slide-underglow"></div>
              </a>
              <a href="#features" className="btn-ghost">Learn More</a>
            </div>
            <div className="hero-brands">
              <span className="hero-brands-label">Authorized retailer for</span>
              <div className="hero-brands-logos">
                <img src="/images/logo-pokemon.png" alt="Pokemon TCG" />
                <img src="/images/logo-onepiece.webp" alt="One Piece Card Game" />
              </div>
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
      
      <div className="prismatic-divider"></div>
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
              <h3>English & Japanese</h3>
              <p>Offering both English and Japanese TCG products for Thailand's growing collector community.</p>
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
      
      <div className="prismatic-divider"></div>
      {/* ===== PACK OPENING ===== */}
      <section className="section-dark pack-section">
        <div className="section-inner" style={{textAlign:'center'}}>
          <span className="section-overline" style={{textAlign:'center',marginBottom:'20px',color:'#fff'}}>Interactive Experience</span>
          <h2 style={{fontFamily:'Unbounded',fontSize:'clamp(28px,4vw,42px)',fontWeight:700,color:'#fff',lineHeight:1.2,marginBottom:'16px'}}>Open a Pack</h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,.4)',lineHeight:1.7,marginBottom:'50px',maxWidth:'480px',marginLeft:'auto',marginRight:'auto'}}>Feel the thrill. Click the booster to reveal your card.</p>

          <div className={`pack-stage ${packState}`}>
            {/* Screen flash */}
            <div className={`pack-flash ${packState === 'opening' ? 'active' : ''}`} />

            {/* Screen vignette burn during glowing */}
            <div className={`pack-vignette ${packState === 'glowing' || packState === 'opening' ? 'active' : ''}`} />

            {/* Screen color tint during glow */}
            <div className={`pack-tint ${packState === 'glowing' ? 'active' : ''}`} />

            {/* Shockwave ring on burst */}
            <div className={`pack-shockwave ${packState === 'opening' ? 'active' : ''}`} />
            <div className={`pack-shockwave sw-2 ${packState === 'opening' ? 'active' : ''}`} />

            {/* God rays radiating from center on burst */}
            <div className={`pack-godrays ${packState === 'opening' || packState === 'revealed' ? 'active' : ''}`}>
              {[...Array(16)].map((_, i) => <div key={`ray-${i}`} className="godray" style={{'--ri':i,'--angle':`${i * 22.5}deg`} as React.CSSProperties} />)}
            </div>

            {/* Concentric neon rings during glow phase only */}
            <div className={`pack-neon-rings ${packState === 'glowing' ? 'active' : ''}`}>
              <div className="neon-ring nr-1" />
              <div className="neon-ring nr-2" />
              <div className="neon-ring nr-3" />
              <div className="neon-ring nr-4" />
              <div className="neon-ring nr-5" />
            </div>

            {/* Orbiting energy particles during glow */}
            <div className={`pack-orbits ${packState === 'glowing' || packState === 'opening' ? 'active' : ''}`}>
              {[...Array(8)].map((_, i) => <div key={`orb-${i}`} className="orbit-particle" style={{'--oi':i} as React.CSSProperties} />)}
            </div>

            {/* Dust cloud during glow */}
            <div className={`pack-dust ${packState === 'glowing' || packState === 'opening' ? 'active' : ''}`}>
              {[...Array(30)].map((_, i) => <div key={`dust-${i}`} className="dust-mote" style={{'--di':i} as React.CSSProperties} />)}
            </div>

            {/* Booster pack */}
            <div className={`pack-booster ${packState}`} onClick={openPack}>
              <div className="pack-wrapper">
                <img src={boosters[currentBooster]} alt="Booster Pack" />
                <div className="pack-shine"></div>
                <div className="pack-glow-edge"></div>
              </div>
              {packState === 'idle' && <div className="pack-hint">Tap to open</div>}
            </div>

            {/* Revealed card */}
            <div className={`pack-card-container ${packState === 'revealed' ? 'show' : ''}`}>
              <div className="pack-card" ref={packCardRef}>
                <div className="pack-card-inner">
                  <img src={cards[revealedCard]} alt="Revealed Card" className="pack-card-img" />
                  <div className="pack-card-holo"></div>
                  <div className="pack-card-light"></div>
                </div>
              </div>
              {packState === 'revealed' && <button className="pack-reset" onClick={resetPack}>Open Another</button>}
            </div>

            {/* Burst particles — 3 rings for massive explosion */}
            <div className={`pack-burst ${packState === 'opening' || packState === 'revealed' ? 'active' : ''}`}>
              {[...Array(24)].map((_, i) => <div key={i} className={`burst-particle bp-ring1`} style={{'--bi':i} as React.CSSProperties} />)}
              {[...Array(16)].map((_, i) => <div key={`r2-${i}`} className={`burst-particle bp-ring2`} style={{'--bi':i} as React.CSSProperties} />)}
              {[...Array(12)].map((_, i) => <div key={`r3-${i}`} className={`burst-particle bp-ring3`} style={{'--bi':i} as React.CSSProperties} />)}
            </div>

            {/* Sparkle trails */}
            <div className={`pack-sparkles ${packState === 'opening' || packState === 'revealed' ? 'active' : ''}`}>
              {[...Array(20)].map((_, i) => <div key={`sp-${i}`} className="pack-sparkle" style={{'--si':i} as React.CSSProperties} />)}
            </div>

            {/* Ambient reveal particles — dense floating sparkles around revealed card */}
            <div className={`pack-ambient ${packState === 'revealed' ? 'active' : ''}`}>
              {[...Array(40)].map((_, i) => <div key={`amb-${i}`} className="ambient-dot" style={{'--ai':i} as React.CSSProperties} />)}
            </div>

          </div>
        </div>
      </section>

      <div className="prismatic-divider"></div>
      {/* ===== ABOUT ===== */}
      <section className="section-dark" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-visual-glow"></div>
              <div className="about-cards">
                <div className="about-card ac-1">
                  <div className="ac-inner">
                    <div className="ac-art ac-art-pkmn"></div>
                    <div className="ac-holo"></div>
                  </div>
                </div>
                <div className="about-card ac-2">
                  <div className="ac-inner">
                    <div className="ac-art ac-art-op"></div>
                    <div className="ac-holo"></div>
                  </div>
                </div>
                <div className="about-card ac-3">
                  <div className="ac-inner">
                    <div className="ac-art ac-art-pkmn2"></div>
                    <div className="ac-holo"></div>
                  </div>
                </div>
              </div>
              <div className="about-logos-row">
                <img src="/images/logo-pokemon.png" alt="Pokemon TCG" style={{"height":"28px"}} />
                <span className="about-logo-sep">&</span>
                <img src="/images/logo-onepiece.webp" alt="One Piece Card Game" style={{"height":"28px"}} />
              </div>
            </div>
            <div className="about-text">
              <span className="section-overline">About Us</span>
              <h2>Built for collectors,<br />by collectors</h2>
              <p>Kira Cards is Thailand's newest authorized TCG retailer, dedicated to bringing official English and Japanese Pokémon and One Piece trading card products to collectors and players across the country.</p>
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
      
      <div className="prismatic-divider"></div>
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
        <div className="footer-top">
          <div className="footer-brand">
            <a className="footer-logo" href="#">
              <svg viewBox="0 0 32 32" fill="none"><defs><linearGradient id="fH" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c850ff"/><stop offset="25%" stopColor="#4d9fff"/><stop offset="50%" stopColor="#50ddb6"/><stop offset="75%" stopColor="#ffe150"/><stop offset="100%" stopColor="#ff6b8a"/></linearGradient></defs><rect x="7" y="2.5" width="18" height="25" rx="2.5" stroke="url(#fH)" strokeWidth="1.2" fill="none" transform="rotate(-10 16 16)"/><rect x="7" y="2.5" width="18" height="25" rx="2.5" stroke="url(#fH)" strokeWidth="1.2" fill="none" transform="rotate(5 16 16)"/><rect x="7" y="2.5" width="18" height="25" rx="2.5" fill="url(#fH)" opacity="0.1"/><path d="M16 10.5L17 13.2L20 13.4L17.8 15.3L18.4 18.2L16 16.8L13.6 18.2L14.2 15.3L12 13.4L15 13.2Z" fill="url(#fH)" opacity="0.7"/></svg>
              <span>KIRA CARDS</span>
            </a>
            <p className="footer-tagline">Thailand's authorized TCG retailer for Pokemon & One Piece trading cards.</p>
            <div className="footer-socials">
              <a href="#" aria-label="LINE" className="footer-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg></a>
              <a href="#" aria-label="Instagram" className="footer-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="#" aria-label="Facebook" className="footer-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Navigate</h4>
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#notify">Get Notified</a>
            </div>
            <div className="footer-col">
              <h4>Products</h4>
              <a href="#">Pokemon TCG</a>
              <a href="#">One Piece TCG</a>
              <a href="#">Booster Boxes</a>
              <a href="#">Premium Collections</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:hello@kiracards.com">hello@kiracards.com</a>
              <a href="#">Phuket, Thailand</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">&copy; 2026 Kira Cards. All rights reserved.</div>
          <div className="footer-brands-footer">
            <img src="/images/logo-pokemon.png" alt="Pokemon TCG" />
            <img src="/images/logo-onepiece.webp" alt="One Piece Card Game" />
          </div>
        </div>
      </footer>    </>
  )
}
