import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Kira Cards | TCG & Trading Cards Guide in Phuket, Thailand',
  description: 'Guides, tips and news about Pokemon TCG, One Piece Card Game, Topps sports cards and graded cards in Phuket, Thailand. Your local TCG resource.',
  alternates: { canonical: 'https://www.kira-cards.com/blog' },
}

const articles = [
  {
    slug: 'where-to-buy-pokemon-cards-phuket',
    title: 'Where to Buy Pokemon Cards in Phuket, Thailand (2026 Guide)',
    excerpt: 'Looking for Pokemon TCG booster boxes and packs in Phuket? Here are the best places to find sealed Pokemon cards, from Patong to Phuket Town.',
    date: '2026-03-04',
  },
  {
    slug: 'trading-card-shops-phuket-thailand',
    title: 'Trading Card Shops in Phuket, Thailand — Complete Local Guide',
    excerpt: 'A comprehensive guide to every trading card shop in Phuket. Pokemon, One Piece, Topps and more. Updated for 2026.',
    date: '2026-03-07',
  },
  {
    slug: 'buy-sell-graded-cards-thailand',
    title: 'How to Buy & Sell PSA Graded Cards in Thailand',
    excerpt: 'Everything you need to know about buying and selling PSA, BGS, and CGC graded cards in Thailand. Pricing, authentication, and where to trade.',
    date: '2026-03-11',
  },
]

export default function BlogIndex() {
  return (
    <div className="privacy-page" style={{ maxWidth: 900 }}>
      <Link href="/" className="privacy-back">&larr; Back to Kira Cards</Link>
      <h1 style={{ marginBottom: 8 }}>Blog</h1>
      <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 15, marginBottom: 48 }}>
        Guides and resources for TCG collectors in Phuket and across Thailand.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            style={{
              display: 'block',
              padding: '28px 32px',
              borderRadius: 16,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
              textDecoration: 'none',
              transition: 'all .3s',
            }}
          >
            <time style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>{a.date}</time>
            <h2 style={{ fontFamily: 'Unbounded', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 600, color: '#fff', margin: '8px 0 10px', lineHeight: 1.3 }}>{a.title}</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, margin: 0 }}>{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
