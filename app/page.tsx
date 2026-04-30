"use client"
import Archive from "../components/ui/icons/Archive"
import WebAuthn from "../components/ui/icons/WebAuthn"
import SeccionSocial from "../components/Social/SocialSeccion"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/ui/themeMode/ThemeToogle"

export default function Home() {
  const [isLoading, setIsLoading] = useState<string | null>(null);



  const handleWebAuthn = async () => {
    setIsLoading('webauthn');
    try {
      // Implement WebAuthn logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading
    } catch (error) {
      console.error('WebAuthn error:', error);
    } finally {
      setIsLoading(null);
    }
  };
  return (
    <main className="fondo flex flex-col min-h-screen items-center justify-center font-sans border-4 border-white/30 dark:border-white/20">
      <section id="main-content" className="w-full max-w-2xl flex flex-col  gap-3 md:gap-4 lg:gap-6 bg-white/10 dark:bg-blue-950/30 backdrop-blur-md border-2 border-white/30 dark:border-blue-950/20 rounded-2xl px-1 md:p-3 lg:p-4 shadow-2xl">
        <header className="text-center space-y-4">
          <div className="flex justify-between items-start">
            <div className="w-full flex flex-col gap-2">
              <h1 className="lg:text-4xl md:text-3xl text-lg w-full font-bold bg-linear-to-r from-neutral-900 border-neutral-900 dark:from-neutral-200 dark:from-neutral-100
               to-blue-800 bg-clip-text text-transparent">
                Plataforma de Gestión de Credenciales
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-[0.8rem] sm:text-sm md:text-md  text-start">ClaveVault es un gestor de credenciales diseñado para almacenar, organizar y proteger tus claves de acceso en un entorno
                <strong>seguro</strong> y <strong>confiable</strong>, con una interfaz moderna y un fuerte enfoque en la seguridad digital.</p>
              <span className="text-gray-600 dark:text-gray-300 text-md text-start ">Elige la opción a utilizar: </span>
            </div>

          </div>
        </header>
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 " role="navigation" aria-label="Opciones principales">
          <Link
            href="/offline"
            className="group flex flex-row md:flex-col items-center justify-around md:justify-center gap-4 p-6 bg-gray-900/80 dark:bg-black/80 border border-gray-700 dark:border-gray-800 rounded-xl hover:bg-gray-800
             dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            role="menuitem"
            aria-label="Uso Offline - Administrar claves sin conexión"
          >
            <div className="hidden sm:flex md:w-16 md:h-16 w-12 h-12 flex items-center justify-center text-blue-700 group-hover:text-blue-600 transition-colors duration-300" aria-hidden="true">
              <Archive />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-white">Uso Offline</h3>
              <p className="text-sm text-gray-300">Sin conexión a internet, archivo encriptado</p>
            </div>
          </Link>
          <button
            onClick={handleWebAuthn}
            disabled={isLoading === 'webauthn'}
            className="group flex flex-row md:flex-col items-center justify-around md:justify-center gap-4 p-6 bg-gray-900/80 dark:bg-black/80 border border-gray-700 dark:border-gray-800 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative"
            role="menuitem"
            aria-label="WebAuthn - Autenticación biométrica"
            aria-busy={isLoading === 'webauthn'}
          >
            <div className="hidden sm:flex md:w-16 md:h-16 w-12 h-12 flex items-center justify-center text-blue-700 group-hover:text-blue-600 transition-colors duration-300" aria-hidden="true">
              {isLoading === 'webauthn' ? (
                <svg className="animate-spin w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <WebAuthn />
              )}
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-white">WebAuthn</h3>
              <p className="text-sm text-gray-300">Autenticación biométrica, pin o huella</p>
            </div>
            {isLoading === 'webauthn' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-black/90 rounded-xl backdrop-blur-sm" aria-live="polite">
                <span className="sr-only">Procesando autenticación WebAuthn</span>
              </div>
            )}
          </button>
        </nav>
      </section>
      <SeccionSocial className="flex flex-row items-center justify-center gap-4 mt-8" />
    </main>
  );
}
