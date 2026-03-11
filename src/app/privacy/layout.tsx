import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Kira Cards Co., Ltd.',
  description: 'Privacy Policy for Kira Cards Co., Ltd., upcoming TCG and sports cards retailer in Phuket, Thailand.',
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
