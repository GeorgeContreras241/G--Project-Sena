import { ReactNode } from "react"

export const Button = ({ children, text, className, onClick }: { children: ReactNode, text: string, className?: string, onClick?: () => void }) => {
   
    return (
        <button 
            onClick={onClick}
            className={`flex gap-2 items-center bg-neutral-800 dark:bg-gray-700 text-white px-3  rounded-md border-2 dark:border-gray-600 
        cursor-pointer hover:bg-neutral-700 dark:hover:bg-gray-600 transition-colors text-sm ${className || ''}`}>
            {children}
            {text}
        </button>
    )
}