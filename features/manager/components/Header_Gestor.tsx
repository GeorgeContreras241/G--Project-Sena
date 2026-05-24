"use client"
import { useLocalContext } from "@/context/useLocalContext"
import { Exit } from "@/components/ui/icons/Exit";
import { Export } from "@/components/ui/icons/Export" 
import { Search } from "@/components/ui/icons/Search";
import { Button } from "@/components/ui/Button";
import { useStoragePass } from "@/storage/useStoragePass";
import { ThemeToggle } from "@/components/ui/themeMode/ThemeToogle";
import { CATEGORY_BUTTONS } from "@/const/buttonsNavegations";
import { HeaderGestorProps } from "@/types";
import { useRouter } from "next/navigation";
export const Header_Gestor = ({ setSearchTerm, setSelectedCategory, selectedCategory, searchTerm }: HeaderGestorProps) => {
    const router = useRouter();
    const { handleExport, handleReset } = useLocalContext()
    const dataPassword = useStoragePass((state) => state.dataPassword)

    return (
        <header className="bg-white/95 dark:bg-neutral-950/90 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-neutral-900 p-6 mb-6">
            {/* Header */}
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="tex-lg md:text-3xl font-bold text-gray-900 dark:text-white font-sora tracking-tight">Gestor de Credenciales</h1>
                <article className="flex flex-row  items-center justify-between gap-2">
                    <ThemeToggle className="h-6 w-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        <button className={`grid gap-2 place-items-center bg-gray-900 text-white h-8 w-20 rounded-md border border-gray-300 dark:border-gray-700 
                                        cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-xs font-semibold`} onClick={() => handleExport(dataPassword)}>
                            Exportar
                        </button>
                        <Button  onClick={() => {
                            handleReset();
                            router.push('/');
                        }}>
                            <Exit />
                            <span> Salir</span>
                           <span><Export/></span>
                        </Button>
                    </div>
                </article>
            </div>
            {/* Search */}
            <div className="relative mb-4 group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-200 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400" />
                <input
                    type="text"
                    placeholder="Buscar contraseñas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 placeholder:text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg 
                    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 outline-none 
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
                    shadow-sm focus:shadow-md transition-all duration-200 
                    hover:border-gray-400 dark:hover:border-gray-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Category Filters */}
            <section className="flex flex-row justify-between">
                <div className="flex gap-2 flex-wrap">
                    {CATEGORY_BUTTONS.map((button) => (
                        <Button key={button.id} onClick={() => setSelectedCategory(button.value)} className={`${selectedCategory === button.value ?
                            'dark:bg-gray-950 bg-gray-900 text-white ' : 'dark:bg-gray-800 bg-gray-700 text-white'}`}>
                            {button.label}
                        </Button>

                    ))}
                </div>
            </section>
        </header>
    )
}   