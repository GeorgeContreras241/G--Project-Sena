import Archive from "../components/ui/icons/Archive"
import WebAuthn from "../components/ui/icons/WebAuthn"
import SeccionSocial from "../components/Social/SocialSeccion"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col h-[100dvh] items-center justify-around bg-zinc-50 font-sans dark:bg-black px-2">
      <section className="w-full sm:w-3/4 md:w-2/4 lg:w-[450px] h-fit  p-2 border rounded-2xl border-neutral-600/70">
        <div className="p-4 ">
          <h1 className="text-3xl font-bold ">Gestor de Claves</h1>
          <span className="text-sm text-neutral-400">Elije la opcion a utilizar </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-4 h-fit">
          <Link href="/offline" className="flex flex-row sm:flex-col  items-center justify-start gap-2 md:gap-6  text-center
          w-full sm:h-50 py-3 px-4 border rounded-2xl border-neutral-600/70 cursor-pointer hover:bg-neutral-800/80 transition-colors group">
            <div className="group-hover:scale-105 h-10 sm:h-14 md:h-16 lg:h-18 transition-all duration-100">
              <Archive />
            </div>
            <div>
              <p className="text-start px-2 md:text-center">Uso Offline</p>
              <span className="text-xs text-neutral-400 px-2">Sin conexión a internet, archivo encriptado.</span>
            </div>
          </Link>
          <button  className="flex flex-row sm:flex-col  items-center justify-start gap-6 
          w-full sm:h-50 py-3 px-4 border rounded-2xl border-neutral-600/70 cursor-pointer hover:bg-neutral-800/80 transition-colors group">
            <div className="group-hover:scale-105 h-10 sm:h-14 md:h-16 lg:h-18 transition-all duration-100">
              <WebAuthn />
            </div>
            <div>
              <p className="text-start px-2 md:text-center">WebAuthn</p>
              <span className="text-xs text-neutral-400 px-2">Autenticación biométrica, pin o huella.</span>
            </div>
          </button>
        </div>
      </section>
      <SeccionSocial className="flex flex-row items-center justify-center gap-2 " />
    </main>
  );
}
