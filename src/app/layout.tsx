import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Kira Cards — TCG Retail Point in Phuket, Thailand',
  description: 'Pokemon & One Piece Trading Card Games in Phuket, Thailand. Sealed products, collector-grade experience, compliance-first approach.',
  keywords: 'Pokemon TCG, One Piece Card Game, trading cards, Thailand, Phuket, booster box, TCG retailer, English, Japanese, booster pack, sealed products',
  icons: {
    icon: '/KIRA_sigle.svg',
  },
  metadataBase: new URL('https://kira-cards.vercel.app'),
  openGraph: {
    title: 'Kira Cards — TCG Retail Point in Phuket, Thailand',
    description: 'Pokemon & One Piece TCG. Sealed products, collector-grade experience. Based in Phuket, Thailand.',
    type: 'website',
    url: 'https://kira-cards.vercel.app',
    siteName: 'Kira Cards',
    images: [{
      url: '/Boosters/Booster_Pokemon-01.webp',
      width: 600,
      height: 900,
      alt: 'Kira Cards — Pokemon TCG Booster Pack',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kira Cards — TCG Retail Point in Phuket, Thailand',
    description: 'Pokemon & One Piece TCG. Sealed products, compliance-first approach.',
    images: ['/Boosters/Booster_Pokemon-01.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
