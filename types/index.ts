export interface PasswordEntry {
    id: string
    title: string
    username: string
    password: string
    favorite: boolean
    url: string
    category: string
}

export interface EditPasswordProps {
    password: PasswordEntry
    onClose: () => void
}

export interface PasswordCardProps {
  password: PasswordEntry
  showPasswords: { [key: string]: boolean }
  onTogglePasswordVisibility: (id: string) => void
  onCopyToClipboard: (text: string) => void
  onEditPassword: (password: PasswordEntry) => void
  onDeletePassword: (id: string) => void
  onToggleFavorite: (id: string) => void
  getCategoryIcon: (category: string) => React.ReactNode
}

// LocalContext Types
export interface LocalContextType {
  saltRef: React.MutableRefObject<Uint8Array | null>
  handleExport: (dataPassword: PasswordEntry[]) => Promise<void>
  handleImport: (file: File) => Promise<ImportResult>
  handleReset: () => void
}

export interface ImportResult {
  state: boolean
  message?: {
    title: string
    description: string
    duration: number
    styles: {
      title: string
    }
  }
  decryptedData?: PasswordEntry[]
  salt?: Uint8Array
  drcKey?: CryptoKey | null
}

export interface VaultData {
  state: boolean
  salt?: Uint8Array
  iv?: Uint8Array
  data?: Uint8Array
}

// Component Props Types
export interface ActionSubmitProps {
  onSuccess: (value: boolean) => void
}

export interface HeaderGestorProps {
  setSearchTerm: (value: string) => void
  setSelectedCategory: (value: string) => void
  selectedCategory: string
  searchTerm: string
}

export interface AddPasswordsProps {
  onSuccess?: () => void
}

export interface EditPasswordProps {
  password: PasswordEntry
  onClose: () => void
}

// Storage Types
export interface StorageState {
  dataPassword: PasswordEntry[]
  setDataPassword: (data: PasswordEntry[]) => void
  setDataPasswordInit: (data: PasswordEntry[]) => void
  setDataPasswordUpdate: (data: PasswordEntry) => void
  setDataPasswordEdit: (data: PasswordEntry) => void
  setDataPasswordDelate: (id: string | number) => void
  setDataPasswordFavorite: (id: string | number) => void
}

// Form State Types
export interface FormState {
  title: string
  application: string
  username: string
  password: string
  url: string
  category: string
  favorite: boolean
}

export interface PasswordValidationResult {
  success: boolean
  error?: string
}

export interface FileValidationResult {
  isValid: boolean
  error?: string
}

// UI State Types
export interface ThemeToggleProps {
  className?: string
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// Crypto Types
export interface EncryptedData {
  iv: Uint8Array
  data: Uint8Array
}

export interface SaltGenerationResult {
  salt: Uint8Array
  success: boolean
}

// Category Types
export type CategoryType = 'all' | 'favorites' | 'web' | 'app' | 'card'

export interface CategoryButton {
  id: CategoryType
  label: string
  icon: React.ReactNode
}

// Event Handler Types
export type PasswordVisibilityHandler = (id: string) => void
export type CopyHandler = (text: string) => void
export type EditHandler = (password: PasswordEntry) => void
export type DeleteHandler = (id: string | number) => void
export type FavoriteHandler = (id: string | number) => void
export type CategoryHandler = (category: CategoryType) => void
export type SearchHandler = (term: string) => void

// Utility Types
export interface ToastMessage {
  title: string
  description?: string
  duration?: number
  styles?: {
    title?: string
    description?: string
  }
}

export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ContextType {
  handleImport: (file: File) => Promise<void>
  handleReset: () => void
}