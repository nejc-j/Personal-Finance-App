import '../app/globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import ClientWrapper from '../components/ClientWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Finance Management App',
  description: 'Manage your personal finances efficiently',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}
