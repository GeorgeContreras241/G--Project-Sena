import { Export } from "@/components/ui/icons/Export";
import { Exit } from "@/components/ui/icons/Exit";
import { Search } from "@/components/ui/icons/Search";
import { Button } from "@/components/ui/Button";

export const Header_Gestor = ({ setSearchTerm, setSelectedCategory, handleExport, selectedCategory, searchTerm }: { setSearchTerm: (value: string) => void, setSelectedCategory: (value: string) => void, handleExport: () => void, selectedCategory: string, searchTerm: string }) => {

    

    return (
        <header className="bg-primary rounded-lg shadow-sm border border-border/15 p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-text-primary">Gestor de Contraseñas</h1>
                <article className="flex gap-2">
                    <Button text="Exportar">
                        <Export />
                    </Button>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <input
                    type="text"
                    placeholder="Buscar contraseñas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border/10 placeholder:text-[12px] rounded-md  focus:ring-1 focus:ring-accent/50 focus:border-transparent outline-none bg-bg-main text-text-primary"
                />
            </div>

            {/* Category Filters */}
            <section className="flex flex-row justify-between">
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${selectedCategory === 'all'
                            ? 'bg-secondary/30 border border-border/20'
                            : 'bg-primary border border-border/20 hover:bg-primary-hover'
                            }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setSelectedCategory('web')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'web'
                            ? 'bg-secondary/30 text-white'
                            : 'bg-primary text-white border border-border/20 hover:bg-primary-hover'
                            }`}
                    >
                        Web
                    </button>
                    <button
                        onClick={() => setSelectedCategory('app')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${selectedCategory === 'app'
                            ? 'bg-secondary/30 text-white'
                            : 'bg-primary text-white border border-border/20 hover:bg-primary-hover'
                            }`}
                    >
                        Apps
                    </button>
                </div>
            </section>
        </header>


    )
}   