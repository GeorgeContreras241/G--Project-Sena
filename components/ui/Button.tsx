import { ReactNode } from "react"

export const Button = ({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) => {
   
    return (
        <button 
            onClick={onClick}
            className={`${className || ''} flex gap-1 items-center justify-center text-white h-8 w-20 rounded-md border 
            bg-neutral-900 dark:border-gray-700 
            cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-xs font-semibold `}>
            <span className="w-5 h-5 flex items-center justify-center">{children}</span>

        </button>
    )
}