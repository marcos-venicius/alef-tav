import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hebrew Alphabet Flip Card',
  description: 'Learn the hebrew alphabet'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Toaster richColors position='top-right' />
      </body>
    </html>
  )
}
