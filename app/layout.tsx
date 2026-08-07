import type { Metadata, Viewport } from 'next'
import './globals.css'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'کلایبرگ | پیشرو در نوآوری لوازم آشپزخانه',
  description: 'کلایبرگ، تولیدکننده پیشرو هود، فر، سینک و اجاق گاز توکار با بالاترین استانداردهای کیفیت و ایمنی. بهانه‌ای برای آشپزی.',
  keywords: ['کلایبرگ', 'هود آشپزخانه', 'اجاق گاز', 'سینک', 'فر توکار', 'لوازم آشپزخانه'],
  openGraph: {
    title: 'کلایبرگ | بهانه‌ای برای آشپزی',
    description: 'پیشرو در نوآوری و کیفیت لوازم آشپزخانه',
    locale: 'fa_IR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground pb-24 lg:pb-0">
        <ThemeProvider>
          {children}
          <MobileBottomNav />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
