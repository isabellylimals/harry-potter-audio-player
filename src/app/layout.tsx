import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harry Potter - Música Tema',
  description: 'Player de áudio inspirado no mundo mágico de Harry Potter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}