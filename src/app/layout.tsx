import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from "../components/ui/toaster"
import { CloudSun, Droplets } from 'lucide-react' // ícones mais alinhados com clima

export const metadata: Metadata = {
  title: 'Climatiza - Monitoramento Ambiental em Recife',
  description: 'Dashboard para visualização de sensores ambientais em pontos urbanos do Recife',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-[#f5f7fa] text-[#111]`}>

        <header className="w-full flex items-center justify-between px-6 py-4 bg-[#005BAC] text-white shadow-md">
          <CloudSun className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wider uppercase text-center">
            Climatiza Board
          </h1>
          <Droplets className="w-8 h-8" />
        </header>

        <main className="min-h-screen">{children}</main>

        <Toaster />
      </body>
    </html>
  )
}
