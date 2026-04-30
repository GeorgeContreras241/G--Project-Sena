// Refacor en proceso
'use client'
import { LocalContext } from "@/context/localProvider"
import { useState, use } from 'react'
import { useStoragePass } from '@/storage/useStoragePass'
import { Header_Gestor } from "@/features/manager/componentes/Header_Gestor"
import { copyToClipboard } from '@/utils/Gestor/copyToClipboard'
import { AddPasswords } from '@/features/manager/componentes/AddPasswords'
import { Delete } from '@/components/ui/icons/Delete'
import { Edit } from '@/components/ui/icons/Edit'
import { deriveKey } from "@/lib/crypto/kdfKey"

interface PasswordEntry {
  id: string
  title: string
  username: string
  password: string
  favorite: boolean
  url: string
  category: string
}

export const Gestor = () => {
  const dataPassword = useStoragePass((state: any) => state.dataPassword)
  const setDataPasswordDelate = useStoragePass((state: any) => state.setDataPasswordDelate)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  console.log(dataPassword)

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zM9.954 4.569c-.785.424-1.479 1.55-1.816 3.431h3.632c-.337-1.882-1.031-3.007-1.816-3.431zM9.954 15.431c.785-.424 1.479-1.55 1.816-3.431H8.138c.337 1.882 1.031 3.007 1.816 3.431zM10 11H4.256c.086-1.546.38-2.97.837-4.118A6.004 6.004 0 004.083 11H10zm0 0h5.917a6.004 6.004 0 01-1.01 4.118c.457-1.147.751-2.572.837-4.118H10zm0-5.856V4.569c-.785.424-1.479 1.55-1.816 3.431h3.632c-.337-1.882-1.031-3.007-1.816-3.431z" clipRule="evenodd" /></svg>
      case 'app':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
      case 'card':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
      default:
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
    }
  }
  const filteredPasswords = dataPassword?.filter((password: any) => {
    const matchesSearch = password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || password.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="fondo min-h-screen p-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Header */}
        <Header_Gestor selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <section className='grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-4 lg:gap-6'>
          {/* Form add Password */}
          <AddPasswords />
          {/* Password List */}
          <div className="w-full">
            <div className="space-y-1.5">
              {filteredPasswords?.map((password: any) => (
                <article key={password.id} className="bg-white/95 dark:bg-blue-950/30 backdrop-blur-md border border-gray-300 dark:border-blue-950/20 rounded-lg overflow-hidden hover:border-blue-400 dark:hover:border-blue-900/40 transition-all duration-300 hover:scale-[1.003] shadow-sm hover:shadow-md">
                  {/* Password Card Header */}
                  <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-blue-900/30 bg-linear-to-r from-gray-50 to-white dark:from-blue-900/20 dark:to-blue-950/30">
                    <div className="shrink-0 p-1 bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded text-white text-xs">
                      {getCategoryIcon(password.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate text-sm">{password.title}</h3>
                      {password.url && (
                        <a
                          href={password.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors truncate block font-medium"
                          aria-label={`Visitar ${password.url}`}
                        >
                          {password.url}
                        </a>
                      )}
                    </div>
                    <button
                      className="shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-blue-900/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                      aria-label={password.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      aria-pressed={password.favorite}
                    >
                      <span className="text-sm">{password.favorite ? '⭐' : '☆'}</span>
                    </button>
                  </div>
                  {/* Password Details */}
                  <div className="p-2 bg-linear-to-b from-white to-gray-50 dark:from-blue-950/30 dark:to-blue-900/20">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 shrink-0 w-12 uppercase tracking-wide">User:</label>
                        <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded flex-1">{password.username}</span>
                        <button
                          onClick={() => copyToClipboard(password.username)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110 sm:hidden"
                          aria-label="Copiar usuario"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 shrink-0 w-12 uppercase tracking-wide">Pass:</label>
                        <span className="text-xs font-mono text-gray-900 dark:text-gray-100 truncate bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded flex-1">
                          {showPasswords[password.id] ? password.password : '•••••••'}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(password.id)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110 sm:hidden"
                          aria-label={showPasswords[password.id] ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          aria-pressed={showPasswords[password.id]}
                        >
                          {showPasswords[password.id] ?
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg> :
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          }
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110 sm:hidden"
                          aria-label="Copiar contraseña"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      {/* Botones de acción - visibles solo en desktop */}
                      <div className="hidden sm:flex items-center gap-1">
                        <button
                          onClick={() => copyToClipboard(password.username)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                          aria-label="Copiar usuario"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => togglePasswordVisibility(password.id)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                          aria-label={showPasswords[password.id] ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          aria-pressed={showPasswords[password.id]}
                        >
                          {showPasswords[password.id] ?
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg> :
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          }
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                          aria-label="Copiar contraseña"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          className='p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110'
                          aria-label="Editar contraseña"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => setDataPasswordDelate(password.id)}
                          className='p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 hover:scale-110'
                          aria-label="Eliminar contraseña"
                        >
                          <Delete />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {/* Empty State */}
            {filteredPasswords?.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="p-4 bg-blue-500/20 dark:bg-blue-400/20 rounded-full mb-4">
                  <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No se encontraron contraseñas</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-sm">
                  {searchTerm ? 'Intenta con otra búsqueda' : 'Agrega tu primera contraseña para comenzar'}
                </p>
                <button className="px-6 py-3 bg-blue-950 hover:bg-neutral-700 dark:bg-blue-950 dark:hover:bg-blue-600 text-white font-medium rounded-lg flex items-center gap-2 mx-auto transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900">
                  <span className="text-xl">+</span>
                  Agregar Contraseña
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}