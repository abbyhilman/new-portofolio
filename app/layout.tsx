import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from 'next' // Import Metadata type jika menggunakan TypeScript

const inter = Inter({ subsets: ["latin"] })

// Tambahkan path ke logo Anda di folder public.
const LOGO_PATH = "/abby_logo.png"; 
const FAVICON_PATH = "/abby_logo.png"; 

export const metadata: Metadata = { // Gunakan type Metadata di sini
  title: "Portofolio Abby Hilman",
  description: "Mobile app developer",
  generator: 'ByHil',
  
  // 1. Menambahkan Favicon/Icons
  icons: {
    icon: FAVICON_PATH, // Untuk favicon umum (pastikan file ada)
    shortcut: FAVICON_PATH,
    apple: LOGO_PATH, // Untuk icon di iOS/Apple (biasanya ukuran 180x180)
  },

  // 2. Menambahkan Open Graph Image (untuk social media sharing)
  openGraph: {
    title: "Portofolio Abby Hilman | Mobile App Developer",
    description: "Mobile app developer dengan pengalaman lebih dari 4 tahun di React Native dan Flutter.",
    url: 'https://abbyhilman.com', // Ganti dengan URL domain portofolio Anda
    siteName: 'Abby Hilman Portfolio',
    images: [
      {
        url: LOGO_PATH, // Gunakan path logo yang lebih besar (misal 1200x630)
        width: 1200,
        height: 630,
        alt: 'Abby Hilman Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  
  // 3. Menambahkan Twitter Card (penting untuk Twitter)
  twitter: {
    card: 'summary_large_image',
    title: "Portofolio Abby Hilman",
    description: "Mobile app developer.",
    images: [LOGO_PATH],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}