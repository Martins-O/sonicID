import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '@/context/WalletContext'

export const metadata: Metadata = {
  title: 'SonicID - Zero-Knowledge Identity Verification',
  description: 'Instant, privacy-preserving identity verification on Sonic blockchain. Secure, decentralized, and lightning-fast ZK proofs for the modern web.',
  keywords: ['zero-knowledge', 'identity verification', 'blockchain', 'privacy', 'sonic', 'zk-proofs', 'decentralized identity'],
  authors: [{ name: 'SonicID Team' }],
  creator: 'SonicID',
  publisher: 'SonicID',
  robots: 'index, follow',
  openGraph: {
    title: 'SonicID - Zero-Knowledge Identity Verification',
    description: 'Instant, privacy-preserving identity verification on Sonic blockchain',
    type: 'website',
    locale: 'en_US',
    siteName: 'SonicID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SonicID - Zero-Knowledge Identity Verification',
    description: 'Instant, privacy-preserving identity verification on Sonic blockchain',
    creator: '@SonicID',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans antialiased">
        <WalletProvider>
          <div className="min-h-screen w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
            <div className="relative z-10 min-h-screen">
              {children}
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}