"use client"
import { use } from "react"
import { LocalContext } from "@/context/localProvider"
import { Export } from "@/components/ui/icons/Export";
import { Exit } from "@/components/ui/icons/Exit";
import { Search } from "@/components/ui/icons/Search";
import { Button } from "@/components/ui/Button";
import { useStoragePass } from "@/storage/useStoragePass";
import { ThemeToggle } from "@/components/ui/themeMode/ThemeToogle";

export const Header_Gestor = ({ setSearchTerm, setSelectedCategory, selectedCategory, searchTerm }: { setSearchTerm: (value: string) => void, setSelectedCategory: (value: string) => void, onLoad: () => void, selectedCategory: string, searchTerm: string }) => {
    const { handleExport } = use(LocalContext)
    const dataPassword = useStoragePass(state => state.dataPassword)

    return (
        <header className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestor de Credenciales</h1>
                <article className="flex gap-2">
                    <ThemeToggle />
                    <button className={`flex gap-2 items-center bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 
        cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm`} onClick={() => handleExport(dataPassword)}>
                        exportar
                    </button>
                    <Button text="Salir">
                        <Exit />
                    </Button>
                    <Button text="Añadir">
                        <Exit />
                    </Button>
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
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${selectedCategory === 'all'
                            ? 'bg-blue-900 dark:bg-gray-800 border dark:border-gray-700 text-white'
                            : 'bg-white dark:bg-gray-600 text-white dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setSelectedCategory('web')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'web'
                            ? 'bg-blue-900 dark:bg-gray-800 border dark:border-gray-700 text-white'
                            : 'bg-white dark:bg-gray-600 text-white dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Web
                    </button>
                    <button
                        onClick={() => setSelectedCategory('app')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'app'
                            ? 'bg-blue-900 dark:bg-gray-800 border dark:border-gray-700 text-white'
                            : 'bg-white dark:bg-gray-600 text-white dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Apps
                    </button>
                </div>
            </section>
        </header>


    )
}   