import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Dark } from "@/components/ui/icons/Dark"
import { Ligth } from "@/components/ui/icons/Ligth"

export function ThemeToggle({className}: {className?: string}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Esperar a que el componente se monte para evitar hidratación incorrecta
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`flex gap-2 items-center justify-center bg-transparent  text-white  rounded-md  cursor-pointer 
       transition-colors text-sm hover:scale-105 transition-all ${className}`}
    >
      {theme === 'dark' ? (
        <Dark />
      ) : (
        <Ligth />
      )}
    </button>
  )
}