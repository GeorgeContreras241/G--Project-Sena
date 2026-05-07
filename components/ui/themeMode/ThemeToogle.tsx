import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Dark } from "@/components/ui/icons/Dark"
import { Ligth } from "@/components/ui/icons/Ligth"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Esperar a que el componente se monte para evitar hidratación incorrecta
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex gap-2 items-center justify-center bg-neutral-900 text-white  rounded-md h-8 w-8  cursor-pointer 
       transition-colors text-sm"
    >
      {theme === 'dark' ? (
        <Dark />
      ) : (
        <Ligth />
      )}
    </button>
  )
}