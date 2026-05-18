"use client"
import Archive from "../components/ui/icons/Archive"
import WebAuthn from "../components/ui/icons/WebAuthn"
import SeccionSocial from "../components/Social/SocialSeccion"
import Link from "next/link"
import { useState } from "react"
import { Target } from "@/components/ui/Target"
import { target } from "@/const/target"



export default function Home() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // En desarrollo 
  const handleWebAuthn = async () => {
    setIsLoading('webauthn');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
    } catch (error) {
      console.error('WebAuthn error:', error);
    } finally {
      setIsLoading(null);
    }
  };
  
  return (
    <main className="grid place-items-center min-h-dvh">
      <section id="main-content" className="w-full max-w-2xl flex flex-col px-2 md:px-4 gap-3 md:gap-6  
      rounded-2xl px-1 md:p-3 lg:p-4 shadow-2xl">
        <header className="text-center space-y-4">
          <div className="flex flex-col justify-between items-start">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-start font-bold text-[1.5rem] sm:text-[2.1rem] md:text-[2.6rem] lg:text-[3.3rem] xl:text-[3.8rem] mb-6 font-sora">
                Gestor de Claves
              </h1>
              <p className="text-neutral-900 dark:text-gray-200/90 text-[0.8rem] sm:text-sm md:text-[1rem]  text-start mb-3">ClaveVault es un gestor de credenciales diseñado para almacenar, organizar y proteger tus claves de acceso en un entorno
                <strong> seguro</strong> y <strong>confiable</strong>, con una interfaz moderna y un fuerte enfoque en la seguridad digital.</p>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 justify-start w-full  gap-1 sm:gap-2 md:gap-3 mt-2">
              {target.map((item, index) => (
                <Target key={index} text={item.text}/>
              ))}
            </section>
          </div>
        </header>
        <nav className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-1" role="navigation" aria-label="Opciones principales">
          <Link
            href="/offline"
            className="group relative flex place-items-center bg-slate-800 border border-slate-700 rounded-2xl md:p-8 p-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl 
            hover:shadow-blue-500/20 w-full "
            role="menuitem"
            aria-label="Uso Offline - Administrar claves sin conexión"
          >
            <div className="hidden sm:flex md:w-16 md:h-16 w-12 h-12 flex items-center justify-center text-blue-700 group-hover:text-blue-600 transition-colors duration-300" aria-hidden="true">
              <Archive />
            </div>
            <div className="text-center space-y-2 w-full">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white">Uso Offline</h3>
              <p className="text-xs md:text-sm text-gray-300">Sin conexión a internet, archivo encriptado</p>
              <span className="text-[0.6rem] md:text-sm text-gray-400">Disponible</span>
            </div>
          </Link>
          <button
            onClick={handleWebAuthn}
            disabled={isLoading === 'webauthn'}
            className="group relative flex place-items-center bg-slate-800 border border-slate-700 rounded-2xl md:p-8 p-2 hover:border-blue-700/50 
            transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 text-left pointer-events-none cursor-pointer"
            role="menuitem"
            aria-label="WebAuthn - Autenticación biométrica"
            aria-busy={isLoading === 'webauthn'}
          >
            <div className="hidden sm:flex md:w-16 md:h-16 w-12 h-12 flex items-center justify-center text-blue-700 group-hover:text-blue-600 
            transition-colors duration-300" aria-hidden="true">
              {isLoading === 'webauthn' ? (
                <svg className="animate-spin w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <WebAuthn />
              )}
            </div>
            <div className="text-center space-y-2 w-full ">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white">WebAuthn</h3>
              <p className="text-xs md:text-sm text-gray-300 ">Autenticación biométrica, pin o huella</p>
              <span className="text-[0.6rem] md:text-sm text-gray-400 ">Próximamente</span>
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
