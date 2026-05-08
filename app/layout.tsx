import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'GlowUp Scanner | AI-Powered Acne Severity Analyzer for Teenagers',
  description: 'Understand your skin with AI. GlowUp Scanner helps teenagers analyze acne severity, get personalized skincare recommendations, and track skin health progress.',
  keywords: ['acne analyzer', 'skincare AI', 'teen skincare', 'acne treatment', 'skin health', 'glowup'],
  authors: [{ name: 'GlowUp Scanner' }],
  openGraph: {
    title: 'GlowUp Scanner | AI-Powered Acne Severity Analyzer',
    description: 'Understand your skin with AI. Get personalized skincare recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlowUp Scanner | AI-Powered Acne Severity Analyzer',
    description: 'Understand your skin with AI. Get personalized skincare recommendations.',
  },
}

export const viewport: Viewport = {
  themeColor: '#8b5cf6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
