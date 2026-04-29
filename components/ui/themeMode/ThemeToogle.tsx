import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Esperar a que el componente se monte para evitar hidratación incorrecta
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded-md border border-border cursor-pointer hover:bg-bg-elevated transition-colors"
    >
      {theme === 'dark' ? 'Claro' : 'Oscuro'}
    </button>
  )
}