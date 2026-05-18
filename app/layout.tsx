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
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} ${sora.variable} bg-gradient-to-br p-1 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-slate-100 light:via-slate-50 light:to-slate-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
