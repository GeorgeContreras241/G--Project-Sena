import { ReactNode } from "react"

export const Button = ({ children, text, className, onClick }: { children: ReactNode, text: string, className?: string, onClick?: () => void }) => {
   
    return (
        <button 
            onClick={onClick}
            className={`flex gap-1 items-center justify-center  bg-neutral-800 dark:bg-gray-700 text-white h-8 w-25 rounded-md border-2 dark:border-gray-600 
        cursor-pointer hover:bg-neutral-700 dark:hover:bg-gray-600 transition-colors text-sm cursor-pointer ${className || ''}`}>
            <span className="w-5 h-5 flex items-center justify-center">{children}</span>
            {text}
        </button>
    )
}