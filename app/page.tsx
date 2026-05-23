"use client"
import Archive from "../components/ui/icons/Archive"
import WebAuthn from "../components/ui/icons/WebAuthn"
import SeccionSocial from "../components/Social/SocialSeccion"
import Link from "next/link"
import { Target } from "@/components/ui/Target"
import { target } from "@/const/target"
import { sileo, Toaster } from "sileo" 



export default function Home() {
  

  // En desarrollo 
  const handleWebAuthn = async () => {
    return sileo.warning({title: "Proximamente"})
  };
  
  return (
    <main className="grid md:place-items-center min-h-dvh">
      <section id="main-content" className="w-full h-fit pt-10 pb-5 md:pt-0 max-w-2xl flex flex-col px-3 md:px-4 gap-3 md:gap-6  
      rounded-2xl px-1 md:p-3 lg:p-4 shadow-2xl bg-black/10 dark:bg-white/5 backdrop-blur-md">
        <header className="text-center space-y-4">
          <div className="flex flex-col justify-between items-start">
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-start font-bold text-[1.5rem] sm:text-[2.1rem] md:text-[2.6rem] lg:text-[3.3rem] xl:text-[3.8rem] mb-6 font-sora">
                Gestor de Claves
              </h1>
              <p className="text-neutral-900 dark:text-gray-200/90 text-[0.8rem] sm:text-sm md:text-[1rem]  text-start mb-3">ClaveVault es un gestor de credenciales diseñado para almacenar, organizar y proteger tus claves de acceso en un entorno
                <strong> seguro</strong> y <strong>confiable</strong>, con una interfaz moderna y un fuerte enfoque en la seguridad digital.</p>
            </div>
            <section className="grid grid-cols-3 justify-start w-full  gap-1 sm:gap-2 md:gap-3 mt-2">
              {target.map((item, index) => (
                <Target key={index} text={item.text}/>
              ))}
            </section>
          </div>
        </header>
        <nav className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-1 justify-center items-center" role="navigation" aria-label="Opciones principales">
          <Link
            href="/offline"
            className="group relative flex place-items-center bg-slate-800 border border-slate-700 rounded-2xl md:p-8 p-1 hover:border-blue-500 
            transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20
            hover:shadow-blue-500/20 w-full "
            role="menuitem"
            aria-label="Uso Offline - Administrar claves sin conexión"
          >
            <div className="flex mx-3 pmd:w-16 md:h-16 w-12 h-12 flex items-center justify-center dark:text-blue-700 text-blue-300 group-hover:text-blue-600 transition-colors duration-300" aria-hidden="true">
              <Archive />
            </div>
            <div className="text-start md:text-center md:space-y-2 w-full">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white">Uso Offline</h3>
              <p className="text-xs md:text-sm text-gray-300">Sin conexión a internet, archivo encriptado</p>
              <span className="text-[0.6rem] md:text-sm text-gray-400 flex justify-end pr-2 md:justify-center">Disponible</span>
            </div>
          </Link>
          <button
            onClick={handleWebAuthn}
            className="group relative flex place-items-center bg-slate-800 border border-slate-700 rounded-2xl md:p-8 p-2
            transition-all duration-300 hover:border-blue-500 hover:bg-slate-700/80 hover:shadow-xl hover:shadow-blue-500/20
             active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none disabled:scale-100
            text-left cursor-pointer"
            role="menuitem"
            aria-label="WebAuthn - Autenticación biométrica"
          >
            <div className="flex mx-3 pmd:w-16 md:h-16 w-12 h-12 flex items-center justify-center dark:text-blue-700 text-blue-300 group-hover:text-blue-600 transition-colors duration-300" aria-hidden="true">
                <WebAuthn />
            </div>
            <div className="text-start md:text-center md:space-y-2 w-full ">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white">WebAuthn</h3>
              <p className="text-xs md:text-sm text-gray-300 ">Autenticación biométrica, pin o huella</p>
              <span className="text-[0.6rem] md:text-sm text-gray-400 flex justify-end pr-2 md:justify-center">Próximamente</span>
            </div>
          </button>
        </nav>
      </section>
      <SeccionSocial className="flex flex-row items-center justify-center gap-4 mt-8" />
      <Toaster position="top-center"/>
    </main>
  );
}
