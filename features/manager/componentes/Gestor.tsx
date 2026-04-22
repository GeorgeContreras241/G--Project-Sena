'use client'

import { useState } from 'react'
import { useStoragePass } from '@/storage/useStoragePass'
import { encrypt } from '@/lib/crypto/encryptData'
import { buildVaultFile } from '@/lib/vault/saveVault'
import { Header_Gestor } from "@/features/manager/componentes/Header_Gestor"
import { copyToClipboard } from '@/utils/Gestor/copyToClipboard'
import { AddPasswords } from '@/features/manager/componentes/AddPasswords'
import { Delete } from '@/components/ui/icons/Delete'
import { Edit } from '@/components/ui/icons/Edit'

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
  const derivedKey = useStoragePass((state: any) => state.derivedKey)
  const dataPassword = useStoragePass((state: any) => state.dataPassword)
  const setDataPasswordDelate = useStoragePass((state: any) => state.setDataPasswordDelate)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  let dataExport

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
  console.log(dataPassword)
  const filteredPasswords = dataPassword?.filter((password: any) => {
    const matchesSearch = password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || password.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleExport = async () => {
    const saltArray = JSON.parse(localStorage.getItem("salt"))
    const salt = new Uint8Array(saltArray)
    // the derived key is no present, That is why it cant not  encrypt
    const encrypted = await encrypt(derivedKey, dataPassword)
    const vaultFile = buildVaultFile(salt, encrypted.iv, encrypted.data)
    downloadVault(vaultFile)
  }



  function downloadVault(buffer: any) {
    const blob = new Blob(
      [buffer],
      { type: "application/octet-stream" }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pass.enc"
    a.click()
    URL.revokeObjectURL(url)
  }


  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Header */}
        <button onClick={handleExport}>Export</button>
        <Header_Gestor selectedCategory={selectedCategory} onLoad={handleExport}
          setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <section className='grid grid-cols-1 lg:grid-flow-col auto-cols-auto gap-2'>
          {/* Form add Password */}
          <AddPasswords />
          {/* Password List */}
          <div>
            <div className="flex flex-col gap-2">
              {filteredPasswords?.map((password: any) => (
                <div key={password.id} className="flex items-center justify-around bg-background border border-border">
                  {/* Password Card */}
                  <div className="flex  justify-center rounded-lg p-2">
                    <div className="flex items-center justify-center gap-3">
                      <div className="p-2 rounded-lg">
                        {getCategoryIcon(password.category)}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold">{password.title}</h3>
                        {password.url && (
                          <a
                            href={password.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs"
                          >
                            {password.url}
                          </a>
                        )}
                      </div>
                      <button>
                        {password.favorite ? '⭐' : '☆'}
                      </button>
                    </div>
                  </div>
                  {/* Password Details */}
                  <div className="flex  rounded-lg p-2">
                    <div className="flex flex-col md:flex-row gap-0 md:gap-6 w-full">
                      <div className="flex w-50 items-center gap-2 text-sm">
                        <span className="text-sm text-text-secondary shrink-0">Usuario:</span>
                        <span className="text-sm font-medium text-text-primary truncate flex-1">{password.username}</span>
                        <button onClick={() => copyToClipboard(password.username)} className='shrink-0'>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-sm text-text-secondary shrink-0">Contraseña:</span>
                        <span className="text-sm font-mono text-text-primary truncate">
                          {showPasswords[password.id] ? password.password : '•••••••'}
                        </span>
                        <button onClick={() => togglePasswordVisibility(password.id)} className="shrink-0">
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
                        <button onClick={() => copyToClipboard(password.password)} className="shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-0 md:gap-2 justify-center items-end rounded-lg p-2">
                    <button className='cursor-pointer'>
                      <Edit />
                    </button>
                    <button onClick={() => setDataPasswordDelate(password.id)} className='cursor-pointer'>
                      <Delete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Empty State */}
            {filteredPasswords?.length === 0 && (
              <div className="p-8 text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No se encontraron contraseñas</h3>
                <p className="mb-4">
                  {searchTerm ? 'Intenta con otra búsqueda' : 'Agrega tu primera contraseña para comenzar'}
                </p>
                <button className="px-4 py-2 rounded-lg flex items-center gap-2 mx-auto">
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