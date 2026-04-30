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
        <header className="bg-white/90 dark:bg-gray-800 rounded-lg shadow-sm border-2 border-gray-300 dark:border-gray-700 p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestor de Contraseñas</h1>
                <article className="flex gap-2">
                    <ThemeToggle />
                    <button className={`flex gap-2 items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 
        cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600`} onClick={() => handleExport(dataPassword)}>
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
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar contraseñas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 placeholder:text-[12px] rounded-md  focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
            </div>

            {/* Category Filters */}
            <section className="flex flex-row justify-between">
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${selectedCategory === 'all'
                            ? 'bg-blue-100 dark:bg-gray-700 border-2 border-blue-300 dark:border-gray-600 text-blue-700 dark:text-white'
                            : 'bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500'
                            }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setSelectedCategory('web')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'web'
                            ? 'bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-white border-2 border-blue-300 dark:border-gray-600'
                            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-white border-2 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500'
                            }`}
                    >
                        Web
                    </button>
                    <button
                        onClick={() => setSelectedCategory('app')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'app'
                            ? 'bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-white border-2 border-blue-300 dark:border-gray-600'
                            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-white border-2 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500'
                            }`}
                    >
                        Apps
                    </button>
                </div>
            </section>
        </header>


    )
}   