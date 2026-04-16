"use client"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { useStoragePass } from "@/storage/useStoragePass"

export const AddPasswords = () => {
    const setDataPasswordUpdate = useStoragePass((state) => state.setDataPasswordUpdate)
    const [keys, setKeys] = useState({
        title: "",
        username: "",
        password: "",
        url: "",
        category: "",
        favorite: false
    })
    // tool tip Ventana emergente para agregar contraseña componente Reutilizable
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDataPasswordUpdate({ id: crypto.randomUUID(), ...keys });
    }

    return (
        <section className="bg-background border border-border rounded-lg p-4">
            <form className="space-y-3" onSubmit={handleSubmit}>
                <label htmlFor="" className="block text-xs font-medium text-text-primary mb-1">
                    Agregar Contraseña
                </label>
                <div>
                    <label htmlFor="title" className="block text-xs font-medium text-text-primary mb-1">
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Título"
                        value={keys.title}
                        onChange={(e) => setKeys({ ...keys, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-editor-bg border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-text-primary"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-xs font-medium text-text-primary mb-1">
                        Usuario
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Usuario"
                        value={keys.username}
                        onChange={(e) => setKeys({ ...keys, username: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-editor-bg border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-text-primary"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-xs font-medium text-text-primary mb-1">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={keys.password}
                        onChange={(e) => setKeys({ ...keys, password: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-editor-bg border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-text-primary"
                    />
                </div>
                <Button text="Agregar" className="w-full py-1.5 text-sm flex items-center justify-center">
                    <span>+</span>
                </Button>
            </form>
        </section>
    )
}