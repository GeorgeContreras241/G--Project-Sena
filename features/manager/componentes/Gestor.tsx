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
    <main className="min-h-screen p-4 bg-bg-main dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Header */}
        <Header_Gestor selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <section className='grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-4 lg:gap-6'>
          {/* Form add Password */}
          <AddPasswords />
          {/* Password List */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredPasswords?.map((password: any) => (
                <article key={password.id} className="bg-bg-card dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg overflow-hidden hover:border-border-strong dark:hover:border-gray-600 transition-colors duration-200">
                  {/* Password Card Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-border-subtle dark:border-gray-700">
                    <div className="shrink-0 p-2 bg-accent-subtle rounded-lg text-accent">
                      {getCategoryIcon(password.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary dark:text-white truncate">{password.title}</h3>
                      {password.url && (
                        <a
                          href={password.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-accent-hover transition-colors truncate block dark:text-accent"
                          aria-label={`Visitar ${password.url}`}
                        >
                          {password.url}
                        </a>
                      )}
                    </div>
                    <button
                      className="shrink-0 p-1.5 rounded hover:bg-accent-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                      aria-label={password.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      aria-pressed={password.favorite}
                    >
                      <span className="text-lg">{password.favorite ? '⭐' : '☆'}</span>
                    </button>
                  </div>
                  {/* Password Details */}
                  <div className="p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <label className="text-sm text-text-secondary dark:text-gray-400 shrink-0 sm:w-20">Usuario:</label>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-sm font-medium text-text-primary dark:text-gray-200 truncate">{password.username}</span>
                        <button
                          onClick={() => copyToClipboard(password.username)}
                          className="shrink-0 p-1.5 rounded hover:bg-accent-subtle text-text-secondary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                          aria-label="Copiar usuario"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <label className="text-sm text-text-secondary dark:text-gray-400 shrink-0 sm:w-20">Contraseña:</label>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-sm font-mono text-text-primary dark:text-gray-200 truncate">
                          {showPasswords[password.id] ? password.password : '•••••••'}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(password.id)}
                          className="shrink-0 p-1.5 rounded hover:bg-accent-subtle text-text-secondary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                          aria-label={showPasswords[password.id] ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          aria-pressed={showPasswords[password.id]}
                        >
                          {showPasswords[password.id] ?
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg> :
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          }
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="shrink-0 p-1.5 rounded hover:bg-accent-subtle text-text-secondary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                          aria-label="Copiar contraseña"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 p-4 border-t border-border-subtle dark:border-gray-700 bg-bg-elevated dark:bg-gray-700">
                    <button
                      className='p-2 rounded hover:bg-accent-subtle dark:hover:bg-gray-700 text-text-secondary dark:text-gray-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent'
                      aria-label="Editar contraseña"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => setDataPasswordDelate(password.id)}
                      className='p-2 rounded hover:bg-error-subtle dark:hover:bg-red-900/20 text-text-secondary dark:text-gray-400 hover:text-error transition-colors focus:outline-none focus:ring-2 focus:ring-error'
                      aria-label="Eliminar contraseña"
                    >
                      <Delete />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {/* Empty State */}
            {filteredPasswords?.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="p-4 bg-accent-subtle rounded-full mb-4">
                  <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No se encontraron contraseñas</h3>
                <p className="text-text-secondary mb-6 max-w-sm">
                  {searchTerm ? 'Intenta con otra búsqueda' : 'Agrega tu primera contraseña para comenzar'}
                </p>
                <button className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-main font-medium rounded-lg flex items-center gap-2 mx-auto transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-main">
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