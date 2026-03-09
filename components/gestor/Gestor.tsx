'use client'

import { useState } from 'react'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    {
      id: '1',
      title: 'Google',
      username: 'usuario@gmail.com',
      password: 'contraseña123',
      url: 'https://google.com',
      category: 'web',
      favorite: true
    },
    {
      id: '2',
      title: 'GitHub',
      username: 'developer',
      password: 'securePass456',
      url: 'https://github.com',
      category: 'web',
      favorite: false
    },
    {
      id: '3',
      title: 'Netflix',
      username: 'user@netflix.com',
      password: 'netflix789',
      url: 'https://netflix.com',
      category: 'app',
      favorite: true
    }
  ])

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': 
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zM9.954 4.569c-.785.424-1.479 1.55-1.816 3.431h3.632c-.337-1.882-1.031-3.007-1.816-3.431zM9.954 15.431c.785-.424 1.479-1.55 1.816-3.431H8.138c.337 1.882 1.031 3.007 1.816 3.431zM10 11H4.256c.086-1.546.38-2.97.837-4.118A6.004 6.004 0 004.083 11H10zm0 0h5.917a6.004 6.004 0 01-1.01 4.118c.457-1.147.751-2.572.837-4.118H10zm0-5.856V4.569c-.785.424-1.479 1.55-1.816 3.431h3.632c-.337-1.882-1.031-3.007-1.816-3.431z" clipRule="evenodd"/></svg>
      case 'app': 
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
      case 'card': 
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>
      default: 
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web': return 'bg-blue-100 text-blue-800'
      case 'app': return 'bg-green-100 text-green-800'
      case 'card': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || password.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-md  md:text-3xl font-bold text-gray-900 dark:text-white">Gestor de Contraseñas</h1>
            <button className="text-sm md:text-base bg-blue-800 hover:bg-blue-700 text-white dark:bg-blue-900 dark:hover:bg-blue-950  px-2 py-1 md:px-4 md:py-2 rounded-lg flex items-center gap-2 transition-colors">
              <span className="text-xl">+</span>
              Nueva Contraseña
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar contraseñas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 placeholder:text-[12px] rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-purple-800 text-white'
                  : 'bg-neutral-800 text-gray-200 border border-neutral-600 hover:bg-neutral-700'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedCategory('web')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === 'web'
                  ? 'bg-blue-800 text-white'
                  : 'bg-neutral-800 text-gray-200 border border-neutral-600 hover:bg-neutral-700'
              }`}
            >
              <span className="text-xs">🌐</span>
              Web
            </button>
            <button
              onClick={() => setSelectedCategory('app')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === 'app'
                  ? 'bg-green-800 text-white'
                  : 'bg-neutral-800 text-gray-200 border border-neutral-600 hover:bg-neutral-700'
              }`}
            >
              <span className="text-xs">📱</span>
              Apps
            </button>
          </div>
        </div>

        {/* Password List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPasswords.map((password) => (
            <div key={password.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${getCategoryColor(password.category)}`}>
                    {getCategoryIcon(password.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{password.title}</h3>
                    {password.url && (
                      <a
                        href={password.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {password.url}
                      </a>
                    )}
                  </div>
                </div>
                <button className="text-yellow-500 hover:text-yellow-600 text-xl">
                  {password.favorite ? '⭐' : '☆'}
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Usuario:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{password.username}</span>
                    <button
                      onClick={() => copyToClipboard(password.username)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Contraseña:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                      {showPasswords[password.id] ? password.password : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(password.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords[password.id] ? 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg> :
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      }
                    </button>
                    <button
                      onClick={() => copyToClipboard(password.password)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <button className="flex-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-1 rounded transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="flex-1 text-gray-600 hover:text-red-600 hover:bg-red-50 py-1 rounded transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPasswords.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-300  mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No se encontraron contraseñas</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm ? 'Intenta con otra búsqueda' : 'Agrega tu primera contraseña para comenzar'}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
              <span className="text-xl">+</span>
              Agregar Contraseña
            </button>
          </div>
        )}
      </div>
    </div>
  )
}