import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Kira Cards Co., Ltd. — Upcoming TCG & Sports Cards Retailer in Phuket, Thailand',
  description: 'Upcoming TCG and sports cards retailer in Phuket, Thailand. Pokemon, One Piece & Topps. Sealed products, collector-grade experience.',
  keywords: 'Pokemon TCG, One Piece Card Game, Topps TCG, trading cards, Thailand, Phuket, booster box, TCG retailer, English, Japanese, booster pack, sealed products',
  icons: {
    icon: '/KIRA_sigle.svg',
  },
  metadataBase: new URL('https://www.kira-cards.com'),
  openGraph: {
    title: 'Kira Cards Co., Ltd. — Upcoming TCG & Sports Cards Retailer in Phuket, Thailand',
    description: 'Upcoming TCG and sports cards retailer. Pokemon, One Piece & Topps. Based in Phuket, Thailand.',
    type: 'website',
    url: 'https://www.kira-cards.com',
    siteName: 'Kira Cards Co., Ltd.',
    images: [{
      url: '/Boosters/Booster_Pokemon-01.webp',
      width: 600,
      height: 900,
      alt: 'Kira Cards Co., Ltd. — Pokemon TCG Booster Pack',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kira Cards Co., Ltd. — Upcoming TCG & Sports Cards Retailer in Phuket, Thailand',
    description: 'Upcoming TCG and sports cards retailer. Pokemon, One Piece & Topps. Based in Phuket, Thailand.',
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
