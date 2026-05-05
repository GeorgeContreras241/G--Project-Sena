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
      className="flex gap-2 items-center bg-neutral-800 dark:bg-gray-700 text-white px-3 py-2 rounded-md border-2 dark:border-gray-600 cursor-pointer hover:bg-neutral-700 dark:hover:bg-gray-600 transition-colors text-sm"
    >
      {theme === 'dark' ? 'Claro' : 'Oscuro'}
    </button>
  )
}