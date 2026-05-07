"use client"
import { Button } from "@/components/ui/Button"
import { Copy } from "@/components/ui/icons/Copy"
import { useState } from "react"
import { useStoragePass } from "@/storage/useStoragePass"

// Función para generar contraseña aleatoria
const generatePassword = (options: {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}): string => {
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;

    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
};

const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
}

export const AddPasswords = () => {
    const [menuOptions, setMenuOptions] = useState(false);
    const setDataPasswordUpdate = useStoragePass((state) => state.setDataPasswordUpdate)
    const [keys, setKeys] = useState({
        title: "",
        application: "web",
        username: "",
        password: "",
        url: "",
        category: "",
        favorite: false
    })

    // Estado para opciones de configuración de contraseña
    const [passwordOptions, setPasswordOptions] = useState({
        length: 12,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false
    })
    // Función para generar y asignar contraseña aleatoria
    const handleGeneratePassword = () => {
        const newPassword = generatePassword(passwordOptions);
        setKeys({ ...keys, password: newPassword });
    }

    // tool tip Ventana emergente para agregar contraseña componente Reutilizable
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDataPasswordUpdate({ id: crypto.randomUUID(), ...keys });
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label htmlFor="Agregar Contraseña" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-1">
                    Agregar Contraseña
                </label>
                <div>
                    <label htmlFor="title" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Título"
                        value={keys.title}
                        onChange={(e) => setKeys({ ...keys, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2
                         focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white transition-all duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="application" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Aplicación
                    </label>
                    <select
                        id="application"
                        value={keys.application}
                        onChange={(e) => setKeys({ ...keys, application: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white transition-all duration-200"
                    >
                        <option value="web">Web</option>
                        <option value="app">App</option>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                        <option value="other">Otro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="username" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Usuario
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Usuario"
                        value={keys.username}
                        onChange={(e) => setKeys({ ...keys, username: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white transition-all duration-200"
                    />
                </div>
                <div className="">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            value={keys.password}
                            onChange={(e) => setKeys({ ...keys, password: e.target.value })}
                            className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white transition-all duration-200"
                        />
                        <button className="absolute top-2.5 right-3 z-10 bg-white  px-1 hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => handleCopy(keys.password)}><Copy /></button>
                    </div>
                </div>

                {/* Opciones de configuración de contraseña */}
                <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Configuración de Contraseña
                    </label>

                    {/* Longitud */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="length" className="text-xs text-gray-700 dark:text-gray-300 w-20">
                            Longitud:
                        </label>
                        <input
                            id="length"
                            type="number"
                            min="4"
                            max="32"
                            value={passwordOptions.length}
                            onChange={(e) => setPasswordOptions({ ...passwordOptions, length: parseInt(e.target.value) || 12 })}
                            className="flex-1 px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white transition-all duration-200"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <button type="button" onClick={() => setMenuOptions(!menuOptions)}
                            className="px-2 py-1 text-xs bg-blue-900 text-white rounded-sm hover:bg-blue-600 transition-colors duration-200 w-20 ml-auto">Opciones</button>
                    </div>
                    {/* Opciones de caracteres */}
                    {menuOptions && (
                        <div className="flex flex-wrap gap-2 ">
                            <label className="flex items-center space-x-2 text-xs">
                                <input
                                    type="checkbox"
                                    id="uppercase"
                                    checked={passwordOptions.includeUppercase}
                                    onChange={(e) => setPasswordOptions({ ...passwordOptions, includeUppercase: e.target.checked })}
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="text-gray-700 dark:text-gray-300">Mayúsculas (A-Z)</span>
                            </label>

                            <label className="flex items-center space-x-2 text-xs">
                                <input
                                    type="checkbox"
                                    id="lowercase"
                                    checked={passwordOptions.includeLowercase}
                                    onChange={(e) => setPasswordOptions({ ...passwordOptions, includeLowercase: e.target.checked })}
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="text-gray-700 dark:text-gray-300">Minúsculas (a-z)</span>
                            </label>

                            <label className="flex items-center space-x-2 text-xs">
                                <input
                                    type="checkbox"
                                    id="numbers"
                                    checked={passwordOptions.includeNumbers}
                                    onChange={(e) => setPasswordOptions({ ...passwordOptions, includeNumbers: e.target.checked })}
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="text-gray-700 dark:text-gray-300">Números (0-9)</span>
                            </label>

                            <label className="flex items-center space-x-2 text-xs">
                                <input
                                    type="checkbox"
                                    id="symbols"
                                    checked={passwordOptions.includeSymbols}
                                    onChange={(e) => setPasswordOptions({ ...passwordOptions, includeSymbols: e.target.checked })}
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="text-gray-700 dark:text-gray-300">Símbolos (!@#$%^&*)</span>
                            </label>
                        </div>
                    )}

                    {/* Botón de generar contraseña */}
                    <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="w-full px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
                    >
                        <span>🔄</span>
                        <span>Generar Contraseña Aleatoria</span>
                    </button>
                </div>

                <Button text="Agregar" className="w-full py-1.5 text-sm flex items-center justify-center">
                    <span>+</span>
                </Button>
            </form>
        </section>
    )
}