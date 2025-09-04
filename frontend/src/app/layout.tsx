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
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans antialiased">
        <div className="min-h-screen w-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 -z-10"></div>
          {children}
        </div>
      </body>
    </html>
  )
}