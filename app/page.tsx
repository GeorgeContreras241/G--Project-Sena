import Archive from "../components/icons/Archive"
import WebAuthn from "../components/icons/WebAuthn"
import SeccionSocial from "../components/Social/SeccionSocial"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-around bg-zinc-50 font-sans dark:bg-black px-2">
      <section className="w-full sm:w-3/4 md:w-2/4 lg:w-[450px] h-fit  p-2 border rounded-2xl border-neutral-600/70">
        <div className="p-4 ">
          <h1 className="text-3xl font-bold ">Gestor de Claves</h1>
          <span className="text-sm text-neutral-400">Elije la opcion a utilizar </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 h-full">
          <button className="flex flex-row sm:flex-col  items-center justify-center gap-6 
          w-full sm:h-50 py-3 border rounded-2xl border-neutral-600/70 cursor-pointer hover:bg-neutral-800/80 transition-colors group">
            <div className="group-hover:scale-105 h-10 sm:h-14 md:h-16 lg:h-18 transition-all duration-100">
              <Archive />
            </div>
            <p className="">Uso Offline</p>
          </button>
          <button className="flex flex-row sm:flex-col  items-center justify-center gap-6 
          w-full sm:h-50 py-3 border rounded-2xl border-neutral-600/70 cursor-pointer hover:bg-neutral-800/80 transition-colors group">
            <div className="group-hover:scale-110 h-10 sm:h-14 md:h-16 lg:h-18">
              <WebAuthn />
            </div>
            <p>WebAuthn</p>
          </button>
        </div>
      </section>
      <SeccionSocial className="flex flex-row items-center justify-center gap-2 "/>
    </div>
  );
}
