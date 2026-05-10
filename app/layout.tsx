"use client"

import { Inter,Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['-apple-system', 'system-ui', 'sans-serif'],
  variable: '--font-inter',
})

export const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${sora.variable} antialiased bg-white/10 dark:bg-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
