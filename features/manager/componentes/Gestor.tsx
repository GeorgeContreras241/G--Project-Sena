// Refacor en proceso
'use client'
import { LocalContext } from "@/context/localProvider"
import { useState, use } from 'react'
import { useStoragePass } from '@/storage/useStoragePass'
import { Header_Gestor } from "@/features/manager/componentes/Header_Gestor"
import { copyToClipboard } from '@/utils/Gestor/copyToClipboard'
import { AddPasswords } from '@/features/manager/componentes/AddPasswords'
import { EditPassword } from '@/features/manager/componentes/EditPassword'
import { Delete } from '@/components/ui/icons/Delete'
import { Edit } from '@/components/ui/icons/Edit'
import { Copy } from '@/components/ui/icons/Copy'
import { Eye } from '@/components/ui/icons/Eye'
import { EyeClose } from '@/components/ui/icons/EyeClose'
import { Web } from '@/components/ui/icons/Web'
import { App } from '@/components/ui/icons/App'
import { Card } from '@/components/ui/icons/Card'
import { Lock } from '@/components/ui/icons/Lock'
import { LockEmpty } from '@/components/ui/icons/LockEmpty'
import { Star } from '@/components/ui/icons/Star'
import { StarFilled } from '@/components/ui/icons/StarFilled'
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
  const setDataPasswordFavorite = useStoragePass((state: any) => state.setDataPasswordFavorite)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(null)



  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <Web />
      case 'app':
        return <App />
      case 'card':
        return <Card />
      default:
        return <Lock />
    }
  }
  const filteredPasswords = dataPassword?.filter((password: any) => {
    const matchesSearch = password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'favorites' ? password.favorite : password.category === selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Header */}
        <Header_Gestor selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <section className='grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-4 lg:gap-6'>
          {/* Form add Password */}
          <section>
            {editingPassword ? (
              <EditPassword 
                password={editingPassword} 
                onClose={() => setEditingPassword(null)} 
              />
            ) : (
              <AddPasswords />
            )}
          </section>

          {/* Password List */}
          <div className="w-full">
            <div className="space-y-1.5">
              {filteredPasswords?.map((password: any) => (
                <article key={password.id} className="bg-white/95 dark:bg-blue-950 backdrop-blur-md border border-gray-300 dark:border-blue-950/20 rounded-lg overflow-hidden hover:border-blue-400 dark:hover:border-blue-900/40 transition-all duration-300 hover:scale-[1.003] shadow-sm hover:shadow-md">
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
                      onClick={() => setDataPasswordFavorite(password.id)}
                    >
                      {password.favorite ? <StarFilled /> : <Star />}
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
                          <Copy />
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
                          {showPasswords[password.id] ? <EyeClose /> : <Eye />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110 sm:hidden"
                          aria-label="Copiar contraseña"
                        >
                          <Copy />
                        </button>
                        <button
                          className='p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110 sm:hidden'
                          aria-label="Editar contraseña"
                          onClick={() => setEditingPassword(password)}
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => setDataPasswordDelate(password.id)}
                          className='p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 hover:scale-110 sm:hidden'
                          aria-label="Eliminar contraseña"
                        >
                          <Delete />
                        </button>
                      </div>
                      {/* Botones de acción - visibles solo en desktop */}
                      <div className="hidden sm:flex items-center gap-1">
                        <button
                          onClick={() => copyToClipboard(password.username)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                          aria-label="Copiar usuario"
                        >
                          <Copy />
                        </button>
                        <button
                          onClick={() => togglePasswordVisibility(password.id)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                          aria-label={showPasswords[password.id] ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          aria-pressed={showPasswords[password.id]}
                        >
                          {showPasswords[password.id] ? <EyeClose /> : <Eye />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110"
                          aria-label="Copiar contraseña"
                        >
                          <Copy />
                        </button>
                        <button
                          className='p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-110'
                          aria-label="Editar contraseña"
                          onClick={() => setEditingPassword(password)}
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
                  <LockEmpty />
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
    </div>
  )
}