import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SonicID - Zero-Knowledge Identity Verification',
  description: 'Instant, privacy-preserving identity verification on Sonic blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}