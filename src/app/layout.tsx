import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Kira Cards — Official TCG Retailer',
  description: 'Your authorized destination for Pokemon & One Piece Trading Card Games in Thailand. Authentic products, official distribution, premium experience.',
  keywords: 'Pokemon TCG, One Piece Card Game, trading cards, Thailand, Phuket, booster box, official retailer, English, Japanese',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Kira Cards — Official TCG Retailer',
    description: 'Your authorized destination for Pokemon & One Piece Trading Card Games in Thailand.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
