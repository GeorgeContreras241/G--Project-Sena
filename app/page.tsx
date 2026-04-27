"use client"
import Archive from "../components/ui/icons/Archive"
import WebAuthn from "../components/ui/icons/WebAuthn"
import SeccionSocial from "../components/Social/SocialSeccion"
import Link from "next/link"
import { useState } from "react"

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
    <main className="fondo flex flex-col h-dvh items-center justify-around md:justify-center md:gap-20 font-sans dark:bg-background px-2">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-bg-card px-4 py-2 rounded">
        Saltar al contenido principal
      </a>
      <section id="main-content" className="w-full flex flex-col gap-4 sm:w-3/4 md:w-2/4 lg:w-2/5 h-fit p-8 border rounded-2xl border-border bg-bg-card">
        <header className="p-4">
          <h1 className="text-3xl font-bold text-text-primary">Gestor de Claves</h1>
          <span className="text-sm text-text-secondary">Elije la opcion a utilizar</span>
        </header>
        <nav className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-4 h-fit" role="navigation" aria-label="Opciones principales">
          <Link
            href="/offline"
            className="flex flex-row sm:flex-col items-center justify-start md:justify-center gap-2 md:gap-6 text-center
            w-full sm:h-50 py-3 px-4 border rounded-2xl border-border-subtle cursor-pointer bg-bg-overlay hover:bg-bg-elevated transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-accent/20"
            role="menuitem"
            aria-label="Uso Offline - Administrar claves sin conexión"
          >
            <div className="group-hover:scale-[1.05] h-10 sm:h-14 md:h-16 lg:h-18 transition-all duration-200" aria-hidden="true">
              <Archive />
            </div>
            <div>
              <p className="text-start px-2 md:text-center font-medium">Uso Offline</p>
              <span className="text-xs text-neutral-400 px-2">Sin conexión a internet, archivo encriptado.</span>
            </div>
          </Link>
          <button
            onClick={handleWebAuthn}
            disabled={isLoading === 'webauthn'}
            className="flex flex-row sm:flex-col items-center justify-start md:justify-center gap-2 md:gap-6 
            w-full sm:h-50 py-3 px-4 border rounded-2xl border-border-subtle cursor-pointer bg-bg-overlay hover:bg-bg-elevated transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed relative"
            role="menuitem"
            aria-label="WebAuthn - Autenticación biométrica"
            aria-busy={isLoading === 'webauthn'}
          >
            <div className="group-hover:scale-105 h-10 sm:h-14 md:h-16 lg:h-18 transition-all duration-200" aria-hidden="true">
              {isLoading === 'webauthn' ? (
                <svg className="animate-spin w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <WebAuthn />
              )}
            </div>
            <div>
              <p className="text-start px-2 md:text-center font-medium">WebAuthn</p>
              <span className="text-xs text-neutral-400 px-2">Autenticación biométrica, pin o huella.</span>
            </div>
            {isLoading === 'webauthn' && (
              <span className="absolute inset-0 flex items-center justify-center bg-bg-card/80 rounded-2xl" aria-live="polite">
                <span className="sr-only">Procesando autenticación WebAuthn</span>
              </span>
            )}
          </button>
        </nav>
      </section>
      <SeccionSocial className="flex flex-row items-center justify-center gap-2 " />
    </main>
  );
}
