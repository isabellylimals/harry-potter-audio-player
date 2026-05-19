import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Isa's Version",
  description: 'Player de música personalizado com tema romântico rosa e branco',
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