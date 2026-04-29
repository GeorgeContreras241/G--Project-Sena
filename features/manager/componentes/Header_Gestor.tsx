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
        <header className="bg-primary dark:bg-gray-800 rounded-lg shadow-sm border border-border/15 dark:border-gray-700 p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-text-primary dark:text-white">Gestor de Contraseñas</h1>
                <article className="flex gap-2">
                    <ThemeToggle />
                    <button className={`flex gap-2 items-center bg-primary dark:bg-gray-700 text-white px-4 py-2 rounded-md border border-border dark:border-gray-600 
        cursor-pointer hover:bg-bg-elevated dark:hover:bg-gray-600`} onClick={() => handleExport(dataPassword)}>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar contraseñas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border/10 dark:border-gray-600 placeholder:text-[12px] rounded-md  focus:ring-1 focus:ring-accent/50 focus:border-transparent outline-none bg-bg-main dark:bg-gray-800 text-text-primary dark:text-white"
                />
            </div>

            {/* Category Filters */}
            <section className="flex flex-row justify-between">
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${selectedCategory === 'all'
                            ? 'bg-secondary/30 dark:bg-gray-700 border border-border/20 dark:border-gray-600'
                            : 'bg-primary dark:bg-gray-600 border border-border/20 dark:border-gray-500 hover:bg-primary-hover dark:hover:bg-gray-500'
                            }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setSelectedCategory('web')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'web'
                            ? 'bg-secondary/30 dark:bg-gray-700 text-white'
                            : 'bg-primary dark:bg-gray-600 text-white border border-border/20 dark:border-gray-500 hover:bg-primary-hover dark:hover:bg-gray-500'
                            }`}
                    >
                        Web
                    </button>
                    <button
                        onClick={() => setSelectedCategory('app')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'app'
                            ? 'bg-secondary/30 dark:bg-gray-700 text-white'
                            : 'bg-primary dark:bg-gray-600 text-white border border-border/20 dark:border-gray-500 hover:bg-primary-hover dark:hover:bg-gray-500'
                            }`}
                    >
                        Apps
                    </button>
                </div>
            </section>
        </header>


    )
}   