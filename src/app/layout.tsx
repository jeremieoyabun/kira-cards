import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Kira Cards — Buy Pokemon TCG, One Piece & Topps Cards Online | Thailand',
  description: 'Shop Pokemon TCG, One Piece & Topps cards online with fast nationwide delivery across Thailand. Sealed booster boxes, graded cards (PSA, BGS, CGC), secure checkout. Online store + flagship retail in Phuket. Opening May 2026!',
  keywords: 'buy Pokemon cards online Thailand, TCG online store Thailand, Pokemon TCG Phuket, One Piece Card Game Thailand, Topps sports cards online, trading cards online Thailand, booster box online Thailand, TCG shop online, buy Pokemon cards Thailand, graded cards PSA Thailand, buy sell graded cards online, Pokemon booster box online, sealed products Thailand, e-commerce TCG Thailand, English Japanese TCG, collector cards Thailand',
  icons: {
    icon: '/KIRA_sigle.svg',
  },
  metadataBase: new URL('https://www.kira-cards.com'),
  alternates: {
    canonical: 'https://www.kira-cards.com',
  },
  openGraph: {
    title: 'Kira Cards — Buy Pokemon TCG & Trading Cards Online | Thailand',
    description: 'Shop TCG & sports cards online with nationwide delivery across Thailand. Pokemon, One Piece, Topps. Sealed products, graded cards, secure checkout.',
    type: 'website',
    url: 'https://www.kira-cards.com',
    siteName: 'Kira Cards Co., Ltd.',
    locale: 'en_US',
    images: [{
      url: '/Boosters/Booster_Pokemon-01.webp',
      width: 600,
      height: 900,
      alt: 'Pokemon TCG Booster Pack — Kira Cards Phuket Thailand',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kira Cards — Buy Pokemon TCG & Trading Cards Online | Thailand',
    description: 'Shop Pokemon TCG, One Piece & Topps online. Sealed products, graded cards, fast nationwide shipping across Thailand.',
    images: ['/Boosters/Booster_Pokemon-01.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Kira Cards Co., Ltd.',
  alternateName: 'Kira Cards',
  description: 'Online TCG and sports cards store with nationwide delivery across Thailand. Pokemon TCG, One Piece Card Game, Topps sports cards. Sealed products, graded cards (PSA, BGS, CGC). E-commerce platform + flagship retail in Patong, Phuket.',
  url: 'https://www.kira-cards.com',
  telephone: '+66620960153',
  email: 'contact@kira-cards.com',
  image: 'https://www.kira-cards.com/Boosters/Booster_Pokemon-01.webp',
  logo: 'https://www.kira-cards.com/KIRA_sigle.svg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '179 ภก.4055 Pa Tong',
    addressLocality: 'Kathu',
    addressRegion: 'Phuket',
    postalCode: '83150',
    addressCountry: 'TH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 7.8933887,
    longitude: 98.3014693,
  },
  hasMap: 'https://www.google.com/maps?q=7.8933886660783825,98.3014693288359',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '21:00',
  },
  priceRange: '$$',
  currenciesAccepted: 'THB',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: [
    { '@type': 'City', name: 'Phuket' },
    { '@type': 'City', name: 'Patong' },
    { '@type': 'City', name: 'Kathu' },
    { '@type': 'City', name: 'Karon' },
    { '@type': 'City', name: 'Kata' },
    { '@type': 'Country', name: 'Thailand' },
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name: 'Pokemon TCG Booster Boxes & Packs' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name: 'One Piece Card Game Booster Boxes & Packs' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name: 'Topps Sports Cards' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name: 'PSA BGS CGC Graded Cards' },
    },
  ],
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
